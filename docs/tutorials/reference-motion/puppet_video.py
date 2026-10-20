"""One independent, reference-driven firework-puppet video candidate.

Use normal project/revision/asset/reference/submission APIs. Mutations are
journalled before dispatch; an unknown result is never blindly resubmitted.
"""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import time
import uuid

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/firework-puppets'
OUT.mkdir(parents=True, exist_ok=True)
sys.path.insert(0, str(ROOT / 'logs'))
from produce_county_fresh_media_20261002 import Api, API

sys.stdout.reconfigure(encoding='utf-8')
MODEL = 'bytedance/seedance-2.5/reference-to-video'
STYLE = 'chinese-3d-aesthetics'
PROPS = [
    ('药发木偶完整花树', '完整花树-原片帧.png', '同一座药发木偶花树的整体结构参考。固定主竿、底座、上下方形笼架、分层圆轮、挑杆、四个悬挂小戏台、中部双红圆饰、下部红色挂饰与顶端凤凰保持连接和比例；材料采用成熟国漫电影CG的竹木、彩绘与纸饰，具体光色按导演稿。原图仅用于器物形制，不复制黄色演示圆球、背景、字幕或科普标注。'),
    ('同一花树悬挂戏台细节', '悬挂戏台-原片帧.png', '同一座花树的细节补充，不是第二座装置。红金顶盖、细悬线、金色底盘与西游题材彩绘小木偶属于悬挂戏台，始终连接；木偶具有手工微缩木雕比例、衣纹雕刻和彩绘表面，有限关节运动，不变成真人。原图的平涂塑料光泽、文字、黄色圆球和白底不继承。'),
]
SOURCE = '一座固定药发木偶花树在夜间古建院落表演。结构沿用原片的主竿、分层轮架、四座悬挂小戏台和顶部凤凰。轮架分层启动，彩绘小木偶作有限机械动作，暖金花火沿轮架形成弧线并下落成雨，随后火花减弱，烟变薄，装置保持完整。全段无对白。启动顺序与有限关节表演是本次新设计，参考片不能证明各层的精确转速。'
PROMPT = '''制作一段全新的成熟国漫三维电影CG药发木偶燃放表演，竖屏构图。@image1锁定同一座完整花树的层级、比例与连接关系，@image2补充这座花树悬挂小戏台中的西游题材彩绘小木偶与悬线细节，不能把两张参考理解成两座花树。@video1提供同一装置的展示、机位变化和可见粒子运动参考；本片在此基础上设计分层启动与有限机械表演。画面采用雕塑感、材料可辨的成熟国漫电影CG；小角色仍是有彩绘木雕表面的手工微缩木偶，猴形角色保留猴形木雕、僧人木偶保留袈裟造型，不能变成真人、巨大人形或现代儿童玩具。不复制原片黄色演示圆球、科普字幕、水印、白色背景和旁白。

花树是一座固定竖直竹木装置：主竿扎在方形底座上，上部两层方形围栏架、中下部多层圆形轮架、横向挑杆、四座悬挂小戏台、中部一对红色圆形装饰、下部两组红色挂饰与顶端彩绘凤凰按整体参考排列。圆环有固定轴心、挑杆有接头，戏台有红金顶盖、细线与承托底盘，木偶脚部位于底盘上，凤凰固定在顶部支点。所有层架保持同一数量与相对高度，主竿不随轮架转动。竹节与旧木纤维适度可见，暗朱红彩绘、少量金色线饰、纸饰边缘与细悬线分别呈现不同粗糙度，接触处有阴影，避免整架泛塑料光泽。成熟质感来自木雕体积、受控彩绘反光、可信光向和景深，保留手工木偶的尺度与身份。

起始以略低机位建立完整花树，从地面底座到顶部凤凰均在画内。院落远处只有低矮灰瓦檐口和几盏模糊暖灯，夜空深蓝，冷环境光托住竹木轮廓，花树与背景分开。摄影机缓慢侧移，轮架之间的遮挡随视差变化，底座稳稳接触地面。较低的一层圆轮先在已建立的轮缘位置亮起几处小光点，轮架绕自身轴心逐渐转动；短促暖金火流从该层轮缘沿切线扫出，光迹随轮架运动划成弧线。主竿、上下方形围栏架和底座始终固定，只有本层可转部件运动，不能用摄影机绕行代替一切机械动作。

顺着点亮的轮缘切到一座已建立的悬挂戏台中景，上盖、细悬线、底盘与其中木偶同时清楚可见。台中彩绘猴形小木偶在自身小关节幅度内抬臂、偏头，再收回到脚踩底盘的姿态；僧人木偶仅轻微侧身。底盘有很小的滞后摆动，悬线保持张力与连接，不变长、不穿过身体、不凭空断开。邻近一层圆轮在前一层亮起之后接续转动并点亮，两层的相位不同；火光沿木雕脸部、红金顶盖和衣纹跳动，明暗变化来自画中实际发光部位。镜头承接同一侧视方向，小戏台和木偶的身份、数量、位置连续，不因切镜换成新演员。

回到侧面中远景并平稳抬高，完整花树重新入画。已有亮点沿分层轮缘接续发出金色光流，局部源头有短暂白亮核心，离开源头后分裂成大小有别的橙金花星。较亮粒子拖出短弧线，细小粒子散开后渐暗，重力使轨迹向下弯，火花雨从装置周围下落，近处稀疏亮点与远处细密火星形成空间层次。烟从轮缘发光部位出现，淡灰薄烟被暖光透亮并统一飘向画面右上方；烟向上、火星向下，不能把二者做成同一片发光雾。局部瞬间亮度提升但不烧白整幅画面，木偶、小戏台和圆环仍可辨认。中部双红圆饰和下部挂饰保持原有位置，顶部凤凰只被下方火光照亮并在固定支点上轻微振动，不能离架飞走。燃放是装置表演，花树不爆炸、不融化、不散架，不添加真实人物奔跑。

结尾火流由密到疏，已转动轮架逐渐减速，小戏台轻摆后趋于平稳，余星在下落过程中熄灭。镜头稳在完整花树全景，薄烟散去，主竿、原有轮层、四座小戏台、红色挂饰和凤凰保留起始形制，结束时仍能看清木雕和彩绘。声音从夜间微风与轻微木架摩擦进入来自轮缘的连续嘶声，穿插少量清脆噼啪，光流减弱后声量随之回落并留下短余响。没有对白、解说、歌曲或口型，不继承参考视频旁白。'''


def save(name, data):
    (OUT / f'{name}.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def read(name):
    return json.loads((OUT / f'{name}.json').read_text(encoding='utf-8'))


def client():
    api = Api()
    api.login()
    return api


def operation(api, name, path, body=None, params=None, method='POST', file=None):
    if (OUT / f'{name}.json').exists():
        record = read(name)
        if record['state'] == 'acknowledged':
            return record['result']
        raise RuntimeError(f'{name}结果未知，先核对服务端，禁止自动重提')
    record = {'state': 'submitting', 'path': path, 'method': method, 'submittedAt': time.time()}
    if file:
        record.update(file=file.name, sha256=hashlib.sha256(file.read_bytes()).hexdigest())
    save(name, record)
    try:
        if file:
            with file.open('rb') as stream:
                mime = 'image/png' if file.suffix == '.png' else 'video/mp4'
                result = api.call(method, path, params=params, files={'file': (file.name, stream, mime)}, timeout=210)
        else:
            result = api.call(method, path, json=body, params=params, timeout=210)
    except Exception as error:
        record.update(state='unknown', error=str(error))
        save(name, record)
        raise
    record.update(state='acknowledged', result=result)
    save(name, record)
    return result


def prepare():
    api = client()
    style = api.call('GET', f'/short-drama/skills/{STYLE}')
    assert style['enabled'] and style['artStyle'] == 'chinese-3d'
    save('selected-aesthetic', style)
    models = api.call('GET', '/system/model/modelList', params={'category': 'video', 'providerCode': 'atlas'})
    # The user-facing model catalogue contains configured choices, not the
    # admin-only modelEnabled field. Submission also validates the model live.
    assert any(m['modelName'] == MODEL for m in models)
    pid = operation(api, 'create-project', '/short-drama/project', {
        'projectName': '药发木偶 · 花树夜戏｜国漫燃放候选', 'description': SOURCE,
        'originalIdea': SOURCE, 'artStyle': style['artStyle'],
        'aestheticSkillName': STYLE, 'composeAspectRatio': '9:16',
    })
    script = operation(api, 'create-script', '/short-drama/script', {
        'projectId': pid, 'scriptName': '花树夜戏 · 燃放表演',
        'scriptText': '第1场 外景／古建院落／夜\n' + SOURCE,
        'outlineText': SOURCE, 'tone': '成熟国漫电影CG，手工微缩木偶，结构稳定、光源和动作因果清楚',
        'sourceType': 'manual', 'creationMode': 'manual',
    })
    created = operation(api, 'create-shot', f'/short-drama/storyboard/add?projectId={pid}&scriptId={script["id"]}')
    actual = api.call('GET', f'/short-drama/{pid}')
    shot = next(s for s in actual['storyboards'] if str(s['id']) == str(created['id']))
    assert not shot.get('videoId') and not shot.get('videoUrl'), '已有媒体，必须保留'
    assert not shot.get('videoPrompt') or shot['videoPrompt'] == PROMPT, '导演稿已有用户编辑'
    continuity = {
        'video_model': MODEL, 'video_resolution': '720p', 'video_seconds': -1,
        'video_reference_mode': 'multi_shot', 'video_use_start_frame': False,
        'video_reference_include_location': False, 'present_characters': [],
        'visible_props': [p[0] for p in PROPS],
        'start_state': '完整花树固定在院落，尚未形成火花雨，所有戏台与凤凰保持连接',
        'end_state': '余星熄灭，烟变薄，花树完整，木偶与四座戏台仍可辨认',
        'timing': {'spoken_text': '', 'action_seconds': 15, 'pause_seconds': 0,
            'pacing_note': '整体建立与侧移并行，单层启动，戏台有限关节表演，邻层接续，整体火花雨，减弱与保留结构；规划约15秒，不冒充原片精确时序。'},
        'generation_authorized': True,
    }
    shot.update(sceneTitle='花树夜戏 · 分层启动与金色火花雨', sourceText=SOURCE,
        videoPrompt=PROMPT, durationSeconds=15, charactersJson='[]', locationName='夜间古建院落',
        sceneType='action', continuityJson=json.dumps(continuity, ensure_ascii=False))
    operation(api, 'review-draft', f'/short-drama/{pid}/revision', {
        'scriptId': script['id'], 'expectedScriptText': actual['script']['scriptText'],
        'scriptText': actual['script']['scriptText'],
        'revisionNotes': '用户已选择先做燃放表演、成熟国漫电影风。独立新项目，只制作一个视频候选，不生成首帧、配乐或额外图片；原项目与原视频保留。',
        'storyboards': [shot],
    })
    for index, (title, filename, prop_prompt) in enumerate(PROPS, 1):
        image_url = operation(api, f'upload-image-{index}', '/short-drama/image/upload-reference',
            params={'model': MODEL}, file=OUT / filename)
        assert isinstance(image_url, str) and image_url.startswith('https://')
        operation(api, f'save-prop-{index}', f'/short-drama/{pid}/visual-assets/prop',
            {'title': title, 'prompt': prop_prompt, 'shotNumbers': [shot['sceneNo']], 'imageUrl': image_url})
    clip = operation(api, 'upload-motion-reference', f'/short-drama/{pid}/video-references',
        file=OUT / '燃放动作参考-118-133s.mp4')
    assert abs(clip['duration'] - 15) < .1
    actual = api.call('GET', f'/short-drama/{pid}')
    shot = next(s for s in actual['storyboards'] if str(s['id']) == str(created['id']))
    continuity = json.loads(shot['continuityJson'])
    continuity['video_reference_ids'] = [clip['id']]
    shot['continuityJson'] = json.dumps(continuity, ensure_ascii=False)
    operation(api, 'bind-reference', '/short-drama/storyboard', shot)
    actual = api.call('GET', f'/short-drama/{pid}')
    assets = api.call('GET', f'/short-drama/{pid}/visual-assets')
    save('prepared-project', actual)
    save('prepared-assets', assets)
    assert actual['project']['aestheticSkillName'] == STYLE
    final_shot = next(s for s in actual['storyboards'] if str(s['id']) == str(created['id']))
    assert final_shot['videoPrompt'] == PROMPT
    final_continuity = json.loads(final_shot['continuityJson'])
    assert final_continuity['video_reference_ids'] == [clip['id']]
    assert final_continuity['visible_props'] == [p[0] for p in PROPS]
    ready = sorted([a for a in assets['assets'] if a['kind'] == 'prop' and a['title'] in final_continuity['visible_props']], key=lambda a: int(a['id']))
    assert [a['title'] for a in ready] == [p[0] for p in PROPS]
    assert all(a['status'] == 'done' and a['imageUrl'] for a in ready)
    if not (OUT / 'plan.json').exists():
        save('plan', {'projectId': str(pid), 'scriptId': str(script['id']), 'storyboardId': str(created['id']),
            'model': MODEL, 'requestId': str(uuid.uuid4()), 'aestheticSkillName': STYLE,
            'aestheticVersion': style['version'], 'referenceId': clip['id'],
            'authorization': '用户选择先做燃放表演与成熟国漫电影风；一个视频候选，无额外生图或音乐',
            'resolution': '720p', 'aspectRatio': '9:16', 'plannedSeconds': 15, 'generationSeconds': -1})
    (OUT / '国漫燃放导演稿.txt').write_text(PROMPT, encoding='utf-8')
    print(json.dumps({'prepared': True, 'projectId': str(pid), 'storyboardId': str(created['id']),
        'imageReferences': len(ready), 'videoReferenceSeconds': clip['duration'], 'aesthetic': STYLE}, ensure_ascii=False))


def submit():
    api = client()
    plan = read('plan')
    style = api.call('GET', f'/short-drama/skills/{STYLE}')
    assert style['version'] == plan['aestheticVersion'], '审美版本变化，须重新审阅'
    actual = api.call('GET', f'/short-drama/{plan["projectId"]}')
    shot = next(s for s in actual['storyboards'] if str(s['id']) == plan['storyboardId'])
    assert shot['videoPrompt'] == PROMPT and not shot.get('videoId') and not shot.get('videoUrl')
    result = operation(api, 'video-submission', f'/short-drama/storyboard/{plan["storyboardId"]}/generate-video',
        params={'model': MODEL, 'requestId': plan['requestId'], 'regenerate': 'false'})
    receipt = api.call('GET', f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}')
    save('task-receipt', receipt)
    assert receipt.get('actualModel') == MODEL
    print(json.dumps({'status': result.get('videoStatus'), 'predictionId': result.get('videoId'),
        'actualModel': receipt.get('actualModel')}, ensure_ascii=False))


def status():
    api = client()
    plan = read('plan')
    shot = api.call('GET', f'/short-drama/storyboard/{plan["storyboardId"]}/video-result', params={'model': MODEL}, timeout=90)
    receipt = api.call('GET', f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}')
    save('latest-shot', shot)
    save('task-receipt', receipt)
    print(json.dumps({'status': shot.get('videoStatus'), 'predictionId': shot.get('videoId'),
        'error': receipt.get('error')}, ensure_ascii=False))
    if shot.get('videoStatus') != 'done':
        return
    target = OUT / '药发木偶-国漫燃放候选.mp4'
    if not target.exists():
        temporary = target.with_suffix('.part')
        with api.session.get(API + '/media/content', params={'model': receipt['actualModel'],
            'predictionId': shot['videoId']}, stream=True, timeout=(25, 180)) as response:
            response.raise_for_status()
            with temporary.open('wb') as stream:
                for chunk in response.iter_content(1024 * 1024):
                    stream.write(chunk)
        with temporary.open('rb') as stream:
            magic = stream.read(16)
        if magic[4:8] != b'ftyp':
            save('download-diagnostic', {'mediaDownloadValid': False, 'bytes': temporary.stat().st_size,
                'note': '媒体代理尚未返回MP4；仅可重读下载，不重新生成'})
            raise RuntimeError('本次下载不是MP4，保留诊断，可再次读取既有媒体')
        temporary.replace(target)
    metadata = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries',
        'format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate', '-of', 'json', str(target)], encoding='utf-8'))
    subprocess.run(['ffmpeg', '-v', 'error', '-i', str(target), '-f', 'null', '-'], check=True)
    save('video-metadata', metadata)
    save('completed-project', api.call('GET', f'/short-drama/{plan["projectId"]}'))
    print(json.dumps(metadata, ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['prepare', 'submit', 'status'])
    args = parser.parse_args()
    globals()[args.action]()
