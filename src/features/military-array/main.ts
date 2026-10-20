import { MODES, armyPart, cavalryColumns, clamp, defaultArmyConfig, parseArmyConfig, roleCounts, soldierRole, type FormationMode } from './model';
import { createArmyWorld, type ArmyView } from './scene';
import { exportArmyVideo } from './export';
const $ = <T extends HTMLElement>(id: string): T => { const el = document.getElementById(id); if (!el) throw new Error(`缺少控件 ${id}`); return el as T };
const input = (id: string) => $<HTMLInputElement>(id), select = (id: string) => $<HTMLSelectElement>(id);
const STORAGE = 'ruoyi-long-snake-v1'; let config = defaultArmyConfig(), time = 0, playing = true, exporting = false, timer = 0, currentView: ArmyView = 'field', abort: AbortController | undefined;
try { const saved = localStorage.getItem(STORAGE); if (saved) config = parseArmyConfig(JSON.parse(saved)) } catch { /* Validated defaults remain usable. */ }
function message(s: string, error = false) { $('status').textContent = s; $('status').classList.toggle('error', error) }
function persist() { clearTimeout(timer); timer = window.setTimeout(() => { try { localStorage.setItem(STORAGE, JSON.stringify(config)) } catch { message('本地保存不可用，请导出配置留存') } }, 200) }
const world = createArmyWorld($('viewport')), downloads = new Map<string, string>();
function clearPicked() { world.clearSelection(); $('picked').textContent = '点选兵卒或马身可查看所属队列'; if (currentView === 'cavalry' && !cavalryColumns(config)) currentView = 'head' }
const observer = new ResizeObserver(() => { const r = $('viewport').getBoundingClientRect(); world.resize(r.width, r.height); world.setView(currentView, config, time) }); observer.observe($('viewport'));
function refresh() {
  input('count').value = String(config.count); select('ranks').value = String(config.ranks); input('cavalryPercent').value = String(config.cavalryPercent); input('spacing').value = String(config.spacing); input('speed').value = String(config.speed); input('bend').value = String(config.bend); input('duration').value = String(config.duration);
  for (const key of ['guides', 'labels', 'dust'] as const) input(key).checked = config[key]; input('timeline').max = input('time').max = String(config.duration);
  $('spacing-value').textContent = `${config.spacing.toFixed(2)} m`; $('speed-value').textContent = `${config.speed.toFixed(1)}×`; $('bend-value').textContent = `${config.bend.toFixed(0)} m`;
  $('mode-name').textContent = MODES[config.mode].name; $('mode-help').textContent = MODES[config.mode].description;
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-mode]')) { const active = button.dataset.mode === config.mode; button.setAttribute('aria-pressed', String(active)); button.classList.toggle('active', active) }
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-view]')) { const active = button.dataset.view === currentView; button.setAttribute('aria-pressed', String(active)); button.classList.toggle('active', active); button.disabled = button.dataset.view === 'cavalry' && !cavalryColumns(config) }
  $('play').textContent = playing ? '暂停行军' : '继续演示'; $('state').textContent = playing ? '演示中' : '已暂停'; $('total').textContent = String(config.count);
  const counts = roleCounts(config); $('shield-count').textContent = String(counts.shield); $('spear-count').textContent = String(counts.spear); $('bow-count').textContent = String(counts.bow); $('flag-count').textContent = String(counts.flag); $('cavalry-count').textContent = String(counts.cavalry); $('cavalry-value').textContent = `${config.cavalryPercent}% · ${counts.cavalry}骑`;
}
function countChanged() { const value = Number(input('count').value); if (Number.isFinite(value) && Number.isInteger(value) && value >= 24 && value <= 960) { config.count = value; clearPicked(); refresh(); persist(); world.setView(currentView, config, time) } }
input('count').addEventListener('input', countChanged); input('count').addEventListener('change', () => { config.count = clamp(Math.round(Number(input('count').value) || 360), 24, 960); clearPicked(); refresh(); persist(); world.setView(currentView, config, time) });
select('ranks').addEventListener('change', () => { config.ranks = Number(select('ranks').value); clearPicked(); refresh(); persist(); world.setView(currentView, config, time) });
for (const key of ['spacing', 'speed', 'bend', 'cavalryPercent'] as const) input(key).addEventListener('input', () => { config[key] = Number(input(key).value); if (key === 'cavalryPercent') clearPicked(); refresh(); persist(); if (key !== 'speed') world.setView(currentView, config, time) });
for (const key of ['guides', 'labels', 'dust'] as const) input(key).addEventListener('change', () => { config[key] = input(key).checked; persist() });
function durationChanged() { const value = Number(input('duration').value); if (!Number.isFinite(value) || value < 6 || value > 30) return; config.duration = value; time = Math.min(time, value); input('timeline').max = input('time').max = String(value); persist() }
input('duration').addEventListener('input', durationChanged); input('duration').addEventListener('change', () => { durationChanged(); refresh() });
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-mode]')) button.addEventListener('click', () => { config.mode = button.dataset.mode as FormationMode; time = 0; playing = true; clearPicked(); refresh(); persist(); world.setView(currentView, config, time); message(MODES[config.mode].description) });
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-view]')) button.addEventListener('click', () => { currentView = button.dataset.view as ArmyView; world.setView(currentView, config, time); refresh() });
$('play').addEventListener('click', () => { if (time >= config.duration) time = 0; playing = !playing; refresh() });
$('restart').addEventListener('click', () => { time = 0; playing = true; refresh() });
$('peak').addEventListener('click', () => { time = config.duration * .72; playing = false; refresh() });
for (const key of ['timeline', 'time']) input(key).addEventListener('input', () => { time = clamp(Number(input(key).value), 0, config.duration); playing = false; refresh() });
world.onPick(id => { const part = { head: '蛇首', body: '蛇身', tail: '蛇尾' }[armyPart(config, id)], role = { shield: '盾兵', spear: '枪兵', bow: '弓兵', flag: '旗手', cavalry: '骑兵' }[soldierRole(config, id)]; $('picked').textContent = `${part} · 第${Math.floor(id / config.ranks) + 1}列第${id % config.ranks + 1}排 · ${role}` });
$('default').addEventListener('click', () => { config = defaultArmyConfig(); time = 0; playing = true; currentView = 'field'; clearPicked(); refresh(); persist(); world.setView(currentView, config, time); message('已恢复360人、4排的军阵，包含72骑') });
function download(blob: Blob, id: string, name: string) { const old = downloads.get(id); if (old) URL.revokeObjectURL(old); const url = URL.createObjectURL(blob); downloads.set(id, url); const a = $<HTMLAnchorElement>(id); a.href = url; a.download = name; a.hidden = false; a.click(); return url }
$('save').addEventListener('click', () => { download(new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' }), 'download-config', '一字长蛇阵-编排配置.json'); message('配置已生成，可使用下方链接下载') });
$('load').addEventListener('click', () => input('file').click());
input('file').addEventListener('change', async () => { const file = input('file').files?.[0]; if (!file) return; try { if (file.size > 65536) throw new Error('配置文件不能超过64KB'); config = parseArmyConfig(JSON.parse(await file.text())); time = 0; playing = false; currentView = 'field'; clearPicked(); refresh(); persist(); world.setView(currentView, config, time); message('配置已导入，点击继续演示') } catch (error) { message(error instanceof Error ? error.message : '导入失败', true) } finally { input('file').value = '' } });
$('export').addEventListener('click', async () => {
  if (exporting) return;
  let snapshot = config;
  try { snapshot = parseArmyConfig({ ...config, count: Number(input('count').value), duration: Number(input('duration').value) }) }
  catch (error) { message(error instanceof Error ? error.message : '请检查兵力和时长范围', true); return }
  config = snapshot; durationChanged(); exporting = true; playing = false; abort = new AbortController(); refresh(); $<HTMLButtonElement>('export').disabled = true; $('cancel').hidden = false; $('export-progress').hidden = false; message('正在准备军阵视频…');
  try { const blob = await exportArmyVideo(snapshot, world.view(), select('aspect').value, n => { $<HTMLProgressElement>('export-progress').value = n; message(`正在导出军阵 ${Math.round(n * 100)}%`) }, abort.signal); const url = download(blob, 'download-video', `一字长蛇阵-${MODES[snapshot.mode].name}-${snapshot.duration}秒.mp4`); $<HTMLVideoElement>('result-video').src = url; $('result').hidden = false; $('result-meta').textContent = `${MODES[snapshot.mode].name} · ${snapshot.count}人 · ${snapshot.duration}秒 · 720p · 无声`; message('视频已生成，可在下方回放和下载') }
  catch (error) { message(error instanceof Error ? error.message : '视频导出失败', true) }
  finally { exporting = false; $<HTMLButtonElement>('export').disabled = false; $('cancel').hidden = true; $('export-progress').hidden = true }
});
$('cancel').addEventListener('click', () => abort?.abort());
window.addEventListener('keydown', e => { if (e.code === 'Space' && e.target instanceof Element && !e.target.matches('input,select,button,textarea')) { e.preventDefault(); playing = !playing; refresh() } });
let previous = performance.now(), lastHud = previous, frames = 0, animation = 0;
function tick(now: number) {
  const dt = clamp((now - previous) / 1000, 0, .08); previous = now;
  if (playing && !exporting) { time += dt; if (time >= config.duration) { if (input('loop').checked) time %= config.duration; else { time = config.duration; playing = false; refresh() } } }
  if (!exporting) { const result = world.update(config, time); $('length').textContent = `${result.length.toFixed(1)} m`; $('columns').textContent = String(result.columns); $('phase').textContent = config.mode === 'respond' ? result.response > .99 ? '首尾内收 · 互相照应' : result.response > 0 ? '蛇身稳住 · 首尾内收' : '纵长队列就位' : MODES[config.mode].name; frames++ }
  if (now - lastHud > 180) { input('timeline').value = String(time); if (document.activeElement !== input('time')) input('time').value = time.toFixed(2); $('clock').textContent = `${time.toFixed(1)} / ${config.duration} s`; const stats = world.renderer.info.render; $('performance').textContent = exporting ? '预演暂停 · 正在逐帧导出' : `${Math.round(frames * 1000 / (now - lastHud))} fps · ${stats.calls} draws · ${stats.triangles.toLocaleString()} triangles`; frames = 0; lastHud = now }
  animation = requestAnimationFrame(tick);
}
refresh(); message('军阵已就位。选择动作和机位，拖动画面或点选兵卒。'); animation = requestAnimationFrame(tick);
window.addEventListener('pagehide', () => { cancelAnimationFrame(animation); clearTimeout(timer); abort?.abort(); observer.disconnect(); downloads.forEach(url => URL.revokeObjectURL(url)); world.dispose() }, { once: true });
