import type { GetSessionListVO } from '@/api/model/types';
import type { ShortDramaStoryboard } from '@/api/shortDrama/types';
import type { FlowShotPatch } from '@/utils/dramaFlowGraph';

export interface FlowShotState {
  blocked: boolean; unknown: boolean; hint: string; canRestore: boolean; previewSrc: string;
  canGenerate: boolean; busy: boolean;
}
export interface FlowActions {
  save: (id: string, patch: Partial<FlowShotPatch>, baseline: FlowShotPatch) => Promise<boolean>;
  generate: (id: string) => Promise<boolean>;
  query: (id: string) => Promise<unknown>;
  restore: (id: string) => Promise<unknown>;
  state: (shot: ShortDramaStoryboard) => FlowShotState;
}
export interface FlowModelSettings { models: GetSessionListVO[]; fallback?: string }
