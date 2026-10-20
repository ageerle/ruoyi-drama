"""Render Chinese narration with the installed Windows Huihui voice, offline."""
from pathlib import Path
import json,re,subprocess,sys
ROOT=Path(__file__).resolve().parents[3];OUT=ROOT/'output/director-fight-tutorial'
sys.stdout.reconfigure(encoding='utf-8')
source=(Path(__file__).parent/'video-narration.md').read_text('utf-8')
chapters=[];sentences=[]
for i,section in enumerate(re.split(r'^## ',source,flags=re.M)[1:]):
 title,text=section.split('\n',1);parts=re.findall(r'[^。！？]+[。！？]?',text.strip())
 chapters.append({'id':i,'title':title.strip(),'text':text.strip(),'sentences':[]})
 for j,text in enumerate(parts):
  stem=f'{i:02d}-{j:02d}';sentences.append({'text':text,'path':str(OUT/'voice'/f'{stem}.wav')});chapters[-1]['sentences'].append(stem)
(OUT/'speech-input.json').write_text(json.dumps(sentences,ensure_ascii=False),'utf-8')
script='''$ErrorActionPreference = 'Stop'
$fightRows = Get-Content -LiteralPath $args[0] -Raw -Encoding UTF8 | ConvertFrom-Json
$fightSpeaker = New-Object -ComObject SAPI.SpVoice
$fightTokens = $fightSpeaker.GetVoices()
for ($fightIndex=0; $fightIndex -lt $fightTokens.Count; $fightIndex++) {
  if ($fightTokens.Item($fightIndex).Id -like '*ZH-CN_HUIHUI*') { $fightSpeaker.Voice = $fightTokens.Item($fightIndex); break }
}
$fightSpeaker.Rate = 0
foreach ($fightRow in $fightRows) {
  $fightStream = New-Object -ComObject SAPI.SpFileStream
  $fightStream.Format.Type = 22
  $fightStream.Open($fightRow.path,3)
  $fightSpeaker.AudioOutputStream = $fightStream
  [void]$fightSpeaker.Speak($fightRow.text,0)
  $fightStream.Close()
  Write-Output $fightRow.path
}
'''
(OUT/'render-speech.ps1').write_text(script,'utf-8-sig')
subprocess.run(['powershell.exe','-NoProfile','-File',str(OUT/'render-speech.ps1'),str(OUT/'speech-input.json')],check=True,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,timeout=120)
for chapter in chapters:
 cues=[];cursor=0;concat=[]
 for stem in chapter['sentences']:
  path=OUT/'voice'/f'{stem}.wav';duration=float(json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-of','json',str(path)]))['format']['duration'])
  row=next(s for s in sentences if s['path']==str(path));cues.append({'start':cursor,'end':cursor+duration,'text':row['text']});cursor+=duration;concat.append(f"file '{path.as_posix()}'")
 listing=OUT/'voice'/f'{chapter["id"]:02d}.txt';listing.write_text('\n'.join(concat),'utf-8')
 audio=listing.with_suffix('.wav');subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(listing),'-c:a','pcm_s16le',str(audio)],check=True)
 chapter.update(duration=cursor,audio=str(audio),cues=cues,voice='Microsoft Huihui Desktop / zh-CN')
 print(json.dumps({'title':chapter['title'],'duration':cursor},ensure_ascii=False),flush=True)
(OUT/'narration.json').write_text(json.dumps(chapters,ensure_ascii=False,indent=2),'utf-8')
(OUT/'讲解稿.md').write_text(source,'utf-8')
