import { onUnmounted, ref, watch } from 'vue';
import { readShortDramaResource } from '@/api/shortDrama/resources';
import type { ShortDramaCharacter } from '@/api/shortDrama/types';
import type { FlowAsset, FlowVoice } from '@/utils/dramaFlowGraph';
import type { VoiceView } from '@/api/shortDrama/voices';

export function useFlowResources(project: () => string, characters: () => ShortDramaCharacter[], supplied: () => { assets?: FlowAsset[]; voices?: FlowVoice[] }) {
  const assets = ref<FlowAsset[]>([]), voices = ref<FlowVoice[]>([]), error = ref(''), loading = ref(false);
  let epoch = 0;
  async function refresh() {
    const current = ++epoch;
    const projectId = project();
    if (supplied().assets && supplied().voices) { assets.value = supplied().assets!; voices.value = supplied().voices!; return; }
    loading.value = true; error.value = '';
    const results = await Promise.allSettled([
      readShortDramaResource<{ assets: FlowAsset[] }>(`/short-drama/${projectId}/visual-assets`),
      (async () => {
        const found: FlowVoice[] = [];
        const rows = characters().filter(character => character.id);
        let failed = 0;
        // Limit optional media reads; opening a canvas never submits generation jobs.
        for (let index = 0; index < rows.length; index += 4) {
          if (current !== epoch) return found;
          const batch = await Promise.allSettled(rows.slice(index, index + 4).map(character =>
            readShortDramaResource<VoiceView>(`/short-drama/${projectId}/characters/${character.id}/voice`)));
          batch.forEach((result, offset) => {
            if (result.status === 'rejected') { failed++; return; }
            const profile = result.value.profile;
            const sample = profile?.samples?.find(item => item.id === profile.selectedSampleId);
            if (sample) found.push({ characterId: rows[index + offset]!.id!, characterName: rows[index + offset]!.name,
              sampleId: sample.id, label: sample.label || '已选样音', duration: sample.duration });
          });
        }
        return { found, failed };
      })(),
    ]);
    if (current !== epoch) return;
    const visual = results[0], audio = results[1];
    if (visual?.status === 'fulfilled' && Array.isArray(visual.value.assets)) assets.value = visual.value.assets;
    else error.value = '道具和镜头参考图读取失败';
    if (audio?.status === 'fulfilled' && !Array.isArray(audio.value)) {
      voices.value = audio.value.found;
      if (audio.value.failed) error.value += `${error.value ? '；' : ''}部分声音读取失败`;
    } else error.value += `${error.value ? '；' : ''}声音读取失败`;
    loading.value = false;
  }
  watch([project, () => characters().map(character => character.id).join(',')], () => { assets.value = []; voices.value = []; void refresh(); }, { immediate: true });
  onUnmounted(() => { epoch++; });
  return { assets, voices, loading, error, refresh };
}
