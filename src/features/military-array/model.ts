export type FormationMode = 'stand' | 'march' | 'turn' | 'respond';
export type ArmyPart = 'head' | 'body' | 'tail';
export type SoldierRole = 'shield' | 'spear' | 'bow' | 'flag' | 'cavalry';
export interface ArmyConfig { schema: 'ruoyi-long-snake-v1'; count: number; ranks: number; cavalryPercent: number; spacing: number; speed: number; bend: number; duration: number; mode: FormationMode; guides: boolean; labels: boolean; dust: boolean }
export const MODES: Record<FormationMode, { name: string; description: string }> = {
  stand: { name: '一字列阵', description: '蛇首在前、蛇身居中、蛇尾殿后，查看纵长队形。' },
  march: { name: '沿线行军', description: '各排保持间距前进，步卒迈步，骑兵策马，旗手随队移动。' },
  turn: { name: '蛇行转向', description: '蛇首循曲线引导，蛇身与蛇尾沿同一路径跟进。' },
  respond: { name: '首尾照应', description: '从长列逐渐弯成弧形，骑兵沿弧线跟进，步兵转向中部目标。' },
};
export const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
export const smooth = (a: number, b: number, n: number) => { const t = clamp((n - a) / (b - a), 0, 1); return t * t * (3 - 2 * t) };
export const defaultArmyConfig = (): ArmyConfig => ({ schema: 'ruoyi-long-snake-v1', count: 360, ranks: 4, cavalryPercent: 20, spacing: 1.25, speed: 1, bend: 12, duration: 24, mode: 'march', guides: true, labels: true, dust: true });
export function parseArmyConfig(raw: unknown): ArmyConfig {
  if (!raw || typeof raw !== 'object') throw new Error('配置必须是JSON对象');
  const c = raw as Record<string, unknown>;
  if (c.schema !== 'ruoyi-long-snake-v1') throw new Error('请选择本军阵预演导出的配置');
  function n(k: string, min: number, max: number, integer = false) { const v = c[k]; if (typeof v !== 'number' || !Number.isFinite(v) || v < min || v > max || integer && !Number.isInteger(v)) throw new Error(`配置项 ${k} 超出范围`); return v }
  const ranks = n('ranks', 1, 6, true); if (![1, 2, 3, 4, 6].includes(ranks)) throw new Error('排数可选1、2、3、4、6');
  if (!Object.prototype.hasOwnProperty.call(MODES, String(c.mode))) throw new Error('未知军阵动作');
  for (const k of ['guides', 'labels', 'dust']) if (typeof c[k] !== 'boolean') throw new Error(`配置项 ${k} 必须为开关`);
  return { schema: 'ruoyi-long-snake-v1', count: n('count', 24, 960, true), ranks, cavalryPercent: c.cavalryPercent === undefined ? 0 : n('cavalryPercent', 0, 50, true), spacing: n('spacing', .95, 2), speed: n('speed', 0, 2), bend: n('bend', 0, 24), duration: n('duration', 6, 30), mode: c.mode as FormationMode, guides: c.guides as boolean, labels: c.labels as boolean, dust: c.dust as boolean };
}
export function cavalryColumns(c: ArmyConfig) { return Math.round(Math.ceil(c.count / c.ranks) * c.cavalryPercent / 100) }
export function rankSpacing(c: ArmyConfig) { return Math.max(c.spacing * 1.08, cavalryColumns(c) ? 1.45 : 0) }
/** Mounted columns use a 3.5m pitch; the infantry spacing control remains independent. */
export function columnDistance(c: ArmyConfig, col: number) { const mounted = Math.min(col, cavalryColumns(c)); return mounted * 3.5 + (col - mounted) * c.spacing }
export function formationLength(c: ArmyConfig) { return columnDistance(c, Math.max(1, Math.ceil(c.count / c.ranks) - 1)) }
export function armyPart(c: ArmyConfig, id: number): ArmyPart { const f = Math.floor(id / c.ranks) / Math.max(1, Math.ceil(c.count / c.ranks) - 1); return f < .2 ? 'head' : f < .8 ? 'body' : 'tail' }
export function soldierRole(c: ArmyConfig, id: number): SoldierRole {
  const col = Math.floor(id / c.ranks), row = id % c.ranks;
  const mounted = cavalryColumns(c); if (col < mounted) return 'cavalry';
  if (col % 12 === 2 && row === Math.floor(c.ranks / 2)) return 'flag';
  const fraction = (col - mounted) / Math.max(1, Math.ceil(c.count / c.ranks) - mounted - 1);
  return fraction < .2 ? 'shield' : fraction < .8 ? 'spear' : 'bow';
}
export interface ArmyPath { xs: Float64Array; zs: Float64Array; arcs: Float64Array; origin: number; length: number; response: number; radius: number }
/** Arc-length lookup keeps ranks spaced along a bend instead of squeezing their X positions. */
export function buildArmyPath(c: ArmyConfig, time: number): ArmyPath {
  const length = formationLength(c), count = 256, extent = length * .6 + c.duration * c.speed + 10;
  const xs = new Float64Array(count + 1), zs = new Float64Array(count + 1), arcs = new Float64Array(count + 1);
  const width = (c.ranks - 1) * rankSpacing(c), clearance = cavalryColumns(c) ? 18 : 6;
  const wavelength = Math.max(12, length * .24, Math.sqrt(c.bend * (width + clearance)));
  const response = c.mode === 'respond' ? smooth(2, c.duration * .65, time * c.speed) : 0;
  const radius = Math.max(length / 4.3, width + (cavalryColumns(c) ? 18 : 8));
  const curvature = response / radius;
  for (let i = 0; i <= count; i++) {
    const u = (i / count * 2 - 1) * extent;
    // Grow the curvature of an equal-length arc; blending line/circle coordinates creates cusps mid-fold.
    xs[i] = curvature > 0 ? Math.sin(u * curvature) / curvature : u;
    zs[i] = c.mode === 'turn' ? c.bend * Math.sin(u / wavelength) : curvature > 0 ? 2 * Math.sin(u * curvature / 2) ** 2 / curvature : 0;
    if (i) arcs[i] = arcs[i - 1]! + Math.hypot(xs[i]! - xs[i - 1]!, zs[i]! - zs[i - 1]!);
  }
  return { xs, zs, arcs, origin: arcs[count / 2]!, length, response, radius };
}
/** out: X, Z, yaw, gait phase, moving, part code. No per-soldier allocations. */
export function soldierPose(c: ArmyConfig, path: ArmyPath, id: number, time: number, out: Float64Array): void {
  const col = Math.floor(id / c.ranks), row = id % c.ranks;
  const walking = c.mode === 'march' || c.mode === 'turn';
  const advance = walking ? (time - c.duration / 2) * c.speed * .8 : 0;
  const wanted = clamp(path.origin + path.length / 2 - columnDistance(c, col) + advance, .0001, path.arcs[path.arcs.length - 1]! - .0001);
  let lo = 0, hi = path.arcs.length - 1;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (path.arcs[mid]! < wanted) lo = mid; else hi = mid }
  const ratio = (wanted - path.arcs[lo]!) / (path.arcs[hi]! - path.arcs[lo]!);
  const dx = path.xs[hi]! - path.xs[lo]!, dz = path.zs[hi]! - path.zs[lo]!, d = Math.hypot(dx, dz);
  const lateral = (row - (c.ranks - 1) / 2) * rankSpacing(c);
  out[0] = path.xs[lo]! + dx * ratio - dz / d * lateral;
  out[1] = path.zs[lo]! + dz * ratio + dx / d * lateral;
  const tangentYaw = Math.atan2(dx, dz), targetYaw = Math.atan2(-out[0]!, path.radius * .7 - out[1]!);
  const delta = Math.atan2(Math.sin(targetYaw - tangentYaw), Math.cos(targetYaw - tangentYaw));
  out[2] = tangentYaw + (soldierRole(c, id) === 'cavalry' ? 0 : delta * smooth(.15, .95, path.response));
  out[3] = time * c.speed * 5.3 + col * .34 + row * .8;
  out[4] = c.speed > 0 && (walking || c.mode === 'respond' && path.response > 0 && path.response < 1) ? 1 : 0;
  out[5] = armyPart(c, id) === 'head' ? 0 : armyPart(c, id) === 'body' ? 1 : 2;
}
export function roleCounts(c: ArmyConfig) { const totals = { shield: 0, spear: 0, bow: 0, flag: 0, cavalry: 0 }; for (let i = 0; i < c.count; i++) totals[soldierRole(c, i)]++; return totals }
