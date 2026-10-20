import { BufferTarget, CanvasSource, Mp4OutputFormat, Output, canEncodeVideo } from 'mediabunny';
import { parseConfig, type PuppetConfig } from './model';
import { createPuppetWorld, type ViewState } from './scene';

/** Explicit timestamps keep rotation and sparks identical to a paused preview. */
export async function exportPuppetVideo(input: PuppetConfig, view: ViewState, aspect: string, progress: (value: number) => void, signal: AbortSignal): Promise<Blob> {
  const config = parseConfig(input), width = aspect === '16:9' ? 1280 : 720, height = aspect === '16:9' ? 720 : 1280;
  if (!await canEncodeVideo('avc', { width, height, bitrate: 5_000_000 })) throw new Error('当前浏览器不支持H.264编码，请用新版Edge或Chrome打开此页面');
  const world = createPuppetWorld(undefined, true); world.resize(width, height); world.applyView(view, true);
  const output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });
  const source = new CanvasSource(world.renderer.domElement, { codec: 'avc', bitrate: 5_000_000 });
  output.addVideoTrack(source, { frameRate: 24 });
  try {
    await output.start();
    const frames = Math.round(config.duration * 24);
    for (let frame = 0; frame < frames; frame++) {
      if (signal.aborted) throw new Error('已取消视频导出');
      world.update(config, frame / 24, 'left-wheel', false);
      await source.add(frame / 24, 1 / 24); progress((frame + 1) / frames);
      if (frame % 6 === 0) await new Promise<void>(resolve => setTimeout(resolve, 0));
    }
    await output.finalize();
    if (!output.target.buffer) throw new Error('编码器未返回视频');
    return new Blob([output.target.buffer], { type: 'video/mp4' });
  } catch (error) { await output.cancel(); throw error }
  finally { source.close(); world.dispose() }
}
