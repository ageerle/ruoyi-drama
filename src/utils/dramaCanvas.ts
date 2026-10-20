export type CanvasKind = 'text' | 'script' | 'image' | 'video' | 'audio' | 'group' | 'previs';
export type ImagePurpose = 'character' | 'location' | 'prop' | 'frame';
export interface CanvasData {
  title: string; content: string; prompt: string; url: string; model: string;
  purpose?: ImagePurpose; actorNodeId?: string; order?: number; seconds?: number;
  resolution?: string; useStartFrame?: boolean; width?: number; height?: number;
  directorSourceId?: string;
  business?: { id: string; type: string; appearanceId?: string; scriptId?: string; sampleId?: string };
  job?: { id: string; model: string; type: string; status: string; url?: string };
}
export interface CanvasNode { id: string; kind: CanvasKind; position: { x: number; y: number }; parentId?: string; data: CanvasData }
export interface CanvasEdge { id: string; source: string; target: string }
export interface CanvasDocument { schema: 1; nodes: CanvasNode[]; edges: CanvasEdge[]; viewport?: { x: number; y: number; zoom: number } }
export const canvasLabels: Record<CanvasKind, string> = { text: '文本', script: '剧本', image: '图片', video: '视频', audio: '声音', previs: '3D 导演', group: '分组' };
export const canvasKinds = Object.keys(canvasLabels) as CanvasKind[];
export const emptyCanvas = (): CanvasDocument => ({ schema: 1, nodes: [], edges: [] });
export const copyCanvas = <T>(value: T): T => JSON.parse(JSON.stringify(value));
export function newCanvasNode(kind: CanvasKind, position: CanvasNode['position']): CanvasNode {
  return { id: `n-${crypto.randomUUID()}`, kind, position, data: { title: `${canvasLabels[kind]}节点`, content: '', prompt: '', url: '', model: '',
    ...(kind === 'image' ? { purpose: 'character' } : {}), ...(kind === 'video' ? { useStartFrame:false } : {}), ...(kind === 'group' ? { width: 650, height: 430 } : {}) } };
}
const inputs: Record<CanvasKind, CanvasKind[]> = { text: [], script: ['text'], image: ['text', 'script', 'image'], video: ['text', 'script', 'image', 'audio', 'video'], audio: ['text','image'], group: [], previs: ['text','script'] };
export function connectionIssue(doc: CanvasDocument, source: string, target: string): string {
  const from = doc.nodes.find(n => n.id === source), to = doc.nodes.find(n => n.id === target);
  if (!from || !to || source === target) return '请连接两个不同的节点';
  if (from.kind === 'previs') return '白模视频参考尚未接入生成；请进入 3D 导演台导出预演视频';
  if (!inputs[to.kind].includes(from.kind)) return '这两种节点不能建立输入关系';
  if (to.kind === 'audio' && from.kind === 'image' && from.data.purpose !== 'character') return '声音只能关联角色造型';
  if (to.kind === 'audio' && from.kind === 'image' && doc.edges.some(e => e.target === target && doc.nodes.find(n => n.id === e.source)?.kind === 'image')) return '一个声音节点只能关联一个角色';
  if (doc.edges.some(e => e.source === source && e.target === target)) return '引用已存在';
  const visited = new Set<string>();
  function reaches(id: string): boolean {
    if (id === source) return true;
    if (visited.has(id)) return false;
    visited.add(id); return doc.edges.filter(e => e.source === id).some(e => reaches(e.target));
  }
  return reaches(target) ? '连线不能形成循环' : '';
}
export function canvasInputs(doc: CanvasDocument, id: string) { return doc.edges.filter(e => e.target === id).map(e => doc.nodes.find(n => n.id === e.source)!).filter(Boolean); }
export function removeCanvasNodes(doc: CanvasDocument, ids: string[]): CanvasDocument {
  const removed = new Set(ids);
  // Deleting a group dissolves it. Its media survive, and undo restores membership.
  return { ...doc, nodes: doc.nodes.filter(n => !removed.has(n.id)).map(n => removed.has(n.parentId || '') ? { ...n, parentId: undefined } : n),
    edges: doc.edges.filter(e => !removed.has(e.source) && !removed.has(e.target)) };
}
export function cloneCanvasSelection(doc: CanvasDocument, selected: string[], offset = { x: 40, y: 40 }) {
  const ids = new Set(selected);
  doc.nodes.filter(n => n.parentId && ids.has(n.parentId)).forEach(n => ids.add(n.id));
  const map = new Map([...ids].map(id => [id, `n-${crypto.randomUUID()}`]));
  const nodes = doc.nodes.filter(n => ids.has(n.id)).map(n => {
    const clone = copyCanvas(n); clone.id = map.get(n.id)!; clone.position.x += offset.x; clone.position.y += offset.y;
    clone.parentId = n.parentId ? map.get(n.parentId) : undefined;
    if (clone.data.actorNodeId) clone.data.actorNodeId = map.get(clone.data.actorNodeId) || clone.data.actorNodeId;
    clone.data.title += ' · 副本'; delete clone.data.business; delete clone.data.job;
    if (clone.kind === 'previs') clone.data.directorSourceId = n.data.directorSourceId || n.id;
    if (['video', 'audio'].includes(clone.kind)) clone.data.url = '';
    return clone;
  });
  const edges = doc.edges.filter(e => ids.has(e.target)).map(e => ({ id: crypto.randomUUID(), source: map.get(e.source) || e.source, target: map.get(e.target)! }));
  return { nodes, edges };
}
export function groupCanvasSelection(doc: CanvasDocument, ids: string[]) {
  const children = doc.nodes.filter(n => ids.includes(n.id) && n.kind !== 'group');
  if (!children.length) throw new Error('先选择要成组的节点');
  const minX = Math.min(...children.map(n => n.position.x)), minY = Math.min(...children.map(n => n.position.y));
  const group = newCanvasNode('group', { x: minX - 30, y: minY - 52 });
  group.data.width = Math.max(...children.map(n => n.position.x + 320)) - minX + 60;
  group.data.height = Math.max(...children.map(n => n.position.y + 270)) - minY + 85;
  return { group, nodes: doc.nodes.map(n => children.includes(n) ? { ...n, parentId: group.id } : n) };
}
export function validateCanvas(value: unknown): CanvasDocument {
  const doc = value as CanvasDocument;
  if (!doc || doc.schema !== 1 || !Array.isArray(doc.nodes) || !Array.isArray(doc.edges) || doc.nodes.length > 500 || doc.edges.length > 1500) throw new Error('画布文件格式无效');
  const ids = new Set<string>();
  for (const n of doc.nodes) {
    if (!n.id || ids.has(n.id) || !canvasKinds.includes(n.kind) || !n.data || !Number.isFinite(n.position?.x) || !Number.isFinite(n.position?.y)
      || ['title', 'content', 'prompt', 'url', 'model'].some(key => typeof n.data[key as keyof CanvasData] !== 'string')) throw new Error('节点格式无效');
    ids.add(n.id);
  }
  const checked = { ...doc, edges: [] as CanvasEdge[] };
  const edgeIds = new Set<string>();
  for (const e of doc.edges) { if (!e.id || edgeIds.has(e.id)) throw new Error('连线编号无效'); edgeIds.add(e.id); const issue = connectionIssue(checked, e.source, e.target); if (issue) throw new Error(issue); checked.edges.push(e); }
  if (doc.viewport && (!Number.isFinite(doc.viewport.x) || !Number.isFinite(doc.viewport.y) || !Number.isFinite(doc.viewport.zoom) || doc.viewport.zoom < .08 || doc.viewport.zoom > 2)) throw new Error('画布视口无效');
  if (doc.nodes.some(n => n.parentId && (n.kind === 'group' || doc.nodes.find(g => g.id === n.parentId)?.kind !== 'group'))) throw new Error('分组关系无效');
  return copyCanvas(doc);
}
/** Story order honours explicit sequence links; unrelated shots keep the user's numbering. */
export function orderedCanvasVideos(doc: CanvasDocument) {
  const videos = doc.nodes.filter(n => n.kind === 'video').slice().sort((a,b) => (a.data.order || 0) - (b.data.order || 0));
  const result: CanvasNode[] = [], pending = new Set(videos.map(n => n.id));
  while (pending.size) {
    const next = videos.find(n => pending.has(n.id) && !doc.edges.some(e => e.target === n.id && pending.has(e.source)));
    if (!next) throw new Error('镜头顺序存在循环'); result.push(next); pending.delete(next.id);
  }
  return result;
}
