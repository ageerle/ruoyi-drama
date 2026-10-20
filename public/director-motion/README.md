# Local pose runtime

The WASM runtime is copied from the installed `@mediapipe/tasks-vision` 1.0.1 package. The full pose model is distributed by Google through its official [Pose Landmarker model documentation](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker):

`https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task`

These assets are served from the application's own origin. User videos are decoded and processed locally; they are never sent to the model download endpoint. On package upgrades, copy the matching WASM files from the installed package and verify a local browser capture. Changing the runtime without its matching WASM may break initialization.
