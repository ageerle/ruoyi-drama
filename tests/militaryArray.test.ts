import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildArmyPath, columnDistance, defaultArmyConfig, formationLength, parseArmyConfig, roleCounts, soldierPose, soldierRole } from '../src/features/military-array/model.ts';

test('straight ranks preserve longitudinal and lateral spacing while advancing together', () => {
  const c = { ...defaultArmyConfig(), cavalryPercent: 0 }, path = buildArmyPath(c, 0), a = new Float64Array(6), b = new Float64Array(6), later = new Float64Array(6);
  soldierPose(c, path, 0, 0, a); soldierPose(c, path, c.ranks, 0, b);
  assert.ok(Math.abs(a[0]! - b[0]! - c.spacing) < 1e-9);
  soldierPose(c, path, 1, 0, b); assert.ok(Math.abs(b[1]! - a[1]! - c.spacing * 1.08) < 1e-9);
  soldierPose(c, path, 0, 5, later); assert.ok(Math.abs(later[0]! - a[0]! - 4) < 1e-9);
  assert.equal(formationLength(c), 89 * 1.25);
});
test('a curved or responding formation avoids bunching adjacent troops into each other', () => {
  for (const mode of ['turn', 'respond'] as const) {
    const c = { ...defaultArmyConfig(), mode, bend: 24 }, path = buildArmyPath(c, 20), positions: number[][] = [];
    for (let id = 0; id < c.count; id++) { const p = new Float64Array(6); soldierPose(c, path, id, 20, p); positions.push([p[0]!, p[1]!]) }
    for (let i = 0; i < positions.length; i++) for (let j = i + 1; j < positions.length; j++) assert.ok(Math.hypot(positions[i]![0]! - positions[j]![0]!, positions[i]![1]! - positions[j]![1]!) > 1, `${mode}: troops ${i} and ${j} overlap`);
  }
});
test('response begins as a straight line, folds continuously, and seeks deterministically', () => {
  const c = { ...defaultArmyConfig(), mode: 'respond' as const }, initial = buildArmyPath(c, 0), final = buildArmyPath(c, 24), a = new Float64Array(6), b = new Float64Array(6), repeat = new Float64Array(6);
  soldierPose(c, initial, 0, 0, a); assert.ok(Math.abs(a[1]!) < c.ranks * c.spacing);
  soldierPose(c, final, 0, 24, b); assert.ok(b[1]! > a[1]! + 20); assert.ok(Math.abs(b[0]!) < Math.abs(a[0]!));
  soldierPose(c, buildArmyPath(c, 24), 0, 24, repeat); assert.deepEqual(b, repeat);
});
test('zero speed stops formation motion across all moving modes', () => {
  for (const mode of ['march', 'turn', 'respond'] as const) {
    const c = { ...defaultArmyConfig(), speed: 0, mode }, a = new Float64Array(6), b = new Float64Array(6);
    soldierPose(c, buildArmyPath(c, 0), 12, 0, a); soldierPose(c, buildArmyPath(c, 20), 12, 20, b); assert.deepEqual(a, b); assert.equal(a[4], 0);
  }
});
test('role counts include flag bearers once and configuration bounds reject invalid input', () => {
  for (const count of [24, 360, 960]) { const c = { ...defaultArmyConfig(), count }; assert.deepEqual(parseArmyConfig(c), c); assert.equal(Object.values(roleCounts(c)).reduce((a, b) => a + b, 0), count) }
  const c = defaultArmyConfig();
  assert.throws(() => parseArmyConfig({ ...c, count: 10000 })); assert.throws(() => parseArmyConfig({ ...c, ranks: 5 })); assert.throws(() => parseArmyConfig({ ...c, speed: NaN })); assert.throws(() => parseArmyConfig({ ...c, mode: '__proto__' }));
  assert.throws(() => parseArmyConfig({ ...c, cavalryPercent: -1 })); assert.throws(() => parseArmyConfig({ ...c, cavalryPercent: 51 })); assert.throws(() => parseArmyConfig({ ...c, cavalryPercent: 12.5 }));
});
test('cavalry counts riders once, allocates whole columns, and leaves the remainder as infantry', () => {
  const c = defaultArmyConfig(), counts = roleCounts(c); assert.equal(counts.cavalry, 72); assert.equal(soldierRole(c, 71), 'cavalry'); assert.notEqual(soldierRole(c, 72), 'cavalry');
  assert.equal(columnDistance(c, 1), 3.5); assert.equal(columnDistance(c, 19) - columnDistance(c, 18), 1.25); assert.equal(formationLength(c), 151.75);
  assert.ok(counts.shield > 0 && counts.spear > 0 && counts.bow > 0 && counts.flag > 0);
  for (const count of [25, 121, 960]) for (const ranks of [1, 3, 6]) for (const cavalryPercent of [0, 5, 20, 50]) {
    const actual = roleCounts({ ...c, count, ranks, cavalryPercent }); assert.equal(Object.values(actual).reduce((a, b) => a + b), count);
  }
});
test('previous configurations keep the original infantry allocation and spacing', () => {
  const { cavalryPercent, ...old } = defaultArmyConfig(), restored = parseArmyConfig(old); assert.equal(restored.cavalryPercent, 0);
  assert.deepEqual(roleCounts(restored), { cavalry: 0, shield: 70, spear: 212, bow: 70, flag: 8 }); assert.equal(formationLength(restored), 111.25);
});
test('horse footprints stay separate through tight bends and partial response changes', () => {
  // SAT with conservative 1.1m x 2.7m horse footprints, rather than centre-distance alone.
  type Footprint = { p: number[]; axes: number[][]; size: number[] };
  function overlap(a: Footprint, b: Footprint) {
    const delta = [b.p[0]! - a.p[0]!, b.p[1]! - a.p[1]!];
    for (const axis of [...a.axes, ...b.axes]) {
      const project = (f: Footprint) => f.size.reduce((sum, half, i) => sum + half * Math.abs(axis[0]! * f.axes[i]![0]! + axis[1]! * f.axes[i]![1]!), 0);
      if (Math.abs(delta[0]! * axis[0]! + delta[1]! * axis[1]!) >= project(a) + project(b)) return false;
    }
    return true;
  }
  for (const count of [24, 120, 360]) for (const ranks of [1, 4, 6]) for (const mode of ['turn', 'respond'] as const) for (const time of [0, 5, 10, 24]) {
    const c = { ...defaultArmyConfig(), count, ranks, cavalryPercent: 50, spacing: .95, bend: 24, mode }, path = buildArmyPath(c, time), shapes: Footprint[] = [];
    for (let id = 0; id < count; id++) { const p = new Float64Array(6); soldierPose(c, path, id, time, p); const cavalry = soldierRole(c, id) === 'cavalry'; shapes.push({ p: [p[0]!, p[1]!], axes: [[Math.cos(p[2]!), -Math.sin(p[2]!)], [Math.sin(p[2]!), Math.cos(p[2]!)]], size: cavalry ? [.55, 1.35] : [.4, .4] }) }
    for (let i = 0; i < count; i++) for (let j = i + 1; j < count; j++) if (soldierRole(c, i) === 'cavalry' || soldierRole(c, j) === 'cavalry') assert.equal(overlap(shapes[i]!, shapes[j]!), false, `${count}/${ranks}/${mode}/${time}: ${i},${j}`);
  }
});
