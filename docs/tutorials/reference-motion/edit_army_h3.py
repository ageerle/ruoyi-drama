"""Make an explicitly labelled slow-motion edit from reviewed valid H3 segments."""
import hashlib
import json
from pathlib import Path
import subprocess
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/long-snake/h3-15s-4k'
SOURCES = [OUT / '一字长蛇阵-H3-15秒-4K超分.mp4', OUT / '候选2-H3原片.mp4']
TARGET = OUT / '演示版-15秒-UHD4K.mp4'
assert not TARGET.exists(), '已有演示版须保留'
# The indoor and smartphone sections are rejected. Each retained boundary is inspected separately.
segments = [(0, 0, 2), (1, 11, 14.375), (1, 0, 1.875), (0, 12, 14.375)]
review = json.loads((OUT / 'valid-segments-review.json').read_text(encoding='utf-8'))
assert review['acceptedForEditedDemo'] and review['segments'] == [list(x) for x in segments]
original_seconds = sum(end - start for _, start, end in segments)
factor = 15 / original_seconds
sr = 48000; length = sr * 15; rng = np.random.default_rng(105)
time = np.arange(length) / sr
# Wind bed plus short hollow hoof/gear contacts; no voice, music, or external paid audio task.
wind = rng.standard_normal(length)
wind = np.convolve(wind, np.ones(96) / 96, mode='same') * .055
sound = np.column_stack((wind, np.roll(wind, 113)))
for track, cadence in enumerate([.47, .51, .55, .58]):
    for at in np.arange(.15 + track * .08, 15, cadence):
        start = int(at * sr); size = min(int(.14 * sr), length - start)
        t = np.arange(size) / sr
        pulse = (np.sin(2 * np.pi * (95 - 90 * t) * t) * np.exp(-t * 35)
                 + .4 * rng.standard_normal(size) * np.exp(-t * 75))
        loudness = (.17 if track == 0 else .065) * (.85 if at < 3 or 8 < at < 11.5 else .48)
        sound[start:start + size, track % 2] += pulse * loudness
fade = np.minimum(np.minimum(time / .3, (15 - time) / .6), 1).clip(0, 1)
sound *= fade[:, None]
sound *= .65 / max(.65, np.max(np.abs(sound)))
audio = OUT / '后期拟音-风与马蹄.wav'
with wave.open(str(audio), 'wb') as writer:
    writer.setnchannels(2); writer.setsampwidth(2); writer.setframerate(sr)
    writer.writeframes((sound.clip(-1, 1) * 32767).astype('<i2').tobytes())
filters = []
for i, (source, start, end) in enumerate(segments):
    filters.append(f'[{source}:v]trim=start={start}:end={end},setpts=(PTS-STARTPTS)*{factor:.12f},scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,setsar=1,fps=24[v{i}]')
filters.append(''.join(f'[v{i}]' for i in range(len(segments))) + f'concat=n={len(segments)}:v=1:a=0[out]')
command = ['ffmpeg', '-v', 'error', '-i', str(SOURCES[0]), '-i', str(SOURCES[1]), '-i', str(audio), '-filter_complex', ';'.join(filters), '-map', '[out]', '-map', '2:a', '-t', '15', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', str(TARGET)]
subprocess.run(command, check=True)
probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(TARGET)], encoding='utf-8'))
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
assert (v['width'], v['height']) == (3840, 2160) and abs(float(probe['format']['duration']) - 15) < .05
subprocess.run(['ffmpeg', '-v', 'error', '-i', str(TARGET), '-f', 'null', '-'], check=True)
(OUT / 'delivery-probe.json').write_text(json.dumps(probe, ensure_ascii=False, indent=2), encoding='utf-8')
record = {'path': str(TARGET), 'bytes': TARGET.stat().st_size, 'sha256': hashlib.sha256(TARGET.read_bytes()).hexdigest(), 'model': 'minimax/h3-developer/image-to-video', 'supplierTier': '4k-sr', 'native4K': False, 'sources': [{'path': str(f), 'sha256': hashlib.sha256(f.read_bytes()).hexdigest()} for f in SOURCES], 'postprocess': {'method': 'four reviewed exterior segments, slow-motion edit, proportional UHD canvas crop', 'segments': segments, 'retainedNativeMotionSeconds': original_seconds, 'retimeFactor': factor, 'deliverySeconds': 15, 'canvas': '3840x2160'}, 'audio': 'post-produced procedural wind and hoof sound effects; original unrequested voice removed', 'fullDecodePassed': True, 'rawCandidatesAccepted': False, 'editedDemoAccepted': True}
(OUT / 'delivery-file.json').write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'width': v['width'], 'height': v['height'], 'seconds': probe['format']['duration'], 'retainedMotionSeconds': original_seconds, 'retimeFactor': factor}, ensure_ascii=False))
