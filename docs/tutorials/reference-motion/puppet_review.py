"""Extract time-covered review frames; does not approve motion or sound."""
import json
from pathlib import Path
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/firework-puppets'
VIDEO = OUT / '药发木偶-国漫燃放候选.mp4'
sys.stdout.reconfigure(encoding='utf-8')
metadata = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries',
    'format=duration:stream=codec_type,width,height', '-of', 'json', str(VIDEO)], encoding='utf-8'))
duration = float(metadata['format']['duration'])
times = [n / 2 for n in range(int(duration * 2))] + [max(0, duration - .08)]
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 17)
frames = []
for index, seconds in enumerate(times):
    target = OUT / f'candidate-{index:03d}.png'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(seconds), '-i', str(VIDEO),
        '-frames:v', '1', str(target)], check=True)
    frames.append({'file': target.name, 'seconds': round(seconds, 3)})
for start in range(0, len(frames), 16):
    page = Image.new('RGB', (960, 1840), '#f2f3f5')
    draw = ImageDraw.Draw(page)
    for local, frame in enumerate(frames[start:start+16]):
        img = Image.open(OUT / frame['file']).convert('RGB')
        img.thumbnail((232, 420))
        x, y = (local % 4) * 240, (local // 4) * 460
        page.paste(img, (x + (240-img.width)//2, y + 30))
        draw.text((x+9, y+7), f'{frame["seconds"]:05.2f}s', font=font, fill='#243240')
    page.save(OUT / f'candidate-review-{start//16+1}.jpg', quality=94)
(OUT / 'review-frame-index.json').write_text(json.dumps({'duration': duration, 'interval': .5,
    'frames': frames, 'approval': 'not implied by extraction'}, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'duration': duration, 'reviewFrames': len(frames),
    'contactSheets': (len(frames)+15)//16}, ensure_ascii=False))
