"""One authorized Seedance 2.5 720p siege candidate; keep earlier media intact."""
import argparse, hashlib, json, subprocess, sys, uuid
from pathlib import Path
from city_video import client, operation, read, save, OUT, API

MODEL = 'bytedance/seedance-2.5/reference-to-video'
TITLE = '宏大攻城 · 三炮与四十人阵列'
PROMPT = '''制作一段全新的成熟国漫半写实三维电影CG攻城场面，采用16:9横屏，主事件是一门土匪主炮轰穿城门上缘、守军避险、攻城阵列抓住缺口向前压进。@Image1绑定年轻精瘦的土匪炮手，@Image2绑定浓眉、短须、宽肩的土匪指挥者，@Image3只绑定左侧年轻守军的脸形与束发；三张图的多视角分别属于同一个人，不把三视图复制成多人。守军统一灰铁片甲、暗红内衬、简洁铁盔、革带和布靴。右侧主要守军为三十多岁窄长脸、短胡茬男性，其他士兵各有不同的成年面形、体态和衣料明暗。土匪保留褐色与灰褐棉麻衣装，配扎腰、护腕、绑腿和布头巾。所有人物都是有完整五官、发束、手指、连续身体与衣料受力的成年东方角色，CG皮肤高光克制，铁甲、旧木、麻布、夯土和灰砖的材料区别清楚。
@Video1是新场面的白模动作与空间参考，提供城墙纵深、三门炮的位置、攻守队列、主炮后坐、守军伏身和攻城阵列推进的顺序。按下述导演稿建立完整国漫画面，白模的球形关节、胶囊人体、方块建筑、碎块和圆球烟团全部重新塑造成上述角色、砖石建筑与体积烟尘。场面共有四十名人物：城外二十六名土匪，包括炮手、指挥者和三排各八人的推进队；墙上十四名官军，包括门洞两侧的主要守军和分散在两翼垛口的十二名守卒。人物数量和空间纵深在开场可辨，核心动作仍由主炮、炮手和指挥者承担。
镜头一从攻城队列右后方略高的大全景缓慢下降前推，建立前中后景：前景三排土匪持长矛和短刀等待，棕褐布旗在风中拍动；中景中央一门长管铁炮与左右两门待命炮排开，厚木炮架、轮毂和金属箍带连接清楚；远景高大的砖城门、两翼延伸的城墙和城内连续灰瓦屋顶。城门高墙接近八米，门楼抬至两层楼高，门洞上缘完整、砖缝密实，两翼垛口上的官军分布有间隔。暖色斜逆光勾出旗帜、甲片和城墙边缘，天空冷灰补光使暗处衣装仍清楚；城内屋脊和远山只承担纵深，不抢城门的受击中心。指挥者转头确认炮手准备，收回视线朝城门果断抬手；炮手从炮架侧收手、收身、退到轮架之外。等待队列微调握矛与脚下重心，准备阶段主炮无火焰，城墙保持完整。
镜头二沿原轴线切到主炮右侧的低位中全景，主炮在近处，瞄准的城门上缘在画面后方，土匪身体不挡炮口。只有中央主炮发射一炮，两翼炮一直待命。炮口先出现紧凑的白热亮核，外缘翻出短促橙红火舌，细小灼亮火星随气流喷出、迅速熄灭；炮膛推出一团高密度灰白烟，烟在炮口前挤成翻滚的锥体，再被风拉向侧上方。喷焰短暂照亮铁炮边缘、轮架和炮手衣袖。炮身与木架一起猛然后坐，木轮贴着地面短滚，轮下扬起两道低矮土尘，炮架被重量压住后晃动停止，铁炮和木架始终连接。炮手下沉重心抵住地面，指挥者眯眼收肩，邻近队列在看到喷焰后缩颈伏低。摄影机仅有一次与炮响同步的短震，随即稳住；弹丸掠向城门，只呈一瞬的暗色高速形体与极短烟迹，运动方向连接炮口和门洞上缘。
视线顺着炮弹立即接到城门的中远景。受击点必须在门洞上方的竖直砖墙中央，先是一个小而急的灰白粉尘喷口与暗红短闪，接着中心砖块向内压碎，周边砖缝从命中点沿横向和斜向迅速裂开。裂缝所经过的灰浆像细雾一样喷出，表层砖片同时掀起；靠近命中点的碎片速度快、尺寸小，飞向城外，稍远的大块砖石迟半拍脱离原墙体，带着转动向外倾倒。砖块的前后表面、断裂面和受光方向连续可辨，从墙上同一位置剥离后继续飞行，不能在半空凭空换成新石块。门洞上缘被打穿一个能看见内部暗处的孔口，拱顶失去支撑后连同上方一小段垛口连续坍落，细碎石屑从大块之间洒出。外侧砖墙的脱落层、较暗的墙芯、错开的裂缝和残存锯齿断面同时可见，破坏集中在中央门洞与上缘，两侧高墙仍站立。
镜头三在同一轴线保持能看见破口与土匪前排的全景，坍塌顺着受击紧接发生，不让人物站着等墙体自己倒。近处大块断砖越过门洞边缘后加速坠落，砸在墙脚和官道上，首次重击扬起贴地扩散的黄灰尘幕；余下碎砖弹跳、碰撞、滚动，墙芯小石子继续从裸露断面落下。烟尘分成三层：受击处向外推开的高密度灰白粉尘、沿墙脚横向卷开的重尘、被日光透亮的上升薄尘；炮口烟留在城外近处，与城门扬尘分开，远处建筑和人物按实际距离被遮挡。碎石越落越少，薄尘逐渐显出至少跨越一段门洞上缘的真实缺口与新堆起的断砖，损坏保持到末帧，不恢复完整拱门。
门洞两侧官军在砖缝炸开后立刻伏身缩到未损坏的垛口后，以前臂护住头颈，远处两翼守军按看见坍塌的先后压低身体；士兵脚下有墙顶支撑，不站在悬空残砖上。主炮停止后坐后，指挥者向缺口挥臂压进，炮手绕过炮架，前排土匪先起身迈步，后两排依次跟上，衣摆、旗帜和长矛随跑动有重量，人物不瞬间挪位。摄影机随前排向前推进少许，最终让满幅城防、中央新破口、墙脚碎砖和两侧推进队列同时成立。末帧仍有落尘与零星碎石，观众可直接对照开场完整城门判断这一炮的破坏力。
无对白。开场是旗布拍动、风声、握矛与衣甲轻响，主炮发射时是一记近处沉重低频炮响与短促高频爆裂声；经过极短传播间隔，城门命中传来压实的砸击与墙芯断裂闷响，砖片脆裂、大块石材落地、碎石滚动按各自画面动作连续接续。余响从高墙之间返回，守军惊喘与攻城队列的密集脚步在落石声减弱后进入。只有一次炮响，不加旁白、人物台词、血腥受伤、字幕或水印。'''

def prepare():
    api=client();base=read('siege-cg-plan');pid=base['projectId']
    assert any(m['modelName']==MODEL for m in api.call('GET','/system/model/modelList',params={'category':'video','providerCode':'atlas'}))
    detail=api.call('GET',f'/short-drama/skills/{base["aestheticSkillName"]}');save('grand25-aesthetic',detail)
    current=api.call('GET',f'/short-drama/{pid}');save('grand25-before',current)
    assert current['project']['aestheticSkillName']==base['aestheticSkillName']
    if not (OUT/'grand25-plan.json').exists():
        save('grand25-plan',{**base,'model':MODEL,'requestId':str(uuid.uuid4()),'directorId':'n-'+str(uuid.uuid4()),'aestheticVersion':detail['version'],'previousStoryboardId':base['storyboardId'],'storyboardId':None})
    plan=read('grand25-plan');doc=json.loads((OUT/'宏大攻城-导演工程.json').read_text(encoding='utf-8'))
    state=api.call('GET',f'/short-drama/{pid}/director/{plan["directorId"]}')
    if state.get('document') is None:
        operation(api,'grand25-save-director',f'/short-drama/{pid}/director/{plan["directorId"]}',{'revision':state['revision'],'document':doc},method='PUT')
    else:assert state['document']==doc,'工程已被编辑，保留实际工程'
    stored=api.call('GET',f'/short-drama/{pid}/director/{plan["directorId"]}');assert stored['document']==doc;save('grand25-director-readback',stored)
    canvas=api.call('GET',f'/short-drama/{pid}/canvas');document=canvas['document']
    if not any(n['id']==plan['directorId'] for n in document['nodes']):
        document['nodes'].append({'id':plan['directorId'],'kind':'previs','position':{'x':880,'y':150},'data':{'title':TITLE,'content':'51个可编辑对象，40名人物、3门炮、城墙两翼与城内纵深；主炮5秒发射。','prompt':'','url':'','model':'','seconds':12}})
        operation(api,'grand25-save-canvas',f'/short-drama/{pid}/canvas',{'revision':canvas['revision'],'document':document},method='PUT')
    (OUT/'2.5宏大攻城-导演稿.txt').write_text(PROMPT,encoding='utf-8')
    print(json.dumps({'projectId':pid,'directorId':plan['directorId'],'objects':len(doc['objects']),'model':MODEL,'resolution':'720p'},ensure_ascii=False))

def bind():
    api=client();plan=read('grand25-plan');pid=plan['projectId']
    matches=[c for c in api.call('GET',f'/short-drama/{pid}/video-references') if c['name']==TITLE+'-白模预演.mp4']
    assert len(matches)==1,'先从宏大攻城工作台导出并保存动作参考，不重复上传'
    clip=matches[0];save('grand25-reference',clip);assert abs(clip['duration']-12)<.1
    target=OUT/'宏大攻城-白模预演.mp4'
    if not target.exists():
        r=api.session.get(API+f'/short-drama/{pid}/video-references/{clip["id"]}/content',timeout=90);r.raise_for_status();target.write_bytes(r.content)
    assert hashlib.sha256(target.read_bytes()).hexdigest()==clip['sha256']
    mirrors={}
    for name in ['匪徒','匪首','年轻守卒']:
        original=read('siege-cg-upload-'+name);file=OUT/f'既有国漫-{name}.png';journal='grand25-upload-'+name
        assert hashlib.sha256(file.read_bytes()).hexdigest()==original['sha256'],'角色参考文件变化'
        if (OUT/f'{journal}.json').exists():
            record=read(journal);assert record['state']=='acknowledged','上传结果未知，保留并核对';uploaded=record['result']
        else:
            save(journal,{'state':'submitting','sha256':original['sha256']})
            with file.open('rb') as f:uploaded=api.call('POST','/short-drama/image/upload-reference',params={'model':MODEL},files={'file':(file.name,f,'image/png')},timeout=90)
            assert isinstance(uploaded,str) and uploaded.startswith('https://')
            save(journal,{'state':'acknowledged','result':uploaded,'sourceUrl':original['sourceUrl'],'sha256':original['sha256']})
        mirrors[original['sourceUrl']]=uploaded
    created=operation(api,'grand25-create-shot','/short-drama/storyboard/add',params={'projectId':pid,'scriptId':plan['scriptId'],'afterId':plan['previousStoryboardId']})
    current=api.call('GET',f'/short-drama/{pid}');save('grand25-before-revision',current)
    old=next(s for s in current['storyboards'] if str(s['id'])==plan['previousStoryboardId']);shot=next(s for s in current['storyboards'] if str(s['id'])==str(created['id']))
    assert not shot.get('videoId'),'新候选已提交，保留其媒体'
    c=json.loads(old['continuityJson']);c.update(video_model=MODEL,video_resolution='720p',video_seconds=-1,video_use_start_frame=False,video_reference_ids=[clip['id']],video_reference_mirrors=mirrors,
      start_state='完整城门、两翼城墙与城内纵深；城外三门炮和二十六名土匪，墙上十四名官军；只有中央主炮准备发射',
      end_state='主炮发射后，门洞上缘持续缺口与新碎砖堆清楚；十四名守军留在两侧完好的墙顶避险，土匪三排队列向缺口压进',
      timing={'spoken_text':'','action_seconds':12,'pause_seconds':0,'pacing_note':'大全景建立城防与炮阵；主炮准备、一次发射与后坐；紧接命中、裂缝、拱顶坍塌、落石和分层扬尘；前后排依次推进。机位运动并行，无待机空等。'},
      extras={'attackers':24,'defenders':12,'principalAttackers':2,'principalDefenders':2},generation_authorized=True)
    shot.update(sceneTitle='2.5宏大攻城 · 裂墙、崩砖、尘浪与推进',videoPrompt=PROMPT,sourceText='土匪炮阵以中央主炮向城门打一炮，门洞上缘由受击开裂迅速发展为局部坍塌。守军伏身，两翼城防仍在，土匪三排队列抓住缺口推进。无对白。',durationSeconds=12,charactersJson=old['charactersJson'],locationName='城门外炮阵与城墙防线',sceneType='action',continuityJson=json.dumps(c,ensure_ascii=False))
    script=current['script']
    operation(api,'grand25-review',f'/short-drama/{pid}/revision',{'scriptId':script['id'],'expectedScriptText':script['scriptText'],'scriptText':script['scriptText'],'revisionNotes':'用户明确要求特效更具体、场面宏大，按指定Seedance 2.5与720p制作一次新候选；以新白模扩大城防与40人阵列，原两镜与媒体保留。','storyboards':[shot if str(s['id'])==str(shot['id']) else s for s in current['storyboards']]})
    actual=api.call('GET',f'/short-drama/{pid}');save('grand25-readback',actual)
    for s in current['storyboards']:
        if s.get('videoId'):
            a=next(x for x in actual['storyboards'] if str(x['id'])==str(s['id']));assert a['videoId']==s['videoId'] and a['videoUrl']==s['videoUrl']
    saved=next(s for s in actual['storyboards'] if str(s['id'])==str(shot['id']));assert saved['videoPrompt']==PROMPT and json.loads(saved['continuityJson'])['video_model']==MODEL
    plan['storyboardId']=str(shot['id']);save('grand25-plan',plan)
    print(json.dumps({'storyboardId':plan['storyboardId'],'model':MODEL,'resolution':'720p','referenceId':clip['id'],'previousVideosPreserved':True},ensure_ascii=False))

def submit():
    api=client();plan=read('grand25-plan');assert plan['storyboardId']
    assert api.call('GET',f'/short-drama/skills/{plan["aestheticSkillName"]}')['version']==plan['aestheticVersion']
    result=operation(api,'grand25-submit',f'/short-drama/storyboard/{plan["storyboardId"]}/generate-video',params={'model':MODEL,'requestId':plan['requestId'],'regenerate':'false'})
    receipt=api.call('GET',f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}');save('grand25-receipt',receipt)
    assert receipt.get('actualModel')==MODEL
    print(json.dumps({'status':result.get('videoStatus'),'predictionId':result.get('videoId'),'actualModel':receipt.get('actualModel')},ensure_ascii=False))

def status():
    api=client();plan=read('grand25-plan')
    shot=api.call('GET',f'/short-drama/storyboard/{plan["storyboardId"]}/video-result',params={'model':MODEL},timeout=90)
    receipt=api.call('GET',f'/short-drama/storyboard/{plan["storyboardId"]}/video-submissions/{plan["requestId"]}');save('grand25-receipt',receipt);save('grand25-latest-shot',shot)
    print(json.dumps({'status':shot.get('videoStatus'),'predictionId':shot.get('videoId'),'error':receipt.get('error')},ensure_ascii=False))
    if shot.get('videoStatus')=='done':
        target=OUT/'宏大攻城-Seedance2.5-720p.mp4'
        if not target.exists():
            r=api.session.get(API+'/media/content',params={'model':receipt['actualModel'],'predictionId':shot['videoId']},timeout=180);r.raise_for_status()
            content_type=r.headers.get('Content-Type','')
            # Some gateways serve valid MP4 as application/octet-stream. Verify
            # its container signature before saving; never save JSON as video.
            valid_mp4=len(r.content)>12 and r.content[4:8]==b'ftyp'
            if not valid_mp4:
                diagnostic={'httpStatus':r.status_code,'contentType':content_type,'bytes':len(r.content)}
                if 'json' in content_type:
                    data=r.json();diagnostic.update(code=data.get('code'),message=data.get('msg') or data.get('message'))
                save('grand25-download-diagnostic',diagnostic)
                raise RuntimeError(json.dumps(diagnostic,ensure_ascii=False))
            target.write_bytes(r.content)
        meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate','-of','json',str(target)],encoding='utf-8'))
        subprocess.run(['ffmpeg','-v','error','-i',str(target),'-f','null','-'],check=True);save('grand25-metadata',meta);save('grand25-completed-project',api.call('GET',f'/short-drama/{plan["projectId"]}'));print(json.dumps(meta))

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8');p=argparse.ArgumentParser();p.add_argument('action',choices=['prepare','bind','submit','status']);globals()[p.parse_args().action]()
