"""Keep the native take and export an exact 15-second standard-UHD delivery."""
import hashlib
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/long-snake/h3-15s-4k'
SOURCE = OUT / '候选2-H3原片.mp4'
TARGET = OUT / '演示版-15秒-UHD4K.mp4'
review = json.loads((OUT / 'candidate2-visual-review.json').read_text(encoding='utf-8'))
assert review['acceptedForDelivery'], '不允许用跑题或未审阅原片交付'
assert not TARGET.exists(), '已有交付版须保留，禁止覆盖'
probe = json.loads((OUT / 'candidate2-media-probe.json').read_text(encoding='utf-8'))
duration = float(probe['format']['duration']); factor = 15 / duration
assert 0.9 < factor < 1.1, '原片时长偏差过大，不能用明显慢放充当正常动作演示'
vf = f'setpts={factor:.12f}*PTS,scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,setsar=1,fps=24'
command = ['ffmpeg', '-v', 'error', '-i', str(SOURCE), '-vf', vf, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p']
has_audio = any(s['codec_type'] == 'audio' for s in probe['streams'])
if has_audio and not review.get('muteUnexpectedAudio'):
    command += ['-af', f'atempo={1/factor:.12f},apad', '-c:a', 'aac', '-b:a', '160k']
else:
    command += ['-an']
command += ['-t', '15', '-movflags', '+faststart', str(TARGET)]
subprocess.run(command, check=True)
final = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(TARGET)], encoding='utf-8'))
video = next(s for s in final['streams'] if s['codec_type'] == 'video')
assert (video['width'], video['height']) == (3840, 2160) and abs(float(final['format']['duration']) - 15) < 0.05
subprocess.run(['ffmpeg', '-v', 'error', '-i', str(TARGET), '-f', 'null', '-'], check=True)
(OUT / 'delivery-probe.json').write_text(json.dumps(final, ensure_ascii=False, indent=2), encoding='utf-8')
record = {'path': str(TARGET), 'bytes': TARGET.stat().st_size, 'sha256': hashlib.sha256(TARGET.read_bytes()).hexdigest(), 'source': str(SOURCE), 'sourceSha256': hashlib.sha256(SOURCE.read_bytes()).hexdigest(), 'model': 'minimax/h3-developer/image-to-video', 'supplierTier': '4k-sr', 'native4K': False, 'postprocess': {'originalSeconds': duration, 'deliverySeconds': 15, 'retimeFactor': factor, 'canvas': '3840x2160', 'method': 'slight proportional retiming and aspect-ratio crop; no extra generation'}, 'fullDecodePassed': True}
(OUT / 'delivery-file.json').write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'width': 3840, 'height': 2160, 'seconds': final['format']['duration'], 'bytes': record['bytes'], 'retimeFactor': factor}))
