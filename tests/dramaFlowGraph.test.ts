import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bindFlowReference, buildDramaFlowGraph, flowShotSnapshot, type FlowMedia } from '../src/utils/dramaFlowGraph.ts';
import type { ShortDramaStoryboard } from '../src/api/shortDrama/types.ts';

const shot: ShortDramaStoryboard = { id: 's1', projectId: 'p1', scriptId: 'v1', sceneNo: 1, locationName: '街道',
  charactersJson: JSON.stringify([{ name: '刘三', appearance: '常服', identity: 'approved', blocking: '画左' }, { name: '师父', appearance: 0 }]),
  continuityJson: JSON.stringify({ visible_props: ['折扇'], voice_speakers: ['c1'], image_prediction_id: 'paid-frame',
    manual_start_frame: { url: '/approved.png', taskId: 'original-task' }, timing: { duration: 8 }, video_model: 'existing-model', source_media: { id: 'source' } }),
  videoId: 'paid-video', videoUrl: '/approved.mp4', videoStatus: 'done', imagePrompt: 'approved-image-prompt', sourceText: 'original-script' };
const character: FlowMedia = { id: 'character:c1:a2', kind: 'character', title: '刘三', subtitle: '礼服', appearance: 2 };
const prop: FlowMedia = { id: 'prop:p2', kind: 'prop', title: '灯笼', subtitle: '' };

test('changing a character appearance retains cast order, identity and unknown blocking fields', () => {
  const patch = bindFlowReference(shot, character);
  const cast = JSON.parse(patch.charactersJson!);
  assert.deepEqual(cast, [{ name: '刘三', appearance: 2, identity: 'approved', blocking: '画左' }, { name: '师父', appearance: 0 }]);
  assert.deepEqual(Object.keys(patch), ['charactersJson']);
  assert.equal(shot.videoId, 'paid-video');
});

test('adding and removing a prop preserves all unrelated continuity, approved media and submission associations', () => {
  const original = JSON.parse(shot.continuityJson!);
  const added = { ...shot, ...bindFlowReference(shot, prop) };
  assert.deepEqual(JSON.parse(added.continuityJson!), { ...original, visible_props: ['折扇', '灯笼'] });
  assert.equal(added.videoUrl, shot.videoUrl);
  assert.equal(added.videoId, shot.videoId);
  assert.equal(added.imagePrompt, shot.imagePrompt);
  assert.equal(added.sourceText, shot.sourceText);
  assert.deepEqual(JSON.parse(bindFlowReference(added, prop, true).continuityJson!), original);
});

test('malformed reference data fails closed instead of erasing existing business fields', () => {
  assert.throws(() => bindFlowReference({ ...shot, charactersJson: '{bad' }, character));
  assert.throws(() => bindFlowReference({ ...shot, continuityJson: '[]' }, prop));
  assert.throws(() => bindFlowReference({ ...shot, continuityJson: '{"visible_props":"灯笼"}' }, prop));
  assert.throws(() => bindFlowReference(shot, { ...character, kind: 'voice' }));
});

test('graph connections resolve the approved appearance and explicit props, never infer voice speakers from the cast', () => {
  const input = { characters: [{ id: 'c1', name: '刘三', appearances: [{ id: 'a2', appearanceIndex: 2, changeReason: '礼服' }, { id: 'a0', appearanceIndex: 0, changeReason: '常服' }] }],
    locations: [{ id: 'l1', name: '街道' }], shots: [shot, { ...shot, id: 's2', scriptId: 'v2', continuityJson: '{}' }],
    assets: [{ id: 'p1', kind: 'prop', title: '折扇', status: 'done', imageUrl: '/prop.png' }],
    voices: [{ characterId: 'c1', characterName: '刘三', sampleId: 'voice1', label: '声音', duration: 6 }] };
  const graph = buildDramaFlowGraph(input);
  assert.ok(graph.links.some(edge => edge.source === 'character:c1:a0' && edge.target === 'shot:s1'));
  assert.ok(graph.links.some(edge => edge.source === 'voice:c1:voice1' && edge.target === 'shot:s1'));
  assert.ok(!graph.links.some(edge => edge.source.startsWith('voice:') && edge.target === 'shot:s2'));
  assert.equal(new Set(graph.media.map(node => node.id)).size, graph.media.length);
  assert.notDeepEqual(flowShotSnapshot(shot), flowShotSnapshot({ ...shot, charactersJson: '[]' }));
});
