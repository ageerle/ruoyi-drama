/** Mechanical timing and world-space sparks. No renderer, network or paid task. */
export type LayerId = 'upper-rings' | 'middle-rings' | 'lower-ring' | 'left-wheel' | 'right-wheel' | 'upper-stages' | 'lower-stages';
export type Axis = 'y' | 'z';
export interface LayerLayout { id: LayerId; name: string; axis: Axis; center: [number, number, number]; radius: number; rings: number[]; kind: 'ring' | 'wheel' | 'stage' }
export const LAYOUT: LayerLayout[] = [
  { id: 'upper-rings', name: '上层三道圆轮', axis: 'y', center: [0, 5.20, 0], radius: .53, rings: [-.38, 0, .38], kind: 'ring' },
  { id: 'middle-rings', name: '中层两道圆轮', axis: 'y', center: [0, 3.91, 0], radius: .57, rings: [-.30, .30], kind: 'ring' },
  { id: 'lower-ring', name: '下层圆轮', axis: 'y', center: [0, 2.15, 0], radius: .61, rings: [0], kind: 'ring' },
  { id: 'left-wheel', name: '左侧竖向花轮', axis: 'z', center: [-.54, 2.91, .05], radius: .46, rings: [0], kind: 'wheel' },
  { id: 'right-wheel', name: '右侧竖向花轮', axis: 'z', center: [.54, 2.91, .05], radius: .46, rings: [0], kind: 'wheel' },
  { id: 'upper-stages', name: '上层悬挂戏台', axis: 'y', center: [0, 4.58, 0], radius: 1.46, rings: [0], kind: 'stage' },
  { id: 'lower-stages', name: '下层悬挂戏台', axis: 'y', center: [0, 3.45, 0], radius: 1.94, rings: [0], kind: 'stage' },
];
export interface LayerSettings { id: LayerId; enabled: boolean; rpm: number; start: number; end: number; phase: number; sparks: boolean }
export interface PuppetConfig { schema: 'ruoyi-firework-puppets-v1'; duration: number; speed: number; density: number; gravity: number; wind: number; smoke: boolean; color: string; layers: LayerSettings[] }
export const MAX_PARTICLES = 10000;
export const MAX_LIFE = 2.85;
export const TAU = Math.PI * 2;
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
export function defaultConfig(): PuppetConfig {
  return { schema: 'ruoyi-firework-puppets-v1', duration: 15, speed: 1, density: 1, gravity: 4.8, wind: .18, smoke: true, color: '#ffbf55', layers: LAYOUT.map((layout, index) => ({
    id: layout.id, enabled: true, rpm: [11, -14, 16, 24, -24, 3, -2][index]!,
    start: [4, 2, 0, 1, 1.4, 0, 0][index]!, end: 14, phase: index * 23, sparks: true,
  })) };
}
function number(value: unknown, min: number, max: number, label: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) throw new Error(`${label}须在${min}—${max}范围内`);
  return value;
}
export function parseConfig(input: unknown): PuppetConfig {
  if (!input || typeof input !== 'object') throw new Error('配置须为JSON对象');
  const obj = input as Record<string, unknown>;
  if (obj.schema !== 'ruoyi-firework-puppets-v1') throw new Error('请选择本页导出的药发木偶预演配置');
  const duration = number(obj.duration, 6, 30, '表演时长');
  if (!Array.isArray(obj.layers) || obj.layers.length !== LAYOUT.length) throw new Error('配置须包含七组轮架与戏台');
  const layers = LAYOUT.map(layout => {
    const matches = (obj.layers as Array<Record<string, unknown>>).filter(layer => layer && layer.id === layout.id);
    if (matches.length !== 1) throw new Error('轮架配置有缺失或重复');
    const layer = matches[0]!;
    const start = number(layer.start, 0, duration - .2, '启动时间');
    const end = number(layer.end, start + .2, duration, '结束时间');
    if (typeof layer.enabled !== 'boolean' || typeof layer.sparks !== 'boolean') throw new Error('轮架开关无效');
    return { id: layout.id, enabled: layer.enabled, sparks: layer.sparks, start, end,
      rpm: number(layer.rpm, -45, 45, '转速'), phase: number(layer.phase, -360, 360, '初始角度') };
  });
  if (typeof obj.smoke !== 'boolean' || typeof obj.color !== 'string' || !/^#[a-f\d]{6}$/i.test(obj.color)) throw new Error('烟雾或颜色设置无效');
  return { schema: 'ruoyi-firework-puppets-v1', duration, layers,
    speed: number(obj.speed, 0, 2, '整体转速倍率'), density: number(obj.density, 0, 2, '火花强度'),
    gravity: number(obj.gravity, 1, 12, '下坠速度'), wind: number(obj.wind, -1, 1, '横向风'), smoke: obj.smoke, color: obj.color };
}
export function rampIntegral(seconds: number, length: number): number {
  const t = clamp(seconds, 0, length), r = Math.min(.8, length / 2);
  if (t < r) return t * t / (2 * r);
  if (t <= length - r) return t - r / 2;
  return length - r - (length - t) ** 2 / (2 * r);
}
/** Accumulated radians: 0→360 is a full turn, never shortest-angle interpolation. */
export function angleAt(layer: LayerSettings, time: number, speed = 1): number {
  return layer.phase * Math.PI / 180 + (layer.enabled ? layer.rpm * speed * TAU / 60 * rampIntegral(time - layer.start, layer.end - layer.start) : 0);
}
export function fireAt(layer: LayerSettings, time: number): number {
  if (!layer.enabled || !layer.sparks) return 0;
  const t = time - layer.start - .25, span = layer.end - layer.start - .25;
  return clamp(t / .65, 0, 1) * clamp((span - t) / 1.1, 0, 1);
}
export function sourceCount(layout: LayerLayout): number { return layout.kind === 'stage' ? 4 : layout.rings.length * 3 }
export function hash(seed: number): number { let x = Math.imul(seed ^ 0x6d2b79f5, 0x45d9f3b); x = Math.imul(x ^ (x >>> 16), 0x45d9f3b); return ((x ^ (x >>> 16)) >>> 0) / 4294967296 }
/** Writes position[0..2] and outgoing velocity[3..5] in fixed world coordinates. */
export function emissionAt(layout: LayerLayout, layer: LayerSettings, emitter: number, time: number, speed: number, out: Float64Array): void {
  const turn = angleAt(layer, time, speed), sign = Math.sign(layer.rpm) || 1;
  const radius = layout.radius, axisSign = layout.axis === 'y' ? -1 : 1;
  let a = axisSign * turn + (emitter % 3) * TAU / 3, yOffset = layout.rings[Math.floor(emitter / 3)] ?? 0;
  if (layout.kind === 'stage') { a = axisSign * turn + (emitter < 2 ? 0 : Math.PI); yOffset = -.69 }
  const c = Math.cos(a), s = Math.sin(a), tangent = 1.2 + Math.abs(layer.rpm * speed) * TAU / 60 * radius * .3;
  out[0] = layout.center[0] + c * radius + (layout.kind === 'stage' ? emitter % 2 ? .15 : -.15 : 0);
  if (layout.axis === 'y') {
    out[1] = layout.center[1] + yOffset; out[2] = layout.center[2] + s * radius;
    out[3] = -s * sign * axisSign * tangent + c * .32; out[4] = layout.kind === 'stage' ? -.25 : .9; out[5] = c * sign * axisSign * tangent + s * .32;
  } else {
    out[1] = layout.center[1] + s * radius; out[2] = layout.center[2] + .06;
    out[3] = -s * sign * tangent + c * .6; out[4] = c * sign * tangent + s * .6 + .35; out[5] = .18;
  }
}
/** Deterministic analytic trajectory permits frame-accurate seeking and export. */
export function particleAt(config: PuppetConfig, layout: LayerLayout, layer: LayerSettings, emitter: number, birth: number, serial: number, now: number, out: Float64Array): boolean {
  const seed = serial * 8191 + emitter * 127 + LAYOUT.indexOf(layout) * 104729;
  const age = now - birth, life = 1.25 + hash(seed + 1) * 1.6, strength = fireAt(layer, birth);
  if (age < 0 || age >= life || strength <= .025) return false;
  emissionAt(layout, layer, emitter, birth, config.speed, out);
  const x = out[0]!, y = out[1]!, z = out[2]!;
  const vx = out[3]! * (.55 + hash(seed + 2)) + (hash(seed + 3) - .5) * .4;
  const vy = out[4]! + (hash(seed + 4) - .5) * .65, vz = out[5]! * (.65 + hash(seed + 5)) + (hash(seed + 6) - .5) * .25;
  out[0] = x + vx * age + config.wind * age * age * .2;
  out[1] = y + vy * age - config.gravity * age * age / 2;
  out[2] = z + vz * age;
  if (out[1]! < .075) return false;
  const trailAge = Math.max(0, age - .065);
  out[3] = x + vx * trailAge + config.wind * trailAge * trailAge * .2;
  out[4] = y + vy * trailAge - config.gravity * trailAge * trailAge / 2;
  out[5] = z + vz * trailAge;
  out[6] = strength * Math.min(1, age * 25) * (1 - age / life) ** .65;
  out[7] = 1.8 + hash(seed + 7) * 2.4; out[8] = hash(seed + 8);
  return true;
}
