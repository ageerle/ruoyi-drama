"""Edit actual CUA browser-frame captures and the workbench's exported previs.

Screenshots are unchanged; enlargements, pauses and subtitles are video edits.
Narration uses measured sentence audio, with no paid media/model generation.
"""
from pathlib import Path
import json,re,subprocess,sys,shutil,zipfile,hashlib
ROOT=Path(__file__).resolve().parents[3];OUT=ROOT/'output/director-fight-tutorial'
VIDEO=OUT/'RuoYi导演工作台-武打动作视频教程.mp4'
sys.stdout.reconfigure(encoding='utf-8')
def load(p):return json.loads(Path(p).read_text('utf-8-sig'))
def save(p,v):Path(p).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n','utf-8')
def run(args):
 with (OUT/'render.log').open('ab') as log:subprocess.run(args,check=True,cwd=ROOT,stdout=log,stderr=log)
def probe(p):return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-show_chapters','-of','json',str(p)]))
def stamp(t,ass=False):
 units=round(t*(100 if ass else 1000));h,units=divmod(units,360000 if ass else 3600000);m,units=divmod(units,6000 if ass else 60000);s,units=divmod(units,100 if ass else 1000)
 return f'{h}:{m:02d}:{s:02d}.{units:02d}' if ass else f'{h:02d}:{m:02d}:{s:02d},{units:03d}'
def wrap(text,limit=27):
 result=[]
 for part in re.findall(r'[^，。！？；：、]+[，。！？；：、]?',text):
  for start in range(0,len(part),limit):
   piece=part[start:start+limit]
   if result and len(result[-1])+len(piece)<=limit:result[-1]+=piece
   else:result.append(piece)
 return result
def caption_rows(row):
 result=[]
 for cue in row['cues']:
  start=cue['start'];parts=wrap(cue['text']);total=sum(map(len,parts));duration=cue['end']-start
  for text in parts:
   end=start+duration*len(text)/total;result.append((start,end,text));start=end
 return result
def assfile(p,cues):
 header='''[Script Info]\nScriptType: v4.00+\nPlayResX: 1920\nPlayResY: 1080\nWrapStyle: 2\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Microsoft YaHei,32,&H00FFFFFF,&H00FFFFFF,&H003A2817,&H003A2817,0,0,0,0,100,100,0,0,3,8,0,2,70,70,22,1\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n'''
 p.write_text(header+''.join(f'Dialogue: 0,{stamp(a,True)},{stamp(b,True)},Default,,0,0,0,,{text}\n' for a,b,text in cues),'utf-8')

# One group per spoken sentence: the visible controls match the explanation.
GROUPS=[[],
 [['01-create','01-name'],['02-duration'],['02-white','02-blue'],['02-blue'],['02-blue']],
 [['03-arm-before'],['03-guard-left','03-elbow'],['03-guard-right'],['03-guard-full'],['03-guard-full'],['03-guard-left']],
 [['04-ready-key'],['04-ready-key'],['04-anticipation'],['04-strike-arm','04-strike-elbow'],['04-recovery','04-return-guard'],['04-live-punch']],
 [['05-before-import','05-paste-open','05-paste-json','05-imported'],['05-imported'],['05-block'],['05-block'],['05-block']],
 [['06-lift-leg'],['06-lift-edit','06-knee-fold','06-kick-extend','06-kick-knee'],['06-kick-recover'],['06-retreat'],['06-kick-extend','06-retreat']],
 [['07-retime-before'],['07-retime-before','07-retime-after','07-retime-undone'],['07-retime-undone'],['04-live-punch'],['07-retime-undone']],
 [['08-camera-before'],['08-camera-final','08-kick-frame'],['08-camera-wide','08-camera-final'],['08-camera-final']],
 [['09-saved','09-json'],['09-exporting'],['09-exporting'],['08-kick-frame'],['09-saved']],
 []]
def screen_list(index,row,captures):
 groups=GROUPS[index];assert len(groups)==len(row['cues']),(index,len(groups),len(row['cues']))
 listing=[];last=None
 for cue,tags in zip(row['cues'],groups):
  for tag in tags:
   frames=[c for c in captures if c['tag']==tag];assert frames,tag
   # Short holds around edited fields, continuous captured frames during playback.
   span=(cue['end']-cue['start'])/len(tags)
   for f in frames:listing.extend([f"file '{(OUT/'captures'/f['file']).as_posix()}'",f'duration {span/len(frames):.8f}']);last=f
 listing.extend([f"file '{(OUT/'captures'/last['file']).as_posix()}'",'duration 0.8',f"file '{(OUT/'captures'/last['file']).as_posix()}'"])
 p=OUT/'clips'/f'{index:02d}-frames.txt';p.write_text('\n'.join(listing)+'\n','utf-8');return p
def label(text,name,size=30,x=65,y=25,color='#244b78'):
 p=OUT/'clips'/f'{name}.txt';p.write_text(text,'utf-8');rel=p.relative_to(ROOT).as_posix()
 return f"drawtext=fontfile='output/director-fight-tutorial/font.ttc':textfile='{rel}':fontsize={size}:fontcolor={color}:x={x}:y={y}"
def render():
 rows=load(OUT/'narration.json');captures=load(OUT/'capture-manifest.json');(OUT/'clips').mkdir(exist_ok=True)
 shutil.copyfile('C:/Windows/Fonts/msyh.ttc',OUT/'font.ttc')
 globalcues=[];timeline=[];cursor=0;metadata=[';FFMETADATA1'];allclips=[]
 for i,row in enumerate(rows):
  duration=row['duration']+.8;dest=OUT/'clips'/f'{i:02d}.mp4';cues=caption_rows(row);ass=OUT/'clips'/f'{i:02d}.ass';assfile(ass,cues)
  inputargs=[]
  if i==0:
   inputargs=['-f','lavfi','-i',f'color=c=0xf2f6fc:s=1920x1080:r=30:d={duration}'];base='[0:v]'
  elif i==9:
   # Two key exchanges at half speed, then hold the completed recovery.
   raw=OUT/'clips'/'slow.mp4'
   if not raw.exists():run(['ffmpeg','-y','-v','warning','-i',str(OUT/'武打对练-白模成品.mp4'),'-filter_complex','[0:v]split=3[a][b][c];[a]trim=start=2.5:end=3.8,setpts=2*(PTS-STARTPTS)[aa];[b]trim=start=6.85:end=8.3,setpts=2*(PTS-STARTPTS)[bb];[c]trim=start=12:end=16,setpts=PTS-STARTPTS[cc];[aa][bb][cc]concat=n=3:v=1:a=0,fps=30[v]','-map','[v]','-an','-c:v','libx264','-preset','fast','-crf','18',str(raw)])
   inputargs=['-i',str(raw)];base='[0:v]scale=1800:1012,pad=1920:1080:60:68:color=0xf2f6fc,tpad=stop_mode=clone:stop_duration=30,'
  else:
   listing=screen_list(i,row,captures);inputargs=['-f','concat','-safe','0','-i',str(listing)]
   if i in [2,3,5,6]:
    base='[0:v]fps=30,format=yuv420p,setsar=1,split=2[main][detail];[main]crop=1388:920:0:0,scale=1320:874,setsar=1,pad=1920:1080:40:90:color=0xf2f6fc[left];[detail]crop=310:562:1388:116,scale=510:924,setsar=1[right];[left][right]overlay=1370:84,'
   else:base='[0:v]scale=1800:975,pad=1920:1080:60:77:color=0xf2f6fc,'
  titles=[label(f'{i+1:02d} / '+row['title'],f'{i:02d}-title'),label('预览功能 · 尚未正式发布',f'{i:02d}-preview',22,1520,29,'#487dc1')]
  if i==9:
   titles.extend([label('0.5 倍慢放', 'slow-label',22,1200,29,'#487dc1')+":enable='lt(t,5.5)'",label('原速收势', 'settle-label',22,1200,29,'#487dc1')+":enable='between(t,5.5,9.5)'",label('定格检查', 'hold-label',22,1200,29,'#487dc1')+":enable='gte(t,9.5)'"])
  if i in [2,3,5,6]:titles.append(label('属性面板放大',f'{i:02d}-detail',17,1370,60,'#7c96b7'))
  if i==0:
   titles.extend([label('RUOYI DRAMA', 'intro-brand',26,100,230,'#3f80cf'),label('用关键帧设计一段武打','intro-main',72,96,305),label('站位  /  护架  /  出拳  /  格挡  /  低踢  /  运镜','intro-list',33,100,445),label('从空场景开始，最后查看十六秒完整对练','intro-desc',30,100,555,'#6b88ab'),label('导演工作台为预览功能，尚未正式发布。','intro-scope',30,100,665,'#3f80cf')]);base+=''
  assrel=ass.relative_to(ROOT).as_posix();filters=base+','.join(titles)+f",fps=30,subtitles=filename='{assrel}',format=yuv420p[v]"
  if not dest.exists() or dest.stat().st_size<1024 or i==9 and '--slow-refresh' in sys.argv:run(['ffmpeg','-y','-v','warning',*inputargs,'-i',row['audio'],'-filter_complex_threads','1','-filter_complex',filters,'-map','[v]','-map','1:a','-af','apad,loudnorm=I=-16:TP=-1.5:LRA=11','-t',str(duration),'-c:v','libx264','-preset','fast','-crf','19','-threads','4','-c:a','aac','-b:a','160k','-ar','48000','-ac','2','-movflags','+faststart',str(dest)])
  measured=float(probe(dest)['format']['duration']);timeline.append({'chapter':i+1,'title':row['title'],'start':cursor,'duration':measured});metadata.extend(['[CHAPTER]','TIMEBASE=1/1000',f'START={round(cursor*1000)}',f'END={round((cursor+measured)*1000)}',f'title={row["title"]}']);globalcues.extend((a+cursor,b+cursor,text) for a,b,text in cues);cursor+=measured;allclips.append(dest)
  print(f'Rendered {i:02d} {measured:.2f}s {row["title"]}',flush=True)
 # The final chapter is the complete, uninterrupted 16-second workbench export.
 final=OUT/'clips'/'10.mp4';filtertext='scale=1800:1012,pad=1920:1080:60:68:color=0xf2f6fc,'+label('11 / 十六秒白模成品 · 原速', 'final-title')+','+label('预览功能 · 尚未正式发布','final-preview',22,1520,29,'#487dc1')+',fps=30,format=yuv420p'
 if not final.exists():run(['ffmpeg','-y','-v','warning','-i',str(OUT/'武打对练-白模成品.mp4'),'-f','lavfi','-i','anullsrc=r=48000:cl=stereo','-vf',filtertext,'-t','16','-c:v','libx264','-preset','fast','-crf','18','-threads','4','-c:a','aac','-b:a','160k','-movflags','+faststart',str(final)])
 measured=float(probe(final)['format']['duration']);metadata.extend(['[CHAPTER]','TIMEBASE=1/1000',f'START={round(cursor*1000)}',f'END={round((cursor+measured)*1000)}','title=十六秒白模成品 · 原速']);timeline.append({'chapter':11,'title':'十六秒白模成品 · 原速','start':cursor,'duration':measured});cursor+=measured;allclips.append(final)
 concat=OUT/'clips'/'all.txt';concat.write_text(''.join(f"file '{p.as_posix()}'\n" for p in allclips),'utf-8');meta=OUT/'chapters.txt';meta.write_text('\n'.join(metadata)+'\n','utf-8')
 run(['ffmpeg','-y','-v','warning','-f','concat','-safe','0','-i',str(concat),'-i',str(meta),'-map_metadata','1','-map_chapters','1','-c','copy','-movflags','+faststart',str(VIDEO)])
 (OUT/'字幕.srt').write_text(''.join(f'{n}\n{stamp(a)} --> {stamp(b)}\n{text}\n\n' for n,(a,b,text) in enumerate(globalcues,1)),'utf-8');save(OUT/'章节.json',timeline)
 print('Video ready: '+str(VIDEO),flush=True)
def verify():
 info=probe(VIDEO);v=next(s for s in info['streams'] if s['codec_type']=='video');a=next(s for s in info['streams'] if s['codec_type']=='audio')
 run(['ffmpeg','-v','error','-i',str(VIDEO),'-f','null','-']);run(['ffmpeg','-v','error','-i',str(OUT/'武打对练-白模成品.mp4'),'-f','null','-'])
 save(OUT/'verification.json',{'duration':float(info['format']['duration']),'resolution':[v['width'],v['height']],'fps':v['r_frame_rate'],'videoCodec':v['codec_name'],'audioCodec':a['codec_name'],'chapters':len(info['chapters']),'fullDecodePassed':True,'capture':'actual Edge UI via CUA browser-frame capture; pauses and property-panel enlargements edited in FFmpeg','voice':'Microsoft Huihui Desktop zh-CN, offline Windows voice','subtitleTiming':'measured sentence audio; punctuation phrases proportionally divided inside each sentence','browserPlayback':None,'fullHumanMotionReviewApproved':False,'fullHumanListeningApproved':False,'paidMediaTaskCalls':0,'project':load(OUT/'项目回读.json'),'geometry':load(OUT/'设计校验.json')})
 print('Decode and media metadata verified',flush=True)
if __name__=='__main__':
 render();verify()
