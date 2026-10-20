import { LAYOUT, angleAt, clamp, defaultConfig, parseConfig, type LayerId } from './model';
import { createPuppetWorld } from './scene';
import { exportPuppetVideo } from './export';

const $ = <T extends HTMLElement>(id: string): T => { const element = document.getElementById(id); if (!element) throw new Error(`缺少页面元素：${id}`); return element as T };
const input = (id: string) => $<HTMLInputElement>(id), select = (id: string) => $<HTMLSelectElement>(id);
const STORAGE = 'ruoyi-firework-puppets-v1';
let config = defaultConfig(), time = 0, playing = true, selected: LayerId = 'left-wheel', exporting = false;
let exportAbort: AbortController | undefined, persistTimer: number | undefined;
const status = $('status'), host = $('viewport');
try { const saved = localStorage.getItem(STORAGE); if (saved) config = parseConfig(JSON.parse(saved)) } catch { status.textContent = '旧配置无法读取，已恢复默认编排' }
const layer = () => config.layers.find(item => item.id === selected)!;
function message(text: string, error = false) { status.textContent = text; status.classList.toggle('error', error) }
function persist() { clearTimeout(persistTimer); persistTimer = window.setTimeout(() => { try { localStorage.setItem(STORAGE, JSON.stringify(config)) } catch { message('当前浏览器无法保存本地配置，请使用导出配置') } }, 200) }
const downloadUrls = new Map<string, string>();
function download(blob: Blob, name: string, id: string) {
  const previousUrl = downloadUrls.get(id); if (previousUrl) URL.revokeObjectURL(previousUrl);
  const url = URL.createObjectURL(blob), a = $<HTMLAnchorElement>(id); downloadUrls.set(id, url);
  a.href = url; a.download = name; a.hidden = false; a.click();
  if (id === 'download-video') { $('export-review').hidden = false; $<HTMLVideoElement>('export-preview').src = url }
}
const world = createPuppetWorld(host);
const resize = new ResizeObserver(() => { const rect = host.getBoundingClientRect(); if (rect.width && rect.height) world.resize(rect.width, rect.height, true) }); resize.observe(host);
select('layer').innerHTML = LAYOUT.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
function synchronize() {
  select('layer').value = selected; input('rpm').value = String(Math.abs(layer().rpm)); select('direction').value = layer().rpm < 0 ? '-1' : '1';
  input('enabled').checked = layer().enabled; input('sparks').checked = layer().sparks;
  input('start').value = String(layer().start); input('end').value = String(layer().end); input('phase').value = String(layer().phase);
  input('duration').value = String(config.duration); input('speed').value = String(config.speed); input('density').value = String(config.density);
  input('gravity').value = String(config.gravity); input('wind').value = String(config.wind); input('smoke').checked = config.smoke; input('color').value = config.color;
  input('timeline').max = input('time').max = String(config.duration);
  $('speed-value').textContent = `${config.speed.toFixed(1)}×`; $('density-value').textContent = `${Math.round(config.density * 100)}%`;
  $('layer-axis').textContent = LAYOUT.find(l => l.id === selected)!.axis === 'y' ? '绕竖直轴旋转，主竿保持固定' : '绕正面轴旋转，火花沿轮缘扫出';
  $('play').textContent = playing ? '暂停预演' : '继续播放'; $('state').textContent = playing ? '正在预演' : '已暂停';
}
select('layer').addEventListener('change', () => { selected = select('layer').value as LayerId; synchronize() });
for (const id of ['rpm', 'start', 'end', 'phase']) input(id).addEventListener('input', () => {
  const value = Number(input(id).value); if (!Number.isFinite(value)) return;
  if (id === 'rpm') layer().rpm = clamp(value, 0, 45) * Number(select('direction').value);
  if (id === 'start') layer().start = clamp(value, 0, layer().end - .2);
  if (id === 'end') layer().end = clamp(value, layer().start + .2, config.duration);
  if (id === 'phase') layer().phase = clamp(value, -360, 360);
  persist();
});
select('direction').addEventListener('change', () => { layer().rpm = Math.abs(layer().rpm) * Number(select('direction').value); persist() });
for (const id of ['enabled', 'sparks']) input(id).addEventListener('change', () => { layer()[id === 'enabled' ? 'enabled' : 'sparks'] = input(id).checked; persist() });
for (const [id, key, min, max] of [['speed', 'speed', 0, 2], ['density', 'density', 0, 2], ['gravity', 'gravity', 1, 12], ['wind', 'wind', -1, 1]] as const) {
  input(id).addEventListener('input', () => { config[key] = clamp(Number(input(id).value), min, max); $('speed-value').textContent = `${config.speed.toFixed(1)}×`; $('density-value').textContent = `${Math.round(config.density * 100)}%`; persist() });
}
input('smoke').addEventListener('change', () => { config.smoke = input('smoke').checked; persist() });
input('color').addEventListener('input', () => { config.color = input('color').value; persist() });
function changeDuration(value: number) {
  config.duration = clamp(value || 15, 6, 30);
  for (const item of config.layers) { item.end = Math.min(item.end, config.duration); item.start = Math.min(item.start, item.end - .2) }
  time = Math.min(time, config.duration); input('timeline').max = input('time').max = String(config.duration); persist();
}
input('duration').addEventListener('input', () => {
  const value = Number(input('duration').value); if (Number.isFinite(value) && value >= 6 && value <= 30) changeDuration(value);
});
input('duration').addEventListener('change', () => {
  changeDuration(Number(input('duration').value)); synchronize();
});
for (const id of ['timeline', 'time']) input(id).addEventListener('input', () => { time = clamp(Number(input(id).value), 0, config.duration); playing = false; synchronize() });
$('play').addEventListener('click', () => { if (time >= config.duration) time = 0; playing = !playing; synchronize() });
$('restart').addEventListener('click', () => { time = 0; playing = true; synchronize() });
$('peak').addEventListener('click', () => { time = Math.min(8, config.duration * .6); playing = false; synchronize(); host.scrollIntoView({ block: 'center', behavior: 'smooth' }) });
$('fit').addEventListener('click', () => world.fit());
$('default').addEventListener('click', () => { config = defaultConfig(); time = 0; playing = true; synchronize(); persist(); world.fit(); message('已恢复默认的分层燃放编排') });
$('save').addEventListener('click', () => { download(new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' }), '药发木偶-旋转预演配置.json', 'download-config'); message('配置已生成；若未自动下载，可点击下方的配置下载链接') });
$('load').addEventListener('click', () => input('file').click());
input('file').addEventListener('change', async () => {
  const file = input('file').files?.[0]; if (!file) return;
  try { if (file.size > 65536) throw new Error('配置文件不能超过64KB'); const parsed = parseConfig(JSON.parse(await file.text())); config = parsed; time = 0; playing = false; synchronize(); persist(); message('已导入配置，点击继续播放查看') }
  catch (error) { message(error instanceof Error ? error.message : '配置导入失败', true) }
  finally { input('file').value = '' }
});
$('export').addEventListener('click', async () => {
  if (exporting) return;
  changeDuration(Number(input('duration').value));
  exporting = true; playing = false; synchronize(); exportAbort = new AbortController();
  $<HTMLButtonElement>('export').disabled = true; $('cancel').hidden = false; $('export-progress').hidden = false;
  const exportConfig = parseConfig(config);
  try {
    const video = await exportPuppetVideo(exportConfig, world.view(), select('aspect').value, progress => {
      $<HTMLProgressElement>('export-progress').value = progress; message(`正在逐帧导出 ${Math.round(progress * 100)}%`);
    }, exportAbort.signal);
    download(video, `药发木偶-旋转预演-${exportConfig.duration}秒.mp4`, 'download-video'); message('MP4已生成：720p、24fps、无声。若未自动下载，可点击下方的视频下载链接');
  } catch (error) { message(error instanceof Error ? error.message : '导出失败', true) }
  finally { exporting = false; $<HTMLButtonElement>('export').disabled = false; $('cancel').hidden = true; $('export-progress').hidden = true }
});
$('cancel').addEventListener('click', () => exportAbort?.abort());
window.addEventListener('keydown', event => {
  if (event.code === 'Space' && event.target instanceof Element && !event.target.matches('input,select,textarea,button')) { event.preventDefault(); playing = !playing; synchronize() }
});
let previous = performance.now(), lastHud = previous, frames = 0, animation = 0, particleCount = 0;
function tick(now: number) {
  const dt = clamp((now - previous) / 1000, 0, .06); previous = now;
  if (playing && !exporting) {
    time += dt;
    if (time >= config.duration) { if (input('loop').checked) time %= config.duration; else { time = config.duration; playing = false; synchronize() } }
  }
  if (!exporting) { particleCount = world.update(config, time, selected, input('guides').checked); frames++ }
  if (now - lastHud > 140) {
    input('timeline').value = String(time); if (document.activeElement !== input('time')) input('time').value = time.toFixed(2);
    const degrees = angleAt(layer(), time, config.speed) * 180 / Math.PI;
    $('angle').textContent = `${degrees.toFixed(0)}°`; $('turns').textContent = `${(degrees / 360).toFixed(2)} 圈`;
    $('particles').textContent = particleCount.toLocaleString(); $('clock').textContent = `${time.toFixed(1)} / ${config.duration} s`;
    const info = world.renderer.info;
    $('performance').textContent = exporting ? '预演已暂停，正在导出视频' : `${Math.round(frames * 1000 / (now - lastHud))} fps · ${info.render.calls} draws · ${info.render.triangles.toLocaleString()} triangles`;
    frames = 0; lastHud = now;
  }
  animation = requestAnimationFrame(tick);
}
synchronize(); message('拖动观察视角；选择轮架后可调整转速、方向和启动时间。'); animation = requestAnimationFrame(tick);
window.addEventListener('pagehide', () => { cancelAnimationFrame(animation); exportAbort?.abort(); resize.disconnect(); downloadUrls.forEach(url => URL.revokeObjectURL(url)); world.dispose() }, { once: true });
