"""A separately journalled replacement take after visually rejecting candidate 1."""
import argparse
import json
import uuid
from army_h3 import client, op, read, save, OUT, MODEL, SOURCE, STYLE

PROMPT = '''成熟国漫电影三维CG，沿起始图继续拍摄同一支古代军队在晨光平原上的行军，完整保留同一片野外地形、相同骑手甲衣、棕色战马、红旗，以及前段骑兵接后段步兵的窄长队列。开场前景骑兵已经坐在马鞍上，左手联系缰绳，右手竖持长矛，身后的步兵队列已经在画内。全片始终在这片开阔平原，所有人继续沿地面同一路线向前，四排窄长阵形首尾相接。

镜头从起始骑兵左前方的中全景平稳向后跟移。战马以均匀的小跑步态推进，前腿交替提膝、前伸、落蹄，后腿蹬地后再向前收回，承重蹄贴地，马肩与髋部轻微起伏，头颈随步幅轻摆。骑手仍坐在同一马鞍上，腰膝吸收马步起伏，持缰手和持矛手保持原物，甲片与衣摆有适度惯性。邻骑保留间距，按原有缓弯依次转向，不突然变道。近处马腿始终可见，不用大团烟尘遮挡。

行军保持连续时，摄影机逐渐抬高并向后拉开，从前段骑兵自然过渡到全阵斜俯全景。后方盾兵、长枪兵与弓兵沿同一路线迈步跟进，四排窄长队列保持连贯，脚落地后重心前移，长枪竖立错开，军旗随同一侧的风鼓起又回卷。蛇首骑兵经过缓弯，后方步兵按纵深逐列跟上；结束时首尾仍是连续长队，机位留在较高全景，军阵继续稳步推进。全段一个连续镜头，只有缓慢跟移、升高和拉开，不切换场景。

低角度暖金日光固定从右后方照来，天空冷柔光托住甲衣阴影，铁甲、粗织布、皮革马具与短马毛分别呈现可信材质。尘土只从实际落蹄处产生并沿地面向侧后方轻散，远处更薄。声音仅为连续马蹄声、较远的步兵脚步声、风声、旗布和甲具轻响，无对白、无旁白、无解说、无歌曲。画面只出现起始图的平原军阵与远山营帐，不出现室内、餐桌、食物、手机、电子屏幕、商品展示、文字或广告。马腿、骑手、缰绳、长矛和军旗保持形状与接触，不复制肢体、不穿模、不凭空增加新的队列。'''

def submit():
    api = client(); original = read('plan'); before = api.call('GET', '/short-drama/' + original['projectId'])
    old = next(s for s in before['storyboards'] if str(s['id']) == original['storyboardId'])
    assert old['videoId'] == read('video-receipt')['predictionId'] and old['videoStatus'] == 'done'
    assert read('candidate1-rejection')['accepted'] is False
    assert api.call('GET', '/short-drama/skills/' + STYLE)['version'] == original['aestheticVersion']
    created = op(api, 'candidate2-create-shot', '/short-drama/storyboard/add', params={'projectId': original['projectId'], 'scriptId': original['scriptId'], 'afterId': old['id']})
    if not (OUT / 'candidate2-plan.json').exists(): save('candidate2-plan', {**original, 'storyboardId': str(created['id']), 'requestId': str(uuid.uuid4()), 'replacesRejectedStoryboardId': original['storyboardId']})
    p = read('candidate2-plan'); actual = api.call('GET', '/short-drama/' + p['projectId'])
    shot = next(s for s in actual['storyboards'] if str(s['id']) == p['storyboardId'])
    if not (OUT / 'candidate2-review.json').exists():
        assert not shot.get('videoId')
        c = json.loads(old['continuityJson']); c.pop('composition_reference_images', None); c.pop('keyframe_reference_mode', None)
        c['audio_plan'] = 'H3自动生成音轨；仅马蹄、脚步、风、旗布与甲具，不要人声或歌曲。'
        c['manual_start_frame'] = {'url': read('first-frame-receipt')['imageUrl'], 'source': 'existing_reviewed_generated_frame'}
        c['keyframe_directive'] = '使用已实际审阅的同一张军阵起始图，不重新生成图片。'
        for field in ['imagePrompt', 'locationName', 'charactersJson', 'photographyRules']:
            shot[field] = old.get(field)
        shot.update(sceneTitle='骑兵领阵 · 连续平原行军 · 候选2', sceneText=SOURCE, sourceText=SOURCE, videoPrompt=PROMPT, durationSeconds=15, sceneType='action', continuityJson=json.dumps(c, ensure_ascii=False))
        script = actual['script']
        op(api, 'candidate2-review', f'/short-drama/{p["projectId"]}/revision', {'scriptId': script['id'], 'expectedScriptText': script['scriptText'], 'scriptText': script['scriptText'], 'revisionNotes': '第一版实际视频跑题，插入室内与现代手机，已视觉淘汰。保留该原片与任务回执，用同一张已审阅首帧、同一H3型号和15秒4K参数制作独立替代候选；导演稿收敛为连续平原行军和自然环境音。', 'storyboards': [shot if str(s['id']) == p['storyboardId'] else s for s in actual['storyboards']]})
    verified = api.call('GET', '/short-drama/' + p['projectId']); save('candidate2-project-readback', verified)
    old_after = next(s for s in verified['storyboards'] if str(s['id']) == original['storyboardId'])
    assert old_after['videoId'] == old['videoId'] and old_after['videoUrl'] == old['videoUrl'] and old_after['videoPrompt'] == old['videoPrompt']
    saved = next(s for s in verified['storyboards'] if str(s['id']) == p['storyboardId']); assert saved['videoPrompt'] == PROMPT
    (OUT / '候选2-导演稿.txt').write_text(PROMPT, encoding='utf-8')
    result = op(api, 'candidate2-video-submit', f'/short-drama/storyboard/{p["storyboardId"]}/generate-video', params={'model': MODEL, 'requestId': p['requestId'], 'regenerate': 'false'})
    receipt = api.call('GET', f'/short-drama/storyboard/{p["storyboardId"]}/video-submissions/{p["requestId"]}'); save('candidate2-receipt', receipt)
    assert receipt['actualModel'] == MODEL
    print(json.dumps({'status': result['videoStatus'], 'predictionId': result['videoId'], 'requestId': p['requestId']}))

def status():
    api = client(); p = read('candidate2-plan')
    shot = api.call('GET', f'/short-drama/storyboard/{p["storyboardId"]}/video-result', params={'model': MODEL}, timeout=90)
    receipt = api.call('GET', f'/short-drama/storyboard/{p["storyboardId"]}/video-submissions/{p["requestId"]}'); save('candidate2-receipt', receipt)
    print(json.dumps({'status': shot['videoStatus'], 'predictionId': shot.get('videoId'), 'error': receipt.get('error')}, ensure_ascii=False))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(); parser.add_argument('action', choices=['submit', 'status']); args = parser.parse_args(); globals()[args.action]()
