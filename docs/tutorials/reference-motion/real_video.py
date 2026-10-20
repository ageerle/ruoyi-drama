"""Submit one real-actor candidate through the project's normal video workflow."""
import argparse
import json
from pathlib import Path
import sys
import uuid
import time
import subprocess

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/reference-motion/real-video'
OUT.mkdir(parents=True, exist_ok=True)
sys.path.insert(0, str(ROOT / 'logs'))
from produce_county_fresh_media_20261002 import Api, API
sys.stdout.reconfigure(encoding='utf-8')
MODEL = 'bytedance/seedance-2.0-mini/reference-to-video'
SOURCE = '一名成年武术演员在练功房内依次展示左右闪身步、交叉换步向后勾踢、耸肩侧摆与抖身，最后稳住重心收势，全段无对白。'
PROMPT = '''新生成一段写实武术训练电影画面，@video1仅提供动作次序、肢体轨迹与节奏。出镜为一位三十岁左右的东亚男性武术演员，短黑发，精瘦有力，骨相成熟，穿深藏蓝色棉麻练功上衣、黑色宽松练功裤和黑色薄底布鞋。真实人体比例，皮肤、头发、棉麻衣褶和脚下承重自然。演员站在有浅灰色石墙和深灰地面的简洁练功房中央，左侧高窗自然光照出面部与衣褶的明暗层次，右侧柔和反光补光，地面接触阴影清晰。
摄影机固定在正面略偏侧的全身中远景，镜头始终包含头顶与双脚，正常速度记录完整表演，保持同一演员、同一服装和同一空间。演员从双脚并拢、双手垂在身侧的站姿开始，先向左迈出侧步，重心跟随踏实，腰胯和上身顺势侧倾，手臂松弛随摆，随即收脚回中；再向右完成对称的闪身，肩与腰先后回正。接着双臂自然张开维持平衡，交叉换步，支撑腿微屈，另一条腿弯膝向后勾起，脚尖贴着身体后侧掠过后落地，再换另一侧完成勾踢，双臂随重心起伏而摆动。演员由勾踢过渡到较宽站距，腰胯带动上身左右摆动，肩带轻轻提落，双臂交替举落，手腕放松下垂，交叉换步与抖肩的节奏保持协调；随后收脚回中，双手放下，稳住身体结束。
全段无对白，演员专注于身体重心，呼吸自然；保留布鞋擦地、落脚轻响、衣料摩擦与近处呼吸声，声音跟随实际动作。动作之间通过收脚和重心转移承接，末帧停在并步站稳、手臂垂落的收势。参考片中的白模仅用于动作，不继承其几何外观、关节圆球或材质。'''

def save(name, data):
    path = OUT / f'{name}.json'
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')

def client():
    api = Api()
    api.login()
    return api

def read(name):
    return json.loads((OUT / f'{name}.json').read_text(encoding='utf-8'))

def operation(api, name, path, body=None, params=None):
    if (OUT / f'{name}.json').exists():
        old = read(name)
        if old['state'] == 'acknowledged': return old['result']
        raise RuntimeError(f'{name}结果未知，请先核对，不重复提交')
    receipt = dict(state='submitting', path=path, body=body, params=params, submittedAt=time.time())
    save(name, receipt)
    try:
        result = api.call('POST', path, json=body, params=params, timeout=210)
    except Exception as error:
        receipt.update(state='submission_unknown', error=str(error));save(name, receipt);raise
    receipt.update(state='acknowledged', result=result);save(name, receipt)
    return result

def prepare():
    reference = OUT / '白模动作参考-12秒.mp4'
    if not reference.exists():
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(OUT.parent / '参考动作-白模复刻.mp4'),
            '-filter_complex', '[0:v]trim=start=2.5:end=6.5,setpts=PTS-STARTPTS[a];[0:v]trim=start=12:end=16,setpts=PTS-STARTPTS[b];[0:v]trim=start=24.3:end=28.3,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0[v]',
            '-map', '[v]', '-r', '24', '-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', str(reference)], check=True)
    api = client()
    pid = operation(api, 'create-project', '/short-drama/project', {
        'projectName': '身法练习｜白模转写实样片', 'description': '用户授权的一段真人写实动作候选：闪身步、交叉勾踢、耸肩摆身。参考来自已有白模工程。',
        'originalIdea': SOURCE, 'artStyle': '真人写实电影摄影，成年演员，棉麻服装，自然光练功房', 'composeAspectRatio': '16:9'})
    script = operation(api, 'create-script', '/short-drama/script', {
        'projectId': pid, 'scriptName': '三段身法连续示范', 'scriptText': '第1场 内景／练功房／日\n'+SOURCE,
        'outlineText': SOURCE, 'tone': '专注、利落，依身体重心推进动作，正常速度', 'sourceType': 'manual', 'creationMode': 'manual'})
    shot = operation(api, 'create-shot', f'/short-drama/storyboard/add?projectId={pid}&scriptId={script["id"]}')
    continuity = {
        'video_model': MODEL, 'video_resolution': '720p', 'video_use_start_frame': False,
        'video_seconds': -1, 'present_characters': ['武术演员'], 'visible_props': [],
        'start_state': '并步直立，手臂垂在身侧，双脚入镜', 'end_state': '双脚收回并步，双手垂落，站稳收势',
        'timing': {'spoken_text': '', 'action_seconds': 12, 'pause_seconds': .4,
                   'pacing_note': '白模精选连续覆盖三段动作；左右侧步回中、交叉勾踢与腰肩摆身按真实重心转换衔接，收势只作短暂结束。'},
        'generation_authorized': True,
    }
    shot.update(sceneTitle='闪身、勾踢与摆身｜真人写实样片', sourceText=SOURCE, videoPrompt=PROMPT,
                durationSeconds=13, charactersJson='[]', locationName='练功房', sceneType='action',
                continuityJson=json.dumps(continuity, ensure_ascii=False))
    detail = operation(api, 'review-draft', f'/short-drama/{pid}/revision', {
        'scriptId': script['id'], 'expectedScriptText': script['scriptText'], 'scriptText': script['scriptText'],
        'revisionNotes': '用户要求生成真实视频；按已完成白模工程制作独立写实动作候选，原画布工程保留。', 'storyboards': [shot]})
    save('plan', {'projectId': str(pid), 'scriptId': str(script['id']), 'storyboardId': str(shot['id']),
                  'model': MODEL, 'requestId': read('plan')['requestId'] if (OUT/'plan.json').exists() else str(uuid.uuid4()), 'sourceRanges': [[2.5,6.5],[12,16],[24.3,28.3]]})
    save('reviewed-project', detail)
    (OUT / '导演稿.txt').write_text(PROMPT, encoding='utf-8')
    print(json.dumps(read('plan'), ensure_ascii=False))

def attach():
    api = client(); plan = read('plan'); pid=plan['projectId']
    receipt_path=OUT/'upload-reference.json'
    if receipt_path.exists():
        receipt=read('upload-reference')
        if receipt['state']!='acknowledged': raise RuntimeError('参考上传结果未知，请核对项目列表后恢复')
        clip=receipt['result']
    else:
        save('upload-reference', {'state':'submitting'})
        with (OUT/'白模动作参考-12秒.mp4').open('rb') as file:
            clip=api.call('POST', f'/short-drama/{pid}/video-references', files={'file':('白模动作参考-12秒.mp4',file,'video/mp4')}, timeout=90)
        save('upload-reference', {'state':'acknowledged','result':clip})
    detail=api.call('GET',f'/short-drama/{pid}')
    shot=next(s for s in detail['storyboards'] if str(s['id'])==plan['storyboardId'])
    continuity=json.loads(shot['continuityJson']);continuity['video_reference_ids']=[clip['id']]
    shot['continuityJson']=json.dumps(continuity,ensure_ascii=False)
    operation(api,'bind-reference','/short-drama/storyboard',shot)
    saved=api.call('GET',f'/short-drama/{pid}')
    selected=next(s for s in saved['storyboards'] if str(s['id'])==plan['storyboardId'])
    assert json.loads(selected['continuityJson'])['video_reference_ids']==[clip['id']]
    save('before-submission',saved)
    print(json.dumps({'projectId':pid,'clipId':clip['id'],'duration':clip['duration'],'saved':True},ensure_ascii=False))

def submit():
    api=client(); plan=read('plan')
    result=operation(api,'video-submission',f'/short-drama/storyboard/{plan["storyboardId"]}/generate-video',
                     params={'model':plan['model'],'requestId':plan['requestId'],'regenerate':'false'})
    receipt=api.call('GET',f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}')
    save('task-receipt',receipt)
    print(json.dumps({'status':result.get('videoStatus'),'predictionId':result.get('videoId'),'actualModel':receipt.get('actualModel')},ensure_ascii=False))

def status():
    api=client(); plan=read('plan')
    result=api.call('GET',f'/short-drama/storyboard/{plan["storyboardId"]}/video-result',params={'model':plan['model']},timeout=60)
    receipt=api.call('GET',f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}')
    save('task-receipt',receipt);save('latest-shot',result)
    print(json.dumps({'status':result.get('videoStatus'),'predictionId':result.get('videoId'),'error':receipt.get('error'),'hasVideo':bool(result.get('videoUrl'))},ensure_ascii=False))
    if result.get('videoStatus')=='done' and result.get('videoUrl'):
        target=OUT/'三段身法-真人写实样片.mp4'
        if not target.exists():
            # The project's media proxy also preserves the supplier prediction and cached original.
            response=api.call('GET',f'/short-drama/{plan["projectId"]}')
            save('completed-project',response)
            temporary=target.with_suffix('.part')
            with api.session.get(API+'/media/content',params={'model':receipt.get('actualModel') or plan['model'],
                'predictionId':result['videoId']},stream=True,timeout=(20,180)) as fetched:
                fetched.raise_for_status()
                if not fetched.headers.get('Content-Type','').lower().startswith('video/'):
                    raise RuntimeError('媒体下载结果不是视频')
                with temporary.open('wb') as file:
                    for chunk in fetched.iter_content(1024*1024): file.write(chunk)
            if not temporary.stat().st_size: raise RuntimeError('媒体下载结果为空')
            temporary.replace(target)
        metadata=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate','-of','json',str(target)],encoding='utf-8'))
        subprocess.run(['ffmpeg','-v','error','-i',str(target),'-f','null','-'],check=True)
        save('video-metadata',metadata)
        print(json.dumps(metadata,ensure_ascii=False))

def probe():
    api = client()
    models = api.call('GET', '/system/model/modelList', params={'category': 'video', 'providerCode': 'atlas'})
    safe = [{k: item.get(k) for k in ['id', 'modelName', 'model', 'modelCategory', 'providerCode', 'priority', 'modelDescribe']} for item in models]
    save('models', safe)
    print(json.dumps(safe, ensure_ascii=False))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['probe', 'prepare', 'attach', 'submit', 'status'])
    args = parser.parse_args()
    {'probe': probe, 'prepare': prepare, 'attach': attach, 'submit': submit, 'status': status}[args.action]()
