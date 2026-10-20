"""Archive the one completed candidate over bounded CDN byte ranges.

No task submission. Resolve only the journalled task's existing output. Never
send the local backend Authorization header to the media CDN.
"""
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import time
from urllib.parse import urlsplit

import requests

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/firework-puppets'
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')
plan = json.loads((OUT / 'plan.json').read_text(encoding='utf-8'))
receipt = json.loads((OUT / 'task-receipt.json').read_text(encoding='utf-8'))
shot = json.loads((OUT / 'latest-shot.json').read_text(encoding='utf-8'))
assert receipt['requestId'] == plan['requestId'] and receipt['actualModel'] == plan['model']
assert receipt['status'] == 'done' and shot['videoStatus'] == 'done'
assert receipt['predictionId'] == shot['videoId']
url = shot['videoUrl']
parsed = urlsplit(url)
assert parsed.scheme == 'https' and parsed.hostname in {
    'atlas-media.oss-us-west-1.aliyuncs.com', 'ark-acg-ap-southeast-1.tos-ap-southeast-1.volces.com'}
assert parsed.port in (None, 443) and not parsed.username and not parsed.password and not parsed.fragment
parts = OUT / 'media-parts'
parts.mkdir(exist_ok=True)
started = time.time()


def read_range(start, end, expected_total=None):
    # A fresh session has no RuoYi/Atlas credentials or inherited proxy state.
    with requests.Session() as session:
        session.trust_env = False
        with session.get(url, headers={'Range': f'bytes={start}-{end}', 'Accept-Encoding': 'identity'},
                         allow_redirects=False, timeout=(15, 45)) as response:
            assert response.status_code == 206, 'CDN必须按请求返回部分内容'
            assert response.headers.get('Content-Type', '').split(';')[0] == 'video/mp4'
            matched = re.fullmatch(r'bytes (\d+)-(\d+)/(\d+)', response.headers.get('Content-Range', ''))
            assert matched and int(matched[1]) == start and int(matched[2]) == end
            total = int(matched[3])
            assert total <= 64 * 1024 * 1024 and (expected_total is None or total == expected_total)
            data = response.content
            assert len(data) == end-start+1
            return data, total


header, total = read_range(0, 15)
assert header[4:8] == b'ftyp'
chunk_size = 1024 * 1024
chunk_count = (total + chunk_size - 1) // chunk_size
manifest = {'predictionId': shot['videoId'], 'bytes': total, 'chunkBytes': chunk_size,
            'chunkCount': chunk_count, 'cdnHost': parsed.hostname, 'newGenerationTasks': 0}
manifest_path = OUT / 'range-download.json'
if manifest_path.exists():
    previous = json.loads(manifest_path.read_text(encoding='utf-8'))
    assert previous['predictionId'] == manifest['predictionId'] and previous['bytes'] == total
else:
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')


def fetch_chunk(index):
    start = index * chunk_size
    end = min(total, start + chunk_size) - 1
    target = parts / f'{index:03d}.bin'
    if target.exists() and target.stat().st_size == end-start+1:
        return index
    for attempt in range(2):
        try:
            data, _ = read_range(start, end, total)
            target.write_bytes(data)
            return index
        except (requests.RequestException, AssertionError):
            if attempt:
                raise
    raise RuntimeError('未能读取媒体片段')


with ThreadPoolExecutor(max_workers=4) as pool:
    futures = [pool.submit(fetch_chunk, i) for i in range(chunk_count)]
    for count, future in enumerate(as_completed(futures), 1):
        future.result()
        print(json.dumps({'downloadedParts': count, 'totalParts': chunk_count,
                          'elapsedSeconds': round(time.time()-started, 1)}, ensure_ascii=False), flush=True)

target = OUT / '药发木偶-国漫燃放候选.mp4'
if not target.exists():
    temporary = target.with_suffix('.assembled')
    with temporary.open('wb') as stream:
        for i in range(chunk_count):
            stream.write((parts / f'{i:03d}.bin').read_bytes())
    assert temporary.stat().st_size == total
    temporary.replace(target)
else:
    assert target.stat().st_size == total
subprocess.run(['ffmpeg', '-v', 'error', '-i', str(target), '-f', 'null', '-'], check=True)
metadata = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries',
    'format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate', '-of', 'json', str(target)], encoding='utf-8'))
(OUT / 'video-metadata.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2), encoding='utf-8')
manifest.update(sha256=hashlib.sha256(target.read_bytes()).hexdigest(), fullDecodePassed=True,
                elapsedSeconds=round(time.time()-started, 1))
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(metadata, ensure_ascii=False), flush=True)
