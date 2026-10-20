"""Probe and decode the original take, and prepare evenly spaced visual QA frames."""
import hashlib
import json
from pathlib import Path
import subprocess
from PIL import Image, ImageDraw
import argparse

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/long-snake/h3-15s-4k'
parser = argparse.ArgumentParser()
parser.add_argument('--input', default='一字长蛇阵-H3-15秒-4K超分.mp4')
parser.add_argument('--prefix', default='')
args = parser.parse_args()
assert Path(args.input).name == args.input and '/' not in args.prefix and '\\' not in args.prefix
VIDEO = OUT / args.input
if not VIDEO.exists(): raise SystemExit('先取得实际成片；此脚本不提交媒体任务。')
probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(VIDEO)], encoding='utf-8'))
(OUT / (args.prefix + 'media-probe.json')).write_text(json.dumps(probe, ensure_ascii=False, indent=2), encoding='utf-8')
subprocess.run(['ffmpeg', '-v', 'error', '-i', str(VIDEO), '-f', 'null', '-'], check=True)
frames = OUT / (args.prefix + 'review-frames'); frames.mkdir(exist_ok=True)
subprocess.run(['ffmpeg', '-v', 'error', '-i', str(VIDEO), '-vf', 'fps=2,scale=384:-2', '-q:v', '2', '-y', str(frames / '%03d.jpg')], check=True)
items = sorted(frames.glob('*.jpg'))
for offset in range(0, len(items), 15):
    selected = items[offset:offset + 15]
    sheet = Image.new('RGB', (1152, 5 * 240), '#f3f1eb'); draw = ImageDraw.Draw(sheet)
    for i, path in enumerate(selected):
        im = Image.open(path); x = (i % 3) * 384; y = (i // 3) * 240
        sheet.paste(im, (x, y)); draw.text((x + 10, y + im.height + 5), f'{(offset+i)*0.5+0.25:.2f}s', fill='#18291d')
    sheet.save(OUT / f'{args.prefix}视觉检查-{offset//15+1}.jpg')
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
qa = {'originalSha256': hashlib.sha256(VIDEO.read_bytes()).hexdigest(), 'fullDecodePassed': True, 'actualSeconds': float(probe['format']['duration']), 'width': v['width'], 'height': v['height'], 'hasAudio': any(s['codec_type'] == 'audio' for s in probe['streams']), 'reviewFrameCount': len(items), 'sampling': '2 fps evenly across original video; contact sheets are review evidence, not a complete frame-by-frame acceptance', 'supplierResolution': '4k-sr', 'native4K': False, 'motionReview': 'pending actual visual inspection', 'browserPlayback': 'pending'}
(OUT / (args.prefix + 'qa.json')).write_text(json.dumps(qa, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({k: qa[k] for k in ['actualSeconds', 'width', 'height', 'hasAudio', 'fullDecodePassed', 'reviewFrameCount']}))
