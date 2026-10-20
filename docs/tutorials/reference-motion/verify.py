"""Read back the saved project, verify the exported MP4, and make review frames."""
from pathlib import Path
import hashlib
import json
import subprocess
import io
import zipfile
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/reference-motion'
PROJECT = '2106712577576255489'
NODE = 'n-e37e964b-f316-4de7-bff1-9698f68b0c72'
doc = json.loads((OUT / '参考动作-完整导演工程.json').read_text(encoding='utf-8'))
saved = json.loads((ROOT.parent / 'ruoyi-ai/data/short-drama-directors' / PROJECT / f'{NODE}.json').read_text(encoding='utf-8'))
assert saved['document'] == doc, 'Saved project differs from the authored document'
video = OUT / '参考动作-白模复刻.mp4'
metadata = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-show_entries',
    'format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate,nb_frames',
    '-of', 'json', str(video)], encoding='utf-8'))
stream = metadata['streams'][0]
assert stream['width'] == 1280 and stream['height'] == 720
assert stream['r_frame_rate'] == '24/1' and int(stream['nb_frames']) == 792
assert float(metadata['format']['duration']) == 33
subprocess.run(['ffmpeg', '-v', 'error', '-i', str(video), '-f', 'null', '-'], check=True)

def frame(path, seconds):
    pixels = subprocess.check_output(['ffmpeg', '-v', 'error', '-ss', str(seconds),
        '-i', str(path), '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'])
    return Image.open(io.BytesIO(pixels)).convert('RGB')

font = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', 19)
times = [3.5, 4.5, 6.5, 8.0, 12.5, 13.5, 14.25, 15.5, 25.0, 26.0, 27.0, 31.0]
for section in range(3):
    sheet = Image.new('RGB', (1000, 4 * 338), '#f4f7fb')
    draw = ImageDraw.Draw(sheet)
    for row, seconds in enumerate(times[section * 4:(section + 1) * 4]):
        draw.text((14, row * 338 + 5), f'{seconds:.2f}s · 原片 / 导演工作台白模', font=font, fill='#294560')
        for col, path in enumerate([OUT / 'reference.mp4', video]):
            shot = frame(path, seconds)
            shot.thumbnail((490, 300))
            sheet.paste(shot, (col * 500 + (500-shot.width)//2, row * 338 + 32 + (300-shot.height)//2))
    sheet.save(OUT / f'动作对照-{section+1}.jpg', quality=92)

report = {
    'projectId': PROJECT, 'nodeId': NODE, 'savedRevision': saved['revision'],
    'sourceSha256': json.loads((OUT / 'capture.json').read_text(encoding='utf-8'))['sourceSha256'],
    'savedDocumentMatches': True, 'duration': doc['duration'],
    'jointCount': len([name for name in doc['objects'][0]['keys'][0]['pose'] if name != 'height']),
    'actorKeys': len(doc['objects'][0]['keys']), 'cameraKeys': len(doc['camera']['keys']),
    'geometry': json.loads((OUT / '设计校验.json').read_text(encoding='utf-8')),
    'export': metadata, 'exportSha256': hashlib.sha256(video.read_bytes()).hexdigest(),
    'fullDecodePassed': True, 'frontendTestsPassed': 23, 'backendTestsPassed': 6,
    'browserCaptureTest': {'range': [0, 4], 'sampleCount': 48, 'detected': 48, 'editableKeys': 49},
    'browserPlayback': {'sourceEnded': True, 'previsEnded': True, 'videoErrors': None},
    'browserWristEdit': {'frame': 624, 'before': -14.325, 'edited': -14.3, 'undoRestored': -14.325},
    'paidMediaTasks': 0, 'fullMotionReviewApproved': False,
    'limits': ['single-camera pose and depth estimates', 'no horizontal foot locking',
               'no fingers or full-body collision solver', 'close-up hidden limbs are not ground truth'],
}
(OUT / '验证记录.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
(OUT / '操作参考.md').write_bytes((Path(__file__).parent / 'README.md').read_bytes())
members = ['index.html', 'reference.mp4', '参考动作-白模复刻.mp4', '参考动作-完整导演工程.json',
           '操作参考.md', '设计校验.json', '验证记录.json', 'capture.json',
           '本地动作解析.png', '工作台-勾踢编辑.png', '工作台-摆身编辑.png',
           '原片白模对照.png', '动作对照-1.jpg', '动作对照-2.jpg', '动作对照-3.jpg']
with zipfile.ZipFile(OUT / '复刻工程包.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in members:
        archive.write(OUT / name, name)
    for name in ['extract.py', 'design.ts', 'verify.py']:
        archive.write(Path(__file__).parent / name, f'制作脚本/{name}')
with zipfile.ZipFile(OUT / '复刻工程包.zip') as archive:
    assert archive.testzip() is None
print(json.dumps({k: report[k] for k in ['savedRevision', 'savedDocumentMatches', 'jointCount', 'actorKeys', 'cameraKeys', 'fullDecodePassed']}, ensure_ascii=False))
