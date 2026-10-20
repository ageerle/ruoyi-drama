"""One journalled H3 army take using normal RuoYi project and media APIs."""
import argparse
import hashlib
import json
from pathlib import Path
import sys
import time
import uuid

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/long-snake/h3-15s-4k'
OUT.mkdir(parents=True, exist_ok=True)
sys.path.insert(0, str(ROOT / 'logs'))
from produce_county_fresh_media_20261002 import Api, API
sys.stdout.reconfigure(encoding='utf-8')
MODEL = 'minimax/h3-developer/image-to-video'
IMAGE_MODEL = 'openai/gpt-image-2.5-flare/text-to-image'
STYLE = 'chinese-3d-aesthetics'
SOURCE = '古代军队在晨光下以一字长蛇阵沿开阔平原推进。以工作台360人、四排、前段72骑与后段盾兵枪兵弓兵旗手的编排为参考，先清楚展示骑兵马步，再沿连续长队抬高观察全阵。只有行军和轻缓转向，没有敌军、交战或爆炸。全段无对白。'
START = '晨光中的开阔赭色平原，同一支古代军队组成四排窄长队列，前段是72骑编排参考的骑兵，后段接盾兵、长枪兵、弓兵和少量旗手，全队总规模参考360人。画面左前方近处三至四匹完整战马和成年骑手清楚，其他马队向画面右后方延伸并在远处接上步兵长队，整队沿单条平缓S形路线延伸，不形成宽大方阵。马身侧前方四分之三视角，头胸、腹部、四肢和蹄部离画幅下缘留有空间，站在坚实地面上；马头一致朝画面左前方行进方向。骑手坐在马鞍上，双腿分开贴两侧，左手轻持缰绳，右手竖持长矛，前景每匹马只有一名成年骑手。当前是轻快行军的起始姿态，前马一只前蹄略提，后蹄支撑，后面的步兵仍保持队列和相同前进方向。'
FRAME = '横屏16:9成熟国漫电影三维CG，单幅完整电影画面。成年士卒有成熟骨相，面部和手指自然，古代暗铁色札甲、暗朱红衣料、皮革马具；前景棕色与深栗色战马具有可信肩胛、胸腔、膝关节和短毛表面，黑鬃随风轻扬，深红鞍毯和鞍具稳稳贴马背。人物与马的比例自然，矛杆各自分开。摄影机在前段骑兵左前方约三米高，略向下看，35mm广角建立从可辨认的前景马队到远处步兵的单条窄长蛇阵。低角度暖金晨光从画面右后方照来，马与甲片有受控边缘亮光，左前方天空柔光托住脸部；土色地面有蹄印、稀疏枯草，薄尘贴地，远处淡蓝山脊和低矮行军营帐提供纵深。前景马腿不被尘遮住，铁、皮革、布料、马毛的粗糙度分别可辨。队形重要，四排连续，蛇首骑兵、蛇身和蛇尾步兵的衔接明确；不画圆阵、数十排横向方阵、现代车辆、城池攻防、插画平涂、Q版玩具、白模、文字、UI或水印。'
PROMPT = '''从已审阅起始图连续展开一段横屏成熟国漫电影CG军阵行军。保留起始图同一片晨光平原、同一支古代军队、马匹与成年骑手的外形服装、单条窄长S形队列、四排并行关系和前段骑兵接后段步兵的编排。全队规模与间距以参考图为准，远处士卒通过纵深和遮挡形成队列，不在空地凭空复制整排军队。起始马匹与人物已经在画内，不重新入场。背景是远山、低营帐与开阔土路，没有敌人或攻城战。

摄影机从起始的骑兵左前方斜视位置稳定向后跟移，速度与前排马队相近，让前景三至四匹战马的完整身体、骑手、缰绳和持矛动作清晰留在画内。骑兵沿已经建立的路线轻快小跑而非全速冲锋；每匹马有交替落蹄、后腿蹬地、前腿抬起再前伸落地的连续步态，蹄子在承重时贴地，马肩与髋部随步幅适度起伏，头颈轻微摆动，鬃毛与尾毛有落后身体运动的惯性。骑手臀部留在马鞍范围，腰背和膝部随马步柔和起伏，左手维持缰绳联系，右手始终握同一根长矛，矛杆稍摆后回正，不换手、不穿过邻骑。马腿数量、马头、马鞍和骑手身体稳定，不变形，不以整匹马平移代替迈步。各骑之间保留足够前后距离，顺着平缓弯道依次转向，后列跟随前列的实际路线，不互相穿越。

在马队持续推进时，摄影机平滑抬高并逐渐拉开，由骑兵中全景自然过渡到能看清蛇首、蛇身、蛇尾的斜俯全景，全段一个连续镜头，不突然跳到新地点。后段盾兵、长枪兵与弓兵沿同一条窄长路线迈步跟进，四排各自保持等间距，士卒重心随落脚前移，持盾的手臂略随步幅晃动，竖立长枪保持错开，弓兵背负弓具。已有暗红军旗随晨风向同一侧鼓起再回卷，持旗手仍在队列中，旗杆不离手。蛇首进入缓弯，紧接的马队逐列顺弯；步兵保持相同推进方向，前后衔接不截断，终景中长队仍是一条窄长连续阵列而非铺满整个战场的密集方阵。

晨光始终来自画面右后方，暖金侧逆光沿马鬃、铁甲边缘和红旗透出亮度，天空的冷柔光照亮阴影面。甲片、粗织衣料、皮革缰绳和马毛保留独立材质，避免塑料高光。每次落蹄仅扬起很短的贴地细尘，近处颗粒随足部接触产生，稍后沉降；远处队列的薄尘更轻更小，同一风向把它向侧后方带走，马腿、步兵间距和队形始终可辨，不用浓烟遮住动作。地面蹄印与阴影随实际接触推进，没有漂浮、脚滑、地面开裂或巨大爆炸。

结尾摄影机稳在较高斜俯全景，近处仍能认出骑兵马头和红色鞍毯，远处盾兵枪兵弓兵顺着同一缓弯跟上，首尾保持连续，军旗与薄尘随队推进，保留一点持续行军的余势作为结束。全段无对白、无解说、无口型表演、无字幕和水印。声音设计意图是近处交替马蹄声、甲片与鞍具轻响，远处密集但较轻的脚步声，风声和旗布拍动；本模型未提供原生音频开关，视频作为无声视觉演示留档，声音另作后期，不通过画面文字表现声音。'''

def save(name, value):
    (OUT / (name + '.json')).write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding='utf-8')

def read(name):
    return json.loads((OUT / (name + '.json')).read_text(encoding='utf-8'))

def client():
    api = Api(); api.login(); return api

def op(api, name, path, body=None, params=None, method='POST'):
    file = OUT / (name + '.json')
    if file.exists():
        record = read(name)
        if record['state'] == 'acknowledged': return record.get('result')
        raise RuntimeError(name + '结果未知，先核对，禁止自动重提')
    record = {'state': 'submitting', 'path': path, 'method': method, 'submittedAt': time.time()}
    save(name, record)
    try: result = api.call(method, path, json=body, params=params, timeout=210)
    except Exception as error:
        record.update(state='unknown', error=str(error)); save(name, record); raise
    record.update(state='acknowledged', result=result); save(name, record); return result

def prepare():
    api = client()
    models = api.call('GET', '/system/model/modelList', params={'category': 'video', 'providerCode': 'atlas'})
    match = [m for m in models if m['modelName'] == MODEL]
    if not match:
        source = models[0]
        detail = api.call('GET', '/system/model/' + str(source['id']))
        assert detail.get('apiKey') and detail.get('apiHost')
        body = {k: detail.get(k) for k in ['category', 'providerCode', 'modelShow', 'apiHost', 'apiKey']}
        body.update(modelName=MODEL, sortOrder=100, modelDescribe='MiniMax H3 Developer 图生视频 · 4至15秒 · 4K超分', remark='官方API schema：480P/768P/1440p-sr/4k-sr；单起始图，adaptive，prompt_expansion=false。')
        try: op(api, 'model-registration', '/system/model', body)
        finally: body.pop('apiKey', None); detail.pop('apiKey', None)
        models = api.call('GET', '/system/model/modelList', params={'category': 'video', 'providerCode': 'atlas'})
        match = [m for m in models if m['modelName'] == MODEL]
    assert len(match) == 1
    save('configured-model', match[0])
    style = api.call('GET', '/short-drama/skills/' + STYLE)
    assert style['enabled']; save('selected-aesthetic', style)
    pid = op(api, 'create-project', '/short-drama/project', {'projectName': '一字长蛇阵 · 骑步协同｜H3 15秒4K候选', 'description': SOURCE, 'originalIdea': SOURCE, 'artStyle': style['artStyle'], 'aestheticSkillName': STYLE, 'composeAspectRatio': '16:9'})
    script = op(api, 'create-script', '/short-drama/script', {'projectId': pid, 'scriptName': '骑兵领阵 · 平原行军', 'scriptText': '第1场 外景／平原／清晨\n' + SOURCE, 'outlineText': SOURCE, 'tone': '成熟国漫电影CG，古代骑步混编军阵，马步和阵形清楚', 'sourceType': 'manual', 'creationMode': 'manual'})
    created = op(api, 'create-shot', '/short-drama/storyboard/add', params={'projectId': pid, 'scriptId': script['id']})
    current = api.call('GET', '/short-drama/' + str(pid))
    shot = next(s for s in current['storyboards'] if str(s['id']) == str(created['id']))
    if not (OUT / 'review.json').exists():
        assert not shot.get('videoId') and not shot.get('videoUrl')
        continuity = {'video_model': MODEL, 'video_resolution': '4k-sr', 'video_seconds': 15, 'video_use_start_frame': True, 'video_reference_include_location': False, 'video_reference_include_characters': False, 'present_characters': [], 'visible_props': [], 'keyframe_reference_mode': 'text_only_candidate', 'start_state': START, 'spatial_anchor': '马队位于左前方近处，四排窄长队列沿地面缓弯向右后方纵深延伸，步兵接在马队尾部。前景骑兵朝左前方，禁止前后段相向走。', 'keyframe_directive': FRAME, 'background_extras': '0秒：可见人数=280-360；身份服饰=匿名古代军队群演，前段骑兵穿暗铁札甲和暗朱红衣料，后段盾兵枪兵弓兵旗手同属一支军队；位置=四排窄长蛇阵，骑兵在前，步兵接后，远处个体允许被遮挡；姿态动作=骑手坐马鞍左手持缰右手竖持矛，步兵行军起始落脚姿态；声源=无对白；', 'end_state': '较高斜俯全景中骑兵领阵与步兵长队沿同一缓弯推进，首尾连续，甲衣马具稳定，红旗与薄尘留有余势', 'timing': {'spoken_text': '', 'action_seconds': 15, 'pause_seconds': 0, 'pacing_note': '前段清楚展示连续马步和骑手随动；跟移与行军并行；随后机位升高拉开展示四排长蛇阵；全景以继续行军余势结束。'}, 'generation_authorized': True, 'formation_reference': {'schema': 'ruoyi-long-snake-v1', 'count': 360, 'ranks': 4, 'cavalryPercent': 20, 'mode': 'march'}, 'audio_plan': 'H3 schema无原生音频开关，本次只提交无声视觉演示；拟音为后续设计意图。'}
        shot.update(sceneTitle='骑兵领阵 · 长蛇阵连续行军', sceneText=SOURCE, sourceText=SOURCE, videoPrompt=PROMPT, imagePrompt=FRAME, durationSeconds=15, shotType='中全景自然过渡斜俯全景', cameraMovement='持续跟移并平滑升高拉开', locationName='', sceneType='action', charactersJson='[]', continuityJson=json.dumps(continuity, ensure_ascii=False))
        op(api, 'review', f'/short-drama/{pid}/revision', {'scriptId': script['id'], 'expectedScriptText': script['scriptText'], 'scriptText': script['scriptText'], 'revisionNotes': '按用户指定H3 image-to-video制作一次15秒4K超分候选，工作台军阵构图转为成熟国漫CG，独立新项目保留此前媒体。单张起始图是指定图生视频模型所需，不批量生图。', 'storyboards': [shot]})
    actual = api.call('GET', '/short-drama/' + str(pid)); save('prepared-project', actual)
    stored = next(s for s in actual['storyboards'] if str(s['id']) == str(created['id']))
    assert stored['videoPrompt'] == PROMPT and json.loads(stored['continuityJson'])['video_resolution'] == '4k-sr'
    if not (OUT / 'plan.json').exists(): save('plan', {'projectId': str(pid), 'storyboardId': str(stored['id']), 'scriptId': str(script['id']), 'model': MODEL, 'resolution': '4k-sr', 'seconds': 15, 'requestId': str(uuid.uuid4()), 'aestheticSkillName': STYLE, 'aestheticVersion': style['version']})
    (OUT / '导演稿.txt').write_text(PROMPT, encoding='utf-8')
    print(json.dumps(read('plan'), ensure_ascii=False))

def frame_submit():
    api = client(); p = read('plan')
    assert api.call('GET', '/short-drama/skills/' + STYLE)['version'] == p['aestheticVersion']
    journal = 'frame-submit'
    if (OUT / 'frame-submit.json').exists():
        state = api.call('GET', f'/short-drama/{p["projectId"]}/visual-assets')
        # The first attempt failed during planning, before any paid image dispatch.
        assert not state['running'] and not state['assets'] and '场景缺少参考图' in state.get('error', '')
        save('frame-planning-failure', state)
        actual = api.call('GET', '/short-drama/' + p['projectId']); shot = actual['storyboards'][0]
        assert str(shot['id']) == p['storyboardId'] and not shot.get('videoId')
        shot['locationName'] = ''  # No master location is bound; the full scene lives in start_state.
        script = actual['script']
        op(api, 'frame-binding-repair', f'/short-drama/{p["projectId"]}/revision', {'scriptId': script['id'], 'expectedScriptText': script['scriptText'], 'scriptText': script['scriptText'], 'revisionNotes': '本镜从文字构图生成独立候选，移除不存在的场景母版绑定；实际晨光平原、军阵与摄影完整保留在起始状态和导演稿，不新增付费资产任务。', 'storyboards': [shot]})
        journal = 'frame-submit-after-binding-repair'
    result = op(api, journal, f'/short-drama/{p["projectId"]}/visual-assets/generate-range', params={'model': IMAGE_MODEL, 'start': 1, 'end': 1})
    print(json.dumps({'frameGenerationRequested': True, 'phase': result.get('phase')}, ensure_ascii=False))

def frame_status():
    api = client(); p = read('plan')
    s = api.call('GET', f'/short-drama/{p["projectId"]}/visual-assets'); save('frame-status', s)
    frames = [x for x in s['assets'] if x['kind'] == 'shot_frame' and str(x['storyboardId']) == p['storyboardId']]
    print(json.dumps({'running': s['running'], 'error': s.get('error'), 'frames': [{k: x.get(k) for k in ['id', 'status', 'predictionId', 'errorMessage']} for x in frames]}, ensure_ascii=False))
    if len(frames) == 1 and frames[0]['status'] == 'done':
        asset = frames[0]; save('first-frame-receipt', asset)
        target = OUT / '军阵-国漫起始图.jpg'
        if not target.exists():
            r = api.session.get(API + '/media/content', params={'model': asset['model'], 'predictionId': asset['predictionId']}, timeout=180)
            r.raise_for_status(); assert r.content[:8] == b'\x89PNG\r\n\x1a\n' or r.content[:3] == b'\xff\xd8\xff', '返回内容不是图片'; target.write_bytes(r.content)
        save('first-frame-file', {'path': str(target), 'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})

def previs_frame_submit():
    api = client(); p = read('plan')
    state = api.call('GET', f'/short-drama/{p["projectId"]}/visual-assets')
    assert not state['running'] and not state['assets'], '先核对现有图片任务，禁止重复生成'
    save('frame-planning-failure-final', state)
    urls = []
    for name, filename in [('formation', 'cavalry-overview.png')]:
        journal = 'upload-previs-' + name; file = ROOT / 'output/long-snake' / filename
        if (OUT / (journal + '.json')).exists():
            record = read(journal); assert record['state'] == 'acknowledged'; url = record['result']
        else:
            record = {'state': 'submitting', 'sha256': hashlib.sha256(file.read_bytes()).hexdigest(), 'source': str(file)}; save(journal, record)
            try:
                with file.open('rb') as stream: url = api.call('POST', '/short-drama/image/upload-reference', params={'model': 'openai/gpt-image-2.5-flare/edit'}, files={'file': (file.name, stream, 'image/png')}, timeout=120)
            except Exception as error:
                record.update(state='unknown', error=str(error)); save(journal, record); raise
            record.update(state='acknowledged', result=url); save(journal, record)
        assert isinstance(url, str) and url.startswith('https://'); urls.append(url)
    location = op(api, 'create-previs-location', '/short-drama/location', {'projectId': p['projectId'], 'name': '军阵工作台构图参考', 'summary': '程序化军阵构图参照，只参考四排窄长骑步队列与前段骑兵，不继承UI、文字、低多边形材质、黄色地面或三角形山丘。晨光平原以本镜起始状态为准。', 'referenceImageUrl': urls[0], 'imageUrls': json.dumps([urls[0]]), 'selectedImageIndex': 0})
    actual = api.call('GET', '/short-drama/' + p['projectId']); shot = actual['storyboards'][0]
    c = json.loads(shot['continuityJson']); c.pop('keyframe_reference_mode', None)
    c['keyframe_directive'] = FRAME + '。程序化军阵总览截图仅用于骑步比例、窄长四排队列；删除截图所有界面、按钮、标注、引导线和文字。重新拍摄为单幅16:9成熟国漫电影画面，真实马匹解剖与CG演员取代低多边形原型，土色平原与蓝灰远山取代原型三角山；不能复制截图边框或拼图布局。'
    shot['continuityJson'] = json.dumps(c, ensure_ascii=False); shot['locationName'] = location['name']
    script = actual['script']
    op(api, 'previs-frame-review', f'/short-drama/{p["projectId"]}/revision', {'scriptId': script['id'], 'expectedScriptText': script['scriptText'], 'scriptText': script['scriptText'], 'revisionNotes': '使用已有工作台军阵总览作为构图参考，生成一张成熟国漫起始候选；不把UI截图直接交给H3，不产生额外角色资产。', 'storyboards': [shot]})
    result = op(api, 'frame-from-previs-submit', f'/short-drama/{p["projectId"]}/visual-assets/generate-range', params={'model': 'openai/gpt-image-2.5-flare/edit', 'start': 1, 'end': 1})
    print(json.dumps({'frameGenerationRequested': True, 'references': len(urls), 'phase': result.get('phase')}, ensure_ascii=False))

def video_submit():
    api = client(); p = read('plan'); frame = read('first-frame-receipt')
    assert (OUT / 'frame-visual-review.json').exists(), '先审阅实际首帧'
    assert read('frame-visual-review')['acceptedForThisTake']
    assert api.call('GET', '/short-drama/skills/' + STYLE)['version'] == p['aestheticVersion']
    actual = api.call('GET', '/short-drama/' + p['projectId']); shot = next(s for s in actual['storyboards'] if str(s['id']) == p['storyboardId'])
    assert shot['videoPrompt'] == PROMPT and json.loads(shot['continuityJson'])['video_seconds'] == 15
    result = op(api, 'video-submit', f'/short-drama/storyboard/{p["storyboardId"]}/generate-video', params={'model': MODEL, 'requestId': p['requestId'], 'regenerate': 'false'})
    receipt = api.call('GET', f'/short-drama/storyboard/{p["storyboardId"]}/video-submissions/{p["requestId"]}'); save('video-receipt', receipt)
    assert receipt.get('actualModel') == MODEL
    print(json.dumps({'status': result.get('videoStatus'), 'predictionId': result.get('videoId'), 'actualModel': receipt['actualModel']}, ensure_ascii=False))

def status():
    api = client(); p = read('plan')
    shot = api.call('GET', f'/short-drama/storyboard/{p["storyboardId"]}/video-result', params={'model': MODEL}, timeout=90)
    receipt = api.call('GET', f'/short-drama/storyboard/{p["storyboardId"]}/video-submissions/{p["requestId"]}'); save('video-receipt', receipt); save('latest-shot', shot)
    print(json.dumps({'status': shot.get('videoStatus'), 'predictionId': shot.get('videoId'), 'error': receipt.get('error')}, ensure_ascii=False))
    if shot.get('videoStatus') == 'done':
        target = OUT / '一字长蛇阵-H3-15秒-4K超分.mp4'
        if not target.exists():
            r = api.session.get(API + '/media/content', params={'model': MODEL, 'predictionId': shot['videoId']}, timeout=240)
            r.raise_for_status(); assert r.content[4:8] == b'ftyp', '返回内容不是MP4'; target.write_bytes(r.content)
        save('video-file', {'path': str(target), 'bytes': target.stat().st_size, 'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})
        print(json.dumps({'videoFile': str(target), 'bytes': target.stat().st_size}, ensure_ascii=False))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(); parser.add_argument('action', choices=['prepare', 'frame-submit', 'previs-frame-submit', 'frame-status', 'video-submit', 'status']); args = parser.parse_args()
    globals()[args.action.replace('-', '_')]()
