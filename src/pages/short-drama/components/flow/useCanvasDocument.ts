import { computed, onUnmounted, ref, shallowRef } from 'vue';
import { readCanvas, saveCanvas } from '@/api/shortDrama/canvas';
import { copyCanvas, emptyCanvas, validateCanvas, type CanvasDocument, type CanvasNode } from '@/utils/dramaCanvas';

export function useCanvasDocument(project: string) {
  const document = ref<CanvasDocument>(emptyCanvas()), ready = shallowRef(false), revision = shallowRef(0), saving = shallowRef(false), error = shallowRef(''), dirty = shallowRef(false);
  const past = ref<CanvasDocument[]>([]), future = ref<CanvasDocument[]>([]);
  const durable = new Map<string, Pick<CanvasNode['data'], 'business' | 'job'>>();
  let timer: ReturnType<typeof setTimeout> | undefined, alive = true, inFlight: Promise<boolean> | undefined;
  function schedule() { clearTimeout(timer); timer = setTimeout(() => void save(), 1100); }
  function replace(value: CanvasDocument, history = true) {
    if (history) { past.value.push(copyCanvas(document.value)); if (past.value.length > 60) past.value.shift(); future.value = []; }
    document.value = copyCanvas(value); dirty.value = true; error.value = ''; schedule();
  }
  function business(id: string, patch: Partial<CanvasNode['data']>) {
    const node = document.value.nodes.find(n => n.id === id); if (!node) return;
    Object.assign(node.data, patch); durable.set(id, { business: node.data.business, job: node.data.job }); dirty.value = true; schedule();
  }
  function recover(value: CanvasDocument) { value.nodes.forEach(n => { const stable = durable.get(n.id); if (stable) Object.assign(n.data, copyCanvas(stable)); }); document.value = value; dirty.value = true; schedule(); }
  function undo() { const previous = past.value.pop(); if (!previous) return; future.value.push(copyCanvas(document.value)); recover(previous); }
  function redo() { const next = future.value.pop(); if (!next) return; past.value.push(copyCanvas(document.value)); recover(next); }
  async function load() {
    error.value = ''; ready.value = false;
    try { const saved = await readCanvas(project); if (!alive) return; document.value = saved.document ? validateCanvas(saved.document) : emptyCanvas(); revision.value = saved.revision; dirty.value = false; past.value = []; future.value = []; ready.value = true; document.value.nodes.forEach(n => durable.set(n.id, { business:n.data.business,job:n.data.job })); }
    catch (failure) { error.value = failure instanceof Error ? failure.message : '画布读取失败'; }
  }
  async function save(): Promise<boolean> {
    clearTimeout(timer);
    if (inFlight) { if (!await inFlight) return false; return save(); }
    if (!ready.value) return false;
    if (!dirty.value) return true;
    const snapshot = copyCanvas(document.value), hash = JSON.stringify(snapshot);
    saving.value = true; error.value = '';
    inFlight = (async () => {
      try { const saved = await saveCanvas(project, revision.value, snapshot); revision.value = saved.revision; dirty.value = JSON.stringify(document.value) !== hash; return true; }
      catch (failure) { error.value = failure instanceof Error ? failure.message : '画布保存失败'; return false; }
      finally { saving.value = false; inFlight = undefined; }
    })();
    const success = await inFlight; if (success && dirty.value && alive) schedule(); return success;
  }
  function beforeUnload(event: BeforeUnloadEvent) { if (dirty.value) { event.preventDefault(); event.returnValue = ''; } }
  window.addEventListener('beforeunload', beforeUnload);
  onUnmounted(() => { alive = false; clearTimeout(timer); window.removeEventListener('beforeunload', beforeUnload); });
  return { document, ready, revision, saving, error, dirty, canUndo: computed(() => !!past.value.length), canRedo: computed(() => !!future.value.length), replace, business, undo, redo, load, save };
}
