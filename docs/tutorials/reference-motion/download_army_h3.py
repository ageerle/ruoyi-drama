"""Save the generated original, without forwarding local API authentication to storage."""
import hashlib
import json
from pathlib import Path
from urllib.parse import urlparse
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import argparse

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/long-snake/h3-15s-4k'
parser = argparse.ArgumentParser()
parser.add_argument('--receipt', default='video-receipt.json')
parser.add_argument('--output', default='一字长蛇阵-H3-15秒-4K超分.mp4')
parser.add_argument('--record', default='video-file.json')
args = parser.parse_args()
assert all(Path(n).name == n for n in [args.receipt, args.output, args.record])
receipt = json.loads((OUT / args.receipt).read_text(encoding='utf-8'))
assert receipt['status'] == 'done' and receipt['actualModel'] == 'minimax/h3-developer/image-to-video'
url = receipt['videoUrl']; parsed = urlparse(url)
assert parsed.scheme == 'https' and parsed.hostname == 'atlas-media.oss-us-west-1.aliyuncs.com'
assert receipt['predictionId'] in parsed.path
target = OUT / args.output
if target.exists(): raise SystemExit('原片已保存，保留文件并进行媒体检查。')
part = target.with_suffix('.part')
session = requests.Session(); session.trust_env = False  # No Authorization/ClientID from the RuoYi session.
head = session.head(url, timeout=(15, 20), allow_redirects=False); head.raise_for_status()
expected = int(head.headers.get('Content-Length', 0)); etag = head.headers['ETag']
assert 0 < expected < 512 * 1024 * 1024
state_file = part.with_suffix('.transfer.json')
resume = json.loads(state_file.read_text(encoding='utf-8')) if state_file.exists() else None
if resume:
    assert resume['supplierETag'] == etag and resume['expectedBytes'] == expected
    size = resume['prefixBytes']
    assert part.exists() and part.stat().st_size >= size
    with part.open('r+b') as stream: stream.truncate(size)
else:
    size = part.stat().st_size if part.exists() else 0
state_file.write_text(json.dumps({'prefixBytes': size, 'expectedBytes': expected, 'supplierETag': etag}), encoding='utf-8')
assert size <= expected
if size:
    with part.open('rb') as f: assert f.read(8)[4:8] == b'ftyp'
def fetch_range(start):
    end = min(expected - 1, start + 1024 * 1024 - 1)
    worker_session = requests.Session(); worker_session.trust_env = False
    with worker_session.get(url, headers={'Range': f'bytes={start}-{end}', 'If-Match': etag}, timeout=(15, 60), allow_redirects=False) as response:
        response.raise_for_status()
        assert response.status_code == 206 and response.headers.get('Content-Range') == f'bytes {start}-{end}/{expected}'
        data = response.content; assert len(data) == end - start + 1
        if start == 0: assert data[4:8] == b'ftyp'
        return start, data
with part.open('r+b' if size else 'wb') as stream, ThreadPoolExecutor(max_workers=4) as executor:
    stream.truncate(expected)
    futures = [executor.submit(fetch_range, start) for start in range(size, expected, 1024 * 1024)]
    for future in as_completed(futures):
        start, data = future.result(); stream.seek(start); stream.write(data); size += len(data)
        print(json.dumps({'savedBytes': size, 'totalBytes': expected}), flush=True)
    assert size == expected
part.replace(target)
result = {'path': str(target), 'bytes': size, 'sha256': hashlib.sha256(target.read_bytes()).hexdigest(), 'source': 'same_prediction_original_supplier_storage', 'predictionId': receipt['predictionId'], 'supplierETag': etag, 'transfer': 'HTTP byte ranges validated with Content-Range and If-Match', 'localAuthenticationForwarded': False, 'previewProxyFallback': 'Project preview proxy timed out after 90 seconds; generated original copied without another generation task.'}
(OUT / args.record).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'savedBytes': size, 'complete': True}))
