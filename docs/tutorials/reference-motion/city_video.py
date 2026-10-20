"""Create one editable city defence demonstration and submit one video candidate."""
import argparse,json,sys,time,uuid,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'output/city-defense';OUT.mkdir(exist_ok=True,parents=True)
sys.path.insert(0,str(ROOT/'logs'))
from produce_county_fresh_media_20261002 import Api,API
sys.stdout.reconfigure(encoding='utf-8')
MODEL='bytedance/seedance-2.0-mini/reference-to-video'
SOURCE='土匪架炮攻城，两名官军在城墙上守卫。土匪炮手完成准备后退开，大炮朝城门上方轰出一炮。炮弹命中门洞上方的砖墙，砖块崩裂飞落，门楼下方留下明显破口，灰尘向外翻卷。守军伏身躲避，两名土匪沿炮架两侧向城门推进。全段无对白。'
PROMPT='''以成熟国漫半写实三维电影CG制作一段土匪炮轰城门的攻城动作演示。@video1提供双方身份位置、炮口朝向、准备动作、炮身后坐、城墙受击和摄影机运动。褐色白模对应城外攻城的两名土匪，蓝色白模对应城墙上守城的两名官军。人物塑造成成年东方男性，正常长四肢与可信重心，成年眉弓、眼窝、鼻梁和下颌转折清楚，眼睑、虹膜与唇线可读，发束分层，皮肤有经美术控制的柔和高光与冷暖体积，呈现雕塑感国漫角色。
始终只有两名官军和两名土匪参与本次动作。两名官军分别站在门洞两侧的城墙垛口，穿朱红内衬、冷灰铁片甲、暗色束腿裤与布靴，护腰革带固定清楚，头戴简洁铁盔。城外两名土匪分别穿赭褐与灰褐短衣、布头巾和扎腰护腕，炮手精瘦，指挥者肩背较宽，面形有区别。角色保持自己的衣装和阵营，棉麻、旧皮、铁器与木材有不同粗糙度，布料在肩肘腰膝的张力随动作改变。
起始构图为城外斜侧全景，近处土匪与木轮铁炮、远处城门和墙上官军同框。暖灰砖城墙有灰瓦城门楼，砖缝、厚墙和门洞空间清楚，最初门洞上方墙体完整。炮口始终向内瞄准门洞上方的砖墙。地面是夯土和碎石，斜后方日光勾出铁器和烟尘，天空柔光让暗侧仍可读。摄影机从侧面缓慢靠近，开炮和命中时稳住同一机位，让观众同时看见炮口与城墙受击点。
土匪指挥者看向城门抬手示意，炮手在炮架侧边俯身伸手完成准备，随后收手退半步。炮口爆出短促橙黄火光和浓灰白烟，炮架随冲击明显向后震动，木轮贴地滚动少许后停住，炮身与炮架保持连接。一道短暂炮弹运动轨迹沿炮口朝城门方向掠过，随即击中门洞上方的砖墙。命中点突然迸开，砖缝从中心开裂，大片外层砖石被掀起，大小碎砖先向城外飞出再落下，门洞上缘一部分墙砖塌落。冲击扬起的黄灰粉尘从墙体向外翻卷，与近处炮烟在空间上分开；受击处留下能看见后方暗处的真实缺口、锯齿状断砖边缘和地面碎石堆。破坏来自炮弹命中，不能用炮口冒烟代替墙体破坏，也不能把命中点改到地面。
两名守城官军在受击后迅速伏身缩到两侧垛口后，手臂遮挡飞尘，落石从两人之间向下坠落。土匪从后坐的炮架旁重新站稳，再沿炮架左右两侧向城门推进几步，始终与城门保持合理空间和尺寸。烟尘逐渐变薄，末帧必须清楚看见城门上缘仍有明显破口、裸露断面、地面新落碎砖和保持守位的官军，受损城墙不会恢复完好，炮架仍留在城外。
全段无对白。声音从布料、甲片与轮架轻响推进到一记近处沉重炮响，短暂间隔后传来远处城门砖石爆裂的闷响，碎砖陆续落地，墙间余声、扬尘与急促脚步接续。炮响先于命中，受击先于守军伏身和土匪推进。人物动作与接触阴影连贯，白模只提供空间和时序，不继承球形关节、方块人体或白模材质。'''

def read(name):return json.loads((OUT/f'{name}.json').read_text(encoding='utf-8'))
def save(name,data):(OUT/f'{name}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
def client():
    api=Api();api.login();return api
def operation(api,name,path,body=None,params=None,method='POST'):
    target=OUT/f'{name}.json'
    if target.exists():
        record=read(name)
        if record['state']=='acknowledged':return record['result']
        raise RuntimeError(f'{name}结果未知，请核对原记录，不能自动重发')
    record={'state':'submitting','path':path,'method':method,'submittedAt':time.time()};save(name,record)
    try:result=api.call(method,path,json=body,params=params,timeout=210)
    except Exception as error:record.update(state='unknown',error=str(error));save(name,record);raise
    record.update(state='acknowledged',result=result);save(name,record);return result

def prepare():
    api=client();options=api.call('GET','/short-drama/skills',params={'type':'aesthetic'});save('aesthetic-options',options)
    style=next(s for s in options if s['enabled'] and '国风半写实' in s['title'])
    detail=api.call('GET',f'/short-drama/skills/{style["name"]}');save('aesthetic-selected',detail)
    models=api.call('GET','/system/model/modelList',params={'category':'video','providerCode':'atlas'})
    assert any(m['modelName']==MODEL for m in models),'当前模型目录中没有已选参考视频模型'
    pid=operation(api,'create-project','/short-drama/project',{'projectName':'土匪炮轰城门｜国漫攻城演示','description':SOURCE,'originalIdea':SOURCE,'artStyle':style.get('artStyle') or '', 'aestheticSkillName':style['name'],'composeAspectRatio':'16:9'})
    script=operation(api,'create-script','/short-drama/script',{'projectId':pid,'scriptName':'城门前的一炮','scriptText':'第1场 外景／城门空地／日\n'+SOURCE,'outlineText':SOURCE,'tone':'动作因果清楚，双方空间明确，国漫CG演示','sourceType':'manual','creationMode':'manual'})
    created=operation(api,'create-shot',f'/short-drama/storyboard/add?projectId={pid}&scriptId={script["id"]}')
    actual=api.call('GET',f'/short-drama/{pid}')
    shot=next(s for s in actual['storyboards'] if str(s['id'])==str(created['id']))
    assert not shot.get('videoId') and not shot.get('videoUrl'),'已有媒体，不能覆盖'
    assert not shot.get('videoPrompt') or shot['videoPrompt']==PROMPT,'导演稿已被编辑，请先合并'
    continuity={'video_model':MODEL,'video_resolution':'720p','video_seconds':-1,'video_use_start_frame':False,'present_characters':['土匪炮手','土匪指挥者','左城墙官军','右城墙官军'],'visible_props':[],
        'start_state':'两土匪在城外架炮，炮口朝完整城门上缘；两官军守住两侧城墙','end_state':'城门上缘破口和地面碎砖持续可见，官军留在垛口后，土匪推进',
        'timing':{'spoken_text':'','action_seconds':12,'pause_seconds':0,'pacing_note':'建立攻守位置、炮手准备、开炮后坐、命中砖墙碎裂、官军伏身、土匪推进；摄影机与动作并行。'},'generation_authorized':True}
    shot.update(sceneTitle='土匪炮轰城门 · 命中、破口、守军伏身',sourceText=SOURCE,videoPrompt=PROMPT,durationSeconds=12,charactersJson='[]',locationName='城门外空地',sceneType='action',continuityJson=json.dumps(continuity,ensure_ascii=False))
    review_name='review-draft'
    if (OUT/'review-draft.json').exists() and read('review-draft')['state']=='unknown':
        # The first response rejected a stale timestamp after draft insertion. Read
        # current text before a new review; retain the failed journal for audit.
        save('revision-reconciliation',{'projectId':str(pid),'shotId':str(shot['id']),'currentUpdateTime':shot['updateTime'],'unchangedDraft':not actual['storyboards'][0].get('videoPrompt'),'originalJournal':'review-draft.json'})
        review_name='review-draft-reconciled'
    result=operation(api,review_name,f'/short-drama/{pid}/revision',{'scriptId':script['id'],'expectedScriptText':script['scriptText'],'scriptText':script['scriptText'],'revisionNotes':'制作独立国漫动作演示，保留所有原项目与原媒体。','storyboards':[shot]})
    save('reviewed-project',result)
    actual=api.call('GET',f'/short-drama/{pid}');save('project-readback',actual)
    project=actual.get('project') or actual
    assert project.get('aestheticSkillName')==style['name'],'项目审美绑定回读不一致'
    if not (OUT/'plan.json').exists():save('plan',{'projectId':str(pid),'scriptId':str(script['id']),'storyboardId':str(shot['id']),'model':MODEL,'requestId':str(uuid.uuid4()),'directorId':'n-'+str(uuid.uuid4()),'aestheticSkillName':style['name'],'aestheticVersion':detail['version']})
    (OUT/'导演稿.txt').write_text(PROMPT,encoding='utf-8');print(json.dumps(read('plan'),ensure_ascii=False))

def director():
    api=client();plan=read('plan');pid=plan['projectId'];node=plan['directorId']
    doc=json.loads((OUT/'土匪炮轰城门-导演工程.json').read_text(encoding='utf-8'))
    existing=api.call('GET',f'/short-drama/{pid}/director/{node}')
    if existing.get('document') is not None:
        assert existing['document']==doc,'服务端导演工程已被编辑，请保留而非覆盖'
        saved=existing
    else:saved=operation(api,'save-director-'+node,f'/short-drama/{pid}/director/{node}',{'revision':existing['revision'],'document':doc},method='PUT')
    saved=api.call('GET',f'/short-drama/{pid}/director/{node}');assert saved['document']==doc;save('director-readback',saved)
    canvas=api.call('GET',f'/short-drama/{pid}/canvas')
    document=canvas.get('document') or {'schema':1,'nodes':[],'edges':[]}
    if not any(n['id']==node for n in document['nodes']):
        document['nodes'].append({'id':node,'kind':'previs','position':{'x':470,'y':150},'data':{'title':'土匪炮轰城门 · 攻城与墙体破坏','content':'土匪操作大炮，官军守城；7秒开炮，7.5秒命中，碎砖崩落并留下破口。','prompt':'','url':'','model':'','seconds':12}})
        operation(api,'save-canvas-'+node,f'/short-drama/{pid}/canvas',{'revision':canvas['revision'],'document':document},method='PUT')
    print(json.dumps({'projectId':pid,'directorId':node,'revision':saved['revision'],'saved':True},ensure_ascii=False))

def attach():
    api=client();plan=read('plan');pid=plan['projectId']
    if (OUT/'upload-reference.json').exists():
        record=read('upload-reference')
        assert record['state']=='acknowledged','上传结果未知，请核对项目参考视频列表后再处理'
        clip=record['result']
    else:
        save('upload-reference',{'state':'submitting'})
        with (OUT/'土匪炮轰城门-白模预演.mp4').open('rb') as file:clip=api.call('POST',f'/short-drama/{pid}/video-references',files={'file':('土匪炮轰城门-白模预演.mp4',file,'video/mp4')},timeout=90)
        save('upload-reference',{'state':'acknowledged','result':clip})
    actual=api.call('GET',f'/short-drama/{pid}');shot=next(s for s in actual['storyboards'] if str(s['id'])==plan['storyboardId'])
    continuity=json.loads(shot['continuityJson']);continuity['video_reference_ids']=[clip['id']];shot['continuityJson']=json.dumps(continuity,ensure_ascii=False)
    operation(api,'bind-reference','/short-drama/storyboard',shot)
    save('before-submission',api.call('GET',f'/short-drama/{pid}'))
    print(json.dumps({'referenceSeconds':clip['duration'],'clipId':clip['id']},ensure_ascii=False))

def capture_reference():
    api=client();plan=read('plan');pid=plan['projectId']
    clips=api.call('GET',f'/short-drama/{pid}/video-references')
    matches=[c for c in clips if c['name']=='土匪炮轰城门 · 攻城与墙体破坏-白模预演.mp4']
    assert len(matches)==1,'请核对实际工作台导出的动作参考，不能猜测或重复上传'
    clip=matches[0];assert abs(clip['duration']-12)<.1
    save('upload-reference',{'state':'acknowledged','source':'director_workbench_export_and_save_button','result':clip})
    target=OUT/'土匪炮轰城门-白模预演.mp4'
    if not target.exists():
        with api.session.get(API+f'/short-drama/{pid}/video-references/{clip["id"]}/content',timeout=60) as response:
            response.raise_for_status();assert response.headers.get('Content-Type','').startswith('video/')
            target.write_bytes(response.content)
    import hashlib
    assert hashlib.sha256(target.read_bytes()).hexdigest()==clip['sha256']
    print(json.dumps({'name':clip['name'],'seconds':clip['duration'],'bytes':target.stat().st_size,'id':clip['id']},ensure_ascii=False))

def submit():
    api=client();plan=read('plan')
    current=api.call('GET',f'/short-drama/skills/{plan["aestheticSkillName"]}');assert current['version']==plan['aestheticVersion'],'审美版本已改变，请先重新审阅'
    result=operation(api,'video-submission',f'/short-drama/storyboard/{plan["storyboardId"]}/generate-video',params={'model':plan['model'],'requestId':plan['requestId'],'regenerate':'false'})
    receipt=api.call('GET',f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}');save('task-receipt',receipt)
    print(json.dumps({'status':result.get('videoStatus'),'predictionId':result.get('videoId'),'model':receipt.get('actualModel')},ensure_ascii=False))
def status():
    api=client();plan=read('plan');shot=api.call('GET',f'/short-drama/storyboard/{plan["storyboardId"]}/video-result',params={'model':plan['model']},timeout=60)
    receipt=api.call('GET',f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}');save('task-receipt',receipt);save('latest-shot',shot)
    print(json.dumps({'status':shot.get('videoStatus'),'predictionId':shot.get('videoId'),'error':receipt.get('error')},ensure_ascii=False))
    if shot.get('videoStatus')=='done':
        target=OUT/'土匪炮轰城门-国漫演示.mp4'
        if not target.exists():
            temporary=target.with_suffix('.part')
            with api.session.get(API+'/media/content',params={'model':receipt['actualModel'],'predictionId':shot['videoId']},stream=True,timeout=(20,180)) as response:
                response.raise_for_status();assert response.headers.get('Content-Type','').startswith('video/')
                with temporary.open('wb') as file:
                    for chunk in response.iter_content(1024*1024):file.write(chunk)
            assert temporary.stat().st_size;temporary.replace(target)
        metadata=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate','-of','json',str(target)],encoding='utf-8'))
        subprocess.run(['ffmpeg','-v','error','-i',str(target),'-f','null','-'],check=True);save('video-metadata',metadata)
        save('completed-project',api.call('GET',f'/short-drama/{plan["projectId"]}'));print(json.dumps(metadata))
def siege():
    api=client();plan=read('plan');pid=plan['projectId'];actual=api.call('GET',f'/short-drama/{pid}')
    shot=next(s for s in actual['storyboards'] if str(s['id'])==plan['storyboardId'])
    assert not shot.get('videoId') and not shot.get('videoUrl'),'已有成片，必须保留并另建候选'
    save('before-siege-revision',actual)
    continuity=json.loads(shot['continuityJson']);continuity.update(present_characters=['土匪炮手','土匪指挥者','左城墙官军','右城墙官军'],start_state='两土匪在城外架炮，炮口朝向完整城门上缘；两官军守住两侧城墙',end_state='城门上缘明显破口，地面碎砖；官军留在垛口后，土匪推进',timing={'spoken_text':'','action_seconds':12,'pause_seconds':0,'pacing_note':'建立攻守双方位置、炮手准备、开炮后坐、命中砖墙碎裂、官军伏身、土匪推进；损伤持续到末帧。'})
    shot.update(sceneTitle='土匪炮轰城门 · 命中、破口、守军伏身',sourceText=SOURCE,videoPrompt=PROMPT,continuityJson=json.dumps(continuity,ensure_ascii=False))
    script=actual['script'];review=operation(api,'siege-review',f'/short-drama/{pid}/revision',{'scriptId':script['id'],'expectedScriptText':script['scriptText'],'scriptText':'第1场 外景／城门外／日\n'+SOURCE,'outlineText':SOURCE,'revisionNotes':'根据用户明确修正，土匪用炮攻城，必须命中城门并呈现持续墙体破坏。原防守白模另行保留。','storyboards':[shot]})
    save('siege-reviewed-project',review)
    project=review['project'];project.update(projectName='土匪炮轰城门｜国漫攻城演示',description=SOURCE,originalIdea=SOURCE)
    operation(api,'rename-siege-project','/short-drama/project',project)
    if not (OUT/'defense-plan.json').exists():save('defense-plan',plan)
    if not (OUT/'siege-plan.json').exists():
        plan.update(directorId='n-'+str(uuid.uuid4()));save('siege-plan',plan)
    save('plan',read('siege-plan'));(OUT/'攻城导演稿.txt').write_text(PROMPT,encoding='utf-8')
    actual=api.call('GET',f'/short-drama/{pid}');save('siege-project-readback',actual)
    assert actual['project']['aestheticSkillName']==plan['aestheticSkillName'];assert actual['storyboards'][0]['videoPrompt']==PROMPT
    print(json.dumps(read('plan'),ensure_ascii=False))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('action',choices=['prepare','siege','director','capture_reference','attach','submit','status']);args=parser.parse_args();globals()[args.action]()
