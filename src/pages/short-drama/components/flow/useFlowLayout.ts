import { ref } from 'vue';
import type { XYPosition, ViewportTransform } from '@vue-flow/core';

interface Layout { positions: Record<string, XYPosition>; viewport?: ViewportTransform }
export function useFlowLayout(key: () => string) {
  const positions = ref<Record<string, XYPosition>>({}), viewport = ref<ViewportTransform>();
  const storageError = ref(false);
  function read() {
    positions.value = {}; viewport.value = undefined;
    try {
      const layout = JSON.parse(localStorage.getItem(key()) || 'null') as Layout | null;
      if (!layout) return;
      for (const [id, position] of Object.entries(layout.positions || {})) {
        if (position && Number.isFinite(position.x) && Number.isFinite(position.y)) positions.value[id] = position;
      }
      const view = layout.viewport;
      if (view && [view.x, view.y, view.zoom].every(Number.isFinite) && view.zoom >= 0.12 && view.zoom <= 1.8) viewport.value = view;
    } catch { storageError.value = true; }
  }
  function save() {
    try { localStorage.setItem(key(), JSON.stringify({ positions: positions.value, viewport: viewport.value })); storageError.value = false; }
    catch { storageError.value = true; }
  }
  function reset() { positions.value = {}; viewport.value = undefined; save(); }
  return { positions, viewport, storageError, read, save, reset };
}
