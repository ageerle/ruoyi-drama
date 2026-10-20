import { BufferTarget, CanvasSource, Mp4OutputFormat, Output, canEncodeVideo } from 'mediabunny';
import { parseArmyConfig, type ArmyConfig } from './model';
import { createArmyWorld, type ArmyCamera } from './scene';

export async function exportArmyVideo(input: ArmyConfig, view: ArmyCamera, aspect: string, onProgress: (n: number) => void, signal: AbortSignal): Promise<Blob> {
  const config = parseArmyConfig(input), width = aspect === '9:16' ? 720 : 1280, height = aspect === '9:16' ? 1280 : 720;
  if (!await canEncodeVideo('avc', { width, height, bitrate: 5_000_000 })) throw new Error('浏览器不支持H.264编码，请在新版Edge或Chrome中导出');
  const world = createArmyWorld(undefined, true); world.resize(width, height); world.setView(view.preset, config, 0); world.applyView(view, true);
  const output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() }), source = new CanvasSource(world.renderer.domElement, { codec: 'avc', bitrate: 5_000_000 });
  output.addVideoTrack(source, { frameRate: 24 });
  try {
    await output.start(); const frames = Math.round(config.duration * 24);
    for (let i = 0; i < frames; i++) { if (signal.aborted) throw new Error('已取消导出'); world.update(config, i / 24); await source.add(i / 24, 1 / 24); onProgress((i + 1) / frames); if (i % 6 === 0) await new Promise<void>(resolve => setTimeout(resolve, 0)) }
    await output.finalize(); if (!output.target.buffer) throw new Error('未收到编码结果'); return new Blob([output.target.buffer], { type: 'video/mp4' });
  } catch (error) { await output.cancel(); throw error }
  finally { source.close(); world.dispose() }
}
