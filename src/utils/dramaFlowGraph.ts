import type { ShortDramaCharacter, ShortDramaLocation, ShortDramaStoryboard } from '../api/shortDrama/types';
import { selectStoryboardAppearance } from './storyboardAppearance.ts';

export type FlowKind = 'character' | 'location' | 'prop' | 'voice' | 'shot';
export interface FlowAsset { id: string; kind: string; title: string; status: string; storyboardId?: string; imageUrl?: string; model?: string; predictionId?: string }
export interface FlowVoice { characterId: string; characterName: string; sampleId: string; label: string; duration: number }
export interface FlowMedia {
  id: string; kind: FlowKind; title: string; subtitle: string; imageUrl?: string;
  model?: string; predictionId?: string; characterId?: string; appearance?: number | string;
  assetId?: string; sampleId?: string; duration?: number; shot?: ShortDramaStoryboard;
}
export interface FlowLink { id: string; source: string; target: string; label: string }
export type FlowShotPatch = Pick<ShortDramaStoryboard, 'sceneTitle' | 'videoPrompt' | 'charactersJson' | 'locationName' | 'continuityJson'>;
export const flowKindLabels: Record<FlowKind, string> = { character: '角色', location: '场景', prop: '道具', voice: '声音', shot: '视频' };

function parse(value: string | undefined): unknown {
  try { return JSON.parse(value || 'null'); } catch { return null; }
}
export function flowContinuity(shot: ShortDramaStoryboard): Record<string, unknown> {
  if (!shot.continuityJson?.trim()) return {};
  const value = parse(shot.continuityJson);
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('承接信息格式无效，请先在分镜编辑中修复');
  return value as Record<string, unknown>;
}
function castOf(shot: ShortDramaStoryboard): Array<Record<string, unknown>> {
  if (!shot.charactersJson?.trim()) return [];
  const value = parse(shot.charactersJson);
  if (!Array.isArray(value) || value.some(item => !item || typeof item !== 'object' || Array.isArray(item))) throw new Error('角色引用格式无效，请先在分镜编辑中修复');
  return value;
}
function selectedImage(value?: string, index?: number, fallback?: string) {
  const urls = parse(value);
  if (!Array.isArray(urls)) return fallback;
  const url = urls[index != null && index >= 0 && index < urls.length ? index : 0];
  return typeof url === 'string' && url ? url : fallback;
}
export function flowShotSnapshot(shot: ShortDramaStoryboard): FlowShotPatch {
  return { sceneTitle: shot.sceneTitle, videoPrompt: shot.videoPrompt, charactersJson: shot.charactersJson,
    locationName: shot.locationName, continuityJson: shot.continuityJson };
}

/** A connection changes a business reference, never a media URL, task ID or approved asset. */
export function bindFlowReference(shot: ShortDramaStoryboard, source: FlowMedia, remove = false): Partial<FlowShotPatch> {
  if (source.kind === 'character') {
    const cast = castOf(shot);
    const previous = cast.find(item => item.name === source.title);
    const others = cast.filter(item => item.name !== source.title);
    const replacement = { ...previous, name: source.title, appearance: source.appearance };
    const next = previous ? cast.map(item => item === previous ? replacement : item) : [...cast, replacement];
    return { charactersJson: JSON.stringify(remove ? others : next, null, 2) };
  }
  if (source.kind === 'location') return { locationName: remove ? '' : source.title };
  if (source.kind === 'prop') {
    const continuity = flowContinuity(shot);
    const names = continuity.visible_props;
    if (names != null && (!Array.isArray(names) || names.some(name => typeof name !== 'string'))) throw new Error('道具引用格式无效，请先修复 visible_props');
    const others = (names as string[] | undefined || []).filter(name => name !== source.title);
    return { continuityJson: JSON.stringify({ ...continuity, visible_props: remove ? others : [...others, source.title] }, null, 2) };
  }
  throw new Error('请将角色、场景或道具的输出端连接到视频节点；声音绑定请在原分镜编辑中调整');
}

export function buildDramaFlowGraph(input: {
  characters: ShortDramaCharacter[]; locations: ShortDramaLocation[]; shots: ShortDramaStoryboard[];
  assets: FlowAsset[]; voices: FlowVoice[];
}): { media: FlowMedia[]; links: FlowLink[] } {
  const media: FlowMedia[] = [];
  for (const character of input.characters) {
    const appearances = character.appearances?.length ? character.appearances : [undefined];
    appearances.forEach((appearance, index) => {
      media.push({ id: `character:${character.id || character.name}:${appearance?.id ?? appearance?.appearanceIndex ?? index}`,
        kind: 'character', title: character.name, subtitle: appearance?.changeReason || '初始形象', characterId: character.id,
        appearance: appearance?.appearanceIndex ?? appearance?.changeReason ?? index,
        imageUrl: selectedImage(appearance?.imageUrls, appearance?.selectedImageIndex, appearance?.referenceImageUrl || character.referenceImageUrl) });
    });
  }
  input.locations.forEach(location => media.push({ id: `location:${location.id || location.name}`, kind: 'location', title: location.name,
    subtitle: location.summary || '场景参考', imageUrl: selectedImage(location.imageUrls, location.selectedImageIndex, location.referenceImageUrl) }));
  input.assets.filter(asset => asset.kind === 'prop' && asset.status !== 'archived').forEach(asset => media.push({
    id: `prop:${asset.id}`, kind: 'prop', title: asset.title, subtitle: asset.status === 'done' ? '道具参考' : '暂无参考图',
    assetId: asset.id, imageUrl: asset.imageUrl, model: asset.model, predictionId: asset.predictionId,
  }));
  input.voices.forEach(voice => media.push({ id: `voice:${voice.characterId}:${voice.sampleId}`, kind: 'voice', title: voice.characterName,
    subtitle: voice.label, characterId: voice.characterId, sampleId: voice.sampleId, duration: voice.duration }));
  input.shots.forEach(shot => {
    const continuity = parse(shot.continuityJson) as Record<string, unknown> | null;
    const frame = input.assets.find(asset => asset.kind === 'shot_frame' && asset.storyboardId === shot.id && asset.status === 'done');
    const manual = continuity?.manual_start_frame as { url?: string } | undefined;
    media.push({ id: `shot:${shot.id || `${shot.scriptId}:${shot.sceneNo}`}`, kind: 'shot', title: shot.sceneTitle || `镜头 ${shot.sceneNo}`,
      subtitle: shot.sceneText || '补充镜头内容', shot, imageUrl: manual?.url || frame?.imageUrl,
      model: manual?.url ? undefined : frame?.model, predictionId: manual?.url ? undefined : frame?.predictionId,
      duration: shot.durationSeconds });
  });
  const links: FlowLink[] = [];
  function link(source: FlowMedia | undefined, target: FlowMedia, label: string) {
    if (source && !links.some(edge => edge.source === source.id && edge.target === target.id)) links.push({ id: `${source.id}->${target.id}`, source: source.id, target: target.id, label });
  }
  for (const target of media.filter(item => item.kind === 'shot')) {
    const shot = target.shot!;
    const cast = parse(shot.charactersJson);
    for (const reference of Array.isArray(cast) ? cast : []) {
      if (!reference || typeof reference.name !== 'string') continue;
      const character = input.characters.find(item => item.name === reference.name);
      const appearance = selectStoryboardAppearance(character?.appearances || [], reference.appearance);
      link(media.find(item => item.kind === 'character' && item.title === reference.name && item.appearance === (appearance?.appearanceIndex ?? appearance?.changeReason ?? 0)), target, '角色参考');
    }
    link(media.find(item => item.kind === 'location' && item.title === shot.locationName), target, '场景参考');
    const continuity = parse(shot.continuityJson) as Record<string, unknown> | null;
    for (const name of Array.isArray(continuity?.visible_props) ? continuity.visible_props : []) link(media.find(item => item.kind === 'prop' && item.title === name), target, '道具参考');
    for (const id of Array.isArray(continuity?.voice_speakers) ? continuity.voice_speakers : []) link(media.find(item => item.kind === 'voice' && item.characterId === String(id)), target, '指定说话人');
  }
  return { media, links };
}
