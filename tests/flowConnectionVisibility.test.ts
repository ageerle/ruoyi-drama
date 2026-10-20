import assert from 'node:assert/strict';
import { test } from 'node:test';
import { visibleFlowConnections } from '../src/utils/flowConnectionVisibility.ts';

const links = [
  { id: 'a', source: 'actor', target: 'shot1' },
  { id: 'duplicate', source: 'actor', target: 'shot1' },
  { id: 'b', source: 'actor', target: 'shot2' },
  { id: 'c', source: 'voice', target: 'shot1' },
  { id: 'd', source: 'prop', target: 'shot2' },
];
test('opening and deselecting the canvas hide connections without altering bindings', () => {
  const before = structuredClone(links);
  assert.deepEqual(visibleFlowConnections(links, ''), []);
  assert.deepEqual(links, before);
});
test('selecting a shot shows its unique references, including the separate voice reference', () => {
  assert.deepEqual(visibleFlowConnections(links, 'shot1').map(link => link.id), ['a', 'c']);
});
test('selecting an asset shows its linked shots without merging shared uses', () => {
  assert.deepEqual(visibleFlowConnections(links, 'actor').map(link => link.id), ['a', 'b']);
});
test('focused connections deduplicate endpoints and keep original objects', () => {
  const shown = visibleFlowConnections(links, 'shot1');
  assert.deepEqual(shown.map(link => link.id), ['a', 'c']);
  assert.equal(shown[0], links[0]);
});
