import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/** The two workspaces use different data; navigation must survive reload without opening both. */
export function useDramaWorkspaceView(projectId: () => string | null) {
  const route = useRoute();
  const router = useRouter();
  const referencesOpen = computed(() => route.query.view === 'references');
  const canvasOpen = computed(() => !referencesOpen.value && route.query.canvas === '1');

  async function navigate(view: 'references' | 'canvas' | 'workbench') {
    const query = { ...route.query };
    delete query.view;
    delete query.canvas;
    const id = projectId();
    if (id) query.projectId = id;
    if (view === 'references') query.view = 'references';
    if (view === 'canvas') query.canvas = '1';
    await router.replace({ name: 'shortDrama', query });
  }
  return { referencesOpen, canvasOpen, openReferences: () => navigate('references'),
    openCanvas: () => navigate('canvas'), close: () => navigate('workbench') };
}
