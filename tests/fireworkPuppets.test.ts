import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Vector3 } from 'three';
import { LAYOUT, angleAt, defaultConfig, emissionAt, parseConfig, particleAt } from '../src/features/firework-puppets/model.ts';

test('a wheel retains multiple complete revolutions and reverses about the same fixed axis', () => {
  const c = defaultConfig(), layer = c.layers.find(l => l.id === 'left-wheel')!;
  layer.phase = 0; layer.start = 0; layer.end = 15; layer.rpm = 30;
  const forward = angleAt(layer, 8);
  assert.ok(forward > 6 * Math.PI);
  layer.rpm = -30; assert.equal(angleAt(layer, 8), -forward);
  assert.equal(angleAt(layer, 0), 0);
  assert.equal(angleAt(layer, 20), angleAt(layer, 15));
});
test('particle sources follow the same Y and Z rotations as actual Three.js objects', () => {
  const c = defaultConfig();
  for (const id of ['upper-rings', 'left-wheel'] as const) {
    const layout = LAYOUT.find(l => l.id === id)!, layer = c.layers.find(l => l.id === id)!, at = new Float64Array(9);
    layer.phase = 0; layer.start = 0;
    const original = new Vector3(layout.radius, layout.rings[0], 0), axis = layout.axis === 'y' ? new Vector3(0, 1, 0) : new Vector3(0, 0, 1);
    for (const time of [0, .5, 3.7, 8.4]) {
      emissionAt(layout, layer, 0, time, c.speed, at);
      const expected = original.clone().applyAxisAngle(axis, angleAt(layer, time, c.speed)).add(new Vector3(...layout.center));
      if (layout.axis === 'z') expected.z += .06;
      assert.ok(new Vector3(at[0], at[1], at[2]).distanceTo(expected) < 1e-10);
    }
  }
});
test('world-space sparks seek deterministically and fall further with higher gravity', () => {
  const c = defaultConfig(), layout = LAYOUT.find(l => l.id === 'left-wheel')!, layer = c.layers.find(l => l.id === layout.id)!;
  const first = new Float64Array(9), second = new Float64Array(9), again = new Float64Array(9);
  assert.equal(particleAt(c, layout, layer, 0, 3, 129, 3.3, first), true);
  assert.equal(particleAt(c, layout, layer, 0, 3, 129, 3.7, second), true);
  assert.ok(second[1]! < first[1]! + 2);
  particleAt(c, layout, layer, 0, 3, 129, 3.3, again); assert.deepEqual(first, again);
  const lowGravity = [...second]; c.gravity *= 2; particleAt(c, layout, layer, 0, 3, 129, 3.7, second);
  assert.ok(second[1]! < lowGravity[1]!);
});
test('config import rejects malformed, duplicate, unlimited and non-finite settings', () => {
  const c = defaultConfig(); assert.deepEqual(parseConfig(c), c);
  assert.throws(() => parseConfig({ ...c, density: 10000 }));
  assert.throws(() => parseConfig({ ...c, gravity: NaN }));
  assert.throws(() => parseConfig({ ...c, color: '<script>' }));
  const broken = defaultConfig(); broken.layers[1] = broken.layers[0]!; assert.throws(() => parseConfig(broken));
  const impossible = defaultConfig(); impossible.layers[0]!.end = impossible.layers[0]!.start; assert.throws(() => parseConfig(impossible));
});
