import { computed, onUnmounted, shallowRef } from 'vue';
import { readDirector, saveDirector } from '@/api/shortDrama/director';
import { cloneDirector, emptyDirector, validateDirector, type DirectorDocument } from '@/utils/dramaDirector';

export function useDirectorDocument(project: string, id: string, fork?: string) {
  const document = shallowRef(emptyDirector()), ready = shallowRef(false), revision = shallowRef(0), saving = shallowRef(false), dirty = shallowRef(false), error = shallowRef('');
  const past = shallowRef<DirectorDocument[]>([]), future = shallowRef<DirectorDocument[]>([]);
  let timer: ReturnType<typeof setTimeout> | undefined, alive = true, pending: Promise<boolean> | undefined;
  function schedule() { clearTimeout(timer); if (!error.value) timer = setTimeout(() => void save(), 1200); }
  function replace(value: DirectorDocument, history = true) {
    if (!ready.value) return;
    const checked = validateDirector(value); if (JSON.stringify(checked) === JSON.stringify(document.value)) return;
    if (history) { past.value = [...past.value.slice(-49), cloneDirector(document.value)]; future.value = []; }
    document.value = checked; dirty.value = true; schedule();
  }
  function undo() { const prev = past.value[past.value.length-1]; if (!prev) return; future.value = [...future.value, document.value]; past.value = past.value.slice(0, -1); document.value = prev; dirty.value = true; schedule(); }
  function redo() { const next = future.value[future.value.length-1]; if (!next) return; past.value = [...past.value, document.value]; future.value = future.value.slice(0, -1); document.value = next; dirty.value = true; schedule(); }
  async function load() {
    clearTimeout(timer); if (pending) await pending;
    ready.value = false; error.value = '';
    try {
      const saved = await readDirector(project, id);
      let initial = saved.document;
      if (!initial && fork) initial = (await readDirector(project, fork)).document;
      if (!alive) return;
      document.value = initial ? validateDirector(initial) : emptyDirector(); revision.value = saved.revision;
      dirty.value = !saved.document; past.value = []; future.value = []; ready.value = true; if (dirty.value) schedule();
    } catch (e) { error.value = e instanceof Error ? e.message : '读取失败'; }
  }
  async function save(): Promise<boolean> {
    clearTimeout(timer); if (pending) { if (!await pending) return false; return save(); }
    if (!ready.value) return false; if (!dirty.value) return true;
    const snapshot = cloneDirector(document.value); saving.value = true;
    pending = (async () => {
      try { const saved = await saveDirector(project, id, revision.value, snapshot); revision.value = saved.revision; dirty.value = JSON.stringify(snapshot) !== JSON.stringify(document.value); error.value = ''; return true; }
      catch (e) { error.value = e instanceof Error ? e.message : '保存失败'; return false; }
      finally { saving.value = false; pending = undefined; }
    })();
    const ok = await pending; if (ok && dirty.value && alive) schedule(); return ok;
  }
  function guard(event: BeforeUnloadEvent) { if (dirty.value) { event.preventDefault(); event.returnValue = ''; } }
  window.addEventListener('beforeunload', guard);
  onUnmounted(() => { alive = false; clearTimeout(timer); window.removeEventListener('beforeunload', guard); });
  return { document, ready, revision, saving, dirty, error, replace, undo, redo, load, save, canUndo: computed(() => !!past.value.length), canRedo: computed(() => !!future.value.length) };
}
