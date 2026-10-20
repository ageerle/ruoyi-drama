"""Extract local video pose samples; no source frames leave this computer."""
import argparse, hashlib, json
from pathlib import Path
import cv2
import mediapipe as mp

parser = argparse.ArgumentParser()
parser.add_argument('video')
parser.add_argument('--out', default='output/reference-motion/capture.json')
parser.add_argument('--model', default='public/director-motion/pose_landmarker_full.task')
args = parser.parse_args()
cap = cv2.VideoCapture(args.video)
fps, count = cap.get(cv2.CAP_PROP_FPS), int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
options = mp.tasks.vision.PoseLandmarkerOptions(
    base_options=mp.tasks.BaseOptions(model_asset_path=args.model),
    running_mode=mp.tasks.vision.RunningMode.IMAGE,
    min_pose_detection_confidence=.5, min_pose_presence_confidence=.5,
    min_tracking_confidence=.5, num_poses=1)
samples, next_sample = [], 0
with mp.tasks.vision.PoseLandmarker.create_from_options(options) as detector:
    for index in range(count):
        ok, frame = cap.read()
        if not ok: break
        if index < round(next_sample * fps / 12): continue
        seconds = next_sample / 12
        # A tutorial may cut from portrait to a distant full body. Independent detection
        # avoids reusing the portrait ROI and inventing off-screen lower limbs.
        result = detector.detect(mp.Image(image_format=mp.ImageFormat.SRGB,
            data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)))
        points = lambda ls: [[round(p.x,6),round(p.y,6),round(p.z,6),round(p.visibility or 0,4)] for p in ls]
        samples.append({'frame':next_sample*2,
            'world':points(result.pose_world_landmarks[0]) if result.pose_world_landmarks else [],
            'image':points(result.pose_landmarks[0]) if result.pose_landmarks else []})
        next_sample += 1
        if next_sample % 60 == 0: print(f'{seconds:.1f}s / {count/fps:.2f}s',flush=True)
cap.release()
output = Path(args.out); output.parent.mkdir(parents=True,exist_ok=True)
record = {'version':1,'duration':count/fps,'sourceSha256':hashlib.sha256(Path(args.video).read_bytes()).hexdigest(),'samples':samples}
output.write_text(json.dumps(record,separators=(',',':')),encoding='utf-8')
print(json.dumps({'samples':len(samples),'detected':sum(bool(s['world']) for s in samples),'duration':count/fps}),flush=True)
