"""Create a narrated tutorial from actual Edge UI checkpoints and existing film.

Browser interaction is performed separately with the Codex browser tools.
No project model/media calls occur in this script.
"""
import argparse, asyncio, hashlib, json, re, shutil, subprocess, sys, zipfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

SRC = Path(__file__).resolve().parent
ROOT = SRC.parents[2]
OUT = ROOT / 'output/flow-designer-tutorial'
VIDEO = OUT / '流程设计器-从空白画布到短剧工程.mp4'
BLUE = '#3463df'
INK = '#173058'
VOICE = 'zh-CN-YunxiNeural'
sys.stdout.reconfigure(encoding='utf-8')

# Operation checkpoints, in the same order as the narration.
SCENES = [
 ['intro'],
 ['01-create','02-blank','03-context-empty','04-template'],
 ['05-outline-open','06-outline-edit','07-script-edit','08-script-saved'],
 ['09-character','10-location','15-connected-graph'],
 ['11-voice-draft','27-voice-expanded'],
 ['13-video-direction','video-parameters'],
 ['18-connect-before','19-connect-after','video-inputs'],
 ['20-node-context','21-duplicate','22-select-all','23-group','25-group-moved','26-shortcuts'],
 ['29-saved','28-storyboard','37-example-composition'],
 ['31-example-overview','33-example-storyboard','34-example-shot','35-example-references','36-example-playback','39-example-ending'],
]

def read(p): return json.loads(Path(p).read_text('utf-8-sig'))
def save(p,obj): Path(p).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n','utf-8')
def probe(p): return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-show_chapters','-of','json',str(p)]))
def run(args):
 with (OUT/'render.log').open('ab') as f: subprocess.run(args,check=True,stdout=f,stderr=f)
def font(s,bold=False): return ImageFont.truetype('C:/Windows/Fonts/msyhbd.ttc' if bold else 'C:/Windows/Fonts/msyh.ttc',s)
def sha(p):
 with Path(p).open('rb') as f:return hashlib.file_digest(f,'sha256').hexdigest()
def sections():
 return [{'id':f'{i:02d}','title':s.split('\n',1)[0].strip(),'text':s.split('\n',1)[1].strip()} for i,s in enumerate(re.split(r'^## ',(SRC/'video-narration.md').read_text('utf-8'),flags=re.M)[1:])]

async def narrate():
 sys.path.insert(0,str(ROOT/'output/tutorial-video/vendor'))
 import edge_tts
 rows=sections()
 (OUT/'voice').mkdir(parents=True,exist_ok=True)
 for row in rows:
  audio=OUT/'voice'/f"{row['id']}.mp3";cuesfile=audio.with_suffix('.json')
  if not audio.exists() or not cuesfile.exists():
   for attempt in range(3):
    try:
     cues=[]
     comm=edge_tts.Communicate(row['text'],VOICE,rate='-3%',boundary='SentenceBoundary')
     async def request():
      with audio.open('wb') as f:
       async for c in comm.stream():
        if c['type']=='audio':f.write(c['data'])
        elif c['type'] in ['WordBoundary','SentenceBoundary']:cues.append({k:v for k,v in c.items() if k!='type'})
     await asyncio.wait_for(request(),45)
     assert cues and audio.stat().st_size>1024
     save(cuesfile,cues);break
    except Exception:
     if attempt==2:raise
     print('Retry narration '+row['id'],flush=True)
  row.update(duration=float(probe(audio)['format']['duration']),audio=str(audio))
  print(json.dumps({'chapter':row['title'],'duration':row['duration']},ensure_ascii=False),flush=True)
 save(OUT/'narration.json',rows)
 shutil.copy2(SRC/'video-narration.md',OUT/'讲解稿.md')

def wrap(text,n=27):
 pieces=[]
 for clause in re.findall(r'[^，。！？；：、]+[，。！？；：、]?',text):
  for i in range(0,len(clause),n):
   p=clause[i:i+n]
   if pieces and len(pieces[-1])+len(p)<=n:pieces[-1]+=p
   else:pieces.append(p)
 return pieces
def cues(i):
 result=[]
 for c in read(OUT/'voice'/f'{i:02d}.json'):
  a=c['offset']/1e7;span=c['duration']/1e7;parts=wrap(c['text']);size=sum(map(len,parts))
  for p in parts:
   b=a+span*len(p)/size;result.append((a,b,p));a=b
 return [(a,min(b,result[k+1][0]) if k+1<len(result) else b,t) for k,(a,b,t) in enumerate(result)]
def srtstamp(t):
 ms=round(t*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
 return f'{h:02d}:{m:02d}:{s:02d},{ms:03d}'
def assstamp(t):
 cs=round(t*100);h,cs=divmod(cs,360000);m,cs=divmod(cs,6000);s,cs=divmod(cs,100)
 return f'{h}:{m:02d}:{s:02d}.{cs:02d}'
def writeass(path,rows):
 head='''[Script Info]\nScriptType: v4.00+\nPlayResX: 1920\nPlayResY: 1080\nWrapStyle: 2\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Microsoft YaHei,34,&H00FFFFFF,&H00FFFFFF,&H00152D51,&H00152D51,0,0,0,0,100,100,0,0,3,8,0,2,70,70,26,1\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n'''
 path.write_text(head+''.join(f'Dialogue: 0,{assstamp(a)},{assstamp(b)},Default,,0,0,0,,{t}\n' for a,b,t in rows),'utf-8')

FOCUS={
 '01-create':(638,337,1062,536),
 '03-context-empty':(1086,534,1315,868),
 '06-outline-edit':(1336,210,1698,680),
 '07-script-edit':(1336,210,1698,815),
 '09-character':(1336,210,1698,815),
 '10-location':(1336,210,1698,815),
 '11-voice-draft':(1336,215,1698,815),
 '27-voice-expanded':(1336,210,1698,815),
 '13-video-direction':(1336,215,1698,815),
 'video-parameters':(1336,210,1698,800),
 'video-inputs':(1336,410,1698,800),
 '20-node-context':(1010,410,1255,850),
 '26-shortcuts':(630,328,1070,595),
 '35-example-references':(1336,215,1698,840),
}
def base(title,index):
 im=Image.new('RGB',(1920,1080),'#f2f5fc');d=ImageDraw.Draw(im)
 d.rectangle((0,0,1920,8),fill=BLUE)
 d.text((68,26),f'{index:02d}  /  {title}',font=font(36,True),fill=INK)
 d.rounded_rectangle((1430,26,1852,76),12,fill='#e7edff')
 d.text((1450,37),'预览功能 · 尚未正式发布',font=font(25),fill=BLUE)
 d.line((68,96,1852,96),fill='#dbe3f3',width=2)
 return im
def compose_frame(name,title,index,dest):
 im=base(title,index);d=ImageDraw.Draw(im)
 if name=='intro':
  d.text((96,195),'RUOYI DRAMA',font=font(27,True),fill=BLUE)
  d.text((90,272),'从空白画布',font=font(78,True),fill=INK)
  d.text((90,378),'搭建短剧工程',font=font(78,True),fill=INK)
  d.rounded_rectangle((96,532,838,630),16,fill='#e7edff')
  d.text((124,554),'流程设计器目前为预览功能',font=font(38,True),fill=BLUE)
  d.text((98,668),'尚未正式发布，界面和操作可能继续调整。',font=font(29),fill='#597094')
  d.text((98,749),'空白创建  →  节点编辑  →  连线分组  →  成品示例',font=font(28),fill=INK)
  crop=Image.open(OUT/'captures/04-template.png').convert('RGB')
  crop.thumbnail((922,662),Image.Resampling.LANCZOS)
  im.paste(crop,(935,260));d.rounded_rectangle((929,254,935+crop.width+6,260+crop.height+6),12,outline='#ccdaf4',width=3)
 else:
  ui=Image.open(OUT/'captures'/f'{name}.png').convert('RGB')
  scale=min(1784/ui.width,874/ui.height);size=(round(ui.width*scale),round(ui.height*scale))
  ui=ui.resize(size,Image.Resampling.LANCZOS);x=(1920-ui.width)//2;y=108
  im.paste(ui,(x,y));d.rectangle((x-1,y-1,x+ui.width,y+ui.height),outline='#d6e0f2',width=2)
  if name in FOCUS:
   box=FOCUS[name];d.rounded_rectangle(tuple(round(v*scale+(x if k%2==0 else y)) for k,v in enumerate(box)),12,outline=BLUE,width=4)
 d.text((72,1008),'RUOYI DRAMA  /  真实界面操作教程',font=font(19),fill='#657b9a')
 im.save(dest)

def timeline_for(i,row):
 names=SCENES[i]
 # Some UI states occur asynchronously. Prefer final observed checkpoints.
 names=[n for n in names if n=='intro' or (OUT/'captures'/f'{n}.png').exists()]
 assert names
 duration=row['duration']+1.0
 return [(n,duration/len(names)) for n in names]

def render():
 rows=read(OUT/'narration.json');(OUT/'frames').mkdir(exist_ok=True);(OUT/'clips').mkdir(exist_ok=True)
 globalcues=[];cursor=0;meta=[';FFMETADATA1'];timeline=[]
 for i,row in enumerate(rows):
  duration=row['duration']+1.0;frames=timeline_for(i,row);concat=[]
  for k,(name,span) in enumerate(frames):
   dest=OUT/'frames'/f'{i:02d}-{k:02d}.png';compose_frame(name,row['title'],i,dest)
   concat.extend([f"file '{dest.as_posix()}'",f'duration {span:.8f}'])
   timeline.append({'chapter':i,'capture':name,'start':cursor+sum(s for _,s in frames[:k]),'duration':span})
  concat.append(f"file '{dest.as_posix()}'")
  (OUT/'clips'/f'{i:02d}.txt').write_text('\n'.join(concat)+'\n','utf-8')
  writeass(OUT/'clips'/f'{i:02d}.ass',cues(i))
  dest=OUT/'clips'/f'{i:02d}.mp4'
  if not dest.exists():
   vf=f"fps=30,ass=filename='output/flow-designer-tutorial/clips/{i:02d}.ass',format=yuv420p"
   run(['ffmpeg','-nostdin','-y','-v','warning','-f','concat','-safe','0','-i',str(OUT/'clips'/f'{i:02d}.txt'),'-i',row['audio'],'-vf',vf,'-af','apad,loudnorm=I=-16:TP=-1.5:LRA=11','-t',str(duration),'-c:v','libx264','-preset','fast','-crf','19','-threads','4','-c:a','aac','-b:a','192k','-ar','48000','-ac','2',str(dest)])
  print('Rendered '+row['title'],flush=True)
  meta.extend(['[CHAPTER]','TIMEBASE=1/1000',f'START={round(cursor*1000)}',f'END={round((cursor+duration)*1000)}',f'title={row["title"]}'])
  globalcues.extend((a+cursor,b+cursor,t) for a,b,t in cues(i));cursor+=duration
 # Preserve complete opening exchange and a second existing scene excerpt.
 evidence=read(ROOT/'output/changan-replica-20261003/production/latest-deliverable.json')
 film=Path(evidence['subtitledVideo']);filmprobe=probe(film)
 sampleparts=[(0,14.08),(118.56,13.056)]
 overlay=Image.new('RGBA',(1920,1080),(0,0,0,0));od=ImageDraw.Draw(overlay)
 od.rectangle((0,0,1920,44),fill=(16,33,59,255))
 od.text((80,9),'成片节选 · 现有素材 / 原片声音',font=font(22),fill='white')
 od.text((1335,10),'参考 Rick《长安异闻录》 · LibTV',font=font(20),fill='#b5c9ee')
 overlay.save(OUT/'film-overlay.png')
 for j,(start,duration) in enumerate(sampleparts):
  dest=OUT/'clips'/f'film-{j}.mp4'
  if not dest.exists():
   # Existing subtitles and original dialogue remain part of the film pixels/audio.
   vf="[0:v]scale=1760:990:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x10213b,fps=30[film];[film][1:v]overlay=0:0:shortest=1,format=yuv420p[out]"
   run(['ffmpeg','-nostdin','-y','-v','warning','-ss',str(start),'-t',str(duration),'-i',str(film),'-loop','1','-i',str(OUT/'film-overlay.png'),'-filter_complex',vf,'-map','[out]','-map','0:a','-af','loudnorm=I=-16:TP=-1.5:LRA=11','-t',str(duration),'-c:v','libx264','-preset','fast','-crf','19','-threads','4','-c:a','aac','-b:a','192k','-ar','48000','-ac','2',str(dest)])
 meta.extend(['[CHAPTER]','TIMEBASE=1/1000',f'START={round(cursor*1000)}',f'END={round((cursor+sum(d for _,d in sampleparts))*1000)}','title=已有成片节选 · 原片声音'])
 concat=[f"file '{i:02d}.mp4'" for i in range(len(rows))]+[f"file 'film-{j}.mp4'" for j in range(len(sampleparts))]
 (OUT/'clips/concat.txt').write_text('\n'.join(concat)+'\n','utf-8')
 (OUT/'chapters.txt').write_text('\n'.join(meta)+'\n','utf-8')
 (OUT/'字幕.srt').write_text(''.join(f'{k}\n{srtstamp(a)} --> {srtstamp(b)}\n{t}\n\n' for k,(a,b,t) in enumerate(globalcues,1)),'utf-8')
 run(['ffmpeg','-nostdin','-y','-v','warning','-f','concat','-safe','0','-i',str(OUT/'clips/concat.txt'),'-i',str(OUT/'chapters.txt'),'-map_metadata','1','-map_chapters','1','-c','copy','-movflags','+faststart',str(VIDEO)])
 save(OUT/'timeline.json',timeline)
 save(OUT/'film-source.json',{'file':str(film),'sha256':sha(film),'duration':float(filmprobe['format']['duration']),'excerpts':[{'start':a,'duration':b} for a,b in sampleparts],'originalDialoguePreserved':True,'paidMediaTasks':0,'fullMotionReviewApproved':False,'fullListeningReviewApproved':False})
 print(str(VIDEO),flush=True)

def check():
 p=probe(VIDEO);v=next(x for x in p['streams'] if x['codec_type']=='video');a=next(x for x in p['streams'] if x['codec_type']=='audio')
 assert (v['width'],v['height'])==(1920,1080)
 assert v['r_frame_rate']=='30/1' and v['codec_name']=='h264' and a['codec_name']=='aac'
 assert len(p['chapters'])==11
 run(['ffmpeg','-nostdin','-v','error','-i',str(VIDEO),'-f','null','-'])
 report={'file':str(VIDEO),'duration':float(p['format']['duration']),'resolution':[v['width'],v['height']],'fps':v['r_frame_rate'],'videoCodec':v['codec_name'],'audioCodec':a['codec_name'],'chapterCount':len(p['chapters']),'fullDecodePassed':True,'voice':VOICE,'capture':'Actual Edge UI checkpoints, edited with focus highlights; not continuous screen recording','previewNotice':'Opening title, narration, and tutorial chapter badges','paidProjectMediaRegenerated':False,'fullHumanMotionListeningReviewApproved':False}
 save(OUT/'verification.json',report)
 print(json.dumps(report,ensure_ascii=False),flush=True)

def publish():
 shutil.copy2(OUT/'frames/00-00.png',OUT/'poster.png')
 rows=read(OUT/'narration.json');cursor=0;links=[]
 for r in rows:
  links.append(f'<button data-time="{cursor:.3f}">{srtstamp(cursor)[:8]}　{r["title"]}</button>');cursor+=r['duration']+1
 links.append(f'<button data-time="{cursor:.3f}">{srtstamp(cursor)[:8]}　已有成片节选</button>')
 page='''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>流程设计器 · 预览教程</title><style>*{box-sizing:border-box}body{margin:0;background:#f0f4fc;color:#18315d;font-family:"Microsoft YaHei",sans-serif}main{max-width:1440px;margin:30px auto;padding:0 28px}header{display:flex;align-items:center;justify-content:space-between}h1{font-size:30px}b{color:#3463df;font-weight:normal;background:#e1eaff;padding:12px 18px;border-radius:8px}p{color:#647897;line-height:1.8}video{display:block;width:100%;background:#10213b;border-radius:10px}.chapters{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:20px 0}button{border:1px solid #d3def3;background:white;color:#18315d;padding:12px;text-align:left;border-radius:8px;cursor:pointer}button:hover{border-color:#3463df}a{color:#3463df}.note{font-size:14px}@media(max-width:800px){.chapters{grid-template-columns:1fr}header{display:block}}</style><main><header><h1>从空白画布，搭建短剧工程</h1><b>预览功能 · 尚未正式发布</b></header><p>真实界面分步演示：编辑、连线、分组、保存与执行。片尾展示《长安异闻录》完整工程及已有成片节选。</p><video controls preload="metadata" poster="poster.png" src="流程设计器-从空白画布到短剧工程.mp4"><track kind="subtitles" srclang="zh" label="中文" src="字幕.vtt"></video><div class="chapters">'''+''.join(links)+'''</div><p><a href="流程设计器-视频教程发布包.zip">下载教程发布包</a>　·　<a href="讲解稿.md">讲解稿</a>　·　<a href="字幕.srt">字幕</a></p><p class="note">参考 Rick《长安异闻录》第一卷·算命（LibTV）。教程演示草稿未生成媒体，片尾使用本地已有成片，保留原声音。界面素材按操作步骤采集后剪辑，不是连续屏幕录像。</p></main><script>const v=document.querySelector('video');document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>{v.currentTime=Number(b.dataset.time);v.play()})</script></html>'''
 (OUT/'index.html').write_text(page,'utf-8')
 (OUT/'字幕.vtt').write_text('WEBVTT\n\n'+re.sub(r'(\d{2}:\d{2}:\d{2}),(\d{3})',r'\1.\2',(OUT/'字幕.srt').read_text('utf-8')),'utf-8')
 notes='''# 制作说明\n\n流程设计器为预览功能，尚未正式发布。片头字幕、开场配音和教程章节右上角均有说明。\n\n界面：Edge 中实际创建的独立教程草稿，按操作步骤采集并剪辑，配合焦点框；不是连续屏幕录像。教程草稿项目编号：2106712577576255489。\n\n工具与节奏：FFmpeg 剪辑、编码、响度处理、字幕与章节；Pillow 制作白蓝片头和焦点提示；edge-tts / zh-CN-YunxiNeural 普通话男声，语速 -3%。每个主题约20—45秒，讲解和界面切换同步，没有背景音乐。最后的影片保留原对白与声音。\n\n成品设计示例：既有《长安异闻录》第一卷·算命，18场、48段视频；参考 Rick 的 LibTV 作品。片尾是成片节选，完整工程在当前本地工作台中可查看。案例完整视觉与声音审阅仍待完成，不将生成成功当作验收通过。\n\n本次没有提交图片、样音或视频生成任务，没有改写既有短剧业务数据；导入并保存的成品画布使用独立文档。字幕依据配音句子时间事件切分。验证范围见 verification.json。\n'''
 (OUT/'制作说明.md').write_text(notes,'utf-8')
 with zipfile.ZipFile(OUT/'流程设计器-视频教程发布包.zip','w',compression=zipfile.ZIP_DEFLATED,compresslevel=5) as z:
  for name in [VIDEO.name,'index.html','poster.png','讲解稿.md','字幕.srt','字幕.vtt','制作说明.md','verification.json','film-source.json','chapters.txt']:
   z.write(OUT/name,name)
 print('Published tutorial package.',flush=True)

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('stage',choices=['voice','render','check','publish']);args=parser.parse_args()
 OUT.mkdir(exist_ok=True,parents=True)
 if args.stage=='voice':asyncio.run(narrate())
 else:globals()[args.stage]()
