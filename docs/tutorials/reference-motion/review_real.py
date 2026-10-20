"""Prepare inspection frames and a local viewer for the completed video candidate."""
import json
from pathlib import Path
import subprocess
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/reference-motion/real-video'
video = OUT / '三段身法-真人写实样片.mp4'
if not video.exists():
    raise SystemExit('视频尚未下载，不能制作完成页')
metadata = json.loads((OUT/'video-metadata.json').read_text(encoding='utf-8'))
duration = float(metadata['format']['duration'])
font = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', 15)
frames = OUT / 'review-frames'
frames.mkdir(exist_ok=True)
times = [round(i*.25,2) for i in range(int(duration/.25))]
for i,time in enumerate(times):
    image = frames/f'{i:03}.jpg'
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(time),'-i',str(video),'-frames:v','1','-vf','scale=384:216',str(image)],check=True)
for start in range(0,len(times),24):
    page = Image.new('RGB',(1536,1482),'#edf2f8')
    draw = ImageDraw.Draw(page)
    for j,time in enumerate(times[start:start+24]):
        x=(j%4)*384;y=(j//4)*247
        with Image.open(frames/f'{start+j:03}.jpg') as image: page.paste(image,(x,y))
        draw.text((x+10,y+220),f'{time:.2f} 秒',font=font,fill='#304d6d')
    page.save(OUT/f'画面抽查-{start//24+1}.jpg',quality=92)
subprocess.run(['ffmpeg','-v','error','-y','-ss','5','-i',str(video),'-frames:v','1',str(OUT/'真人样片封面.jpg')],check=True)
html='''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RuoYi · 白模转写实动作样片</title><style>
*{box-sizing:border-box}body{margin:0;background:#f3f6fb;color:#244263;font-family:"Microsoft YaHei",sans-serif}main{max-width:1350px;margin:auto;padding:32px 28px}small{letter-spacing:2px;color:#6087b7}h1{font-size:30px;font-weight:600;margin:14px 0}p{line-height:1.8;color:#6b809a;font-size:13px}.badge{font-size:12px;color:#3c7abf;background:#e6effd;padding:7px 11px;border-radius:5px}.videos{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:24px 0}section{border:1px solid #dce6f2;border-radius:10px;padding:16px;background:white}h2{font-size:15px;font-weight:500;margin:0 0 14px}video{width:100%;height:340px;background:#172536;border-radius:6px;object-fit:contain}.controls,.files{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:16px 0}button,a{padding:9px 15px;border:1px solid #c8d9ec;background:white;color:#3b73b7;border-radius:6px;text-decoration:none;cursor:pointer;font-size:13px}button.primary{background:#357cd4;color:white;border-color:#357cd4}details{padding:16px;background:white;border:1px solid #dce6f2;border-radius:8px;font-size:13px;line-height:1.8}summary{cursor:pointer}@media(max-width:800px){.videos{grid-template-columns:1fr}video{height:280px}main{padding:24px 15px}h1{font-size:24px}}
</style><main><small>RUOYI DRAMA / MOTION TO VIDEO</small><h1>闪身、勾踢与摆身 · 写实动作样片</h1><span class="badge">导演工作台为预览功能，尚未正式发布</span><p>将三段身法精选成 12 秒白模参考，交给视频模型制作写实演员的练功房示范。右侧为实际生成的 AI 写实候选，时长 DURATION 秒，Seedance 2.0 Mini，720p。</p><div class="controls"><button class="primary" id="play">两段同时播放</button><button id="pause">暂停</button><button id="restart">从头开始</button><label>速度 <select id="speed"><option value="1">原速</option><option value="0.5">0.5 倍</option></select></label></div><div class="videos"><section><h2>白模输入 · 12 秒</h2><video id="white" controls muted preload="metadata" src="白模动作参考-12秒.mp4"></video></section><section><h2>AI 写实输出 · DURATION 秒</h2><video id="real" controls preload="metadata" poster="真人样片封面.jpg" src="三段身法-真人写实样片.mp4"></video></section></div><p>两段各自按原速播放，供观察动作次序与节奏；模型可以重新安排动作时长，不把相同时间点视作逐帧对应。</p><div class="files"><a href="三段身法-真人写实样片.mp4" download>下载写实样片</a><a href="白模动作参考-12秒.mp4" download>下载白模参考</a><a href="导演稿.txt" download>本镜导演稿</a><a href="操作说明.md" download>操作说明与检查记录</a><a href="http://127.0.0.1:5173/short-drama?projectId=2107029420148924418">打开项目分镜</a><a href="../index.html">原片与完整白模</a></div><details><summary>如何在项目继续制作</summary><p>打开「身法练习｜白模转写实样片」的「分镜确认」，展开「动作视频参考（白模 / 实拍）」查看本镜输入。可以继续修改视频导演稿，或上传其他白模片段并选择「用于本镜」，保存后生成新候选。视频生成会提交新的媒体任务。</p><p>先在导演工作台调整关节、走位、机位，再导出白模；人物外观、衣服、光线与声音由本镜导演稿描述。本次没有生成额外首帧。</p></details></main><script>
const both=[document.querySelector('#white'),document.querySelector('#real')];document.querySelector('#play').onclick=async()=>{both.forEach(v=>{if(v.ended)v.currentTime=0});await Promise.all(both.map(v=>v.play()))};document.querySelector('#pause').onclick=()=>both.forEach(v=>v.pause());document.querySelector('#restart').onclick=()=>both.forEach(v=>{v.pause();v.currentTime=0});document.querySelector('#speed').onchange=e=>both.forEach(v=>v.playbackRate=+e.target.value);
</script></html>'''.replace('DURATION',f'{duration:.2f}')
(OUT/'index.html').write_text(html,encoding='utf-8')
print(json.dumps({'duration':duration,'frames':len(times),'viewer':str(OUT/'index.html')},ensure_ascii=False))
