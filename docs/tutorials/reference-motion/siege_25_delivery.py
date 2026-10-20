"""Package the original 2.5 candidate and its editable white-model reference."""
import hashlib, html, json, subprocess
from pathlib import Path

OUT=Path(__file__).resolve().parents[3]/'output/city-defense'
def read(name):return json.loads((OUT/(name+'.json')).read_text(encoding='utf-8'))
def probe(file):return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate','-of','json',str(file)],encoding='utf-8'))

def main():
    plan=read('grand25-plan');receipt=read('grand25-receipt');meta=read('grand25-metadata');review=read('grand25-visual-review')
    assert receipt['actualModel']==plan['model'] and receipt['actualModel']=='bytedance/seedance-2.5/reference-to-video'
    before=read('grand25-before');after=read('grand25-completed-project')
    preserved_fields=['videoId','videoUrl','imageId','imageUrl','imagePrompt','videoPrompt','continuityJson','sourceText','charactersJson']
    for old in before['storyboards']:
        current=next(s for s in after['storyboards'] if str(s['id'])==str(old['id']))
        assert all(old.get(k)==current.get(k) for k in preserved_fields),'原镜头字段发生变化'
    assert before['script']['scriptText']==after['script']['scriptText']
    assert hashlib.sha256((OUT/'宏大攻城-白模预演.mp4').read_bytes()).hexdigest()==read('grand25-reference')['sha256']
    video=next(s for s in meta['streams'] if s['codec_type']=='video');assert video['height']==720
    duration=float(meta['format']['duration'])
    for file,poster,time in [('宏大攻城-白模预演.mp4','宏大攻城-白模开场.jpg',0),('宏大攻城-Seedance2.5-720p.mp4','宏大攻城-国漫开场.jpg',0),('宏大攻城-Seedance2.5-720p.mp4','宏大攻城-国漫末帧.jpg',max(0,duration-.15))]:
        subprocess.run(['ffmpeg','-y','-v','error','-ss',str(time),'-i',str(OUT/file),'-frames:v','1',str(OUT/poster)],check=True)
    observed=''.join('<li>'+html.escape(s)+'</li>' for s in review['observed'])
    remaining=''.join('<li>'+html.escape(s)+'</li>' for s in review['remaining'])
    page='''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RuoYi · 2.5 宏大攻城</title><style>
*{box-sizing:border-box}body{margin:0;background:#f2f5fa;color:#20364c;font-family:"Microsoft YaHei",system-ui,sans-serif}main{max-width:1320px;margin:auto;padding:36px 28px 55px}.brand{font-size:11px;letter-spacing:2px;color:#8595a8}h1{font-size:30px;margin:14px 0 10px}h2{font-size:18px;margin:0 0 16px}p,li{font-size:13px;line-height:1.95;color:#61788e}.note{background:#fff8e9;border:1px solid #eee0c3;padding:12px 16px;color:#977b47;font-size:12px;border-radius:6px}.toolbar{display:flex;flex-wrap:wrap;gap:9px;margin:22px 0}button,a{border:1px solid #cedbeb;background:white;color:#4078b3;border-radius:5px;padding:10px 14px;text-decoration:none;font-size:13px;cursor:pointer}.primary{background:#377dca;color:white;border-color:#377dca}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.card{border:1px solid #dce5ef;border-radius:9px;background:white;overflow:hidden}.card header{padding:18px;display:flex;justify-content:space-between;gap:10px}strong{font-size:15px}small{font-size:11px;color:#8295a8}video{width:100%;display:block;aspect-ratio:16/9;background:#172436}.card p{padding:0 18px}.section{margin-top:22px;padding:24px;border:1px solid #dce5ef;border-radius:9px;background:white}.section img{display:block;width:100%;border-radius:5px}.status{font-size:12px}.beats{display:flex;gap:8px;flex-wrap:wrap}.beats button{font-size:12px}.review{border-top:1px solid #e8edf3;padding-top:12px;font-size:12px}@media(max-width:780px){main{padding:24px 15px}.grid{grid-template-columns:1fr}h1{font-size:25px}.card header{padding:15px}.section{padding:18px}}
</style></head><body><main><div class="brand">RUOYI DRAMA / DIRECTOR WORKBENCH</div><h1>一炮破城 · Seedance 2.5</h1><p>白模扩大到 51 个可编辑对象：40 名人物、3 门炮、两翼城墙与城内建筑。中央主炮发射，两翼待命；导演稿详细编排命中、裂墙、碎砖、坍塌和烟尘余波。</p><div class="note">导演工作台为预览功能，尚未正式发布。本页展示本次模型原片与白模编排，旧视频和工程继续保留。</div>
<div class="toolbar"><button class="primary" id="play">从头播放两段</button><button id="pause">暂停</button><a href="/short-drama?projectId=__PID__&amp;canvas=1" target="_blank">进入项目继续编辑 ↗</a><a href="宏大攻城-导演工程.json" download>下载新工程</a><a href="2.5宏大攻城-导演稿.txt">查看导演稿</a><a href="宏大攻城-操作参考.md">操作参考</a></div>
<div class="grid"><article class="card"><header><strong>白模 · 扩大城防与阵列</strong><small>12 秒 · 24 fps · 无声</small></header><video id="white" src="宏大攻城-白模预演.mp4" poster="宏大攻城-白模开场.jpg" controls playsinline preload="metadata"></video><p>5 秒主炮发射，5.5 秒命中。蓝色为守军，褐色为土匪，三排队列依次推进。</p></article><article class="card"><header><strong>国漫 · 2.5 新候选原片</strong><small>__DURATION__ 秒 · __RESOLUTION__ · 有声</small></header><video id="result" src="宏大攻城-Seedance2.5-720p.mp4" poster="宏大攻城-国漫开场.jpg" controls playsinline preload="metadata"></video><p>使用新白模动作参考与三张既有国漫角色图。视频采用模型原始输出，未剪辑或升采样。</p></article></div><p id="status" class="status">可分别回放，也可从头播放两段。模型成片节奏与白模可能不同。</p>
<section class="section"><h2>本次画面检查</h2><div class="grid"><div><strong>抽帧可见的结果</strong><ul>__OBSERVED__</ul></div><div><strong>仍需关注</strong><ul>__REMAINING__</ul></div></div><p class="review">已核对真实提交模型、文件分辨率、完整视频解码和代表帧。浏览器播放情况记录在交付记录中。完整声音听感和每个人物、碎砖的连续运动仍待人工回放验收。</p></section>
<section class="section"><h2>开场与末帧</h2><div class="grid"><div><img src="宏大攻城-国漫开场.jpg" alt="2.5 成片开场"><p>开场建立攻守位置。</p></div><div><img src="宏大攻城-国漫末帧.jpg" alt="2.5 成片末帧"><p>检查命中后破口是否持续，烟尘是否遮住推进动作。</p></div></div></section>
<section class="section"><h2>在工作台继续调整</h2><div class="beats"><button data-t="0">0 秒 · 炮阵与城防</button><button data-t="3">3 秒 · 主炮准备</button><button data-t="5">5 秒 · 喷焰与后坐</button><button data-t="5.5">5.5 秒 · 城门命中</button><button data-t="7">7 秒 · 伏身与落砖</button><button data-t="8.33">8.33 秒 · 阵列推进</button></div><ol><li>打开流程画布中的「宏大攻城 · 三炮与四十人阵列」节点，右下角摄影机监看决定导出构图。</li><li>选择「中路主炮 · 5秒发射」，调整命中目标、开炮时刻和位置关键帧；左右炮保持待命。</li><li>选择人物，修改下蹲、奔跑片段与走位。城墙、待命炮和队列都能单独选中调整。</li><li>导出白模并点击「保存为本项目动作参考」，再到镜 3 刷新并选用新参考。修改后先保存镜头。</li><li>特效的材质、层次和剪接写在视频导演稿中；白模预演使用简化效果。生成新候选会再次提交媒体任务。</li></ol><p>本次镜 3：2.5宏大攻城 · 裂墙、崩砖、尘浪与推进。</p></section>
<section class="section"><h2>保留的版本</h2><p><a href="index.html">上一版 Mini 对照页</a> <a href="土匪炮轰城门-国漫修正版.mp4">Mini 原片</a> <a href="宏大攻城-Seedance2.5-720p.mp4" download>下载 2.5 原片</a></p><p>本次同时改变了场景编排和导演稿，因此不能把两段效果差异全部归因于模型版本。</p></section></main>
<script>const white=document.querySelector('#white'),result=document.querySelector('#result'),status=document.querySelector('#status');document.querySelector('#play').onclick=async()=>{white.currentTime=0;result.currentTime=0;const s=await Promise.allSettled([white.play(),result.play()]);status.textContent=s.every(x=>x.status==='fulfilled')?'正在播放两段视频':'请使用播放器的播放按钮';};document.querySelector('#pause').onclick=()=>{white.pause();result.pause();status.textContent='已暂停';};document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{white.pause();white.currentTime=Math.min(Number(b.dataset.t),white.duration||12);status.textContent='白模：'+b.textContent;});[white,result].forEach(v=>v.addEventListener('ended',()=>{if(white.ended&&result.ended)status.textContent='两段视频已播放完毕，可从头回放';}));</script></body></html>'''
    for key,value in {'PID':plan['projectId'],'DURATION':f'{duration:.2f}','RESOLUTION':f'{video["width"]} × {video["height"]}','OBSERVED':observed,'REMAINING':remaining}.items():page=page.replace('__'+key+'__',str(value))
    (OUT/'grand25.html').write_text(page,encoding='utf-8')
    files=['宏大攻城-Seedance2.5-720p.mp4','宏大攻城-白模预演.mp4','宏大攻城-导演工程.json','2.5宏大攻城-导演稿.txt','土匪炮轰城门-国漫修正版.mp4','土匪炮轰城门-国漫成片.mp4']
    manifest={'projectId':plan['projectId'],'storyboardId':plan['storyboardId'],'directorId':plan['directorId'],'actualModel':receipt['actualModel'],'predictionId':receipt.get('predictionId'),'metadata':meta,'originalOutputUnedited':True,'previousMediaPreserved':True,'generationCount':1,'paidImagesGenerated':0,'browserPlaybackToEnd':False,'fullHumanMotionReviewApproved':False,'fullHumanListeningReviewApproved':False,'visualReview':review,'files':[{'name':n,'size':(OUT/n).stat().st_size,'sha256':hashlib.sha256((OUT/n).read_bytes()).hexdigest()} for n in files]}
    manifest['preservedShotCheck']={'shots':len(before['storyboards']),'fields':preserved_fields,'scriptTextUnchanged':True}
    (OUT/'grand25-交付记录.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'page':str(OUT/'grand25.html'),'duration':duration,'resolution':[video['width'],video['height']]},ensure_ascii=False))

if __name__=='__main__':main()
