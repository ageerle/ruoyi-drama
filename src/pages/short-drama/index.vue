<script setup lang="ts">
import StoryboardReferenceImages from './components/StoryboardReferenceImages.vue';
import DramaProductionSkills from './components/DramaProductionSkills.vue';
import AssetVisualStyle from './components/AssetVisualStyle.vue';
import ShotEditorHeader from './components/ShotEditorHeader.vue';
import ShotGenerationSettings from './components/ShotGenerationSettings.vue';
import ShotDesignCard from './components/ShotDesignCard.vue';
import StoryboardGenerationBoard from './components/StoryboardGenerationBoard.vue';
import { useStoryboardPlanning } from '@/composables/useStoryboardPlanning';
import { storyboardKey, useStoryboardWorkspace } from '@/composables/useStoryboardWorkspace';
import { useAssetAnalysis } from '@/composables/useAssetAnalysis';
import AssetGenerationBoard from './components/AssetGenerationBoard.vue';
import ShotVideoPanel from './components/ShotVideoPanel.vue';
import ShotBatchSelect from './components/ShotBatchSelect.vue';
import ReferenceAudio from './components/ReferenceAudio.vue';
import CharacterLibrary from './components/CharacterLibrary.vue';
import StudioSection from '@/components/studio/StudioSection.vue';
import StudioDisclosure from '@/components/studio/StudioDisclosure.vue';
import ShotCharacterVoices from './components/ShotCharacterVoices.vue';
import MusicGeneration from './components/MusicGeneration.vue';
import { dramaSkillBindingsChanged, projectSkillBindings, validateDramaSkillChanges } from '@/utils/dramaSkillBindings';
import { useDramaSkillCatalog } from '@/composables/useDramaSkillCatalog';
import { needsAssetImage } from '@/utils/missingAssetImages';
import { useStoryboardVideoSubmission } from '@/composables/useStoryboardVideoSubmission';
import { isLocalVideoTask, isUnresolvedVideoTask, videoSubmissionRecoveryAllowed } from '@/utils/storyboardVideoSubmission';
import { ShortDramaResponseError } from '@/utils/shortDramaResponse';
import { useWorkflowFeedback } from '@/composables/useWorkflowFeedback';
import type { WorkflowRequest } from '@/utils/workflowFeedback';
import { requireAnalyzedAssets } from '@/utils/shortDramaAssetAnalysis';
import ContinuityReview from './components/ContinuityReview.vue';
import ShotVideoReferences from './components/ShotVideoReferences.vue';
import { storyboardVideoModel } from '@/utils/storyboardVideoModel';
import { videoSecondsIssue } from '@/utils/videoDuration';
import VisualAssetCoverage from './components/VisualAssetCoverage.vue';
import FixedPropEditor from './components/FixedPropEditor.vue';
import ShotFramePreview from './components/ShotFramePreview.vue';
import AssetImageGallery from './components/AssetImageGallery.vue';
import GeneratedAssetImage from './components/GeneratedAssetImage.vue';
import ShotSourceMaterial from './components/ShotSourceMaterial.vue';
import ShotNavigator from './components/ShotNavigator.vue';
import ScriptGenerationPanel from './components/ScriptGenerationPanel.vue';
import ScriptReader from './components/ScriptReader.vue';
import VideoPromptEditor from './components/VideoPromptEditor.vue';
import { formatScriptText } from '@/utils/scriptFormatting';
import { useScriptCreation } from '@/composables/useScriptCreation';
import { reviewShot } from './shotReview';
import { flowShotSnapshot, type FlowMedia } from '@/utils/dramaFlowGraph';
import type { FlowActions } from './components/flow/types';
/*
 * 国际化（i18n）迁移约定 —— 第二批机械迁移时遵循：
 * 1. code→label 映射表（roleLevelLabels / artStyleLabels / phaseLabels 等）改为 computed，
 *    code 不变，只把 label 换成 t('shortDrama.xxx.<key>')，模板用法由 map[k] 改为 map.value[k]。
 * 2. 选项数组（artStyleOptions / videoRatioOptions / transitionOptions）改为
 *    computed(() => getXxxOptions(t))（见 @/constants/drama）。
 * 3. ~50 条 ElMessage → t('shortDrama.messages.*')；带参数的（如 '生成失败：' + e.message）用 { reason } 命名插值。
 * 4. ElMessageBox（删除项目确认）的 title/body/按钮 → shortDrama.messages.deleteConfirm*。
 * 5. SSE phase 标签改为 computed，源自 shortDrama.sse.phases.*。
 * 6. ~110 模板字符串按 step 归入 shortDrama.ui.<step>.*。
 * 7. 后端返回的自由文本字段（scriptText / sceneTitle / personalityTags / modelDescribe / 错误 msg 等）
 *    已带语言，前端原样渲染，不得用 t() 包裹。
 *
 * 本轮已迁移代表性切片：workflowSteps、composeStatusLabels，以及若干 ElMessage，作为模式验证。
 */
import { computed, defineAsyncComponent, nextTick, onMounted, onUnmounted, ref, shallowRef, useTemplateRef, watch } from 'vue';
import { ElMessageBox } from 'element-plus';
import { ElMessage } from '@/utils/message';
import { useRoute, useRouter } from 'vue-router';
import { useDramaWorkspaceView } from '@/composables/useDramaWorkspaceView';
import { useI18n } from 'vue-i18n';
import {
  composeShortDramaVideo,
  confirmAppearanceImage,
  confirmLocationImage,
  deleteAppearanceImage,
  deleteLocationImage,
  deleteShortDramaProject,
  downloadShortDramaVideo,
  generateShortDramaAudio,
  generateAllVideos,
  generateStoryboardVideo,
  getStoryboardVideoSubmission,
  getPrediction,
  getShortDramaComposeStatus,
  getShortDramaDetail,
  listShortDramaProjects,
  polishScript,
  retrieveStoryboardVideo,
  saveShortDramaProject,
  saveShortDramaScript,
  saveShortDramaAudio,
  saveShortDramaAppearance,
  saveShortDramaLocation,
  saveShortDramaStoryboard,
  addShortDramaStoryboard,
  deleteShortDramaStoryboard,
  selectAppearanceImage,
  selectLocationImage,
  startImageGeneration,
  undoAppearanceImage,
  undoLocationImage,
  updateShortDramaAudio,
  uploadReferenceImage,
} from '@/api/shortDrama';
import type { ShortDramaVideoSubmission } from '@/api/shortDrama';
import { getModelList } from '@/api/model';
import { handleLoginRequired } from '@/utils/loginRequired';
import type { GetSessionListVO } from '@/api/model/types';
import type {
  ShortDramaAspectRatio,
  ShortDramaAudio,
  ShortDramaCharacter,
  ShortDramaCharacterAppearance,
  ShortDramaComposeVideoRequest,
  ShortDramaComposeVideoResult,
  ShortDramaComposeStatus,
  ShortDramaDetail,
  ShortDramaLocation,
  ShortDramaProject,
  ShortDramaScript,
  ShortDramaStoryboard,
  ShortDramaTransitionType,
  SnowflakeId,
} from '@/api/shortDrama/types';

type StageName = 'script' | 'assets' | 'storyboard';
type StepName = 'idea' | 'script' | 'assets' | 'storyboard';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const storyboardToolsCollapsed = ref(true);
const FlowDesigner = defineAsyncComponent(() => import('./components/flow/FlowDesigner.vue'));
const FlowStudio = defineAsyncComponent(() => import('./components/flow/FlowStudio.vue'));
const { referencesOpen: flowDesignerOpen, canvasOpen: flowStudioOpen,
  openReferences: openFlowDesigner, openCanvas: openFlowStudio, close: closeFlowWorkspace,
} = useDramaWorkspaceView(() => currentProjectId.value);
async function refreshCanvasProject() {
  if (currentProjectId.value) await loadDetail(currentProjectId.value);
}
async function handleCreateCanvasProject() {
  try {
    const { value } = await ElMessageBox.prompt('输入短剧名称，创建后进入空白画布。', '新建画布项目', { inputPlaceholder: '短剧名称', inputValidator: value => !!value?.trim() || '请填写短剧名称', confirmButtonText: '创建', cancelButtonText: '取消' });
    const projectId = await saveShortDramaProject({ projectName: value.trim(), status: 'draft' });
    if (!projectId) throw new Error('项目创建未返回编号');
    await closeFlowWorkspace();
    await loadDetail(projectId);
    await refreshProjects();
    await openFlowStudio();
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') ElMessage.error(error instanceof Error ? error.message : '创建失败');
  }
}
// Auxiliary production tools stay outside the focused storyboard editor.
const showStoryboardAuxiliaryTools = false;

const workflowSteps = computed<Array<{ name: StepName; index: string; title: string; desc: string }>>(() => [
  { name: 'idea', index: '01', title: t('shortDrama.workflow.idea.title'), desc: t('shortDrama.workflow.idea.desc') },
  { name: 'script', index: '02', title: t('shortDrama.workflow.script.title'), desc: t('shortDrama.workflow.script.desc') },
  { name: 'assets', index: '03', title: t('shortDrama.workflow.assets.title'), desc: t('shortDrama.workflow.assets.desc') },
  { name: 'storyboard', index: '04', title: t('shortDrama.workflow.storyboard.title'), desc: t('shortDrama.workflow.storyboard.desc') },
]);

const videoRatioOptions: Array<{ label: string; value: ShortDramaAspectRatio }> = [
  { label: '横屏 16:9', value: '16:9' },
  { label: '横屏 4:3', value: '4:3' },
  { label: '方形 1:1', value: '1:1' },
  { label: '竖屏 3:4', value: '3:4' },
  { label: '竖屏 9:16', value: '9:16' },
  { label: '超宽屏 21:9', value: '21:9' },
];

const transitionOptions: Array<{ label: string; value: ShortDramaTransitionType }> = [
  { label: '无转场', value: 'none' },
  { label: '溶解', value: 'dissolve' },
  { label: '淡入淡出', value: 'fade' },
  { label: '滑动', value: 'slide' },
];

const transitionDurationOptions = [0.3, 0.5, 1, 1.5];
const composeStatusLabels = computed<Record<ShortDramaComposeStatus, string>>(() => ({
  pending: t('shortDrama.compose.status.pending'),
  processing: t('shortDrama.compose.status.processing'),
  done: t('shortDrama.compose.status.done'),
  failed: t('shortDrama.compose.status.failed'),
}));


const roleLevelOrder: Record<string, number> = { S: 0, A: 1, B: 2, C: 3, D: 4 };

const projects = ref<ShortDramaProject[]>([]);
const models = ref<GetSessionListVO[]>([]);
const videoModels = ref<GetSessionListVO[]>([]);
const imageModels = ref<GetSessionListVO[]>([]);
const audioModels = ref<GetSessionListVO[]>([]);
const musicModels = ref<GetSessionListVO[]>([]);
const soundRefreshKey = ref(0);
const currentProjectId = ref<SnowflakeId | null>(null);
const projectListRef = useTemplateRef<HTMLElement>('projectListRef');
watch(currentProjectId, async () => {
  await nextTick();
  projectListRef.value?.querySelector<HTMLElement>('.project-item.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
});
const detail = ref<ShortDramaDetail | null>(null);
const characters = ref<ShortDramaCharacter[]>([]);
const locations = ref<ShortDramaLocation[]>([]);
const audios = ref<ShortDramaAudio[]>([]);
const narrationDraft = ref('');
const generatingNarration = ref(false);

const visualAssetCoverageRef = useTemplateRef<InstanceType<typeof VisualAssetCoverage>>('visualAssetCoverageRef');
type AssetCategoryTab = 'props' | 'characters' | 'locations';
const assetCategoryTab = shallowRef<AssetCategoryTab>('characters');
const visualAssetStats = ref({ props: 0, materials: 0, completed: 0, total: 0 });
const savingAssetPrompts = ref(false);
const storyboardDrafts = ref<ShortDramaStoryboard[]>([]);
const sortedCharacters = computed(() => characters.value
  .map((character, index) => ({ character, index }))
  .sort((left, right) =>
    (roleLevelOrder[left.character.roleLevel || ''] ?? 99) - (roleLevelOrder[right.character.roleLevel || ''] ?? 99)
    || left.index - right.index)
  .map(item => item.character));
const activeStage = ref<StageName>('script');
const activeStep = ref<StepName>('idea');
const maxReachedStep = ref<StepName>('idea');

const loadingModels = ref(false);
const loadingProjects = ref(false);
const scriptCreation = useScriptCreation();
const { job: scriptCreationJob, busy: generating } = scriptCreation;
let viewMounted = true;
const savingScript = ref(false);
const workflowFeedback = useWorkflowFeedback(currentProjectId);
const { message: workflowFailureMessage, records: workflowFailures, dismiss: dismissWorkflowFeedback } = workflowFeedback;
const polishingScript = ref(false);
const scriptEditing = ref(false);
const generatingVideo = ref<Record<SnowflakeId, boolean>>({});
const videoSubmissions = useStoryboardVideoSubmission();
const videoQueryHints = ref<Record<SnowflakeId, string>>({});
const videoSubmissionReceipts = ref<Record<SnowflakeId, ShortDramaVideoSubmission | null>>({});
const generatingAllVideos = ref(false);
const savingStoryboard = ref(false);
const pollingTimers = ref<Record<SnowflakeId, ReturnType<typeof setInterval>>>({});
const composeForm = ref<ShortDramaComposeVideoRequest>({
  transitionType: 'fade',
  transitionDurationSeconds: 0.3,
  aspectRatio: '9:16',
  storyboardIds: [],
  narrationAudioId: undefined,
  watermark: true,
});
const composeStoryboardIds = ref<SnowflakeId[]>([]);
const composeResult = ref<ShortDramaComposeVideoResult | null>(null);
const composeSubmitting = ref(false);
const downloadingComposition = ref(false);
const composePollTimer = ref<ReturnType<typeof setInterval> | null>(null);
let composePollInFlight = false;
let composeRequestEpoch = 0;
const ideaForm = ref({
  idea: '',
  model: '',
  videoRatio: '9:16',
  artStyle: 'script-tone',
  aestheticSkillName: '',
  directorSkillName: '',
  storyboardSkillNames: [] as string[],
  videoModel: '',
  imageModel: '',
  audioModel: '',
});
const scriptRevisionInstruction = ref('');
const scriptRefinementOpen = ref(false);
const savingIdea = shallowRef(false);
const generatingAssetBatch = ref(false);

const scriptForm = ref<ShortDramaScript>({
  projectId: '',
  scriptName: '',
  scriptText: '',
  outlineText: '',
  tone: '',
  sourceType: 'manual',
});
const { versions: storyboardVersions, selectedVersionId, selectedShotId, workspaceStoryboards,
  visibleStoryboards, adjacentShots, selectedShotIndex, selectShot } = useStoryboardWorkspace(storyboardDrafts, () => scriptForm.value.id);
async function refreshPlannedStoryboards(projectId: string) {
  workflowFeedback.resolve('分镜生成', projectId);
  const result = await getShortDramaDetail(projectId);
  if (currentProjectId.value !== projectId || !result || result.script?.id !== scriptForm.value.id) return;
  detail.value = result;
  storyboardDrafts.value = result.storyboards || [];
  maxReachedStep.value = 'storyboard';
  void refreshProjects();
}
const storyboardPlanning = useStoryboardPlanning(currentProjectId, () => scriptForm.value.id, refreshPlannedStoryboards);
const { current: storyboardJob, busy: regeneratingStoryboard, now: storyboardNow, querying: storyboardQuerying } = storyboardPlanning;
async function refreshAnalyzedAssets(projectId: string) {
  workflowFeedback.resolve('资产分析', projectId);
  const result = await getShortDramaDetail(projectId);
  const assets = requireAnalyzedAssets(result);
  if (!viewMounted || currentProjectId.value !== projectId || result.script?.id !== scriptForm.value.id) return;
  detail.value = result; characters.value = assets.characters; locations.value = assets.locations;
  maxReachedStep.value = maxReachedStep.value === 'storyboard' ? 'storyboard' : 'assets';
  void refreshProjects();
  void nextTick(() => visualAssetCoverageRef.value?.refresh());
}
const assetAnalysis = useAssetAnalysis(currentProjectId, () => scriptForm.value.id, refreshAnalyzedAssets);
const { current: assetJob, busy: analyzingAssets, now: assetNow, querying: assetQuerying } = assetAnalysis;

const { catalog: skillCatalog, loaded: skillCatalogLoaded, refresh: refreshSkillCatalog } = useDramaSkillCatalog({ autoLoad: false });
const skillBindingState = computed(() => validateDramaSkillChanges(
  projectSkillBindings(ideaForm.value), detail.value?.project, skillCatalog.value, skillCatalogLoaded.value,
));
const projectSkillsChanged = computed(() => !!currentProjectId.value && dramaSkillBindingsChanged(ideaForm.value, detail.value?.project));

function skillProjectPayload() {
  return {
    ...projectSkillBindings(ideaForm.value),
    artStyle: skillBindingState.value.aesthetic?.artStyle || ideaForm.value.artStyle,
  };
}

async function persistProjectSkills() {
  const projectId = currentProjectId.value;
  if (!projectId || detail.value?.project.id !== projectId) throw new Error('当前项目尚未确认，请重新加载');
  if (!skillCatalogLoaded.value) await refreshSkillCatalog();
  if (!skillBindingState.value.ready) throw new Error(skillBindingState.value.reason);
  const wanted = skillProjectPayload();
  await saveShortDramaProject({ id: projectId, projectName: detail.value.project.projectName, ...wanted });
  const updated = await getShortDramaDetail(projectId);
  const actual = projectSkillBindings(updated.project);
  if (dramaSkillBindingsChanged(actual, wanted)) throw new Error('制作技能保存结果未确认，请回读检查');
  if (currentProjectId.value === projectId && detail.value) {
    detail.value.project = updated.project;
    ideaForm.value.artStyle = updated.project.artStyle || ideaForm.value.artStyle;
  }
}

const savingAssetStyle = ref(false);
async function changeAssetVisualStyle(name: string) {
  const projectId = currentProjectId.value;
  if (!projectId || !detail.value || savingAssetStyle.value) return;
  savingAssetStyle.value = true;
  try {
    await saveShortDramaProject({ id: projectId, projectName: detail.value.project.projectName,
      aestheticSkillName: name, ...(!name ? { artStyle: 'script-tone' } : {}) });
    const updated = await getShortDramaDetail(projectId);
    if ((updated.project.aestheticSkillName || '') !== name) throw new Error('视觉风格保存结果未确认，请重新读取项目');
    if (currentProjectId.value === projectId && detail.value) {
      detail.value.project = updated.project;
      ideaForm.value.aestheticSkillName = updated.project.aestheticSkillName || '';
      ideaForm.value.artStyle = updated.project.artStyle || 'script-tone';
    }
  } catch (failure) { ElMessage.error(failure instanceof Error ? failure.message : '视觉风格保存失败'); }
  finally { savingAssetStyle.value = false; }
}

const CREATIVE_DRAFT_KEY = 'ruoyi-drama:creative-draft-recovery';

function preserveCreativeDraft() {
  if (route.name === 'login') return; // Standard JSON requests may already have redirected.
  try {
    sessionStorage.setItem(CREATIVE_DRAFT_KEY, JSON.stringify({
      route: route.fullPath, projectId: currentProjectId.value,
      ideaForm: ideaForm.value, scriptForm: scriptForm.value,
      activeStep: activeStep.value, maxReachedStep: maxReachedStep.value,
    }));
  } catch { /* Keep the existing editor content when storage is unavailable. */ }
}

function restoreCreativeDraft() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(CREATIVE_DRAFT_KEY) || 'null') as {
      route?: string; projectId?: string | null; ideaForm?: typeof ideaForm.value;
      scriptForm?: ShortDramaScript; activeStep?: StepName; maxReachedStep?: StepName;
    } | null;
    if (!saved || saved.route !== route.fullPath || saved.projectId !== currentProjectId.value || typeof saved.ideaForm?.idea !== 'string') return;
    // Draft recovery preserves author input; model defaults always follow the current backend catalog.
    ideaForm.value = { ...ideaForm.value, ...saved.ideaForm, model: ideaForm.value.model,
      imageModel: ideaForm.value.imageModel, videoModel: ideaForm.value.videoModel, audioModel: ideaForm.value.audioModel,
      ...(currentProjectId.value ? { ...projectSkillBindings(detail.value?.project), artStyle: ideaForm.value.artStyle } : {}),
    };
    if (saved.scriptForm) scriptForm.value = {
      ...scriptForm.value,
      ...saved.scriptForm,
      scriptText: normalizePlainScriptText(saved.scriptForm.scriptText),
    };
    if (workflowSteps.value.some(step => step.name === saved.activeStep)) activeStep.value = saved.activeStep!;
    if (workflowSteps.value.some(step => step.name === saved.maxReachedStep)) maxReachedStep.value = saved.maxReachedStep!;
    ElMessage.info('已恢复创作输入，请检查后手动继续；未自动重新提交');
  } catch { /* Invalid cached drafts do not replace the editor. */ }
}

function workflowRequestSummary() {
  return {
    projectId: currentProjectId.value, scriptId: scriptForm.value.id || null,
    model: ideaForm.value.model, artStyle: ideaForm.value.artStyle, aspectRatio: ideaForm.value.videoRatio,
    ...projectSkillBindings(ideaForm.value),
    ideaCharacters: ideaForm.value.idea.length,
    storyboardSkillNames: ideaForm.value.storyboardSkillNames.join(','),
    scriptCharacters: scriptForm.value.scriptText?.length || 0,
  };
}

async function handleWorkflowFailure(operation: string, endpoint: string, error: unknown, request?: WorkflowRequest) {
  const context = request || workflowFeedback.begin(operation, endpoint, workflowRequestSummary());
  workflowFeedback.fail(context, error);
  preserveCreativeDraft();
  if (error instanceof ShortDramaResponseError && error.loginExpired) {
    await handleLoginRequired();
    return;
  }
  if (context.projectId === currentProjectId.value && workflowFailureMessage.value) ElMessage.error(workflowFailureMessage.value);
}

function downloadWorkflowFeedback() {
  const url = URL.createObjectURL(new Blob([JSON.stringify(workflowFailures.value, null, 2)], { type: 'application/json' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'short-drama-request-failures.json';
  anchor.click();
  URL.revokeObjectURL(url);
}


const hasProject = computed(() => !!currentProjectId.value);
const narrationAudio = computed(() => audios.value.find(audio => audio.audioType === 'narration'));

function extractNarration(scriptText: string): string {
  const marker = /^\s*(?:[【\[]?(?:旁白|画外音|旁述)[】\]]?|(?:V\.?O\.?|O\.?S\.?))\s*[：:]\s*(.+?)\s*$/i;
  return scriptText.split(/\r?\n/)
    .map(line => line.match(marker)?.[1]?.trim() || '')
    .filter(Boolean)
    .join('\n');
}

function normalizePlainScriptText(value?: string): string {
  return formatScriptText(value);
}

async function handleGenerateNarration() {
  if (!currentProjectId.value || !narrationDraft.value.trim()) return;
  if (!ideaForm.value.audioModel) {
    ElMessage.error('未配置可用的默认语音模型');
    return;
  }
  generatingNarration.value = true;
  try {
    const current = narrationAudio.value;
    const payload: ShortDramaAudio = {
      ...(current || {}),
      projectId: currentProjectId.value,
      name: '旁白',
      audioType: 'narration',
      text: narrationDraft.value.trim(),
    };
    const saved = current?.id ? await updateShortDramaAudio(payload) : await saveShortDramaAudio(payload);
    const generated = await generateShortDramaAudio(saved.id!, ideaForm.value.audioModel);
    const index = audios.value.findIndex(audio => audio.audioType === 'narration');
    if (index >= 0) Object.assign(audios.value[index], generated);
    else audios.value.push(generated);
    composeForm.value.narrationAudioId = generated.id;
    ElMessage.success('旁白生成完成，合成时将自动使用');
  } catch (error: any) {
    ElMessage.error(error.message || '旁白生成失败');
  } finally {
    generatingNarration.value = false;
  }
}
const canGenerate = computed(() => !!ideaForm.value.idea.trim() && !!ideaForm.value.model && !generating.value && skillBindingState.value.ready);
const maxReachedStepIndex = computed(() => workflowSteps.value.findIndex(item => item.name === maxReachedStep.value));
const completedStoryboards = computed(() => workspaceStoryboards.value.filter(
  item => item.id && item.videoStatus === 'done' && !!item.videoUrl,
));
watch(selectedVersionId, () => {
  composeStoryboardIds.value = completedStoryboards.value.map(item => item.id!);
}, { flush: 'sync' });
const completedVideoCount = computed(() => completedStoryboards.value.length);
const selectedComposeCount = computed(() => composeStoryboardIds.value.filter(id =>
  completedStoryboards.value.some(item => item.id === id),
).length);
const composeRunning = computed(() => composeResult.value?.status === 'pending'
  || composeResult.value?.status === 'processing');
const composeBusy = computed(() => composeSubmitting.value || composeRunning.value);
const storyboardStructureChanging = computed(() => regeneratingStoryboard.value || savingStoryboard.value);
const canComposeVideo = computed(() => selectedComposeCount.value >= 2
  && !storyboardStructureChanging.value
  && !composeBusy.value);
const composeDisabledReason = computed(() => {
  if (selectedComposeCount.value < 2) return '请至少选择 2 个已完成镜头';
  if (storyboardStructureChanging.value) return '正在保存或重新生成分镜，请稍后';
  if (composeRunning.value) return '已有成片正在合成';
  if (composeSubmitting.value) return '正在提交合成任务';
  return '';
});
const composeProgress = computed(() => Math.min(100, Math.max(0, Math.round(composeResult.value?.progress || 0))));
const composeStatusText = computed(() => composeResult.value
  ? composeStatusLabels.value[composeResult.value.status]
  : '');
const composeStatusTagType = computed<'success' | 'warning' | 'danger'>(() => {
  if (composeResult.value?.status === 'done') return 'success';
  if (composeResult.value?.status === 'failed') return 'danger';
  return 'warning';
});

// ---- helpers ----

function readList<T>(payload: T[] | { data?: T[]; rows?: T[] } | undefined): T[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  return payload.data || payload.rows || [];
}

function parseJsonField<T>(json: string | undefined): T | null {
  if (!json) return null;
  try { return JSON.parse(json); } catch { return null; }
}

/** 解析 JSON 字符串数组，返回 string[]（失败返回空数组） */
function parseJsonStrArray(json: string | undefined): string[] {
  if (!json) return [];
  try { return JSON.parse(json) || []; } catch { return []; }
}

function openExternal(url: string | null | undefined) {
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
}

// ---- data loading ----

async function refreshModels() {
  loadingModels.value = true;
  try {
    const [chatRes, videoRes, imageRes, audioRes] = await Promise.all([
      getModelList({ category: 'chat', providerCode: 'atlas' }),
      getModelList({ category: 'video', providerCode: 'atlas' }),
      getModelList({ category: 'image', providerCode: 'atlas' }),
      getModelList({ category: 'audio', providerCode: 'atlas' }),
    ]);
    models.value = readList<GetSessionListVO>(chatRes).filter(m => m.providerCode === 'atlas');
    videoModels.value = readList<GetSessionListVO>(videoRes).filter(m => m.providerCode === 'atlas');
    imageModels.value = readList<GetSessionListVO>(imageRes).filter(m => m.providerCode === 'atlas');
    const allAudio = readList<GetSessionListVO>(audioRes).filter(m => m.providerCode === 'atlas');
    musicModels.value = allAudio.filter(m => m.modelName === 'suno/chirp-v6');
    audioModels.value = allAudio.filter(m => !m.modelName?.startsWith('suno/'));
    ideaForm.value.model = models.value[0]?.modelName || '';
    ideaForm.value.videoModel = videoModels.value[0]?.modelName || '';
    ideaForm.value.imageModel = imageModels.value[0]?.modelName || '';
    if (!ideaForm.value.audioModel && audioModels.value[0]?.modelName) ideaForm.value.audioModel = audioModels.value[0].modelName;
  } catch { ElMessage.error('获取模型列表失败，请先检查模型配置'); }
  finally { loadingModels.value = false; }
}

async function refreshProjects() {
  loadingProjects.value = true;
  try {
    const result = await listShortDramaProjects();
    if (!Array.isArray(result)) throw new Error('Invalid project list response');
    projects.value = result;
  } catch {
    ElMessage.error('项目列表暂时无法加载，请稍后刷新');
  }
  finally { loadingProjects.value = false; }
}

async function loadDetail(projectId: SnowflakeId) {
  stopComposePolling();
  Object.keys(pollingTimers.value).forEach(stopPolling);
  Object.values(imagePollTimers.value).forEach(timer => clearInterval(timer));
  imagePollTimers.value = {};
  imageGenProgress.value = {};
  generatingImage.value = {};
  composeResult.value = null;
  let res = await getShortDramaDetail(projectId);
  // 项目刚创建可能出现读延迟，重试一次
  if (!res) {
    await new Promise(r => setTimeout(r, 800));
    res = await getShortDramaDetail(projectId);
  }
  if (!res) {
    currentProjectId.value = projectId;
    throw new Error('项目加载失败，请刷新页面');
  }
  detail.value = res;
  ideaForm.value.idea = res.project.originalIdea || '';
  ideaForm.value.artStyle = res.project.artStyle || 'script-tone';
  Object.assign(ideaForm.value, projectSkillBindings(res.project));
  ideaForm.value.storyboardSkillNames = res.project.storyboardSkillNames || [];
  if (videoRatioOptions.some(item => item.value === res.project?.composeAspectRatio)) {
    ideaForm.value.videoRatio = res.project.composeAspectRatio!;
  }
  scriptForm.value = res.script
    ? { ...res.script, scriptText: normalizePlainScriptText(res.script.scriptText) }
    : { projectId, scriptName: '', scriptText: '', outlineText: '', tone: '', sourceType: 'manual' };
  scriptRevisionInstruction.value = '';
  scriptRefinementOpen.value = false;
  characters.value = (res as any).characters || [];
  locations.value = (res as any).locations || [];
  audios.value = (res as any).audios || [];
  const existingNarration = audios.value.find(audio => audio.audioType === 'narration');
  narrationDraft.value = existingNarration?.text || extractNarration(scriptForm.value.scriptText || '');
  composeForm.value.narrationAudioId = existingNarration?.audioUrl ? existingNarration.id : undefined;
  storyboardDrafts.value = res.storyboards || [];
  videoSubmissions.sync();
  storyboardDrafts.value.forEach(item => videoSubmissions.reconcile(item));
  currentProjectId.value = projectId;
  if (route.query.projectId !== projectId) await router.replace({ name: 'shortDrama', query: { ...route.query, projectId } });
  composeStoryboardIds.value = workspaceStoryboards.value
    .filter(item => item.id && item.videoStatus === 'done' && item.videoUrl)
    .map(item => item.id!);
  composeForm.value.aspectRatio = (res.project?.composeAspectRatio || ideaForm.value.videoRatio) as ShortDramaAspectRatio;
  try {
    const composition = await refreshComposeStatus(projectId);
    if (composition?.status === 'pending' || composition?.status === 'processing')
      startComposePolling(projectId);
  } catch { /* 成片状态不影响项目加载 */ }

  if (res.storyboards?.length) {
    activeStage.value = 'storyboard';
    activeStep.value = 'storyboard';
    maxReachedStep.value = 'storyboard';
  } else if ((res as any).characters?.length || (res as any).locations?.length) {
    activeStage.value = 'assets';
    activeStep.value = 'assets';
    maxReachedStep.value = 'assets';
  } else if (res.script) {
    activeStage.value = 'script';
    activeStep.value = 'script';
    maxReachedStep.value = 'script';
  } else {
    activeStage.value = 'script';
    activeStep.value = 'idea';
    maxReachedStep.value = 'idea';
  }
  resumePendingImageTasks(projectId);
  await storyboardPlanning.query(String(projectId), res.script?.id);
  await assetAnalysis.query(String(projectId), res.script?.id);
  if (currentProjectId.value === projectId && (analyzingAssets.value || (assetJob.value?.state === 'error' && !res.storyboards?.length))) {
    activeStage.value = 'assets'; activeStep.value = 'assets'; maxReachedStep.value = maxReachedStep.value === 'storyboard' ? 'storyboard' : 'assets';
  }
  if (currentProjectId.value === projectId && (regeneratingStoryboard.value || storyboardJob.value?.state === 'error')) {
    activeStage.value = 'storyboard'; activeStep.value = 'storyboard'; maxReachedStep.value = 'storyboard';
  }
  storyboardDrafts.value.forEach(item => {
    if (item.videoStatus === 'generating' && item.id) startPolling(item);
  });
}

/** 后台轻量刷新：仅更新承载图片的角色/场景资产，不重置步骤、不碰视频轮询。 */
async function refreshAssetsFromDetail() {
  const projectId = currentProjectId.value;
  if (!projectId) return;
  try {
    const res = await getShortDramaDetail(projectId);
    if (!res) return;
    detail.value = res;
    characters.value = (res as any).characters || characters.value;
    locations.value = (res as any).locations || locations.value;
  } catch { /* 后台刷新失败不影响当前操作 */ }
}

/** 其他标签页完成图片任务后，本标签页收到广播：清理本地进度态并刷新资产。 */
async function handleImageTaskBroadcast(event: MessageEvent) {
  const data = event?.data;
  if (!data || data.type !== 'completed' || !data.key) return;
  if (data.projectId !== currentProjectId.value) return;
  delete generatingImage.value[data.key];
  delete imageGenProgress.value[data.key];
  await refreshAssetsFromDetail();
}

// ---- step navigation ----

function handleStepClick(step: StepName) {
  if (step === 'idea') { activeStep.value = 'idea'; return; }
  if (!hasProject.value && !(step === 'script' && scriptCreationJob.value)) { ElMessage.info('请先完成创意生成'); return; }
  activeStep.value = step;
  if (step === 'script' || step === 'assets' || step === 'storyboard') activeStage.value = step;
}

// ---- Step 01: Idea ----

function buildIdeaPayload() {
  return ideaForm.value.idea.trim();
}

async function handleSaveIdea() {
  const projectId = currentProjectId.value;
  if (!projectId || !detail.value || savingIdea.value || !ideaForm.value.idea.trim()) return;
  const originalIdea = ideaForm.value.idea;
  const projectName = detail.value.project.projectName;
  savingIdea.value = true;
  try {
    await saveShortDramaProject({ id: projectId, projectName, originalIdea });
    const saved = await getShortDramaDetail(projectId);
    if (saved?.project.originalIdea !== originalIdea) throw new Error('故事想法回读不一致，请重新查询');
    if (currentProjectId.value === projectId && detail.value) {
      detail.value.project.originalIdea = saved.project.originalIdea;
      ElMessage.success('故事想法已保存，现有剧本和视频保留');
    }
  } catch (error: unknown) {
    ElMessage.error(error instanceof Error ? error.message : '故事想法保存失败');
  } finally { savingIdea.value = false; }
}

function showInitialScriptJob() {
  if (scriptCreationJob.value?.state === 'done' && scriptCreationJob.value.projectId) void loadDetail(scriptCreationJob.value.projectId);
  else if (currentProjectId.value) void router.push({ name: 'shortDrama', query: { fresh: '1' } });
  else activeStep.value = 'script';
}

watch(() => scriptCreationJob.value?.state, async (state, before) => {
  if (state !== 'done' || before !== 'running') return;
  const projectId = scriptCreationJob.value?.projectId;
  if (!projectId) return;
  const feedbackRequest = workflowFeedback.begin('剧本回读', `/short-drama/${projectId}`, workflowRequestSummary(), projectId);
  sessionStorage.removeItem(CREATIVE_DRAFT_KEY);
  try {
    await refreshProjects();
    if (!viewMounted || !projectId || scriptCreationJob.value?.projectId !== projectId) return;
    if (!currentProjectId.value && activeStep.value === 'script') await loadDetail(projectId);
    workflowFeedback.complete(feedbackRequest);
    workflowFeedback.resolve('剧本创作', null);
    ElMessage.success('剧本草稿已生成，请审阅后再分析资产');
  } catch (error: unknown) {
    if (viewMounted) await handleWorkflowFailure('剧本回读', `/short-drama/${projectId}`, error, feedbackRequest);
  }
});

async function handleCreateFromIdea() {
  if (generating.value) { showInitialScriptJob(); return; }
  if (!ideaForm.value.idea.trim()) { ElMessage.warning('先输入一个故事想法'); return; }
  if (!ideaForm.value.model) { ElMessage.warning('当前没有可用的剧本生成模型'); return; }
  if (!skillBindingState.value.ready) { ElMessage.warning(skillBindingState.value.reason); return; }
  const payload = { idea: buildIdeaPayload(), model: ideaForm.value.model, ...skillProjectPayload() };
  preserveCreativeDraft();
  const feedbackRequest = workflowFeedback.begin('剧本创作', '/short-drama/create-from-idea/stream', workflowRequestSummary(), null);
  activeStep.value = 'script'; activeStage.value = 'script'; maxReachedStep.value = 'script';
  const pending = scriptCreation.start(payload);
  try {
    if (currentProjectId.value) await router.push({ name: 'shortDrama', query: { fresh: '1' } });
    await pending;
    workflowFeedback.complete(feedbackRequest);
  } catch (error: unknown) {
    if (viewMounted) await handleWorkflowFailure('剧本创作', '/short-drama/create-from-idea/stream', error, feedbackRequest);
  }
}

// ---- Step 02: Script ----

async function handlePolishScript() {
  if (!currentProjectId.value) return;
  const instruction = scriptRevisionInstruction.value.trim();
  if (!instruction) { ElMessage.warning('请先填写本次修改意见'); return; }
  polishingScript.value = true;
  preserveCreativeDraft();
  try {
    await persistCurrentScript();
    const res: any = await polishScript(currentProjectId.value, instruction, ideaForm.value.model || undefined);
    if (res.script) scriptForm.value = { ...res.script, scriptText: normalizePlainScriptText(res.script.scriptText) };
    if (res.project) {
      await saveShortDramaProject(res.project);
    }
    await loadDetail(currentProjectId.value);
    scriptRevisionInstruction.value = '';
    ElMessage.success('已按所选技能和修改意见生成新剧本版本');
  } finally { polishingScript.value = false; }
}

async function persistCurrentScript() {
  const projectId = currentProjectId.value;
  if (!projectId) return;
  if (projectSkillsChanged.value) await persistProjectSkills();
  if (currentProjectId.value !== projectId) throw new Error('项目已切换，请在当前项目重新保存');
  if (detail.value?.project.projectName?.trim()) {
    await saveShortDramaProject({ id: projectId, projectName: detail.value.project.projectName.trim() });
  }
  if (currentProjectId.value !== projectId) throw new Error('项目已切换，请在当前项目重新保存');
  const saved = await saveShortDramaScript({ ...scriptForm.value, scriptText: normalizePlainScriptText(scriptForm.value.scriptText), projectId });
  if (currentProjectId.value === projectId) scriptForm.value = { ...saved, scriptText: normalizePlainScriptText(saved.scriptText) };
}

async function handleSaveScript() {
  if (!currentProjectId.value) return;
  savingScript.value = true;
  try {
    await persistCurrentScript();
    await loadDetail(currentProjectId.value);
    ElMessage.success(t('shortDrama.messages.scriptSaved'));
  } finally { savingScript.value = false; }
}

async function handleAnalyzeAssets() {
  if (!currentProjectId.value || !scriptForm.value.id) { ElMessage.warning('请先生成或保存剧本'); return; }
  if (analyzingAssets.value) { await assetAnalysis.query(); return; }
  if (regeneratingStoryboard.value) { ElMessage.warning('分镜正在生成，请完成后再分析资产'); return; }
  const projectId = String(currentProjectId.value), scriptId = scriptForm.value.id, model = ideaForm.value.model;
  const job = assetAnalysis.begin(projectId, scriptId);
  const feedbackRequest = workflowFeedback.begin('资产分析', `/short-drama/${projectId}/analyze-assets/stream`, workflowRequestSummary(), projectId);
  activeStage.value = 'assets'; activeStep.value = 'assets'; maxReachedStep.value = 'assets';
  preserveCreativeDraft();
  try {
    await assetAnalysis.submit(job, model, async () => {
      await persistCurrentScript();
      if (scriptForm.value.id !== scriptId) throw new Error('剧本版本已改变，请重新确认');
    });
    workflowFeedback.complete(feedbackRequest);
  } catch (error: unknown) { await handleWorkflowFailure('资产分析', `/short-drama/${projectId}/analyze-assets/stream`, error, feedbackRequest); }
}

// ---- Step 04: Storyboard ----

async function handleGenerateStoryboard() {
  if (!currentProjectId.value || !scriptForm.value.id) { ElMessage.warning('请先生成或保存剧本'); return; }
  if (regeneratingStoryboard.value) { await storyboardPlanning.query(); return; }
  if (composeBusy.value) { ElMessage.warning('成片正在合成，请稍后再修改分镜'); return; }
  if (analyzingAssets.value) { ElMessage.warning('资产正在分析，请完成后再生成分镜'); return; }
  const projectId = String(currentProjectId.value), scriptId = scriptForm.value.id;
  const model = ideaForm.value.model;
  const job = storyboardPlanning.begin(projectId, scriptId);
  const feedbackRequest = workflowFeedback.begin('分镜生成', `/short-drama/${projectId}/plan-storyboard/stream`, workflowRequestSummary(), projectId);
  activeStage.value = 'storyboard'; activeStep.value = 'storyboard'; maxReachedStep.value = 'storyboard';
  preserveCreativeDraft(); invalidateComposeView();
  try {
    await storyboardPlanning.submit(job, model, async () => {
      await persistCurrentScript();
      if (scriptForm.value.id !== scriptId) throw new Error('剧本版本已改变，请重新确认');
    });
    workflowFeedback.complete(feedbackRequest);
  } catch (error: unknown) { await handleWorkflowFailure('分镜生成', `/short-drama/${projectId}/plan-storyboard/stream`, error, feedbackRequest); }
}

async function handleAddStoryboard(after?: ShortDramaStoryboard) {
  if (!currentProjectId.value || !scriptForm.value.id || storyboardStructureChanging.value || composeBusy.value) return;
  const projectId = currentProjectId.value;
  savingStoryboard.value = true;
  try {
    const saved = await addShortDramaStoryboard(projectId, after?.scriptId || scriptForm.value.id, after?.id);
    if (currentProjectId.value !== projectId) return;
    const index = after ? storyboardDrafts.value.findIndex(shot => shot.id === after.id) + 1 : storyboardDrafts.value.length;
    storyboardDrafts.value.splice(index, 0, saved);
    storyboardDrafts.value.filter(shot => shot.scriptId === saved.scriptId).forEach((shot, i) => { shot.sceneNo = i + 1; });
    selectShot(storyboardKey(saved));
    invalidateComposeView();
    ElMessage.success('已新增空白镜头，可以填写内容');
  } finally { savingStoryboard.value = false; }
}

async function handleDeleteStoryboard(item: ShortDramaStoryboard) {
  if (!item.id || storyboardStructureChanging.value || composeBusy.value || videoSubmissionBlocked(item)) return;
  const projectId = currentProjectId.value;
  try {
    await ElMessageBox.confirm('删除这个分镜及其在本项目中的视频引用，其他镜头不受影响。此操作不能撤销。', '删除当前镜头？', {
      confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning',
    });
  } catch { return; }
  if (projectId !== currentProjectId.value || storyboardStructureChanging.value || composeBusy.value || videoSubmissionBlocked(item)) return;
  savingStoryboard.value = true;
  try {
    await deleteShortDramaStoryboard(item.id);
    if (currentProjectId.value !== projectId) return;
    const versionIndex = workspaceStoryboards.value.findIndex(shot => shot.id === item.id);
    const index = storyboardDrafts.value.findIndex(shot => shot.id === item.id);
    if (index >= 0) storyboardDrafts.value.splice(index, 1);
    const versionShots = storyboardDrafts.value.filter(shot => shot.scriptId === item.scriptId);
    versionShots.forEach((shot, i) => { shot.sceneNo = i + 1; });
    const nextShot = versionShots[Math.min(versionIndex, versionShots.length - 1)];
    if (nextShot) selectShot(storyboardKey(nextShot));
    composeStoryboardIds.value = composeStoryboardIds.value.filter(id => String(id) !== String(item.id));
    invalidateComposeView();
    ElMessage.success('分镜已删除');
  } finally { savingStoryboard.value = false; }
}

async function handleSaveStoryboard(item: ShortDramaStoryboard) {
  if (composeBusy.value || savingStoryboard.value) return false;
  if (videoSubmissionBlocked(item)) { ElMessage.warning('视频请求尚未确认，请先查询状态后再保存镜头'); return false; }
  const secondsIssue = videoSecondsIssue(reviewShot(item).c);
  if (secondsIssue) { ElMessage.warning(secondsIssue); return false; }
  if (item.continuityJson) {
    try { const value = JSON.parse(item.continuityJson); if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(); }
    catch { ElMessage.warning('镜头承接信息必须是有效的 JSON 对象'); return false; }
  }
  savingStoryboard.value = true;
  try {
    const saved = await saveShortDramaStoryboard(item);
    Object.assign(item, saved);
    invalidateComposeView();
    ElMessage.success('分镜已保存');
    return true;
  } finally {
    savingStoryboard.value = false;
  }
}

// The canvas edits existing storyboard rows; generation retains the original submission/recovery path.
const flowActions: FlowActions = {
  async save(id, patch, baseline) {
    const item = storyboardDrafts.value.find(shot => shot.id === id);
    if (!item) { ElMessage.warning('镜头已不存在，请刷新项目'); return false; }
    const current = flowShotSnapshot(item);
    if (Object.keys(baseline).some(key => current[key as keyof typeof current] !== baseline[key as keyof typeof baseline])) {
      ElMessage.warning('镜头内容已更新，请撤销画布中的修改后重新编辑'); return false;
    }
    const candidate = { ...item, ...patch };
    if (!await handleSaveStoryboard(candidate)) return false;
    Object.assign(item, candidate);
    return true;
  },
  async generate(id) {
    const item = storyboardDrafts.value.find(shot => shot.id === id);
    return item ? handleGenerateVideo(item, item.videoStatus === 'done') : false;
  },
  async query(id) { const item = storyboardDrafts.value.find(shot => shot.id === id); if (item) await handleCheckVideoProgress(item); },
  async restore(id) { const item = storyboardDrafts.value.find(shot => shot.id === id); if (item) await handleRestoreVideoSubmission(item); },
  state(item) {
    return { blocked: videoSubmissionBlocked(item), unknown: videoSubmissionUnknown(item), hint: videoSubmissionHint(item),
      canRestore: canRestoreVideoSubmission(item), previewSrc: storyboardVideoPreviewSource(item),
      canGenerate: !composeBusy.value && !savingStoryboard.value && !videoSubmissionBlocked(item) && videoModelAvailable(item) && !isDirectMaterial(item),
      busy: !!generatingVideo.value[item.id || ''] };
  },
};
async function openFlowBusinessEditor(media: FlowMedia) {
  await closeFlowWorkspace();
  if (media.shot?.id) { selectShot(media.shot.id); activeStep.value = 'storyboard'; }
  else { activeStep.value = 'assets'; assetCategoryTab.value = media.kind === 'location' ? 'locations' : media.kind === 'prop' ? 'props' : 'characters'; }
}

async function handleDeleteProject(projectId: SnowflakeId) {
  await ElMessageBox.confirm('删除后短剧项目、剧本和分镜都会被删除。', '删除短剧项目？', {
    confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning',
  });
  await deleteShortDramaProject(projectId);
  ElMessage.success('项目已删除');
  if (currentProjectId.value === projectId) {
    invalidateComposeView();
    currentProjectId.value = null;
    detail.value = null;
    storyboardDrafts.value = [];
    characters.value = [];
    locations.value = [];
    audios.value = [];
    scriptForm.value = { projectId: '', scriptName: '', scriptText: '', outlineText: '', tone: '', sourceType: 'manual' };
    activeStep.value = 'idea';
    maxReachedStep.value = 'idea';
  }
  await refreshProjects();
}

// ---- Video ----

function stopComposePolling() {
  if (composePollTimer.value) clearInterval(composePollTimer.value);
  composePollTimer.value = null;
  composePollInFlight = false;
  composeRequestEpoch += 1;
}

function invalidateComposeView() {
  stopComposePolling();
  composeResult.value = null;
}

function applyComposeResult(result: ShortDramaComposeVideoResult | null) {
  composeResult.value = result;
  if (!result) return;
  composeForm.value.transitionType = result.transitionType;
  composeForm.value.aspectRatio = result.aspectRatio;
  if (result.transitionType !== 'none' && result.transitionDurationSeconds > 0)
    composeForm.value.transitionDurationSeconds = result.transitionDurationSeconds;
}

async function refreshComposeStatus(projectId = currentProjectId.value, requestEpoch = composeRequestEpoch) {
  if (!projectId) return null;
  const wasRunning = composeResult.value?.status === 'pending' || composeResult.value?.status === 'processing';
  const result = await getShortDramaComposeStatus(projectId);
  if (currentProjectId.value !== projectId || requestEpoch !== composeRequestEpoch) return null;
  applyComposeResult(result);
  if (wasRunning && result?.status === 'done') ElMessage.success('成片已合成并保存到本地');
  if (wasRunning && result?.status === 'failed') ElMessage.error(result.errorMessage || '成片合成失败');
  if (!result || result.status === 'done' || result.status === 'failed') stopComposePolling();
  return result;
}

function startComposePolling(projectId: SnowflakeId) {
  stopComposePolling();
  const requestEpoch = composeRequestEpoch;
  composePollTimer.value = setInterval(async () => {
    if (composePollInFlight || currentProjectId.value !== projectId || requestEpoch !== composeRequestEpoch) return;
    composePollInFlight = true;
    try { await refreshComposeStatus(projectId, requestEpoch); }
    catch { /* 网络波动不终止合成轮询 */ }
    finally { composePollInFlight = false; }
  }, 3000);
}

async function handleComposeVideo() {
  const projectId = currentProjectId.value;
  if (!projectId || !canComposeVideo.value) return;
  const requestEpoch = composeRequestEpoch;
  composeSubmitting.value = true;
  try {
    const request: ShortDramaComposeVideoRequest = {
      ...composeForm.value,
      storyboardIds: [...composeStoryboardIds.value],
      transitionDurationSeconds: composeForm.value.transitionType === 'none'
        ? 0
        : composeForm.value.transitionDurationSeconds,
    };
    const result = await composeShortDramaVideo(projectId, request);
    if (currentProjectId.value !== projectId || requestEpoch !== composeRequestEpoch) return;
    applyComposeResult(result);
    if (result.status === 'pending' || result.status === 'processing') {
      startComposePolling(projectId);
      ElMessage.success('成片合成任务已提交');
    }
  } catch (error: unknown) {
    ElMessage.error(error instanceof Error ? error.message : '成片合成提交失败');
  } finally {
    composeSubmitting.value = false;
  }
}

async function handleDownloadComposition() {
  const projectId = currentProjectId.value;
  if (!projectId || downloadingComposition.value) return;
  downloadingComposition.value = true;
  try {
    const blob = await downloadShortDramaVideo(projectId);
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = `short-drama-${projectId}.mp4`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  } catch (error: unknown) {
    ElMessage.error(error instanceof Error ? error.message : '成片下载失败');
  } finally {
    downloadingComposition.value = false;
  }
}

function formatVideoDuration(seconds?: number | string) {
  if (seconds == null || seconds === '') return '';
  const duration = Number(seconds);
  return Number.isFinite(duration) ? `${duration.toFixed(1)} 秒` : '';
}

function storyboardVideoPreviewSource(item: ShortDramaStoryboard) {
  if (item.videoUrl?.startsWith('/short-drama/')) return item.videoUrl;
  const modelName = videoSubmissions.pending(item)?.model || videoModelFor(item);
  if (!item.videoId || !modelName) return '';
  const model = videoModels.value.find(entry => entry.modelName === modelName);
  if (model?.providerCode !== 'atlas') return '';
  return `/media/content?${new URLSearchParams({ model: modelName, predictionId: item.videoId })}`;
}

function videoModelFor(item: ShortDramaStoryboard) {
  return storyboardVideoModel(item.continuityJson, ideaForm.value.videoModel);
}

function videoModelAvailable(item: ShortDramaStoryboard) {
  return videoModels.value.some(model => model.modelName === videoModelFor(item));
}

function videoResolutionSupported(item: ShortDramaStoryboard) {
  const model = videoModelFor(item);
  return model.startsWith('bytedance/seedance-2.0-mini/') || model.startsWith('bytedance/seedance-2.5/');
}

function videoGenerationIssues(item: ShortDramaStoryboard) {
  const review = reviewShot(item);
  const secondsIssue = videoSecondsIssue(review.c);
  // Creative reviews are advice; only an empty request or invalid explicit parameter blocks submission.
  return [...(!item.videoPrompt?.trim() ? ['请填写视频提示词'] : []), ...(secondsIssue ? [secondsIssue] : [])];
}

function videoSubmissionBlocked(item: ShortDramaStoryboard) {
  return !!(item.id && generatingVideo.value[item.id]) || !!videoSubmissions.pending(item) || isUnresolvedVideoTask(item);
}

function videoSubmissionUnknown(item: ShortDramaStoryboard) {
  return item.videoStatus === 'submission_unknown' || videoSubmissions.pending(item)?.status === 'unknown';
}

function videoSubmissionHint(item: ShortDramaStoryboard) {
  return item.id ? videoQueryHints.value[item.id] || '' : '';
}

function canRestoreVideoSubmission(item: ShortDramaStoryboard) {
  if (!item.id) return false;
  const receipt = videoSubmissionReceipts.value[item.id];
  return videoSubmissionRecoveryAllowed(videoSubmissions.pending(item), receipt === null ? null : receipt?.status, item);
}

async function refreshVideoSubmissionReceipt(item: ShortDramaStoryboard) {
  const record = videoSubmissions.pending(item);
  if (!item.id || !record) return;
  const receipt = await getStoryboardVideoSubmission(item.id, record.requestId);
  if (videoSubmissions.pending(item)?.requestId !== record.requestId) return;
  videoSubmissionReceipts.value[item.id] = receipt;
  if (receipt) {
    videoQueryHints.value[item.id] = receipt.error || '';
    if (receipt.status === 'not_submitted') videoSubmissions.resolveNotSubmitted(item);
    else if (['done', 'failed'].includes(receipt.status)
      && (receipt.predictionId === item.videoId || receipt.status === 'failed' && !receipt.predictionId)) {
      videoSubmissions.reconcile(item, true);
    }
  } else videoQueryHints.value[item.id] = '尚未找到该请求的提交收据；可用原请求编号恢复，不能创建新的重复请求';
  return receipt;
}

/** Refresh only media state: unsaved dialogue and direction edits stay in the editor. */
function applyStoryboardVideoState(item: ShortDramaStoryboard, shot: ShortDramaStoryboard) {
  item.videoStatus = shot.videoStatus;
  item.videoId = shot.videoId;
  item.videoUrl = shot.videoUrl;
  item.updateTime = shot.updateTime;
}

async function refreshVideoState(item: ShortDramaStoryboard) {
  const remote: ShortDramaDetail = await getShortDramaDetail(item.projectId);
  const shot = remote.storyboards.find(entry => entry.id === item.id);
  if (!shot) throw new Error('无法回读当前镜头');
  applyStoryboardVideoState(item, shot);
  videoSubmissions.reconcile(shot);
  if (currentProjectId.value === item.projectId && detail.value) detail.value.project.status = remote.project.status;
  return shot;
}

async function handleGenerateVideo(item: ShortDramaStoryboard, regenerate = false, saveDraft = true, notify = true) {
  videoSubmissions.sync();
  if (!item.id || isDirectMaterial(item)) return false;
  if (videoSubmissionBlocked(item)) { ElMessage.warning('已有视频请求待确认，请先查询状态，不能重复提交'); return false; }
  if (item.videoStatus === 'done' && !regenerate) { ElMessage.info('已有完成视频，请使用“重新生成视频”提交新版本'); return false; }
  const issues = videoGenerationIssues(item);
  if (issues.length) { ElMessage.warning(`镜 ${item.sceneNo} 未通过生成审阅：${issues.slice(0, 3).join('；')}`); return false; }
  if (detail.value?.project.status === 'script_changed') { ElMessage.warning('剧本已修改，请重新生成分镜'); return false; }
  if (!videoModelAvailable(item)) { ElMessage.warning('本镜所选视频模型未配置，请重新选择'); return false; }
  if (composeBusy.value) { ElMessage.warning('成片正在合成，请稍后再生成分镜视频'); return false; }
  generatingVideo.value[item.id] = true;
  let submissionStarted = false;
  try {
    if (saveDraft) Object.assign(item, await saveShortDramaStoryboard(item));
    const record = videoSubmissions.begin(item, videoModelFor(item), regenerate);
    delete videoSubmissionReceipts.value[item.id];
    submissionStarted = true;
    invalidateComposeView();
    const updated = await generateStoryboardVideo(item.id, record.model, { requestId: record.requestId, regenerate: record.regenerate });
    Object.assign(item, updated);
    videoSubmissions.reconcile(updated, true);
    delete videoQueryHints.value[item.id];
    if (updated.videoStatus === 'generating') startPolling(item);
    if (updated.videoStatus === 'submission_unknown') videoSubmissions.markUnknown(item);
    if (notify) {
      if (updated.videoStatus === 'done') ElMessage.success('视频已完成');
      else if (updated.videoStatus === 'submission_unknown') ElMessage.warning('提交结果待确认，请查询状态并保留请求编号');
      else if (updated.videoStatus === 'failed') ElMessage.error('任务已确认失败，镜头内容已保留');
      else ElMessage.success(isLocalVideoTask(updated.videoId) ? '请求已登记，正在等待生成任务编号' : '视频任务已提交，完成后可播放');
    }
    return !['failed', 'submission_unknown'].includes(updated.videoStatus || '');
  } catch (error: unknown) {
    if (!submissionStarted) {
      ElMessage.error(error instanceof Error ? error.message : '镜头保存失败');
      return false;
    }
    videoSubmissions.markUnknown(item);
    try {
      await refreshVideoState(item);
      await refreshVideoSubmissionReceipt(item);
      if (item.videoStatus === 'generating') startPolling(item);
    } catch { /* Keep the original task ID and browser request ID for reconciliation. */ }
    if (item.videoStatus === 'failed' && !videoSubmissions.pending(item)) ElMessage.error('任务已确认失败，镜头内容已保留');
    else ElMessage.warning('生成请求中断，提交结果仍待确认；请查询状态，不要重复生成');
    return false;
  } finally {
    generatingVideo.value[item.id] = false;
  }
}

async function handleRetryVideo(item: ShortDramaStoryboard) {
  return handleGenerateVideo(item, true, true);
}

/** User-invoked recovery reuses the original immutable identity and model. */
async function handleRestoreVideoSubmission(item: ShortDramaStoryboard) {
  videoSubmissions.sync();
  const record = videoSubmissions.pending(item);
  if (!item.id || !record || !canRestoreVideoSubmission(item)) { ElMessage.warning('请先查询原请求的状态'); return; }
  if (composeBusy.value || generatingVideo.value[item.id]) return;
  generatingVideo.value[item.id] = true;
  videoSubmissions.markSubmitting(item);
  try {
    const updated = await generateStoryboardVideo(item.id, record.model, { requestId: record.requestId, regenerate: record.regenerate });
    applyStoryboardVideoState(item, updated);
    videoSubmissions.reconcile(updated, true);
    if (updated.videoStatus === 'submission_unknown') videoSubmissions.markUnknown(item);
    if (updated.videoStatus === 'generating') startPolling(item);
    if (updated.videoStatus === 'done') ElMessage.success('原请求已完成');
    else if (updated.videoStatus === 'failed') ElMessage.error('原任务已确认失败，镜头内容已保留');
    else if (updated.videoStatus === 'submission_unknown') ElMessage.warning('原请求结果仍待确认，请核对提交收据');
    else ElMessage.info('已按原请求编号恢复状态；生成完成后可播放');
  } catch {
    videoSubmissions.markUnknown(item);
    try { await refreshVideoState(item); await refreshVideoSubmissionReceipt(item); } catch { /* Keep original request identity. */ }
    ElMessage.warning('原请求结果仍待确认，请稍后查询状态');
  } finally { generatingVideo.value[item.id] = false; }
}
function startPolling(item: ShortDramaStoryboard) {
  if (!item.id || currentProjectId.value !== item.projectId) return;
  const id = item.id;
  stopPolling(id);
  const startedAt = Date.now();
  const pollingModel = videoSubmissions.pending(item)?.model || videoModelFor(item);
  let checking = false;
  pollingTimers.value[id] = setInterval(async () => {
    if (!pollingModel) { stopPolling(id); return; }
    if (Date.now() - startedAt > 30 * 60 * 1000) {
      stopPolling(id);
      ElMessage.info('视频仍在处理，可点击查询进度继续检查，无需重新生成');
      return;
    }
    if (checking) return;
    checking = true;
    try {
      const updated = await retrieveStoryboardVideo(id, pollingModel);
      applyStoryboardVideoState(item, updated);
      videoSubmissions.reconcile(updated);
      if (updated.videoStatus === 'submission_unknown') videoSubmissions.markUnknown(item);
      if (['done', 'failed', 'submission_unknown'].includes(updated.videoStatus || '')) stopPolling(id);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : '';
      if (msg.includes('404') || msg.includes('not found')) {
        stopPolling(id);
        try { await refreshVideoState(item); } catch { /* Keep task identity on read failure. */ }
        videoQueryHints.value[id] = '上游暂未找到任务；已保留任务编号，请核对原模型与任务记录';
        ElMessage.warning('任务查询未返回结果；已保留原任务，请先核对状态');
      }
    } finally {
      checking = false;
    }
  }, 10000);
}

/** 手动查询视频进度 */
async function handleCheckVideoProgress(item: ShortDramaStoryboard) {
  if (!item.id) return;
  const model = videoSubmissions.pending(item)?.model || videoModelFor(item);
  if (!model) { ElMessage.warning('请先选择原提交视频模型'); return; }
  try {
    const receipt = await refreshVideoSubmissionReceipt(item);
    const updated = await retrieveStoryboardVideo(item.id, model);
    applyStoryboardVideoState(item, updated);
    videoSubmissions.reconcile(updated, !!receipt && ['done', 'failed'].includes(receipt.status)
      && (receipt.predictionId === updated.videoId || receipt.status === 'failed' && !receipt.predictionId));
    if (receipt === undefined) delete videoQueryHints.value[item.id];
    if (updated.videoStatus === 'submission_unknown') {
      videoSubmissions.markUnknown(item);
      ElMessage.info('提交结果仍待确认，请用请求编号核对原任务记录');
    }
    if (['done', 'failed', 'submission_unknown'].includes(updated.videoStatus || '')) stopPolling(item.id);
    else if (updated.videoStatus === 'generating') startPolling(item);
    if (canRestoreVideoSubmission(item)) ElMessage.info('尚未找到提交收据，可恢复同一请求编号');
  } catch (error: unknown) {
    try { await refreshVideoState(item); } catch { /* Query failures do not change generation status. */ }
    const msg = error instanceof Error ? error.message : '';
    if (msg.includes('404') || msg.includes('not found')) {
      stopPolling(item.id);
      videoQueryHints.value[item.id] = '上游暂未找到任务；已保留任务编号，请核对原模型与任务记录';
      ElMessage.warning('任务查询未返回结果；已保留原任务，请先核对状态');
    } else {
      ElMessage.error('查询失败；原任务编号已保留，请稍后再查');
    }
  }
}

function stopPolling(id: SnowflakeId) {
  if (pollingTimers.value[id]) { clearInterval(pollingTimers.value[id]); delete pollingTimers.value[id]; }
}


const videoBatchStart = ref(1);
async function generateVideoBatch(candidates: ShortDramaStoryboard[], range?: { sceneStart: number; sceneCount: number }) {
  if (generatingAllVideos.value || composeBusy.value || !currentProjectId.value) return;
  videoSubmissions.sync();
  if (candidates.some(shot => !!videoSubmissions.pending(shot))) { ElMessage.warning('所选范围有视频请求待确认，请先查询原请求状态'); return; }
  const selected = candidates.filter(shot => !isDirectMaterial(shot) && shot.videoStatus !== 'done' && !videoSubmissionBlocked(shot));
  if (!selected.length) { ElMessage.info('所选镜头已完成、正在生成或提交结果待确认'); return; }
  if (detail.value?.project.status === 'script_changed') { ElMessage.warning('剧本已修改，请重新生成分镜'); return; }
  if (selected.some(shot => !videoModelAvailable(shot))) { ElMessage.warning('所选范围有未配置的视频模型，请检查逐镜选择'); return; }
  const model = videoModelFor(selected[0]);
  if (selected.some(shot => videoModelFor(shot) !== model)) { ElMessage.warning('本批镜头采用不同视频模型，请按模型分别生成'); return; }
  const invalid = selected.find(shot => videoGenerationIssues(shot).length);
  if (invalid) { ElMessage.warning(`镜 ${invalid.sceneNo} 未通过生成审阅：${videoGenerationIssues(invalid).slice(0, 3).join('；')}`); return; }
  generatingAllVideos.value = true;
  const projectId = currentProjectId.value;
  try {
    // 起始帧是可选的：服务端会优先使用上传帧、已审阅帧，再回退到角色、场景和道具参考。
    if (currentProjectId.value !== projectId) return;
    // Persist explicit seconds and director edits before the paid batch reads server rows.
    for (const shot of selected) {
      Object.assign(shot, await saveShortDramaStoryboard(shot));
      if (currentProjectId.value !== projectId) return;
    }
    invalidateComposeView();
    // Keep backend scene-group sequencing and previous-frame handoff. The backend
    // journals each attempt and never generates footage outside an explicit range.
    const updated: ShortDramaStoryboard[] = await generateAllVideos(projectId, model, range);
    if (currentProjectId.value !== projectId) return;
    for (const shot of updated) {
      const draft = storyboardDrafts.value.find(entry => entry.id === shot.id);
      if (!draft) continue;
      applyStoryboardVideoState(draft, shot);
      if (draft.videoStatus === 'generating') startPolling(draft);
    }
    const completed = selected.filter(shot => shot.videoStatus === 'done').length;
    const submitted = selected.filter(shot => ['generating', 'submitting'].includes(shot.videoStatus || '')).length;
    const unresolved = selected.filter(shot => shot.videoStatus === 'submission_unknown').length;
    const remaining = selected.length - completed - submitted - unresolved;
    ElMessage.info(`所选镜头已完成 ${completed} 镜、处理中 ${submitted} 镜${unresolved ? `、提交结果待确认 ${unresolved} 镜` : ''}${remaining ? `；其余 ${remaining} 镜尚未完成，请检查状态` : ''}。已有完成视频已保留`);
  } catch (error: unknown) {
    try {
      const remote: ShortDramaDetail = await getShortDramaDetail(projectId);
      if (currentProjectId.value === projectId) {
        for (const shot of remote.storyboards) {
          const draft = storyboardDrafts.value.find(entry => entry.id === shot.id);
          if (!draft) continue;
          applyStoryboardVideoState(draft, shot);
          if (draft.videoStatus === 'generating') startPolling(draft);
        }
      }
    } catch { /* Preserve existing task IDs when batch reconciliation is unavailable. */ }
    ElMessage.warning(`${error instanceof Error ? error.message : '批量请求中断'}；请查询现有任务状态，已提交镜头不会作为新任务重交`);
  } finally { generatingAllVideos.value = false; }
}

async function handleGenerateOpeningVideos() {
  const shots = storyboardDrafts.value.filter(shot => shot.sceneNo >= videoBatchStart.value && shot.sceneNo < videoBatchStart.value + 10);
  if (!shots.length) { ElMessage.info('所选范围没有镜头'); return; }
  return generateVideoBatch(shots, { sceneStart: shots[0].sceneNo, sceneCount: shots.length });
}

async function handleGenerateAllVideos() {
  return generateVideoBatch(storyboardDrafts.value);
}

// ---- 图片资产管理 ----

const generatingImage = ref<Record<string, boolean>>({}); // key: "appearance-{id}" or "location-{id}"
/** 图片生成轮询进度: key -> { status, attempts } */
const imageGenProgress = ref<Record<string, { status: string; attempts: number }>>({});
/** 每个资产独立配置的图生图参考图 URL；为空时保持纯文生图。 */
const assetReferenceImages = ref<Record<string, string>>({});
const uploadingReferenceImage = ref<Record<string, boolean>>({});
const imagePollTimers = ref<Record<string, ReturnType<typeof setInterval>>>({});
const IMAGE_POLL_INTERVAL = 2000; // 每 2 秒轮询
const IMAGE_POLL_MAX = 150;       // 最多轮询 150 次（5 分钟）
const IMAGE_TASK_STORAGE_KEY = 'ruoyi-drama:image-generation-tasks';
/** 跨标签页排他锁名前缀，每个资产任务一把锁，避免多端重复 confirm。 */
const IMAGE_TASK_LOCK_PREFIX = 'ruoyi-drama:image-task-lock:';
/** 跨标签页广播：任务完成后通知其他标签页刷新对应资产，无需重复 confirm。 */
const imageTaskChannel: BroadcastChannel | null = typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel('ruoyi-drama:image-tasks')
  : null;

interface PendingImageTask {
  projectId: SnowflakeId;
  assetType: 'appearance' | 'location';
  assetId: SnowflakeId;
  model: string;
  predictionId: string;
  startedAt: number;
}

function readPendingImageTasks(): Record<string, PendingImageTask> {
  try {
    const value = localStorage.getItem(IMAGE_TASK_STORAGE_KEY);
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

function savePendingImageTask(progressKey: string, task: PendingImageTask) {
  const tasks = readPendingImageTasks();
  tasks[progressKey] = task;
  localStorage.setItem(IMAGE_TASK_STORAGE_KEY, JSON.stringify(tasks));
}

function removePendingImageTask(progressKey: string) {
  const tasks = readPendingImageTasks();
  delete tasks[progressKey];
  if (Object.keys(tasks).length) localStorage.setItem(IMAGE_TASK_STORAGE_KEY, JSON.stringify(tasks));
  else localStorage.removeItem(IMAGE_TASK_STORAGE_KEY);
}

function imageTaskLockName(key: string) {
  return `${IMAGE_TASK_LOCK_PREFIX}${key}`;
}

/**
 * 跨标签页排他执行图片任务（轮询 + 确认保存）。
 * - options.ifAvailable = true：拿不到锁（其他标签页正在处理）则返回 null，本标签页跳过。
 * - 默认：等待拿到锁再执行；锁在回调 Promise 结束（或标签页关闭）后自动释放。
 * 浏览器不支持 Web Locks 时退化为单标签页内执行，仍可正常工作，仅丢失跨标签页去重。
 */
function withImageTaskLock<T>(key: string, fn: () => Promise<T>, options: { ifAvailable?: boolean } = {}): Promise<T | null> {
  const locks = typeof navigator !== 'undefined' ? navigator.locks : undefined;
  if (!locks?.request) return fn();
  return new Promise<T | null>((resolve, reject) => {
    locks.request(imageTaskLockName(key), options.ifAvailable ? { ifAvailable: true } : {}, async (lock) => {
      if (!lock) { resolve(null); return; }
      try { resolve(await fn()); }
      catch (error) { reject(error); }
    });
  });
}

function notifyImageTaskCompleted(key: string, projectId: SnowflakeId) {
  imageTaskChannel?.postMessage({ type: 'completed', key, projectId });
}

/** 探测服务端 prediction 状态，不依赖本地轮询计时：用于恢复时判断是否已生成完毕。 */
async function probePrediction(task: PendingImageTask): Promise<{ completed: true; url: string } | { completed: false; failed: true } | null> {
  try {
    const result: any = await getPrediction(task.model, task.predictionId);
    if (result?.status === 'completed' && result?.url) return { completed: true, url: result.url };
    if (result?.status === 'failed') return { completed: false, failed: true };
    return null; // 仍在生成中
  } catch (error: any) {
    const msg = error?.message || '';
    if (msg.includes('404') || msg.includes('not found')) return { completed: false, failed: true };
    return null; // 网络波动，按"仍在生成中"处理，后续再探/轮询
  }
}

/** 确认并落库图片，同步更新当前页内存中的资产对象。 */
async function confirmAndApplyImageTask(task: PendingImageTask, target: ShortDramaCharacterAppearance | ShortDramaLocation) {
  if (task.assetType === 'appearance') {
    const updated = await confirmAppearanceImage(task.assetId, task.predictionId, task.model);
    Object.assign(target, updated);
    for (const ch of characters.value) {
      const idx = ch.appearances?.findIndex(a => a.id === task.assetId);
      if (idx != null && idx >= 0 && ch.appearances) { Object.assign(ch.appearances[idx], updated); break; }
    }
  } else {
    const updated = await confirmLocationImage(task.assetId, task.predictionId, task.model);
    Object.assign(target, updated);
    const idx = locations.value.findIndex(l => l.id === task.assetId);
    if (idx >= 0) Object.assign(locations.value[idx], updated);
  }
}

/** 当前选中的图片模型 */
const selectedImageModel = computed(() => ideaForm.value.imageModel || '');

/** 通用：异步启动图片生成 + 轮询确认 */
async function startAsyncImageGen(assetType: string, assetId: SnowflakeId, model: string, referenceImageUrl?: string): Promise<{ predictionId: string }> {
  const prediction: any = await startImageGeneration(assetType, assetId, model, referenceImageUrl);
  const predictionId = prediction?.id || prediction?.predictionId || prediction?.data?.id;
  if (!predictionId) {
    const status = prediction?.status || prediction?.data?.status || 'unknown';
    throw new Error(`图片任务启动失败：服务端未返回任务ID（status=${status}）`);
  }
  return { predictionId: String(predictionId) };
}

/** 轮询图片 prediction 直到完成或失败 */
function pollImagePrediction(predictionId: string, model: string, progressKey: string, initialAttempts = 0): Promise<string> {
  return new Promise((resolve, reject) => {
    let attempts = initialAttempts;
    const timer = setInterval(async () => {
      attempts++;
      imageGenProgress.value[progressKey] = { status: 'polling', attempts };
      if (attempts > IMAGE_POLL_MAX) {
        clearInterval(timer);
        delete imagePollTimers.value[progressKey];
        delete imageGenProgress.value[progressKey];
        // 不删除 localStorage 中的任务：页面关闭过久导致本轮轮询超时时，
        // 服务端可能已生成完毕。保留任务，下次打开页面由 resumePendingImageTasks
        // 先探一次服务端状态再决定保存/重试，避免"超时即丢弃已完成的图片"。
        reject(new Error('图片生成超时，请稍后重试'));
        return;
      }
      try {
        const result: any = await getPrediction(model, predictionId);
        if (result?.status === 'completed' && result?.url) {
          clearInterval(timer);
          delete imagePollTimers.value[progressKey];
          imageGenProgress.value[progressKey] = { status: 'saving', attempts };
          resolve(result.url);
        } else if (result?.status === 'failed') {
          clearInterval(timer);
          delete imagePollTimers.value[progressKey];
          delete imageGenProgress.value[progressKey];
          removePendingImageTask(progressKey);
          reject(new Error('图片生成失败'));
        }
        // else: still polling (pending/processing)
      } catch (e: any) {
        // Atlas 返回 404 会触发异常（前端 unwrap 后变成 message），说明任务已失效。
        // 直接终止轮询并提示失败，避免反复报错刷屏。
        const msg = e?.message || '';
        if (msg.includes('404') || msg.includes('not found')) {
          clearInterval(timer);
          delete imagePollTimers.value[progressKey];
          delete imageGenProgress.value[progressKey];
          removePendingImageTask(progressKey);
          reject(new Error('生成任务已失效，请重新生成图片'));
          return;
        }
        // 其余网络错误继续轮询
      }
    }, IMAGE_POLL_INTERVAL);
    imagePollTimers.value[progressKey] = timer;
  });
}

/** One click submits missing assets only; existing candidates and unresolved receipts stay intact. */
async function handleGenerateMissingAssets() {
  if (generatingAssetBatch.value || !currentProjectId.value || !selectedImageModel.value) return;
  generatingAssetBatch.value = true;
  const projectId = currentProjectId.value;
  try {
    const pending = readPendingImageTasks();
    const missing = (asset: ShortDramaCharacterAppearance | ShortDramaLocation, type: string) => {
      const key = `${type}-${asset.id}`;
      return needsAssetImage(asset, key, pending, generatingImage.value);
    };
    const appearances = characters.value.flatMap(character => character.appearances || []).filter(asset => missing(asset, 'appearance'));
    const scenes = locations.value.filter(asset => missing(asset, 'location'));
    if (!visualAssetCoverageRef.value) throw new Error('道具资产尚未加载，请稍后重试');
    const propCount = await visualAssetCoverageRef.value.generateMissingProps();
    const tasks = [
      ...appearances.map(asset => () => handleGenerateAppearanceImage(asset)),
      ...scenes.map(asset => () => handleGenerateLocationImage(asset)),
    ];
    if (!tasks.length && !propCount) { ElMessage.info('素材已有图片或任务正在进行，无需重复生成'); return; }
    ElMessage.success(`开始补齐 ${tasks.length + propCount} 项缺图素材`);
    let cursor = 0;
    await Promise.all(Array.from({ length: Math.min(4, tasks.length) }, async () => {
      while (cursor < tasks.length && currentProjectId.value === projectId) {
        const task = tasks[cursor++];
        await task?.();
      }
    }));
    if (currentProjectId.value === projectId) await refreshAssetsFromDetail();
  } catch (failure) {
    ElMessage.error(failure instanceof Error ? failure.message : '批量生成未完成，请检查各素材进度');
  } finally { generatingAssetBatch.value = false; }
}

/** 形象图片生成（异步+轮询） */
async function handleGenerateAppearanceImage(appearance: ShortDramaCharacterAppearance) {
  if (!appearance.id || !selectedImageModel.value) {
    ElMessage.warning('当前项目未配置图片模型');
    return;
  }
  const key = `appearance-${appearance.id}`;
  if (generatingImage.value[key] || readPendingImageTasks()[key]) { ElMessage.info('该素材已有任务，请等待原任务结果'); return; }
  const appearanceId = appearance.id;
  const projectId = currentProjectId.value!;
  generatingImage.value[key] = true;
  try {
    // 1. 异步启动
    await saveShortDramaAppearance({
      id: appearanceId, characterId: appearance.characterId,
      appearanceIndex: appearance.appearanceIndex, changeReason: appearance.changeReason,
      description: appearance.description, referenceImageUrl: appearance.referenceImageUrl,
      voice: appearance.voice,
    });
    const { predictionId } = await startAsyncImageGen('appearance', appearanceId, selectedImageModel.value, assetReferenceImages.value[key]);
    savePendingImageTask(key, {
      projectId, assetType: 'appearance', assetId: appearanceId,
      model: selectedImageModel.value, predictionId, startedAt: Date.now(),
    });
    // 2. 轮询进度 + 确认保存（跨标签页排他，避免其他标签页 resume 重复 confirm）
    imageGenProgress.value[key] = { status: 'polling', attempts: 0 };
    await withImageTaskLock(key, async () => {
      await pollImagePrediction(predictionId, selectedImageModel.value, key);
      imageGenProgress.value[key] = { status: 'saving', attempts: imageGenProgress.value[key]?.attempts || 0 };
      const updated = await confirmAppearanceImage(appearanceId, predictionId, selectedImageModel.value);
      Object.assign(appearance, updated);
      // 同步更新 characters 中对应的 appearance
      for (const ch of characters.value) {
        const idx = ch.appearances?.findIndex(a => a.id === appearanceId);
        if (idx != null && idx >= 0 && ch.appearances) {
          Object.assign(ch.appearances[idx], updated);
          break;
        }
      }
    });
    delete imageGenProgress.value[key];
    removePendingImageTask(key);
    notifyImageTaskCompleted(key, projectId);
  } catch (e: any) { ElMessage.error(e.message || '形象图片生成失败'); delete imageGenProgress.value[key]; }
  finally { generatingImage.value[key] = false; }
}

/** 场景图片生成（异步+轮询） */
async function handleGenerateLocationImage(location: ShortDramaLocation) {
  if (!location.id || !selectedImageModel.value) {
    ElMessage.warning('当前项目未配置图片模型');
    return;
  }
  const key = `location-${location.id}`;
  if (generatingImage.value[key] || readPendingImageTasks()[key]) { ElMessage.info('该素材已有任务，请等待原任务结果'); return; }
  const locationId = location.id;
  const projectId = currentProjectId.value!;
  generatingImage.value[key] = true;
  try {
    location.descriptions = JSON.stringify(locationDescEdits.value[locationId] || locationDescriptions(location));
    await saveShortDramaLocation(location);
    const { predictionId } = await startAsyncImageGen('location', locationId, selectedImageModel.value, assetReferenceImages.value[key]);
    savePendingImageTask(key, {
      projectId, assetType: 'location', assetId: locationId,
      model: selectedImageModel.value, predictionId, startedAt: Date.now(),
    });
    imageGenProgress.value[key] = { status: 'polling', attempts: 0 };
    await withImageTaskLock(key, async () => {
      await pollImagePrediction(predictionId, selectedImageModel.value, key);
      imageGenProgress.value[key] = { status: 'saving', attempts: imageGenProgress.value[key]?.attempts || 0 };
      const updated = await confirmLocationImage(locationId, predictionId, selectedImageModel.value);
      Object.assign(location, updated);
      const idx = locations.value.findIndex(l => l.id === locationId);
      if (idx >= 0) Object.assign(locations.value[idx], updated);
    });
    delete imageGenProgress.value[key];
    removePendingImageTask(key);
    notifyImageTaskCompleted(key, projectId);
  } catch (e: any) { ElMessage.error(e.message || '场景图片生成失败'); delete imageGenProgress.value[key]; }
  finally { generatingImage.value[key] = false; }
}


function findAppearance(assetId: SnowflakeId) {
  for (const character of characters.value) {
    const appearance = character.appearances?.find(item => item.id === assetId);
    if (appearance) return appearance;
  }
  return undefined;
}

function resumePendingImageTasks(projectId: SnowflakeId) {
  const tasks = readPendingImageTasks();
  Object.entries(tasks).forEach(([key, task]) => {
    if (task.projectId !== projectId || imagePollTimers.value[key]) return;

    const target = task.assetType === 'appearance'
      ? findAppearance(task.assetId)
      : locations.value.find(item => item.id === task.assetId);
    if (!target) return;

    // 跨标签页排他：同一任务只由一个标签页恢复，其余标签页跳过；
    // 完成后通过 BroadcastChannel 通知它们刷新资产，避免重复 confirm。
    void withImageTaskLock(key, async () => {
      // 拿到锁后再读一次：等待期间可能已被其他标签页处理完并删除。
      if (imagePollTimers.value[key] || !readPendingImageTasks()[key]) return;
      generatingImage.value[key] = true;
      imageGenProgress.value[key] = { status: 'polling', attempts: 0 };
      try {
        await resumeImageTask(task, target, key);
        notifyImageTaskCompleted(key, projectId);
      } catch (error: any) {
        delete imageGenProgress.value[key];
        ElMessage.error(error.message || '图片生成任务恢复失败');
      } finally {
        generatingImage.value[key] = false;
      }
    }, { ifAvailable: true });
  });
}

/**
 * 恢复单个图片任务：先探服务端状态——已完成直接保存、已失败直接清理，
 * 仍在生成则续轮询一个完整窗口。不再因页面关闭时长超过 5 分钟就丢弃任务，
 * 从而解决"页面关闭后重开无法加载已生成图片"的问题。
 */
async function resumeImageTask(task: PendingImageTask, target: ShortDramaCharacterAppearance | ShortDramaLocation, key: string) {
  const probed = await probePrediction(task);
  if (probed?.completed) {
    imageGenProgress.value[key] = { status: 'saving', attempts: 0 };
    await confirmAndApplyImageTask(task, target);
    removePendingImageTask(key);
    delete imageGenProgress.value[key];
    ElMessage.success('图片生成任务已恢复并完成');
    return;
  }
  if (probed && !probed.completed) {
    // 服务端已失败或任务失效（404）：清理残留任务。
    removePendingImageTask(key);
    delete imageGenProgress.value[key];
    ElMessage.warning('图片生成任务已失效，请重新生成');
    return;
  }
  // 仍在生成中：以"当前时刻"为起点重新轮询一个完整窗口。
  imageGenProgress.value[key] = { status: 'polling', attempts: 0 };
  await pollImagePrediction(task.predictionId, task.model, key, 0);
  imageGenProgress.value[key] = { status: 'saving', attempts: 0 };
  await confirmAndApplyImageTask(task, target);
  removePendingImageTask(key);
  delete imageGenProgress.value[key];
  ElMessage.success('图片生成任务已恢复并完成');
}
async function handleRegenerateAppearanceImage(appearance: ShortDramaCharacterAppearance) {
  await handleGenerateAppearanceImage(appearance);
}

async function handleRegenerateLocationImage(location: ShortDramaLocation) {
  await handleGenerateLocationImage(location);
}

async function handleReferenceFileSelected(event: Event, key: string) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  if (!selectedImageModel.value) {
    ElMessage.warning('当前项目未配置图片模型');
    return;
  }
  if (!file.type.startsWith('image/')) {
    ElMessage.warning('请选择图片文件');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    ElMessage.warning('参考图不能超过 10MB');
    return;
  }
  uploadingReferenceImage.value[key] = true;
  try {
    const uploadedUrl = await uploadReferenceImage(file, selectedImageModel.value);
    assetReferenceImages.value[key] = uploadedUrl;
    ElMessage.success('参考图上传成功，可开始生成图片');
  } catch (error: any) {
    ElMessage.error(error.message || '参考图上传失败');
  } finally {
    uploadingReferenceImage.value[key] = false;
  }
}

async function handleSelectAppearanceImage(appearance: ShortDramaCharacterAppearance, index: number) {
  if (!appearance.id) return;
  try {
    const updated = await selectAppearanceImage(appearance.id, index);
    Object.assign(appearance, updated);
    // 同步更新 characters 中对应的 appearance
    for (const ch of characters.value) {
      const idx = ch.appearances?.findIndex(a => a.id === appearance.id);
      if (idx != null && idx >= 0 && ch.appearances) {
        Object.assign(ch.appearances[idx], updated);
        break;
      }
    }
  } catch { ElMessage.error('选择图片失败'); }
}

async function handleDeleteAppearanceImage(appearance: ShortDramaCharacterAppearance, index: number) {
  if (!appearance.id) return;
  if (parseJsonStrArray(appearance.imageUrls).length <= 1) {
    ElMessage.warning('至少保留一张角色图片');
    return;
  }
  try {
    const updated = await deleteAppearanceImage(appearance.id, index);
    Object.assign(appearance, updated);
    ElMessage.success('角色图片已删除');
  } catch (error: any) { ElMessage.error(error.message || '删除失败'); }
}

async function handleUndoAppearanceImage(appearance: ShortDramaCharacterAppearance) {
  if (!appearance.id) return;
  try {
    const updated = await undoAppearanceImage(appearance.id);
    Object.assign(appearance, updated);
    // 同步更新 characters 中对应的 appearance
    for (const ch of characters.value) {
      const idx = ch.appearances?.findIndex(a => a.id === appearance.id);
      if (idx != null && idx >= 0 && ch.appearances) {
        Object.assign(ch.appearances[idx], updated);
        break;
      }
    }
  } catch (e: any) { ElMessage.error(e.message || '撤销失败'); }
}

async function handleSelectLocationImage(location: ShortDramaLocation, index: number) {
  if (!location.id) return;
  try {
    const updated = await selectLocationImage(location.id, index);
    Object.assign(location, updated);
    const idx = locations.value.findIndex(l => l.id === location.id);
    if (idx >= 0) Object.assign(locations.value[idx], updated);
  } catch { ElMessage.error('选择图片失败'); }
}

async function handleDeleteLocationImage(location: ShortDramaLocation, index: number) {
  if (!location.id) return;
  if (parseJsonStrArray(location.imageUrls).length <= 1) {
    ElMessage.warning('至少保留一张场景图片');
    return;
  }
  try {
    const updated = await deleteLocationImage(location.id, index);
    Object.assign(location, updated);
    ElMessage.success('场景图片已删除');
  } catch (error: any) { ElMessage.error(error.message || '删除失败'); }
}

async function handleUndoLocationImage(location: ShortDramaLocation) {
  if (!location.id) return;
  try {
    const updated = await undoLocationImage(location.id);
    Object.assign(location, updated);
    const idx = locations.value.findIndex(l => l.id === location.id);
    if (idx >= 0) Object.assign(locations.value[idx], updated);
  } catch (e: any) { ElMessage.error(e.message || '撤销失败'); }
}

// ---- audio assets ----

// 场景描述的可编辑副本（loc.descriptions 是 JSON 字符串，无法直接 v-model）
const locationDescEdits = ref<Record<string, string[]>>({});
function locationDescriptions(loc: ShortDramaLocation): string[] {
  if (!loc.id) return [];
  if (!locationDescEdits.value[loc.id]) {
    // 新版场景只保留一个可编辑主描述；旧数据存在多个候选时兼容取第一条。
    locationDescEdits.value[loc.id] = parseJsonStrArray(loc.descriptions).filter(Boolean).slice(0, 1);
  }
  return locationDescEdits.value[loc.id];
}
async function handleSaveAllAssetPrompts() {
  savingAssetPrompts.value = true;
  try {
    await visualAssetCoverageRef.value?.saveAllPrompts();
    const appearanceTasks = characters.value.flatMap(character => character.appearances || [])
      .filter(appearance => appearance.id)
      .map(appearance => saveShortDramaAppearance({
        id: appearance.id,
        characterId: appearance.characterId,
        appearanceIndex: appearance.appearanceIndex,
        changeReason: appearance.changeReason,
        description: appearance.description,
        referenceImageUrl: appearance.referenceImageUrl,
        voice: appearance.voice,
      }));
    const locationTasks = locations.value.filter(location => location.id).map(location => {
      location.descriptions = JSON.stringify(locationDescEdits.value[location.id!] || locationDescriptions(location));
      return saveShortDramaLocation(location);
    });
    await Promise.all([...appearanceTasks, ...locationTasks]);

    ElMessage.success('道具、角色和场景提示词已全部保存');
  } catch (e: any) {
    ElMessage.error(e.message || '提示词保存失败');
  } finally {
    savingAssetPrompts.value = false;
  }
}

onMounted(async () => {
  if (imageTaskChannel) imageTaskChannel.addEventListener('message', handleImageTaskBroadcast);
  const incomingIdea = typeof route.query.idea === 'string' ? route.query.idea.trim() : '';
  const incomingRatio = typeof route.query.ratio === 'string' ? route.query.ratio : '';
  const incomingStyle = typeof route.query.style === 'string' ? route.query.style : '';
  const incomingAestheticSkill = typeof route.query.aestheticSkill === 'string' ? route.query.aestheticSkill : '';
  const incomingDirectorSkill = typeof route.query.directorSkill === 'string' ? route.query.directorSkill : '';
  const incomingProjectId = typeof route.query.projectId === 'string' ? route.query.projectId : '';
  const startFresh = route.query.fresh === '1';

  if (incomingIdea) ideaForm.value.idea = incomingIdea;
  if (videoRatioOptions.some(item => item.value === incomingRatio)) {
    ideaForm.value.videoRatio = incomingRatio;
  }
  if (incomingStyle) ideaForm.value.artStyle = incomingStyle;
  ideaForm.value.aestheticSkillName = incomingAestheticSkill;
  ideaForm.value.directorSkillName = incomingDirectorSkill;

  await Promise.all([refreshModels(), refreshProjects()]);
  const requestedProject = /^\d+$/.test(incomingProjectId)
    ? projects.value.find(item => item.id === incomingProjectId)
    : undefined;
  const initialProject = requestedProject || (!incomingIdea && !startFresh ? projects.value[0] : undefined);

  if (initialProject?.id) {
    await loadDetail(initialProject.id);
  }
  else if (incomingIdea || startFresh) {
    activeStep.value = 'idea';
    maxReachedStep.value = 'idea';
    await nextTick();
  }
  restoreCreativeDraft();
  if (regeneratingStoryboard.value) { activeStep.value = 'storyboard'; maxReachedStep.value = 'storyboard'; }
  if (!hasProject.value && scriptCreationJob.value?.state === 'running') { activeStep.value = 'script'; activeStage.value = 'script'; maxReachedStep.value = 'script'; }

});

onUnmounted(() => {
  viewMounted = false;
  stopComposePolling();
  Object.keys(pollingTimers.value).forEach(k => clearInterval(pollingTimers.value[k]));
  pollingTimers.value = {};
  Object.keys(imagePollTimers.value).forEach(k => clearInterval(imagePollTimers.value[k]));
  imagePollTimers.value = {};
  imageTaskChannel?.close();
});
function isDirectMaterial(item: ShortDramaStoryboard) {
  try { return JSON.parse(item.continuityJson || '{}').source_media?.mode === 'direct_insert'; } catch { return false; }
}
</script>

<template>
  <div class="short-drama-page">
    <aside class="project-sidebar">
      <div class="sidebar-head">
        <div>
          <h2>短剧项目</h2>
          <p>{{ loadingProjects ? '加载中' : `${projects.length} 个项目` }}</p>
        </div>
      </div>
      <div ref="projectListRef" class="project-list" :class="{ empty: !loadingProjects && projects.length === 0 }">
        <button v-if="scriptCreationJob && scriptCreationJob.state !== 'done'" class="project-item" :class="{ active: !hasProject && activeStep === 'script' }" @click="showInitialScriptJob">
          <span class="project-title">{{ scriptCreationJob.state === 'running' ? '初版剧本生成中' : '查看剧本生成反馈' }}</span>
          <span class="project-desc">{{ scriptCreationJob.message }}</span>
        </button>
        <button
          v-for="item in projects" :key="item.id" class="project-item"
          :class="{ active: item.id === currentProjectId }"
          @click="loadDetail(item.id!)"
        >
          <span class="project-title">{{ item.projectName }}</span>
          <span class="project-desc">{{ item.description || '暂无简介' }}</span>
          <span class="project-row">
            <small @click.stop="handleDeleteProject(item.id!)">删除</small>
          </span>
        </button>
        <div v-if="!loadingProjects && projects.length === 0" class="project-empty">还没有短剧项目</div>
      </div>
    </aside>

    <main class="workspace" :class="{ 'review-workspace': activeStep === 'storyboard' }">
      <section v-if="!hasProject" class="hero-panel">
        <div class="hero-copy">
          <h1>短剧创作</h1>
          <el-button type="primary" @click="handleCreateCanvasProject">从空白画布开始</el-button>
        </div>
      </section>

      <!-- Step navigation -->
      <section v-if="detail && hasProject" class="flow-entry">
        <div><span>创作空间</span><strong>{{ detail.project.projectName }}</strong></div>
        <div class="flow-entry-actions"><el-button @click="handleCreateCanvasProject">新建画布</el-button><el-button @click="openFlowDesigner">素材关系图</el-button><el-button type="primary" :disabled="savingStoryboard || storyboardStructureChanging" @click="openFlowStudio"><el-icon><Connection /></el-icon>自由画布</el-button></div>
      </section>
      <section class="step-panel">
        <button
          v-for="step in workflowSteps" :key="step.name" class="step-item"
          :class="{ active: activeStep === step.name, completed: maxReachedStepIndex > workflowSteps.findIndex(item => item.name === step.name) }"
          type="button" @click="handleStepClick(step.name)"
        >
          <span>{{ step.index }}</span>
          <strong>{{ step.title }}</strong>
        </button>
      </section>

      <details v-if="workflowFailureMessage" class="generation-error workflow-feedback">
        <summary>
          生成未完成 · 查看请求反馈
          <el-button class="generation-error-close" text size="small" aria-label="关闭生成反馈" @click.stop.prevent="dismissWorkflowFeedback">关闭</el-button>
        </summary>
        <p>{{ workflowFailureMessage }}</p>
        <el-button size="small" @click="downloadWorkflowFeedback">下载请求摘要与失败记录</el-button>
      </details>
      <ScriptGenerationPanel v-if="activeStep === 'script' && !hasProject && scriptCreationJob" :job="scriptCreationJob" />

      <!-- ====== Step 01: Idea ====== -->
      <section v-if="activeStep === 'idea'" class="form-step-panel idea-step">
        <div class="section-head">
          <div>
            <span class="section-kicker">Step 01</span>
            <h2>输入想法</h2>
          </div>
        </div>
        <el-form label-position="top" class="creator-form">
          <el-form-item label="故事想法" class="idea-field">
            <el-input v-model="ideaForm.idea" type="textarea" placeholder="例如：外卖小哥绑定时间循环，每次送错一单都会回到十分钟前。" />
          </el-form-item>
          <div class="creator-actions">
            <el-button v-if="hasProject" :loading="savingIdea" :disabled="!ideaForm.idea.trim()" @click="handleSaveIdea">保存想法</el-button>
            <el-button type="primary" :loading="generating" :disabled="!canGenerate" @click="handleCreateFromIdea">
              <el-icon><MagicStick /></el-icon>生成草稿剧本
            </el-button>
          </div>
        </el-form>
      </section>

      <!-- ====== Step 02: Script ====== -->
      <section v-if="activeStep === 'script' && hasProject" class="form-step-panel">
        <div class="section-head">
          <div>
            <span class="section-kicker">Step 02</span>
            <h2>剧本审阅</h2>
          </div>
        </div>
        <div class="script-grid">
          <el-form label-position="top">
            <div class="script-meta">
              <el-form-item v-if="detail" label="项目名称">
                <el-input v-model="detail.project.projectName" placeholder="项目名称" />
              </el-form-item>
              <el-form-item label="剧本名称">
                <el-input v-model="scriptForm.scriptName" placeholder="剧本名称" />
              </el-form-item>
              <el-form-item label="风格 / 基调">
                <el-input v-model="scriptForm.tone" placeholder="风格/基调" />
              </el-form-item>
            </div>
            <el-form-item label="剧情大纲">
              <el-input v-model="scriptForm.outlineText" type="textarea" :autosize="{ minRows: 7, maxRows: 14 }" placeholder="剧情大纲" />
            </el-form-item>
            <el-form-item label="剧本正文">
              <div style="width:100%">
                <el-button text @click="scriptEditing = !scriptEditing">{{ scriptEditing ? '阅读剧本' : '编辑剧本' }}</el-button>
                <el-input v-if="scriptEditing" v-model="scriptForm.scriptText" type="textarea" :autosize="{ minRows: 14, maxRows: 28 }" placeholder="剧本正文" />
                <ScriptReader v-else :text="scriptForm.scriptText" />
              </div>
            </el-form-item>
            <el-form-item v-if="scriptRefinementOpen" label="修改意见">
              <el-input v-model="scriptRevisionInstruction" type="textarea" :autosize="{ minRows: 3, maxRows: 8 }" placeholder="例如：删掉现代开场；强化匪寇压境；保留炮击高潮；对白更口语化。" />
            </el-form-item>
            <el-form-item label="制作与修订要求">
              <el-input v-model="scriptForm.revisionNotes" type="textarea" :autosize="{ minRows: 3, maxRows: 8 }" aria-label="制作与修订要求" placeholder="例如：整集按原剧本重新分镜，保留对白；沿用已确认的角色形象，重设计候选暂不选用。保存剧本后用于后续生成。" />
            </el-form-item>
          </el-form>
        </div>
        <DramaProductionSkills v-if="scriptRefinementOpen" v-model:aesthetic="ideaForm.aestheticSkillName" v-model:director="ideaForm.directorSkillName" v-model:storyboard-skills="ideaForm.storyboardSkillNames" stage="script" :disabled="polishingScript || regeneratingStoryboard || composeBusy" />
        <div class="step-actions">
          <el-button @click="activeStep = 'idea'">上一步</el-button>
          <el-button :disabled="polishingScript" @click="scriptRefinementOpen = !scriptRefinementOpen"><el-icon><MagicStick /></el-icon>打磨剧本</el-button>
          <el-button v-if="scriptRefinementOpen" type="primary" :loading="polishingScript" :disabled="!scriptRevisionInstruction.trim()" @click="handlePolishScript">按所选技能和意见重写</el-button>
          <el-button :loading="savingScript" :disabled="!hasProject" @click="handleSaveScript">保存剧本</el-button>
          <el-button type="primary" :loading="analyzingAssets" :disabled="!scriptForm.id" @click="handleAnalyzeAssets">
            保存并分析资产
          </el-button>
        </div>
      </section>

      <!-- ====== Step 03: Assets ====== -->
      <section v-if="activeStep === 'assets' && hasProject" class="form-step-panel">
        <AssetGenerationBoard v-if="assetJob && (analyzingAssets || assetJob.state === 'error' || assetJob.queryError)" :job="assetJob" :now="assetNow" :querying="assetQuerying" @query="assetAnalysis.query()" />
        <div v-show="!analyzingAssets" v-loading="savingAssetStyle" :inert="savingAssetStyle || undefined">
        <StudioSection title="资产配置">
          <template #actions>
            <el-button type="primary" :loading="generatingAssetBatch" :disabled="!selectedImageModel || visualAssetCoverageRef?.running" @click="handleGenerateMissingAssets">一键生成</el-button>
            <FixedPropEditor v-if="currentProjectId" :project-id="currentProjectId" :image-model="selectedImageModel" @saved="visualAssetCoverageRef?.refresh()" />
          </template>
        </StudioSection>

        <AssetVisualStyle :aesthetic="ideaForm.aestheticSkillName" v-model:image-model="ideaForm.imageModel" :models="imageModels" :saving="savingAssetStyle" :disabled="generatingAssetBatch || visualAssetCoverageRef?.running" @select="changeAssetVisualStyle" />

        <el-tabs v-model="assetCategoryTab" class="asset-category-tabs">


          <!-- Characters -->
          <el-tab-pane :label="`角色 (${characters.length})`" name="characters" lazy>
          <CharacterLibrary v-if="characters.length > 0 && currentProjectId" :characters="sortedCharacters" :project-id="String(currentProjectId)" :saving="savingAssetPrompts" @save="handleSaveAllAssetPrompts">
            <template #appearance="{ appearance: ap }">
              <div class="appearance-editor">
                  <div class="appearance-item-header">
                    <span class="appearance-chip">图片候选 {{ parseJsonStrArray(ap.imageUrls).length }}</span>
                    <div class="appearance-img-actions">
                      <el-button size="small" :loading="generatingImage[`appearance-${ap.id}`]" @click="handleGenerateAppearanceImage(ap)">
                        <template v-if="imageGenProgress[`appearance-${ap.id}`]">
                          生成中 ({{ imageGenProgress[`appearance-${ap.id}`].status === 'saving' ? '保存' : `${imageGenProgress[`appearance-${ap.id}`].attempts * 2}s` }})
                        </template>
                        <template v-else>生成图片</template>
                      </el-button>
                      <el-button v-if="parseJsonStrArray(ap.imageUrls).length" size="small" type="warning" plain :loading="generatingImage[`appearance-${ap.id}`]" @click="handleRegenerateAppearanceImage(ap)">
                        重新生成
                      </el-button>
                      <el-button v-if="parseJsonStrArray(ap.previousImageUrls).length" size="small" type="warning" plain @click="handleUndoAppearanceImage(ap)">
                        撤销
                      </el-button>
                    </div>
                  </div>
                  <StudioDisclosure title="形象提示词">
                  <el-input
                    v-model="ap.description"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    size="small"
                    placeholder="形象视觉提示词（生成图片用，可编辑）"

                    style="margin:6px 0;"
                  />
                  </StudioDisclosure>
                  <div class="asset-reference-input">
                    <span class="asset-reference-label">上传照片作为参考</span>
                    <label class="reference-upload-button" :class="{ disabled: uploadingReferenceImage[`appearance-${ap.id}`] }">
                      {{ uploadingReferenceImage[`appearance-${ap.id}`] ? '上传中…' : (assetReferenceImages[`appearance-${ap.id}`] ? '更换照片' : '选择照片') }}
                      <input type="file" accept="image/*" :disabled="uploadingReferenceImage[`appearance-${ap.id}`]" @change="handleReferenceFileSelected($event, `appearance-${ap.id}`)" />
                    </label>
                    <img
                      v-if="assetReferenceImages[`appearance-${ap.id}`]"
                      :src="assetReferenceImages[`appearance-${ap.id}`]"
                      alt="角色参考图预览"
                      class="asset-reference-preview"
                      referrerpolicy="no-referrer"
                    />
                    <el-button v-if="assetReferenceImages[`appearance-${ap.id}`]" size="small" text type="danger" @click="delete assetReferenceImages[`appearance-${ap.id}`]">移除</el-button>
                  </div>
                  <AssetImageGallery
                    v-if="parseJsonStrArray(ap.imageUrls).length"
                    :urls="parseJsonStrArray(ap.imageUrls)"
                    :descriptions="parseJsonStrArray(ap.imageDescriptions)"
                    :fallback-prompt="ap.description"
                    :selected-index="ap.selectedImageIndex"
                    :label="ap.changeReason || '角色形象'"
                    variant="role"
                    @select="index => handleSelectAppearanceImage(ap, index)"
                    @delete="index => handleDeleteAppearanceImage(ap, index)"
                  />
              </div>
            </template>
          </CharacterLibrary>
          <el-empty v-else description="还没有角色档案，请先在上一步点击「分析资产」" />
          </el-tab-pane>

          <!-- Locations -->
          <el-tab-pane :label="`场景 (${locations.length})`" name="locations" lazy>
          <div v-if="locations.length > 0" class="asset-tab-content">
          <div class="asset-card-list">
            <article v-for="loc in locations" :key="loc.id" class="asset-card location-card">
              <div class="asset-card-head">
                <span class="asset-name">{{ loc.name }}</span><el-button size="small" text type="primary" :loading="savingAssetPrompts" @click="handleSaveAllAssetPrompts">保存提示词</el-button>
                <el-tag v-if="loc.hasCrowd" size="small" type="warning">有群演</el-tag>
              </div>
              <p v-if="loc.summary" class="location-summary">{{ loc.summary }}</p>
              <GeneratedAssetImage v-if="parseJsonStrArray(loc.imageUrls).length" class="location-cover" :src="parseJsonStrArray(loc.imageUrls)[loc.selectedImageIndex ?? 0] || parseJsonStrArray(loc.imageUrls)[0] || ''" :title="`${loc.name}场景`" fit="cover" />
              <StudioDisclosure title="场景资料与图片" :description="`${parseJsonStrArray(loc.imageUrls).length} 个候选`">
              <el-input
                v-model="loc.summary"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3 }"
                size="small"
                placeholder="场景简要说明（可编辑）"

                style="margin:4px 0;"
              />
              <div v-if="loc.availableSlots" class="slots-block">
                <span class="slots-label">可站位置：</span>
                <ul class="slots-list">
                  <li v-for="(slot, i) in parseJsonField<string[]>(loc.availableSlots) || []" :key="i">{{ slot }}</li>
                </ul>
              </div>
              <div class="descs-block">
                <span class="slots-label">场景描述（可编辑）：</span>
                <el-input
                  v-for="(_, i) in locationDescriptions(loc)"
                  :key="i"
                  v-model="locationDescriptions(loc)[i]"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 5 }"
                  size="small"

                  style="margin:4px 0;"
                />
              </div>
              <!-- 场景图片画廊 -->
              <div class="location-image-section">
                <div class="location-img-actions">
                  <el-button size="small" :loading="generatingImage[`location-${loc.id}`]" @click="handleGenerateLocationImage(loc)">
                    <template v-if="imageGenProgress[`location-${loc.id}`]">
                      生成中 ({{ imageGenProgress[`location-${loc.id}`].status === 'saving' ? '保存' : `${imageGenProgress[`location-${loc.id}`].attempts * 2}s` }})
                    </template>
                    <template v-else>生成场景图</template>
                  </el-button>
                  <el-button v-if="parseJsonStrArray(loc.imageUrls).length" size="small" type="warning" plain :loading="generatingImage[`location-${loc.id}`]" @click="handleRegenerateLocationImage(loc)">
                    重新生成
                  </el-button>
                  <el-button v-if="parseJsonStrArray(loc.previousImageUrls).length" size="small" type="warning" plain @click="handleUndoLocationImage(loc)">
                    撤销
                  </el-button>
                </div>
                <div class="asset-reference-input">
                  <span class="asset-reference-label">上传照片作为参考</span>
                  <label class="reference-upload-button" :class="{ disabled: uploadingReferenceImage[`location-${loc.id}`] }">
                    {{ uploadingReferenceImage[`location-${loc.id}`] ? '上传中…' : (assetReferenceImages[`location-${loc.id}`] ? '更换照片' : '选择照片') }}
                    <input type="file" accept="image/*" :disabled="uploadingReferenceImage[`location-${loc.id}`]" @change="handleReferenceFileSelected($event, `location-${loc.id}`)" />
                  </label>
                  <img
                    v-if="assetReferenceImages[`location-${loc.id}`]"
                    :src="assetReferenceImages[`location-${loc.id}`]"
                    alt="场景参考图预览"
                    class="asset-reference-preview"
                    referrerpolicy="no-referrer"
                  />
                  <el-button v-if="assetReferenceImages[`location-${loc.id}`]" size="small" text type="danger" @click="delete assetReferenceImages[`location-${loc.id}`]">移除</el-button>
                </div>
                <el-select
                  v-model="assetReferenceImages[`location-${loc.id}`]"
                  placeholder="选择场景参考"
                  clearable
                  style="width: 100%; margin-top: 8px"
                >
                  <el-option
                    v-for="source in (detail?.locations || []).filter(item => item.id !== loc.id && parseJsonStrArray(item.imageUrls).length)"
                    :key="source.id"
                    :label="source.name"
                    :value="parseJsonStrArray(source.imageUrls)[source.selectedImageIndex || 0]"
                  />
                </el-select>
                <AssetImageGallery
                  v-if="parseJsonStrArray(loc.imageUrls).length"
                  :urls="parseJsonStrArray(loc.imageUrls)"
                  :descriptions="parseJsonStrArray(loc.imageDescriptions)"
                  :fallback-prompt="locationDescriptions(loc)[0] || loc.summary || loc.name"
                  :selected-index="loc.selectedImageIndex"
                  :label="loc.name"
                  variant="location"
                  @select="index => handleSelectLocationImage(loc, index)"
                  @delete="index => handleDeleteLocationImage(loc, index)"
                />
              </div>
              </StudioDisclosure>
            </article>
          </div>
          </div>
          <el-empty v-else description="还没有场景档案，请先在上一步点击「分析资产」" />
          </el-tab-pane>
          <el-tab-pane :label="`道具素材 (${visualAssetStats.total})`" name="props">
            <VisualAssetCoverage ref="visualAssetCoverageRef" v-if="currentProjectId" :shots="workspaceStoryboards" :project-id="currentProjectId" :image-model="selectedImageModel" :editing="true" @stats="value => visualAssetStats = value" @select="id => { selectShot(id); activeStep = 'storyboard'; }" />
          </el-tab-pane>
        </el-tabs>

        <div class="step-actions">
          <el-button @click="activeStep = 'script'">上一步</el-button>
          <el-button :loading="analyzingAssets" :disabled="!scriptForm.id" @click="handleAnalyzeAssets">
            <el-icon><RefreshRight /></el-icon>重新分析
          </el-button>
          <el-button type="primary" :loading="regeneratingStoryboard" :disabled="!scriptForm.id || composeBusy" @click="handleGenerateStoryboard">
            生成分镜
          </el-button>
        </div>
        </div>
      </section>

      <!-- ====== Step 04: Storyboard ====== -->
      <section v-if="activeStep === 'storyboard' && hasProject" class="form-step-panel storyboard-panel">
        <DramaProductionSkills v-model:aesthetic="ideaForm.aestheticSkillName" v-model:director="ideaForm.directorSkillName" v-model:storyboard-skills="ideaForm.storyboardSkillNames" :disabled="regeneratingStoryboard || composeBusy">
          <template #actions><el-button :loading="regeneratingStoryboard" :disabled="!scriptForm.id || composeBusy || analyzingAssets" @click="handleGenerateStoryboard">按所选技能重新分镜</el-button></template>
        </DramaProductionSkills>
        <StoryboardGenerationBoard v-if="storyboardJob && (regeneratingStoryboard || storyboardJob.state === 'error' || storyboardJob.queryError)" :job="storyboardJob" :now="storyboardNow" :querying="storyboardQuerying" :can-retry="!composeBusy && !analyzingAssets" @query="storyboardPlanning.query()" @retry="handleGenerateStoryboard" />
        <template v-if="!regeneratingStoryboard">
        <div v-if="showStoryboardAuxiliaryTools" class="section-head storyboard-section-head" :class="{ collapsed: storyboardToolsCollapsed }">
          <div class="storyboard-section-title">
            <span v-show="!storyboardToolsCollapsed" class="section-kicker">Step 04</span>
            <h2>分镜确认</h2>
          </div>
          <div v-show="!storyboardToolsCollapsed" class="storyboard-header-actions">

            <el-button :loading="regeneratingStoryboard" :disabled="!scriptForm.id || composeBusy" @click="handleGenerateStoryboard">重新生成</el-button>
            <el-tooltip :disabled="!!ideaForm.videoModel || storyboardDrafts.length === 0" content="后台尚未配置可用的视频模型">
              <ShotBatchSelect v-model="videoBatchStart" :total="storyboardDrafts.length" :disabled="generatingAllVideos || composeBusy" /><el-button :loading="generatingAllVideos" :disabled="!ideaForm.videoModel || composeBusy" @click="handleGenerateOpeningVideos">生成本批视频</el-button>
              <el-button :loading="generatingAllVideos" :disabled="!ideaForm.videoModel || storyboardDrafts.length === 0 || composeBusy" @click="handleGenerateAllVideos">
                一键生成全部视频
              </el-button>
            </el-tooltip>
          </div>
          <el-button class="storyboard-collapse-button" text @click="storyboardToolsCollapsed = !storyboardToolsCollapsed">
            <el-icon><ArrowDown v-if="storyboardToolsCollapsed" /><ArrowUp v-else /></el-icon>
            {{ storyboardToolsCollapsed ? '展开顶部工具' : '收起顶部工具' }}
          </el-button>
        </div>

        <div v-if="storyboardDrafts.length > 0" class="composition-toolbar">
          <div class="composition-toolbar-main">
            <div class="composition-heading">
              <strong>成片合成</strong>
              <span>已选择 {{ selectedComposeCount }}/{{ completedVideoCount }} 个镜头</span>
            </div>
            <div class="composition-controls">
              <div class="composition-clip-select">
                <el-select
                  v-model="composeStoryboardIds"
                  multiple
                  collapse-tags
                  placeholder="选择参与合成的分镜"
                  :disabled="composeBusy"
                >
                  <el-option
                    v-for="item in completedStoryboards"
                    :key="item.id"
                    :label="`镜头 ${item.sceneNo} · ${item.sceneTitle || '未命名'}`"
                    :value="item.id!"
                  />
                </el-select>
              </div>
              <el-segmented
                v-model="composeForm.transitionType"
                block
                class="transition-segmented"
                :options="transitionOptions"
                :disabled="composeBusy"
              />
              <el-select
                v-if="composeForm.transitionType !== 'none'"
                v-model="composeForm.transitionDurationSeconds"
                class="transition-duration-select"
                :disabled="composeBusy"
                aria-label="转场时长"
              >
                <el-option v-for="seconds in transitionDurationOptions" :key="seconds" :label="`${seconds} 秒`" :value="seconds" />
              </el-select>
              <el-select
                v-model="composeForm.aspectRatio"
                class="compose-ratio-select"
                :disabled="composeBusy"
                aria-label="成片画幅"
              >
                <el-option v-for="ratio in videoRatioOptions" :key="ratio.value" :label="ratio.label" :value="ratio.value" />
              </el-select>
              <el-switch
                v-model="composeForm.watermark"
                :disabled="composeBusy"
                active-text="水印"
                inline-prompt
                style="--el-switch-on-color: var(--el-color-primary);"
              />
              <el-tooltip :disabled="canComposeVideo" :content="composeDisabledReason" placement="top">
                <span class="compose-button-wrap">
                  <el-button
                    type="primary"
                    :loading="composeBusy"
                    :disabled="!canComposeVideo"
                    @click="handleComposeVideo"
                  >
                    <el-icon v-if="!composeSubmitting && !composeRunning"><VideoPlay /></el-icon>
                    {{ composeRunning ? '合成中' : '合成所选 ' + selectedComposeCount + ' 段' }}
                  </el-button>
                </span>
              </el-tooltip>
            </div>
          </div>

          <MusicGeneration v-if="showStoryboardAuxiliaryTools && currentProjectId" :project-id="String(currentProjectId)" :models="musicModels" :writing-model="ideaForm.model" :shot-numbers="storyboardDrafts.map(s => s.sceneNo)" @changed="soundRefreshKey++" />
          <ReferenceAudio v-if="showStoryboardAuxiliaryTools && currentProjectId" :key="`${currentProjectId}:${soundRefreshKey}`" :project-id="String(currentProjectId)" />
          <div v-if="narrationDraft" class="narration-panel">
            <div class="narration-heading">
              <strong>旁白内容</strong>
              <span v-if="narrationAudio?.audioUrl">已生成，合成时自动使用</span>
            </div>
            <el-input
              v-model="narrationDraft"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6 }"
              placeholder="编辑旁白内容"
              :disabled="composeBusy || generatingNarration"
            />
            <div class="narration-actions">
              <el-button size="small" type="primary" :loading="generatingNarration" :disabled="composeBusy" @click="handleGenerateNarration">
                {{ narrationAudio?.audioUrl ? '重新生成旁白' : '生成旁白' }}
              </el-button>
              <el-button v-if="narrationAudio?.audioUrl" size="small" text type="success" @click="openExternal(narrationAudio.audioUrl)">试听</el-button>
            </div>
          </div>

          <div v-if="composeResult" class="composition-status">
            <el-tag size="small" :type="composeStatusTagType">{{ composeStatusText }}</el-tag>
            <el-progress
              v-if="composeRunning"
              class="composition-progress"
              :percentage="composeProgress"
              :stroke-width="8"
            />
            <span v-if="composeResult.status === 'done' && composeResult.outputDurationSeconds != null" class="composition-duration">
              成片时长 {{ formatVideoDuration(composeResult.outputDurationSeconds) }}
            </span>
            <span v-if="composeResult.status === 'failed'" class="composition-error">
              {{ composeResult.errorMessage || '合成失败，请重试' }}
            </span>
            <el-button
              v-if="composeResult.status === 'done'"
              class="composition-download"
              type="primary"
              :loading="downloadingComposition"
              @click="handleDownloadComposition"
            >
              <el-icon><Download /></el-icon>
              下载合成视频
            </el-button>
          </div>
        </div>

        <el-alert v-if="detail?.project?.status === 'script_changed' && storyboardDrafts.length" title="剧本已修改，以下为上一版分镜。请重新分析资产并生成分镜。" type="warning" :closable="false" />
        <ContinuityReview v-if="showStoryboardAuxiliaryTools && workspaceStoryboards.length" :shots="workspaceStoryboards" @select="selectShot" />
        <div v-if="storyboardDrafts.length > 0" class="storyboard-workspace">
          <ShotNavigator v-model:version="selectedVersionId" :shots="workspaceStoryboards" :selected="selectedShotId" :versions="storyboardVersions" :disabled="storyboardStructureChanging || composeBusy" @select="selectShot" />
          <div class="storyboard-list">
          <article v-for="item in visibleStoryboards" :key="item.id ?? item.sceneNo" class="storyboard-card">
            <ShotEditorHeader v-model:title="item.sceneTitle" :scene-no="item.sceneNo" :index="selectedShotIndex" :total="workspaceStoryboards.length" :has-previous="!!adjacentShots.before" :has-next="!!adjacentShots.after" :disabled="storyboardStructureChanging || composeBusy" :delete-disabled="videoSubmissionBlocked(item)" @previous="selectShot(storyboardKey(adjacentShots.before!))" @next="selectShot(storyboardKey(adjacentShots.after!))" @add="handleAddStoryboard(item)" @delete="handleDeleteStoryboard(item)" />

            <ShotGenerationSettings :continuity-json="item.continuityJson" :models="videoModels" :model="videoModelFor(item)" :fallback="ideaForm.videoModel" :supports-resolution="videoResolutionSupported(item)" :disabled="composeBusy || videoSubmissionBlocked(item)" @update="item.continuityJson = $event">
              <ShotVideoReferences v-if="currentProjectId" :project-id="String(currentProjectId)" :continuity-json="item.continuityJson" :model="videoModelFor(item)" :disabled="composeBusy || videoSubmissionBlocked(item)" @update="item.continuityJson = $event" />
              <ShotCharacterVoices v-if="currentProjectId && item.id" :project-id="String(currentProjectId)" :shot="item" :characters="characters" :model="videoModelFor(item)" :disabled="composeBusy || videoSubmissionBlocked(item)" @update="item.continuityJson = $event" />
            </ShotGenerationSettings>
            <div class="video-prompt-field">
              <ShotDesignCard :continuity-json="item.continuityJson" />
              <VideoPromptEditor v-model="item.videoPrompt" :disabled="composeBusy || videoSubmissionBlocked(item)" />
            </div>

            <!-- Reference Images -->
            <StoryboardReferenceImages v-if="currentProjectId" :project-id="currentProjectId" :shot="item" :characters="characters" :locations="locations">
              <template #material>
                <ShotSourceMaterial v-if="item.id" :project-id="currentProjectId" :storyboard-id="item.id" :continuity-json="item.continuityJson" @uploaded="loadDetail(currentProjectId!)" />
              </template>
            </StoryboardReferenceImages>
            <ShotFramePreview v-if="currentProjectId && item.id" :project-id="currentProjectId" :storyboard-id="item.id" :scene-no="item.sceneNo" :continuity-json="item.continuityJson" :image-model="ideaForm.imageModel" @updated="loadDetail(currentProjectId!)" />

            <ShotVideoPanel :shot="item" :preview-src="storyboardVideoPreviewSource(item)" :blocked="videoSubmissionBlocked(item)" :unknown="videoSubmissionUnknown(item)" :hint="videoSubmissionHint(item)" :can-restore="canRestoreVideoSubmission(item)" :disabled="composeBusy || generatingVideo[item.id ?? '']" @query="handleCheckVideoProgress(item)" @restore="handleRestoreVideoSubmission(item)">
              <template #actions>
                <el-button
                  v-if="item.videoStatus === 'failed' && !videoSubmissionBlocked(item)"
                  size="small"
                  type="danger"
                  plain
                  :loading="generatingVideo[item.id ?? '']"
                  :disabled="!videoModelAvailable(item) || composeBusy || videoSubmissionBlocked(item)"
                  @click="handleRetryVideo(item)"
                >
                  重新生成视频
                </el-button>
                <el-tag v-else-if="isDirectMaterial(item)" size="small">素材插入</el-tag>
                <el-tooltip v-else :disabled="videoModelAvailable(item) && !videoSubmissionBlocked(item)" :content="!videoModelAvailable(item) ? '本镜所选视频模型未配置' : '已有请求待确认，请先查询状态'">
                  <el-button size="small" type="primary" :loading="generatingVideo[item.id ?? '']" :disabled="videoSubmissionBlocked(item) || !videoModelAvailable(item) || composeBusy" @click="handleGenerateVideo(item, item.videoStatus === 'done')">
                    {{ item.videoStatus === 'done' ? '重新生成视频' : '生成视频' }}
                  </el-button>
                </el-tooltip>
                <el-button size="small" :loading="savingStoryboard" :disabled="composeBusy || savingStoryboard || videoSubmissionBlocked(item)" @click="handleSaveStoryboard(item)">保存镜头</el-button>
              </template>
            </ShotVideoPanel>
          </article>
          </div>
        </div>
        <el-empty v-else description="还没有保存的分镜">
          <el-button :disabled="!scriptForm.id || storyboardStructureChanging || composeBusy" @click="handleAddStoryboard()">手动新增镜头</el-button>
          <el-button type="primary" :disabled="!scriptForm.id || composeBusy || analyzingAssets" @click="handleGenerateStoryboard">{{ storyboardJob?.state === 'error' ? '重新生成分镜' : '生成分镜' }}</el-button>
        </el-empty>
        <div class="step-actions">
          <el-button @click="activeStep = 'assets'">上一步</el-button>
        </div>
        </template>
      </section>
    </main>
    <Teleport to="body">
      <FlowDesigner v-if="flowDesignerOpen && detail && currentProjectId" :project="detail.project" :characters="characters" :locations="locations" :shots="storyboardDrafts" :versions="storyboardVersions" v-model:version="selectedVersionId" :actions="flowActions" :settings="{ models: videoModels, fallback: ideaForm.videoModel }" @close="closeFlowWorkspace" @edit="openFlowBusinessEditor" @prepare="closeFlowWorkspace(); activeStep = 'storyboard'" />
      <FlowStudio v-if="flowStudioOpen && detail && currentProjectId" :key="currentProjectId" :detail="{ ...detail, characters, locations, storyboards: storyboardDrafts }" :actions="flowActions" :refresh="refreshCanvasProject" :image-models="imageModels" :video-models="videoModels" @close="closeFlowWorkspace" @references="openFlowDesigner" @new="handleCreateCanvasProject" />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.flow-entry { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:16px 20px; margin-bottom:16px; border:1px solid var(--drama-border); border-radius:var(--drama-radius-md); background:var(--drama-surface-strong); }
.flow-entry>div { min-width:0; display:grid; gap:7px; }.flow-entry span { font-size:10px; letter-spacing:1px; color:var(--drama-text-tertiary); }.flow-entry strong { font-size:14px; font-weight:650; color:var(--drama-text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.flow-entry .el-button { flex:none; }.flow-entry .el-icon { margin-right:6px; }
.flow-entry>.flow-entry-actions { display:flex; flex-wrap:wrap; gap:8px; }.flow-entry-actions .el-button { margin-left:0; }
.shot-edit-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 0;
  border-bottom: 1px solid var(--drama-border);
}
.shot-edit-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  .el-button { min-height: 40px; padding: 0 20px; margin: 0; border-radius: 8px; }
}
@media (max-width: 640px) {
  .shot-edit-actions { width: 100%; gap: 12px; }
  .shot-edit-actions .el-button { flex: 1; padding: 0 14px; }
}

.short-drama-page {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 228px minmax(0, 1fr);
  gap: 20px;
  width: 100%;
  height: calc(100vh - var(--header-container-default-heigth));
  min-height: 0;
  padding: 20px 24px 24px;
  overflow: hidden;
  color: var(--drama-text);
  background: var(--drama-canvas);
  *, *::before, *::after { box-sizing: border-box; }
}

.project-sidebar, .hero-panel, .step-panel, .form-step-panel {
  min-width: 0;
  background: var(--drama-surface);
  border: 1px solid var(--drama-border);
  border-radius: 12px;
  box-shadow: var(--drama-shadow-sm);

}

.project-sidebar { display: flex; flex-direction: column; height: 100%; min-height: 0; overflow: hidden; }
.sidebar-head, .section-head { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; justify-content: space-between; }
.sidebar-head { padding: 18px 18px 14px; border-bottom: 1px solid #edf1f5; }

h1, h2, h3, p { margin: 0; }
h1 { font-size: 26px; font-weight: 780; line-height: 1.18; color: #1f2329; }
h2 { font-size: 18px; font-weight: 720; line-height: 1.35; color: var(--drama-text); }
h3 { font-size: 15px; font-weight: 700; color: #343b46; }
p { margin-top: 6px; font-size: 13px; line-height: 1.65; color: var(--drama-text-secondary); }

.project-list { display: grid; gap: 8px; padding: 12px; overflow: auto; overscroll-behavior: contain; scrollbar-gutter: stable; &.empty { min-height: 96px; align-content: center; } }
.project-empty { padding: 16px; font-size: 13px; line-height: 1.5; color: #667085; text-align: center; background: #f8fafc; border: 1px dashed var(--drama-border); border-radius: 8px; }
.project-item {
  display: grid; gap: 6px; width: 100%; min-width: 0; padding: 12px; text-align: left; cursor: pointer;
  background: #fff; border: 1px solid #e6eaf0; border-radius: 8px; transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
  &:hover { background: #f8fbff; border-color: var(--drama-border); }
  &.active { background: var(--drama-primary-soft); border-color: var(--drama-primary); box-shadow: inset 3px 0 0 var(--drama-primary); }
}
.project-title { overflow: hidden; font-size: 14px; font-weight: 700; color: var(--drama-text); text-overflow: ellipsis; white-space: nowrap; }
.project-desc { display: -webkit-box; overflow: hidden; font-size: 12px; line-height: 1.5; color: #6f7785; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.project-row { display: flex; align-items: center; justify-content: flex-end; gap:8px; font-size: 12px; small { white-space:nowrap; flex-shrink:0; color: var(--el-color-danger); } }

.workspace { display: flex; flex-direction: column; gap: 20px; height: 100%; min-width: 0; min-height: 0; overflow: hidden auto; overscroll-behavior: contain; }
.hero-panel, .form-step-panel { padding: 24px; }
.hero-panel {
  min-height: 82px; position: relative; overflow: hidden;
  background: linear-gradient(90deg, rgb(37 99 235 / 7%) 0 1px, transparent 1px), linear-gradient(180deg, rgb(56 189 248 / 6%) 0 1px, transparent 1px), linear-gradient(120deg, #fff, #f0f9ff);
  background-size: 28px 28px;
  &::before { position: absolute; top: 18px; right: 22px; width: 84px; height: 2px; content: ""; background: linear-gradient(90deg, #6c88b5, transparent); opacity: .55; }
}
.hero-copy { display: grid; gap: 8px; max-width: 760px; position: relative; z-index: 1; }

.section-kicker { font-size: 12px; font-weight: 700; line-height: 1.3; color: var(--drama-primary); text-transform: uppercase; }
.section-head-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; min-width: 0; max-width: 100%; }
.image-model-label { font-size: 12px; font-weight: 600; color: #4a5568; white-space: nowrap; }

.step-panel { flex-shrink: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; padding: 0; overflow: hidden; background: #fff; }

.step-item {
  position: relative; display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 10px; min-height: 64px;
  padding: 11px 14px; text-align: left; cursor: pointer; background: transparent; border: 0;
  border-right: 1px solid #edf1f5; border-radius: 0; transition: background .2s ease;
  &:last-child { border-right: 0; }
  &::after { position: absolute; right: 16px; bottom: 0; left: 16px; height: 3px; content: ""; background: transparent; border-radius: 999px 999px 0 0; }
}
.step-item span { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; font-size: 12px; font-weight: 800; line-height: 1; color: #6a7280; background: #fbfcfe; border: 1px solid var(--drama-border); border-radius: 8px; }
.step-item strong { min-width: 0; overflow: hidden; font-size: 14px; font-weight: 750; line-height: 1.35; color: #262b33; text-overflow: ellipsis; white-space: nowrap; }
.step-item:hover, .step-item.active { background: #f9fbfd; }
.step-item.active::after { background: linear-gradient(90deg, var(--drama-primary), var(--drama-primary)); }
.step-item.active span { color: #fff; background: linear-gradient(145deg, var(--drama-primary), var(--drama-primary)); border-color: var(--drama-primary); box-shadow: none; }
.step-item.completed:not(.active) span { color: var(--drama-primary); background: var(--drama-primary-soft); border-color: var(--drama-border); }

.form-step-panel { display: grid; gap: 16px; align-content: start; width: 100%; min-height: auto; overflow: visible; flex: 0 0 auto; }
.idea-step { min-height: 0; overflow: visible; }
.creator-form { display: grid; gap: 13px; min-width: 0; min-height: 0; overflow: visible; }
.idea-field { min-height: 0; margin-bottom: 0; :deep(.el-textarea__inner) { height: clamp(160px, 26vh, 300px); min-height: 160px !important; } }
.single-step-form, .script-grid, .storyboard-list { min-height: 0; overflow: auto; }

:deep(.el-button--primary:not(.is-plain)) { --el-button-bg-color: var(--drama-primary); --el-button-border-color: var(--drama-primary); --el-button-hover-bg-color: var(--drama-primary-hover); --el-button-hover-border-color: var(--drama-primary-hover); --el-button-active-bg-color: #1e40af; --el-button-active-border-color: #1e40af; box-shadow: none; }

.creator-actions, .step-actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: flex-end; padding-top: 0; }
.creator-actions :deep(.el-button) { flex-shrink: 0; min-width: 118px; height: 38px; }

// ---- SSE Progress ----
.sse-progress-panel { flex: 0 0 auto; min-width: 0; padding: 4px; }
.sse-progress-card { width: 100%; max-width: none; padding: 24px; text-align: center; background: #fff; border: 1px solid #e4e9f1; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,.06); }
.sse-spinner { color: var(--drama-primary); animation: sseSpin 1.4s linear infinite; margin-bottom: 6px; }
@keyframes sseSpin { to { transform: rotate(360deg); } }
.sse-msg { margin: 4px 0 12px; color: #7f8b9a; font-size: 13px; }
.sse-dual-stream { display: flex; gap: 16px; margin-bottom: 14px; }
.sse-stream-col { flex: 1; min-width: 0; }
.sse-col-label { font-size: 12px; font-weight: 600; color: #5a6a7e; margin-bottom: 6px; text-align: left; }
.sse-stream-text.dual { max-height: 180px; margin: 0; }
.sse-stream-panels { width: 100%; margin-top: 12px; text-align: left; }
.sse-panel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; margin-top: 6px; }
.sse-panel-card { padding: 8px 10px; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; }
.sse-panel-no { display: inline-block; min-width: 28px; font-weight: 600; color: var(--drama-primary); margin-right: 6px; }
.sse-panel-title { font-size: 13px; font-weight: 500; color: #334155; }
.sse-panel-text { font-size: 12px; color: #64748b; margin: 4px 0 0; line-height: 1.5; max-height: 72px; overflow: hidden; }
.sse-steps { display: flex; flex-direction: column; gap: 5px; text-align: left; }
.sse-step { display: flex; align-items: center; gap: 6px; padding: 4px 10px; font-size: 13px; border-radius: 6px; background: #f8fafc; color: #b0b8c4; transition: all .3s; }
.sse-step .sse-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--drama-border); flex-shrink: 0; }
.sse-step.running { color: var(--drama-primary-hover); background: var(--drama-primary-soft); }
.sse-step.running .sse-dot { background: var(--drama-primary); animation: ssePulse 1s ease-in-out infinite; }
.sse-step.done { color: #2e7d32; background: #e8f5e9; }
.sse-step.done .sse-dot { background: #2e7d32; }
.sse-step.error { color: #c62828; background: #ffebee; }
.sse-step.error .sse-dot { background: #c62828; }
@keyframes ssePulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
.sse-running { color: var(--drama-primary); font-weight: 600; letter-spacing: 1px; }
.sse-check { color: #2e7d32; }

.script-grid { margin-top: 0; }
.script-meta { display: grid; grid-template-columns: minmax(0, 1fr) minmax(180px, 240px); gap: 14px; }

// ---- Assets ----
.asset-category-tabs { margin-top: 4px; }
.asset-category-tabs :deep(.el-tabs__header) { margin: 0 0 16px; }
.asset-category-tabs :deep(.el-tabs__nav-wrap::after) { height: 1px; }
.asset-category-tabs :deep(.el-tabs__item) { height: 42px; padding: 0 22px; font-weight: 650; }
.asset-category-tabs :deep(.el-tabs__active-bar) { height: 3px; border-radius: 3px 3px 0 0; }
.asset-tab-content { padding-top: 2px; }
.asset-card-list { display: grid; align-items:start; gap:20px; grid-template-columns: repeat(auto-fill, minmax(min(360px, 100%), 1fr)); }
.asset-card { padding:18px; background: var(--drama-surface-muted); border: 1px solid #e5e7eb; border-radius: 8px; display: grid; gap: 8px; }
.asset-card.location-card { background: var(--drama-surface-strong); border-color: var(--drama-border); }
.asset-card-head { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.asset-name { font-size: 15px; font-weight: 750; color: var(--drama-text); }
.asset-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.asset-intro { font-size: 12px; color: var(--drama-text-secondary); line-height: 1.5; margin-top: 0; }
.asset-tags-line { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 0; }
.personality-tag { background: #f0f4f8; border-color: var(--drama-border); color: #5a6474; }
.asset-visual-desc { font-size: 12px; color: #4b5563; line-height: 1.65; margin-top: 2px; }
.appearance-carousel { position: relative; min-width: 0; margin-top: 6px; }
.appearance-list { display: flex; min-width: 0; gap: 12px; overflow-x: auto; padding: 2px; scrollbar-width: thin; scroll-behavior: smooth; scroll-snap-type: x mandatory; }
.appearance-item { flex: 0 0 calc(100% - 4px); min-width: 0; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; background: #fff; scroll-snap-align: start; transition: border-color .2s; }
.appearance-item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 6px; }
.appearance-chip { font-size: 13px; padding: 4px 12px; background: #eef2f8; border-radius: 999px; color: #3a4454; font-weight: 650; letter-spacing: .01em; }
.appearance-img-actions { display:flex; flex-wrap:wrap; gap:6px; }
.location-image-section { margin-top: 10px; border-top: 1px solid #e5ebd8; padding-top: 10px; }
.location-img-actions { display:flex; flex-wrap:wrap; gap:6px; margin-bottom: 10px; }
.asset-reference-input {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin: 8px 0 12px;
  padding: 9px 10px;
  border: 1px dashed #cbd5e1;
  border-radius: 7px;
  background: #f8fafc;
}
.asset-reference-label { color: #475569; font-size: 12px; font-weight: 650; white-space: nowrap; }
.asset-reference-preview { width: 52px; height: 38px; border: 1px solid var(--drama-border); border-radius: 4px; object-fit: cover; }
.reference-upload-button {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 0 12px;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  background: #fff;
  color: #334155;
  cursor: pointer;
  font-size: 12px;
  font-weight: 650;
  transition: border-color .15s, color .15s;
}
.reference-upload-button:hover { border-color: var(--drama-primary); color: var(--drama-primary); }
.reference-upload-button.disabled { cursor: wait; opacity: .6; }
.reference-upload-button input { display: none; }

.appearance-row { display: flex; gap: 6px; flex-wrap: wrap; }
.slots-label, .chars-label { font-size: 12px; font-weight: 650; color: var(--drama-text-secondary); }
.slots-list { margin: 4px 0 0 0; padding-left: 18px; font-size: 12px; color: #4b5563; line-height: 1.6; }
.descs-block { margin-top: 8px; }

// ---- Storyboard ----
// 分镜面板：标题与合成工具条固定在顶部，列表区独立滚动并占满剩余高度
.form-step-panel.storyboard-panel { display: flex; flex-direction: column; gap: 12px; overflow: visible; }
.workspace.review-workspace { display: flex; }
.storyboard-workspace { display: grid; grid-template-columns: 205px minmax(0, 1fr); gap: 16px; align-items: stretch; }
.storyboard-list { display: grid; gap: 16px; margin: 0; overflow: visible; min-height: 0; }
.shot-pager {
  display: flex; gap: 16px; align-items: center; justify-content: space-between;
  padding-bottom: 8px; color: #52647b; font-size: 13px;
  .el-button { min-height: 36px; padding: 0 16px; border-radius: 8px; }
}
@media(max-width:1000px) { .short-drama-page { grid-template-columns: 190px minmax(0,1fr); }.storyboard-workspace { grid-template-columns: 165px minmax(0,1fr); } }
@media(max-width:1100px) { .storyboard-workspace { grid-template-columns: minmax(0,1fr); } }
.storyboard-card { container: shot-editor / inline-size; min-width: 0; align-content: start; padding: 22px; background: var(--drama-surface); border: 1px solid var(--drama-border); border-radius: 12px; display: grid; gap: 20px; }
.scene-no-badge { font-size: 14px; font-weight: 750; color: var(--drama-text); }
.scene-title-input { margin-top: 2px; }
.video-prompt-field { display: grid; gap: 11px; min-width: 0; }
@media (max-width: 640px) { .storyboard-card { padding: 16px; } }

.guidance-json-editor :deep(.el-textarea__inner) { font-family: Consolas, 'Courier New', monospace; font-size: 12px; }

.source-text-ref { font-size: 11px; color: #9ca3af; line-height: 1.5; font-style: italic; margin: 0; }

.storyboard-header-actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-end; }
.storyboard-section-head { flex-wrap: nowrap; }
.storyboard-section-title { min-width: 0; }
.storyboard-collapse-button { flex: 0 0 auto; margin-left: auto; }
.storyboard-section-head.collapsed { align-items: center; }
.storyboard-section-head.collapsed .storyboard-section-title { display: flex; align-items: center; }
.video-model-inline { margin-bottom: 0; min-width: 200px; }
.composition-toolbar { display: grid; gap: 14px; margin-top: 18px; padding: 16px 0; border-top: 1px solid #e5e7eb; }
.composition-toolbar-main { display: grid; grid-template-columns: minmax(150px, 0.4fr) minmax(0, 1.6fr); gap: 18px; align-items: center; }
.composition-heading { display: grid; gap: 3px; }
.composition-heading strong { color: #202631; font-size: 15px; }
.composition-heading span, .composition-duration { color: #667085; font-size: 13px; }
.composition-controls { display: flex; min-width: 0; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: flex-end; }
.narration-panel { display: grid; grid-template-columns: minmax(120px, 0.3fr) minmax(0, 1.5fr) auto; gap: 12px; align-items: center; padding: 12px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; }
.narration-heading { display: grid; gap: 3px; strong { color: #202631; font-size: 13px; } span { color: #16a34a; font-size: 11px; } }
.narration-actions { display: flex; align-items: center; gap: 6px; }
.transition-segmented { flex: 0 1 330px; min-width: 300px; }
.transition-duration-select { width: 96px; }
.compose-ratio-select { width: 128px; }
.compose-button-wrap { display: inline-flex; }
.composition-status { display: flex; min-width: 0; gap: 10px; align-items: center; }
.composition-progress { flex: 1; min-width: 160px; max-width: 520px; }
.composition-error { min-width: 0; color: #c43d3d; font-size: 13px; overflow-wrap: anywhere; }
.composition-download { margin-left: auto; flex: 0 0 auto; }

.hero-panel::before {
  width: 96px;
  background: linear-gradient(90deg, var(--drama-primary), var(--drama-primary), transparent);
  opacity: .72;
}

:deep(.el-form-item) { margin-bottom: 0; }
:deep(.el-form-item__label) { min-height: 22px; padding-bottom: 6px; font-size: 13px; font-weight: 650; line-height: 1.5; color: #343b46; }
:deep(.el-input__wrapper), :deep(.el-textarea__inner) { background: #fff; box-shadow: 0 0 0 1px var(--drama-border) inset; }
:deep(.el-input__wrapper:hover), :deep(.el-textarea__inner:hover) { box-shadow: 0 0 0 1px #c7d0dc inset; }
:deep(.el-input__wrapper.is-focus), :deep(.el-textarea__inner:focus) { background: #fff; box-shadow: 0 0 0 1px var(--drama-primary) inset, 0 0 0 3px var(--drama-focus); }
:deep(.el-input__inner), :deep(.el-textarea__inner) { font-size: 14px; line-height: 1.7; }
:deep(.el-textarea__inner) { resize: vertical; }
:deep(.el-button) { font-weight: 650; }
:deep(.el-button .el-icon) { margin-right: 4px; }

@media (width <= 1100px) {
  .script-meta, .scene-meta-row { grid-template-columns: 1fr; }
  .short-drama-page { grid-template-columns: 180px minmax(0,1fr); }
  .project-sidebar { height: 100%; }
  .step-panel { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .step-item { padding: 10px; gap: 6px; } .step-item small { display: none; } .step-item span { grid-row: auto; }
  .step-item:nth-child(2n) { border-right: 0; }
  .composition-toolbar-main { grid-template-columns: 1fr; }
  .composition-controls { justify-content: flex-start; }
  .narration-panel { grid-template-columns: 1fr; }
}
@media (width <= 640px) {
  .short-drama-page { grid-template-columns: minmax(0,1fr); grid-template-rows: auto minmax(0,1fr); height: calc(100vh - var(--header-container-default-heigth)); gap: 10px; padding: 10px; }
  .project-sidebar { max-height: 112px; } .sidebar-head { display: none; } .project-list { display: flex; padding: 8px; overflow-x: auto; } .project-item { flex: 0 0 190px; } .project-desc { display: none; }
  .workspace { padding-right: 0; }
  .hero-panel { min-height: auto; }
  .section-head { flex-direction: column; }
  h1 { font-size: 26px; }
  .step-panel { grid-template-columns: repeat(4,minmax(0,1fr)); }
  .step-item { display:flex; flex-direction:column; align-items:center; } .step-item strong { font-size:12px; }
  .step-item { border-right: 0; border-bottom: 1px solid #edf0f3; &:last-child { border-bottom: 0; } }
  .form-step-panel { padding: 16px; }
  .creator-actions, .step-actions { align-items: stretch; :deep(.el-button) { width: 100%; margin-left: 0; } }
  .composition-controls { display: grid; grid-template-columns: 1fr; }
  .transition-segmented, .transition-duration-select, .compose-ratio-select { width: 100%; min-width: 0; }
  .composition-status { align-items: stretch; }
  .composition-status { flex-wrap: wrap; }
  .composition-download { width: 100%; margin-left: 0; }
  .composition-progress { min-width: 100%; }
  .asset-reference-input { align-items: flex-start; }
  .asset-reference-preview { width: 80px; height: 56px; }
}
.composition-clip-select { min-width: 240px; }
.composition-clip-select :deep(.el-select) { width: 100%; }
.generation-error { flex:0 0 auto; color:#b42318; border:1px solid #fecdca; border-radius:8px; padding:12px 16px; background:#fff5f5; font-size:13px; }.generation-error summary { cursor:pointer; }.generation-error p { white-space:normal; overflow-wrap:anywhere; color:inherit; }
.workflow-feedback summary { position:relative; padding-right:60px; }
.generation-error-close { position:absolute; right:0; top:50%; transform:translateY(-50%); color:inherit; }
.section-head-actions :deep(.el-select) { max-width:100%; }
.location-image-section > :deep(.el-select) { display:block; margin-bottom:12px; }

.appearance-editor { display:grid; grid-template-columns:minmax(0,1fr); gap:16px; min-width:0; }
.appearance-item-header { margin-bottom:0; }
.location-summary { display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; margin:0; min-height:42px; }
.location-cover { --asset-image-height:auto; display:block; width:100%; aspect-ratio:16/9; border-radius:var(--drama-radius-md); overflow:hidden; background:var(--drama-image-surface); }
.asset-category-tabs :deep(.el-tabs__nav-scroll) { padding:0 4px; }
</style>
