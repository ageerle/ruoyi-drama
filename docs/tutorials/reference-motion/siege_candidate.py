"""Preserve the white-transfer candidate and author a separate appearance-bound siege shot."""
import argparse, hashlib, json, subprocess, sys, uuid
from pathlib import Path
from city_video import client, operation, read, save, OUT, MODEL

PROMPT = '''重新制作这场攻城为成熟国漫半写实三维动画电影。先以@image1塑造精瘦年轻的土匪炮手，以@image2塑造宽肩、胡须和浓眉的土匪指挥者，以@image3塑造左侧年轻守军的脸形与束发。角色图每张的多个视角是同一个人，最终画面每个身份只有一人。右侧守军另为三十多岁、窄长脸、有短胡茬的官军。两名官军穿朱红内衬和灰铁片甲、铁盔，褐衣土匪保持参考衣装。四人都是有清楚面孔、头发、五指、连续肌肉与衣服包裹关节的成年东方男性。表演呈现抬臂时肩膀和衣袖受力、伏身时屈髋屈膝和脚掌支撑，渲染采用国漫角色的雕塑骨相、克制皮肤高光、分层发束和清楚的棉麻皮革金属材质。
@video1是一条导演工作台的粗略动画，只参考其中空间、摄影机推进、炮手准备、炮架后坐、守军伏身和土匪推进的动作顺序。完全重建人物、城墙和烟尘的成片造型；角色从开始即使用上述角色图的成年人体和衣装。褐色占位体对应城外两名土匪，蓝色占位体对应墙上两名官军。白模的球形关节、胶囊肢体、纯色圆头、立方块碎片与圆球烟团全部换成角色图人物、不规则砖石和连续体积烟尘。
城外斜侧全景开场：一门长管铁炮固定在厚木炮架和木轮上，炮口朝城門洞上方的完整砖墙；两名土匪在炮架两侧，两名官军站在城门左右的城墙垛口。城墙是厚重暖灰砖砌，灰瓦门楼，夯土官道贴着墙基，城门上缘完整无缺。午后侧逆光照出砖缝、衣料和铁炮冷光，机位在土匪右后侧缓慢推近，保持炮口、完整城门和墙上守军同时可见。门楼和人体比例按照真实城防，守军脚下是水平墙顶。
指挥者看城门抬手示意，炮手俯身在炮架侧完成准备，收手向侧后退一步。全片只在这次准备完成后开一炮，准备期间炮口安静，城墙保持完整。炮口瞬间喷出橙黄火焰，沉重铁炮后坐带动木架和木轮向后震动，土匪站稳躲开炮架。炮弹从朝城门的炮口方向掠入门洞上缘，击中砖墙的同一处。摄影机此时稳定，让炮响、后坐和墙体受击的因果关系可见。命中引起砖缝开裂、墙皮掀起，门洞上方一整片墙砖外翻崩落，不规则大块砖石飞向城外，再在重力下落到墙脚砸起尘土。上缘剩余砖石继续滑落，露出黑暗墙体内部和锯齿形断面，形成醒目的永久破口。主要撞击发生在竖直城墙，墙脚扬尘只是碎石落地的后果。
冲击灰尘从破口向外翻涌，遮住城门片刻后逐渐变薄。两名官军看到墙体受击才伏身，缩到左右垛口后护住头颈，墙体中间塌落但左右城墙仍支撑守軍。两名土匪在炮架后坐停止后重新站稳，沿左右两侧向城门推进几步。结尾机位稍向门洞推进，清楚留下扩大且不复原的缺口、断砖裸露、门前碎砖堆和余尘，观众能够对照开场完整墙体看见这一炮的破坏力。后段没有第二次炮口闪光或第二次炮弹。
无对白和口型说话。轻风与衣甲摩擦建立现场声音，一记低沉炮响与炮口闪光同步，短暂传播间隔后响起墙砖爆裂闷响，较大的落石砸地、零碎砖石继续滚落，惊喘、脚步和尘间回声接续。全段只出现一次炮响，破口到结束一直保持，人物无血腥受伤。'''

def prepare():
    api = client(); plan = read('plan'); pid = plan['projectId']
    source = read('source-2105946267007193089')
    specs = [
        ('土匪炮手', '匪徒', '22岁', '灰褐短衣、布头巾、束腰与护腕，年轻精瘦成年男性，脸形与衣装沿既有国漫参考。'),
        ('土匪指挥者', '匪首', '38岁', '浓眉、胡须、宽肩，赭褐短袍、扎腰皮带和绑腿，脸形和服装沿既有国漫参考。'),
        ('左城墙官军', '年轻守卒', '24岁', '脸形沿既有国漫参考，穿朱红内衬和冷灰铁片甲、简洁铁盔、束腿裤与布靴。'),
        ('右城墙官军', None, '35岁', '窄长脸、短胡茬、眉眼坚实，朱红内衬、灰铁片甲、铁盔，身份与左侧守军区分。'),
    ]
    mirrors = {}; references = []
    for name, original, age, description in specs:
        url = ''
        if original:
            a = next(c for c in source['characters'] if c['name'] == original)['appearances'][0]
            url = json.loads(a['imageUrls'])[0]
            local = OUT / f'既有国漫-{original}.png'
            journal = 'siege-cg-upload-' + original
            if (OUT / f'{journal}.json').exists():
                record = read(journal)
                assert record['state'] == 'acknowledged', '上传结果未知，核对原回执后继续'
                uploaded = record['result']
            else:
                save(journal, {'state': 'submitting', 'sha256': hashlib.sha256(local.read_bytes()).hexdigest()})
                with local.open('rb') as file:
                    uploaded = api.call('POST', '/short-drama/image/upload-reference', params={'model': MODEL}, files={'file': (local.name, file, 'image/png')}, timeout=90)
                assert isinstance(uploaded, str) and uploaded.startswith('https://')
                save(journal, {'state': 'acknowledged', 'result': uploaded, 'sourceUrl': url, 'sha256': hashlib.sha256(local.read_bytes()).hexdigest()})
            mirrors[url] = uploaded
            references.append({'name': name, 'sourceName': original, 'sourceProjectId': source['project']['id'], 'sourceAppearanceId': a['id'], 'sourceImageIndex': 0, 'url': url})
        # The role level is the existing S/A/B/C/D code, not a prose label.
        operation(api, 'siege-cg-character-v2-' + name, '/short-drama/character', {'projectId': pid, 'name': name, 'gender': '男', 'ageRange': age, 'roleLevel': 'B', 'visualDescription': description, 'referenceImageUrl': url, 'introduction': '独立攻城动作演示人物，引用保留的国漫形象候选，源项目不修改。'})
    created = operation(api, 'siege-cg-shot', '/short-drama/storyboard/add', params={'projectId': pid, 'scriptId': plan['scriptId'], 'afterId': plan['storyboardId']})
    actual = api.call('GET', f'/short-drama/{pid}'); save('before-siege-cg-revision', actual)
    shot = next(s for s in actual['storyboards'] if str(s['id']) == str(created['id']))
    assert not shot.get('videoId'), '候选已提交，保留媒体'
    continuity = json.loads(actual['storyboards'][0]['continuityJson'])
    continuity.update(video_reference_mirrors=mirrors, video_use_start_frame=False, video_reference_include_location=False,
                      appearance_reference_source=references,
                      timing={'spoken_text': '', 'action_seconds': 12, 'pause_seconds': 0, 'pacing_note': '单次准备与发射；动作参考用于走位，角色图用于成人造型；开炮之后墙体破坏持续至末帧。'})
    shot.update(sceneTitle='国漫修正版 · 单炮攻城与持续破坏', videoPrompt=PROMPT, sourceText='土匪向城门开一炮，城门上缘砖墙崩落留下持续破口，两官军伏身，两土匪推进。无对白。',
                durationSeconds=12, charactersJson=json.dumps([{'name': s[0]} for s in specs], ensure_ascii=False), locationName='城门外空地', sceneType='action', continuityJson=json.dumps(continuity, ensure_ascii=False))
    script = actual['script']
    operation(api, 'siege-cg-revision', f'/short-drama/{pid}/revision', {'scriptId': script['id'], 'expectedScriptText': script['scriptText'], 'scriptText': script['scriptText'], 'revisionNotes': '用户要求攻城与成品破坏力；保留第一版视频，在独立镜头候选内绑定既有国漫角色参考，修正白模人物和重复开炮。', 'storyboards': [shot if str(s['id']) == str(shot['id']) else s for s in actual['storyboards']]})
    current = api.call('GET', f'/short-drama/{pid}'); save('siege-cg-readback', current)
    original = next(s for s in current['storyboards'] if str(s['id']) == plan['storyboardId'])
    assert original['videoId'] == '7c1525ca219b4cd5aa331846fc111432', '原视频关联变化'
    checked = next(s for s in current['storyboards'] if str(s['id']) == str(shot['id']))
    assert checked['videoPrompt'] == PROMPT
    if not (OUT / 'siege-cg-plan.json').exists():
        save('siege-cg-plan', {**plan, 'storyboardId': str(shot['id']), 'requestId': str(uuid.uuid4()), 'originalStoryboardId': plan['storyboardId']})
    (OUT / '国漫修正版导演稿.txt').write_text(PROMPT, encoding='utf-8')
    print(json.dumps({'projectId': pid, 'storyboardId': str(shot['id']), 'references': len(references), 'originalVideoPreserved': True}, ensure_ascii=False))

def submit():
    api = client(); plan = read('siege-cg-plan')
    assert api.call('GET', f'/short-drama/skills/{plan["aestheticSkillName"]}')['version'] == plan['aestheticVersion']
    result = operation(api, 'siege-cg-submission', f'/short-drama/storyboard/{plan["storyboardId"]}/generate-video', params={'model': MODEL, 'requestId': plan['requestId'], 'regenerate': 'false'})
    receipt = api.call('GET', f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}')
    save('siege-cg-receipt', receipt)
    print(json.dumps({'status': result.get('videoStatus'), 'predictionId': result.get('videoId'), 'model': receipt.get('actualModel')}, ensure_ascii=False))

def status():
    api = client(); plan = read('siege-cg-plan')
    shot = api.call('GET', f'/short-drama/storyboard/{plan["storyboardId"]}/video-result', params={'model': MODEL}, timeout=60)
    receipt = api.call('GET', f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}')
    save('siege-cg-receipt', receipt); save('siege-cg-latest-shot', shot)
    print(json.dumps({'status': shot.get('videoStatus'), 'predictionId': shot.get('videoId'), 'error': receipt.get('error')}, ensure_ascii=False))
    if shot.get('videoStatus') == 'done':
        from city_video import API
        target = OUT / '土匪炮轰城门-国漫修正版.mp4'
        if not target.exists():
            r = api.session.get(API + '/media/content', params={'model': receipt['actualModel'], 'predictionId': shot['videoId']}, timeout=180); r.raise_for_status()
            assert r.headers.get('Content-Type', '').startswith('video/')
            target.write_bytes(r.content)
        meta = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate', '-of', 'json', str(target)], encoding='utf-8'))
        subprocess.run(['ffmpeg', '-v', 'error', '-i', str(target), '-f', 'null', '-'], check=True)
        save('siege-cg-metadata', meta); save('siege-cg-completed-project', api.call('GET', f'/short-drama/{plan["projectId"]}'))
        print(json.dumps(meta))

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    p = argparse.ArgumentParser(); p.add_argument('action', choices=['prepare', 'submit', 'status'])
    globals()[p.parse_args().action]()
