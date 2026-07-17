<script setup lang="ts">
/*
 * 国际化（i18n）迁移约定 —— 第二批机械迁移时遵循：
 * 1. code→label 映射表（sceneTypeLabels / roleLevelLabels / artStyleLabels / phaseLabels 等）改为 computed，
 *    code 不变，只把 label 换成 t('shortDrama.xxx.<key>')，模板用法由 map[k] 改为 map.value[k]。
 * 2. 选项数组（artStyleOptions / videoRatioOptions / transitionOptions / sceneTypeOptions）改为
 *    computed(() => getXxxOptions(t))（见 @/constants/drama）。
 * 3. ~50 条 ElMessage → t('shortDrama.messages.*')；带参数的（如 '生成失败：' + e.message）用 { reason } 命名插值。
 * 4. ElMessageBox（删除项目确认）的 title/body/按钮 → shortDrama.messages.deleteConfirm*。
 * 5. SSE phase 标签（sseProgressSteps 初始 label + phaseLabels）改为 computed，源自 shortDrama.sse.phases.*。
 * 6. ~110 模板字符串按 step 归入 shortDrama.ui.<step>.*。
 * 7. shotTypeOptions / cameraMoveOptions 保持原样：其值是 AI 生成的中文显示字符串本身（非稳定 code），
 *    无法干净走 i18n 往返，作为已知限制；完整修复需后端+前端 normalize 层。
 * 8. 后端返回的自由文本字段（scriptText / sceneTitle / personalityTags / modelDescribe / 错误 msg 等）
 *    已带语言，前端原样渲染，不得用 t() 包裹。
 *
 * 本轮已迁移代表性切片：workflowSteps、composeStatusLabels，以及若干 ElMessage，作为模式验证。
 */
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { CircleCheckFilled } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  analyzeAssets,
  composeShortDramaVideo,
  confirmAppearanceImage,
  confirmLocationImage,
  deleteAppearanceImage,
  deleteLocationImage,
  deleteShortDramaProject,
  downloadShortDramaVideo,
  generateAllVideos,
  generateStoryboardVideo,
  getPrediction,
  getShortDramaComposeStatus,
  getShortDramaDetail,
  listShortDramaProjects,
  polishScript,
  retrieveStoryboardVideo,
  saveShortDramaProject,
  saveShortDramaScript,
  saveShortDramaStoryboard,
  selectAppearanceImage,
  selectLocationImage,
  startImageGeneration,
  undoAppearanceImage,
  undoLocationImage,
  uploadReferenceImage,
} from '@/api/shortDrama';
import { getModelList } from '@/api/model';
import { useUserStore } from '@/stores';
import type { GetSessionListVO } from '@/api/model/types';
import type {
  ShortDramaAspectRatio,
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

interface ProgressStep {
  phase: string;
  label: string;
  status: 'pending' | 'running' | 'done' | 'error';
}

type StageName = 'script' | 'assets' | 'storyboard';
type StepName = 'idea' | 'script' | 'assets' | 'storyboard';

const route = useRoute();
const userStore = useUserStore();
const { t } = useI18n();

const workflowSteps = computed<Array<{ name: StepName; index: string; title: string; desc: string }>>(() => [
  { name: 'idea', index: '01', title: t('shortDrama.workflow.idea.title'), desc: t('shortDrama.workflow.idea.desc') },
  { name: 'script', index: '02', title: t('shortDrama.workflow.script.title'), desc: t('shortDrama.workflow.script.desc') },
  { name: 'assets', index: '03', title: t('shortDrama.workflow.assets.title'), desc: t('shortDrama.workflow.assets.desc') },
  { name: 'storyboard', index: '04', title: t('shortDrama.workflow.storyboard.title'), desc: t('shortDrama.workflow.storyboard.desc') },
]);

const videoRatioOptions: Array<{ label: string; value: ShortDramaAspectRatio }> = [
  { label: '竖屏 9:16', value: '9:16' },
  { label: '横屏 16:9', value: '16:9' },
  { label: '方形 1:1', value: '1:1' },
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

const artStyleOptions = [
  { label: '真实写实', value: 'realistic' },
  { label: '美式漫画', value: 'american-comic' },
  { label: '国漫风格', value: 'chinese-comic' },
  { label: '日系动漫', value: 'japanese-anime' },
];

const sceneTypeOptions = [
  { label: '日常', value: 'daily' },
  { label: '情感', value: 'emotion' },
  { label: '动作', value: 'action' },
  { label: '史诗', value: 'epic' },
  { label: '悬疑', value: 'suspense' },
];

const sceneTypeLabels: Record<string, string> = {
  daily: '日常', emotion: '情感', action: '动作', epic: '史诗', suspense: '悬疑',
};

const sceneTypeTagMap: Record<string, TagType> = {
  daily: '', emotion: 'warning', action: 'danger', epic: 'success', suspense: 'info',
};

const shotTypeOptions = [
  '平视大远景', '平视远景', '平视全景', '平视中景', '平视近景', '平视特写', '平视极端特写',
  '仰拍中景', '仰拍全景', '仰拍远景',
  '俯拍中景', '俯拍全景', '俯拍远景',
  '越肩近景', '越肩中景',
  '荷兰角中景', '荷兰角近景',
  '主观视角',
];

const cameraMoveOptions = [
  '固定', '缓推', '缓拉', '跟随', '急推', '急拉', '环绕', '升起', '俯冲', '手持晃动',
];

type TagType = 'primary' | 'success' | 'warning' | 'info' | 'danger' | '';
const roleLevelLabels: Record<string, string> = { S: '主角', A: '核心配角', B: '重要配角', C: '次要', D: '群众' };
const roleLevelTagMap: Record<string, TagType> = { S: 'danger', A: 'warning', B: 'info', C: '', D: 'info' };

const projects = ref<ShortDramaProject[]>([]);
const models = ref<GetSessionListVO[]>([]);
const videoModels = ref<GetSessionListVO[]>([]);
const imageModels = ref<GetSessionListVO[]>([]);
const currentProjectId = ref<SnowflakeId | null>(null);
const detail = ref<ShortDramaDetail | null>(null);
const characters = ref<ShortDramaCharacter[]>([]);
const locations = ref<ShortDramaLocation[]>([]);
const storyboardDrafts = ref<ShortDramaStoryboard[]>([]);
const activeStage = ref<StageName>('script');
const activeStep = ref<StepName>('idea');
const showAdvanced = ref(false);
const maxReachedStep = ref<StepName>('idea');

const loadingModels = ref(false);
const loadingProjects = ref(false);
const generating = ref(false);
const savingScript = ref(false);
const regeneratingStoryboard = ref(false);
const analyzingAssets = ref(false);
const polishingScript = ref(false);
const generatingVideo = ref<Record<SnowflakeId, boolean>>({});
const generatingAllVideos = ref(false);
const savingStoryboard = ref(false);
const pollingTimers = ref<Record<SnowflakeId, ReturnType<typeof setInterval>>>({});
const composeForm = ref<ShortDramaComposeVideoRequest>({
  transitionType: 'dissolve',
  transitionDurationSeconds: 0.5,
  aspectRatio: '9:16',
  storyboardIds: [],
});
const composeStoryboardIds = ref<SnowflakeId[]>([]);
const composeResult = ref<ShortDramaComposeVideoResult | null>(null);
const composeSubmitting = ref(false);
const downloadingComposition = ref(false);
const composePollTimer = ref<ReturnType<typeof setInterval> | null>(null);
let composePollInFlight = false;
let composeRequestEpoch = 0;
const sseProgressMsg = ref('');
  const sseStreamText = ref('');
  const sseStreamPhoto = ref('');
  const sseStreamActing = ref('');
  const showDualStream = ref(false);
const sseProgressSteps = ref<ProgressStep[]>([
  { phase: 'polish', label: '剧本打磨', status: 'pending' },
  { phase: 'assets', label: '资产分析', status: 'pending' },
  { phase: 'storyboard_plan', label: '分镜规划', status: 'pending' },
  { phase: 'photography', label: '摄影规则', status: 'pending' },
  { phase: 'acting', label: '表演指导', status: 'pending' },
  { phase: 'storyboard_detail', label: '分镜细化', status: 'pending' },
]);

const ideaForm = ref({
  idea: '',
  model: '',
  videoRatio: '9:16',
  artStyle: 'realistic',
  videoModel: '',
  imageModel: '',
});

const scriptForm = ref<ShortDramaScript>({
  projectId: '',
  scriptName: '',
  scriptText: '',
  outlineText: '',
  tone: '',
  sourceType: 'manual',
});

const hasProject = computed(() => !!currentProjectId.value);
const canGenerate = computed(() => !!ideaForm.value.idea.trim() && !!ideaForm.value.model && !generating.value);
const maxReachedStepIndex = computed(() => workflowSteps.value.findIndex(item => item.name === maxReachedStep.value));
const completedStoryboards = computed(() => storyboardDrafts.value.filter(
  item => item.id && item.videoStatus === 'done' && !!item.videoUrl,
));
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

interface CharacterRef { name: string; appearance: string; slot: string; }
interface PhotographyRule {
  scene_summary?: string;
  lighting?: { direction?: string; quality?: string };
  characters?: Array<{ name: string; screen_position?: string; posture?: string; facing?: string }>;
  depth_of_field?: string;
  color_tone?: string;
}
interface ActingNote { name: string; acting: string; }

/** 根据分镜的角色站位和场景名，从资产数据中查找对应的参考图 */
function getStoryboardRefImages(item: ShortDramaStoryboard) {
  const charImgs: { name: string; url: string }[] = [];
  const chars = parseJsonField<CharacterRef[]>(item.charactersJson) || [];
  for (const ref of chars) {
    const ch = characters.value.find(c => c.name === ref.name);
    if (ch?.appearances) {
      for (const ap of ch.appearances) {
        const urls = parseJsonStrArray(ap.imageUrls);
        if (urls.length === 0) continue;
        const idx = ap.selectedImageIndex != null && ap.selectedImageIndex >= 0 && ap.selectedImageIndex < urls.length ? ap.selectedImageIndex : 0;
        charImgs.push({ name: ref.name, url: urls[idx] });
        break;
      }
    }
  }
  let locImg: string | null = null;
  if (item.locationName) {
    const loc = locations.value.find(l => l.name === item.locationName);
    if (loc) {
      const urls = parseJsonStrArray(loc.imageUrls);
      if (urls.length > 0) {
        const idx = loc.selectedImageIndex != null && loc.selectedImageIndex >= 0 && loc.selectedImageIndex < urls.length ? loc.selectedImageIndex : 0;
        locImg = urls[idx];
      }
    }
  }
  return { charImgs, locImg };
}

// ---- data loading ----

async function refreshModels() {
  loadingModels.value = true;
  try {
    const [chatRes, videoRes, imageRes] = await Promise.all([
      getModelList({ category: 'chat' }),
      getModelList({ category: 'video' }),
      getModelList({ category: 'image' }),
    ]);
    models.value = readList<GetSessionListVO>(chatRes);
    videoModels.value = readList<GetSessionListVO>(videoRes);
    imageModels.value = readList<GetSessionListVO>(imageRes);
    if (!ideaForm.value.model && models.value[0]?.modelName) ideaForm.value.model = models.value[0].modelName;
    if (!ideaForm.value.videoModel && videoModels.value[0]?.modelName) ideaForm.value.videoModel = videoModels.value[0].modelName;
    if (!ideaForm.value.imageModel && imageModels.value[0]?.modelName) ideaForm.value.imageModel = imageModels.value[0].modelName;
  } catch { ElMessage.error('获取模型列表失败，请先检查模型配置'); }
  finally { loadingModels.value = false; }
}

async function refreshProjects() {
  loadingProjects.value = true;
  try { projects.value = await listShortDramaProjects(); }
  finally { loadingProjects.value = false; }
}

async function loadDetail(projectId: SnowflakeId) {
  stopComposePolling();
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
  if (artStyleOptions.some(item => item.value === res.project?.artStyle)) {
    ideaForm.value.artStyle = res.project.artStyle!;
  }
  if (videoRatioOptions.some(item => item.value === res.project?.composeAspectRatio)) {
    ideaForm.value.videoRatio = res.project.composeAspectRatio!;
  }
  scriptForm.value = res.script
    ? { ...res.script }
    : { projectId, scriptName: '', scriptText: '', outlineText: '', tone: '', sourceType: 'manual' };
  characters.value = (res as any).characters || [];
  locations.value = (res as any).locations || [];
  storyboardDrafts.value = res.storyboards || [];
  currentProjectId.value = projectId;
  composeStoryboardIds.value = storyboardDrafts.value
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
  if (!hasProject.value) { ElMessage.info('请先完成创意生成'); return; }
  activeStep.value = step;
  if (step === 'script' || step === 'assets' || step === 'storyboard') activeStage.value = step;
}

// ---- Step 01: Idea ----

function buildIdeaPayload() {
  return [
    `故事想法：${ideaForm.value.idea.trim()}`,
    `画面比例：${ideaForm.value.videoRatio}`,
    `视觉风格：${ideaForm.value.artStyle}`,
  ].join('\n');
}

function resetSseProgress() {
  sseProgressMsg.value = '';
  sseStreamText.value = '';
  sseStreamPhoto.value = '';
  sseStreamActing.value = '';
  showDualStream.value = false;
  sseProgressSteps.value.forEach(s => s.status = 'pending');
}

async function handleCreateFromIdea() {
  if (!ideaForm.value.idea.trim()) { ElMessage.warning('先输入一个故事想法'); return; }
  if (!ideaForm.value.model) { ElMessage.warning('请选择分析模型'); return; }

  generating.value = true;
  resetSseProgress();
  const userStore = useUserStore();
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  try {
    const resp = await fetch(import.meta.env.VITE_API_URL + '/short-drama/create-from-idea/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`,
        'ClientID': import.meta.env.VITE_CLIENT_ID,
      },
      body: JSON.stringify({
        idea: buildIdeaPayload(),
        model: ideaForm.value.model,
        artStyle: ideaForm.value.artStyle,
        aspectRatio: ideaForm.value.videoRatio,
      }),
    });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    reader = resp.body!.getReader();

  let projectId: SnowflakeId | null = null;
  let lastStreamPhase = '';
  const phaseLabels: Record<string, string> = {
    script: '剧本正文', assets: '资产分析', assets_chars: '角色分析', assets_locs: '场景分析',
    storyboard_plan: '分镜规划', photography: '摄影规则', acting: '表演指导', storyboard_detail: '分镜细化',
  };
  const decoder = new TextDecoder();
  let buf = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop() || '';
      let eventName = '';
      for (const line of lines) {
        if (line.startsWith('event:')) { eventName = line.slice(6).trim(); continue; }
        if (!line.startsWith('data:')) continue;
        try {
          const data = JSON.parse(line.slice(5).trim());
          if (eventName === 'phase') {
            const step = sseProgressSteps.value.find(s => s.phase === data.phase);
            if (step) step.status = data.status;
            sseProgressMsg.value = data.message || '';
          } else if (eventName === 'stream') {
            if (data.status === 'done') {
              // 流式输出结束，不做特殊处理
			} else if (data.text) {
              const curPhase = data.phase || '';
              if (curPhase === 'photography') {
                sseStreamPhoto.value += data.text;
                showDualStream.value = true;
              } else if (curPhase === 'acting') {
                sseStreamActing.value += data.text;
                showDualStream.value = true;
              } else {
                if (curPhase !== lastStreamPhase && curPhase) {
                  const label = phaseLabels[curPhase] || curPhase;
                  sseStreamText.value += '\n\n【' + label + '】\n';
                  lastStreamPhase = curPhase;
                }
                sseStreamText.value += data.text;
                nextTick(() => {
                  const el = document.querySelector('.sse-stream-text');
                  if (el) el.scrollTop = el.scrollHeight;
                });
              }
            }
            } else if (eventName === 'complete') {
            projectId = data.projectId;
          } else if (eventName === 'error') {
            sseProgressMsg.value = '生成失败：' + (data.message || '未知错误');
            if (data.projectId && !projectId) projectId = data.projectId;
          }
        } catch (e) {
          // 忽略 JSON 解析错误
        }
      }
    }
  } finally { reader.releaseLock(); }

  if (projectId) {
    await refreshProjects();
    await loadDetail(projectId);
    ElMessage.success(t('shortDrama.messages.generateSuccess'));
  } else {
    ElMessage.error('生成失败，未获取到项目ID');
  }
  } catch (e: any) {
    ElMessage.error('生成失败：' + (e.message || '网络错误'));
  } finally {
    generating.value = false;
  }
}

// ---- Step 02: Script ----

async function handlePolishScript() {
  if (!currentProjectId.value) return;
  polishingScript.value = true;
  try {
    const res: any = await polishScript(currentProjectId.value);
    if (res.script) scriptForm.value = { ...res.script };
    if (res.project) {
      await saveShortDramaProject(res.project);
    }
    await loadDetail(currentProjectId.value);
    ElMessage.success('剧本已重新打磨');
  } finally { polishingScript.value = false; }
}

async function handleSaveScript() {
  if (!currentProjectId.value) return;
  savingScript.value = true;
  try {
    scriptForm.value.projectId = currentProjectId.value;
    const saved = await saveShortDramaScript(scriptForm.value);
    scriptForm.value = { ...saved };
    await loadDetail(currentProjectId.value);
    ElMessage.success(t('shortDrama.messages.scriptSaved'));
  } finally { savingScript.value = false; }
}

async function handleAnalyzeAssets() {
  if (!currentProjectId.value || !scriptForm.value.id) { ElMessage.warning('请先生成或保存剧本'); return; }
  analyzingAssets.value = true;
  try {
    const res: any = await analyzeAssets(currentProjectId.value, scriptForm.value.id);
    characters.value = res.characters || [];
    locations.value = res.locations || [];
    activeStage.value = 'assets';
    activeStep.value = 'assets';
    maxReachedStep.value = 'assets';
    ElMessage.success('资产分析完成');
  } finally { analyzingAssets.value = false; }
}

// ---- Step 04: Storyboard ----

async function handleGenerateStoryboard() {
  if (!currentProjectId.value || !scriptForm.value.id) { ElMessage.warning('请先生成或保存剧本'); return; }
  if (composeBusy.value) { ElMessage.warning('成片正在合成，请稍后再修改分镜'); return; }
  regeneratingStoryboard.value = true;
  invalidateComposeView();
  resetSseProgress();
  sseProgressSteps.value.find(s => s.phase === 'polish')!.status = 'done';
  sseProgressSteps.value.find(s => s.phase === 'assets')!.status = 'done';
  sseProgressMsg.value = '正在连接分镜生成服务...';

  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  let streamError = '';
  let completed = false;
  try {
    const modelQuery = ideaForm.value.model ? `&model=${encodeURIComponent(ideaForm.value.model)}` : '';
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/short-drama/${currentProjectId.value}/plan-storyboard/stream?scriptId=${scriptForm.value.id}${modelQuery}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userStore.token}`,
          'ClientID': import.meta.env.VITE_CLIENT_ID,
        },
      },
    );
    if (!response.ok || !response.body) throw new Error('HTTP ' + response.status);

    reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let eventName = '';
    let lastStreamPhase = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const rawLine of lines) {
        const line = rawLine.trimEnd();
        if (!line) { eventName = ''; continue; }
        if (line.startsWith('event:')) { eventName = line.slice(6).trim(); continue; }
        if (!line.startsWith('data:')) continue;
        try {
          const data = JSON.parse(line.slice(5).trim());
          if (eventName === 'phase') {
            const step = sseProgressSteps.value.find(s => s.phase === data.phase);
            if (step) step.status = data.status;
            sseProgressMsg.value = data.message || '';
          } else if (eventName === 'stream' && data.text) {
            const phase = data.phase || 'storyboard_plan';
            if (phase !== lastStreamPhase) {
              const label = phase === 'storyboard_detail' ? '分镜细化' : '分镜规划';
              sseStreamText.value += `\n\n【${label}】\n`;
              lastStreamPhase = phase;
            }
            sseStreamText.value += data.text;
            nextTick(() => {
              const element = document.querySelector('.sse-stream-text');
              if (element) element.scrollTop = element.scrollHeight;
            });
          } else if (eventName === 'complete') {
            completed = true;
          } else if (eventName === 'error') {
            streamError = data.message || '分镜生成失败';
          }
        } catch {
          // 忽略不完整的 SSE 数据行
        }
      }
    }

    if (streamError) throw new Error(streamError);
    if (!completed) throw new Error('分镜生成连接提前结束，请查看后端日志');
    await loadDetail(currentProjectId.value);
    activeStage.value = 'storyboard';
    activeStep.value = 'storyboard';
    maxReachedStep.value = 'storyboard';
    ElMessage.success('分镜已重新生成');
  } catch (error: any) {
    ElMessage.error('分镜生成失败：' + (error.message || '网络错误'));
  } finally {
    if (reader) reader.releaseLock();
    regeneratingStoryboard.value = false;
  }
}

async function handleSaveStoryboard(item: ShortDramaStoryboard) {
  if (composeBusy.value || savingStoryboard.value) return;
  savingStoryboard.value = true;
  try {
    const saved = await saveShortDramaStoryboard(item);
    Object.assign(item, saved);
    invalidateComposeView();
    ElMessage.success('分镜已保存');
  } finally {
    savingStoryboard.value = false;
  }
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

function formatVideoDuration(seconds?: number) {
  return seconds == null ? '' : `${seconds.toFixed(1)} 秒`;
}

async function handleGenerateVideo(item: ShortDramaStoryboard) {
  if (!ideaForm.value.videoModel) { ElMessage.warning('请先在分镜阶段选择视频模型'); return; }
  if (!item.id) return;
  if (composeBusy.value) { ElMessage.warning('成片正在合成，请稍后再生成分镜视频'); return; }
  invalidateComposeView();
  generatingVideo.value[item.id] = true;
  try {
    const updated = await generateStoryboardVideo(item.id, ideaForm.value.videoModel);
    Object.assign(item, updated);
    if (updated.videoStatus === 'generating') startPolling(item);
  } catch { ElMessage.error('视频生成失败'); item.videoStatus = 'failed'; }
  finally { generatingVideo.value[item.id] = false; }
}

async function handleRetryVideo(item: ShortDramaStoryboard) {
  if (!item.id || !ideaForm.value.videoModel) {
    ElMessage.warning('请先在分镜阶段选择视频模型');
    return;
  }
  if (composeBusy.value) {
    ElMessage.warning('成片正在合成，请稍后再重试分镜视频');
    return;
  }

  stopPolling(item.id);
  invalidateComposeView();
  generatingVideo.value[item.id] = true;
  try {
    const saved = await saveShortDramaStoryboard(item);
    Object.assign(item, saved);
    const updated = await generateStoryboardVideo(item.id, ideaForm.value.videoModel);
    Object.assign(item, updated);
    if (updated.videoStatus === 'generating') {
      startPolling(item);
      ElMessage.success('失败视频已重新提交生成');
    } else if (updated.videoStatus === 'done') {
      ElMessage.success('视频已重新生成');
    }
  } catch (error: any) {
    item.videoStatus = 'failed';
    ElMessage.error(error.message || '视频重试失败，镜头内容已保留');
  } finally {
    generatingVideo.value[item.id] = false;
  }
}
function startPolling(item: ShortDramaStoryboard) {
  if (!item.id) return;
  const id = item.id;
  stopPolling(id);
  let attempts = 0;
  let failed404 = false;
  pollingTimers.value[id] = setInterval(async () => {
    if (++attempts > 60 || !ideaForm.value.videoModel) { stopPolling(id); return; }
    try {
      const updated = await retrieveStoryboardVideo(id, ideaForm.value.videoModel);
      Object.assign(item, updated);
      if (updated.videoStatus === 'done' || updated.videoStatus === 'failed') stopPolling(id);
    } catch (e: any) {
      // Atlas 返回 404：任务已失效（常见于更换 API Key 后残留的旧任务）。
      // 终止轮询并标记为失败，避免反复报错刷屏；其余网络波动继续轮询。
      const msg = e?.message || '';
      if (msg.includes('404') || msg.includes('not found')) {
        if (!failed404) {
          failed404 = true;
          item.videoStatus = 'failed';
          item.videoId = undefined;
          stopPolling(id);
          ElMessage.warning('视频生成任务已失效，请重新生成');
        }
      }
    }
  }, 3000);
}

/** 手动查询视频进度 */
async function handleCheckVideoProgress(item: ShortDramaStoryboard) {
  if (!item.id || !ideaForm.value.videoModel) return;
  try {
    const updated = await retrieveStoryboardVideo(item.id, ideaForm.value.videoModel);
    Object.assign(item, updated);
    if (updated.videoStatus === 'done' || updated.videoStatus === 'failed') stopPolling(item.id!);
  } catch (e: any) {
    const msg = e?.message || '';
    if (msg.includes('404') || msg.includes('not found')) {
      item.videoStatus = 'failed';
      item.videoId = undefined;
      stopPolling(item.id!);
      ElMessage.warning('视频生成任务已失效，请重新生成');
    } else {
      ElMessage.error('查询失败，请稍后重试');
    }
  }
}

function stopPolling(id: SnowflakeId) {
  if (pollingTimers.value[id]) { clearInterval(pollingTimers.value[id]); delete pollingTimers.value[id]; }
}


async function handleGenerateAllVideos() {
  if (!currentProjectId.value || !ideaForm.value.videoModel) { ElMessage.warning('请先选择视频模型'); return; }
  if (composeBusy.value) { ElMessage.warning('成片正在合成，请稍后再生成分镜视频'); return; }
  generatingAllVideos.value = true;
  invalidateComposeView();
  try {
    const updated = await generateAllVideos(currentProjectId.value, ideaForm.value.videoModel);
    storyboardDrafts.value = updated;
    updated.forEach((item: ShortDramaStoryboard) => { if (item.videoStatus === 'generating' && item.id) startPolling(item); });
    ElMessage.success('全部视频已提交生成');
  } catch { ElMessage.error('批量视频生成失败'); }
  finally { generatingAllVideos.value = false; }
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

/** 图片模型标签文本 */
const imageModelLabel = computed(() => {
  const m = imageModels.value.find(item => item.modelName === ideaForm.value.imageModel);
  return m?.modelDescribe || ideaForm.value.imageModel || '未知';
});

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

/** 形象图片生成（异步+轮询） */
async function handleGenerateAppearanceImage(appearance: ShortDramaCharacterAppearance) {
  if (!appearance.id || !selectedImageModel.value) {
    ElMessage.warning('请先在资产配置阶段选择图片模型');
    return;
  }
  const key = `appearance-${appearance.id}`;
  const appearanceId = appearance.id;
  const projectId = currentProjectId.value!;
  generatingImage.value[key] = true;
  try {
    // 1. 异步启动
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
    ElMessage.warning('请先在资产配置阶段选择图片模型');
    return;
  }
  const key = `location-${location.id}`;
  const locationId = location.id;
  const projectId = currentProjectId.value!;
  generatingImage.value[key] = true;
  try {
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

const artStyleLabels: Record<string, string> = {
  realistic: '写实', 'american-comic': '美漫', 'chinese-comic': '国漫', 'japanese-anime': '日系',
};
const currentArtStyle = computed(() => detail.value?.project?.artStyle || 'realistic');

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
    ElMessage.warning('请先选择图片模型');
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

onMounted(async () => {
  if (imageTaskChannel) imageTaskChannel.addEventListener('message', handleImageTaskBroadcast);
  const incomingIdea = typeof route.query.idea === 'string' ? route.query.idea.trim() : '';
  const incomingRatio = typeof route.query.ratio === 'string' ? route.query.ratio : '';
  const incomingStyle = typeof route.query.style === 'string' ? route.query.style : '';
  const incomingProjectId = typeof route.query.projectId === 'string' ? route.query.projectId : '';
  const startFresh = route.query.fresh === '1';

  if (incomingIdea) ideaForm.value.idea = incomingIdea;
  if (videoRatioOptions.some(item => item.value === incomingRatio)) {
    ideaForm.value.videoRatio = incomingRatio;
  }
  if (artStyleOptions.some(item => item.value === incomingStyle)) {
    ideaForm.value.artStyle = incomingStyle;
  }

  await Promise.all([refreshModels(), refreshProjects()]);
  const requestedProject = Number.isFinite(incomingProjectId)
    ? projects.value.find(item => item.id === incomingProjectId)
    : undefined;
  const initialProject = requestedProject || (!incomingIdea && !startFresh ? projects.value[0] : undefined);

  if (initialProject?.id) {
    await loadDetail(initialProject.id);
    // 恢复生成中视频的轮询
    storyboardDrafts.value.forEach(item => {
      if (item.videoStatus === 'generating' && item.id) startPolling(item);
    });
  }
  else if (incomingIdea || startFresh) {
    activeStep.value = 'idea';
    maxReachedStep.value = 'idea';
    await nextTick();
  }
});

onUnmounted(() => {
  stopComposePolling();
  Object.keys(pollingTimers.value).forEach(k => clearInterval(pollingTimers.value[k]));
  pollingTimers.value = {};
  Object.keys(imagePollTimers.value).forEach(k => clearInterval(imagePollTimers.value[k]));
  imagePollTimers.value = {};
  imageTaskChannel?.close();
});
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
      <div class="project-list" :class="{ empty: !loadingProjects && projects.length === 0 }">
        <button
          v-for="item in projects" :key="item.id" class="project-item"
          :class="{ active: item.id === currentProjectId }"
          @click="loadDetail(item.id!)"
        >
          <span class="project-title">{{ item.projectName }}</span>
          <span class="project-desc">{{ item.description || '暂无简介' }}</span>
          <span class="project-row">
            <em>{{ item.status || 'draft' }}</em>
            <small @click.stop="handleDeleteProject(item.id!)">删除</small>
          </span>
        </button>
        <div v-if="!loadingProjects && projects.length === 0" class="project-empty">还没有短剧项目</div>
      </div>
    </aside>

    <main class="workspace">
      <section class="hero-panel">
        <div class="hero-copy">
          <h1>短剧创作</h1>
          <p>先定故事，AI 自动完成剧本打磨、资产提取、分镜规划。每一步都可以检查调整。</p>
        </div>
      </section>

      <!-- Step navigation -->
      <section class="step-panel">
        <button
          v-for="step in workflowSteps" :key="step.name" class="step-item"
          :class="{ active: activeStep === step.name, completed: maxReachedStepIndex > workflowSteps.findIndex(item => item.name === step.name) }"
          type="button" @click="handleStepClick(step.name)"
        >
          <span>{{ step.index }}</span>
          <strong>{{ step.title }}</strong>
          <small>{{ step.desc }}</small>
        </button>
      </section>

      <!-- SSE progress overlay -->
      <section v-if="generating || regeneratingStoryboard" class="sse-progress-panel">
        <div class="sse-progress-card">
          <el-icon class="is-loading sse-spinner" :size="32"><MagicStick /></el-icon>
          <h3>{{ regeneratingStoryboard ? 'AI 正在生成分镜...' : 'AI 正在创作短剧...' }}</h3>
          <p class="sse-msg">{{ sseProgressMsg }}</p>
          <div v-if="showDualStream" class="sse-dual-stream">
            <div class="sse-stream-col">
              <div class="sse-col-label">摄影规则</div>
              <div class="sse-stream-text dual"><pre>{{ sseStreamPhoto }}</pre></div>
            </div>
            <div class="sse-stream-col">
              <div class="sse-col-label">表演指导</div>
              <div class="sse-stream-text dual"><pre>{{ sseStreamActing }}</pre></div>
            </div>
          </div>
          <div v-else-if="sseStreamText" class="sse-stream-text">
            <pre>{{ sseStreamText }}</pre>
          </div>
          <div class="sse-steps">
            <div v-for="s in sseProgressSteps" :key="s.phase" class="sse-step" :class="s.status">
              <span class="sse-dot"></span>
              <span class="sse-label">{{ s.label }}</span>
              <span v-if="s.status === 'running'" class="sse-running">...</span>
              <el-icon v-if="s.status === 'done'" class="sse-check"><CircleCheck /></el-icon>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== Step 01: Idea ====== -->
      <section v-if="!generating && activeStep === 'idea'" class="form-step-panel idea-step" :class="{ expanded: showAdvanced }">
        <div class="section-head">
          <div>
            <span class="section-kicker">Step 01</span>
            <h2>输入创意</h2>
            <p>简单说说这个故事想拍什么，AI 将自动生成完整的剧本、角色、场景和分镜。</p>
          </div>
        </div>
        <el-form label-position="top" class="creator-form">
          <el-form-item label="故事想法" class="idea-field">
            <el-input v-model="ideaForm.idea" type="textarea" placeholder="例如：外卖小哥绑定时间循环，每次送错一单都会回到十分钟前。" />
          </el-form-item>
          <div v-show="showAdvanced" class="advanced-options">
            <el-form-item label="分析模型">
              <el-select v-model="ideaForm.model" class="w-full" filterable :loading="loadingModels" placeholder="选择模型">
                <el-option v-for="item in models" :key="item.id ?? item.modelName" :label="item.modelDescribe || item.modelName || ''" :value="item.modelName || ''" />
              </el-select>
            </el-form-item>

            <el-form-item label="画面比例">
              <el-radio-group v-model="ideaForm.videoRatio" class="ratio-group">
                <el-radio-button v-for="item in videoRatioOptions" :key="item.value" :value="item.value">{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="视觉风格">
              <el-select v-model="ideaForm.artStyle" class="w-full">
                <el-option v-for="item in artStyleOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
          <div class="creator-actions">
            <el-button @click="showAdvanced = !showAdvanced">{{ showAdvanced ? '收起设置' : '展开设置' }}</el-button>
            <el-button type="primary" :loading="generating" :disabled="!canGenerate" @click="handleCreateFromIdea">
              <el-icon><MagicStick /></el-icon>生成草稿
            </el-button>
          </div>
        </el-form>
      </section>

      <!-- ====== Step 02: Script ====== -->
      <section v-if="activeStep === 'script' && hasProject" class="form-step-panel">
        <div class="section-head">
          <div>
            <span class="section-kicker">Step 02</span>
            <h2>剧本打磨</h2>
            <p>检查 AI 生成的剧本名称、基调、大纲和正文，不满意可以重新打磨。</p>
          </div>
        </div>
        <div class="script-grid">
          <el-form label-position="top">
            <div class="script-meta">
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
              <el-input v-model="scriptForm.scriptText" type="textarea" :autosize="{ minRows: 14, maxRows: 28 }" placeholder="剧本正文" />
            </el-form-item>
          </el-form>
        </div>
        <div class="step-actions">
          <el-button @click="activeStep = 'idea'">上一步</el-button>
          <el-button :loading="polishingScript" :disabled="!hasProject" @click="handlePolishScript">
            <el-icon><MagicStick /></el-icon>重新打磨
          </el-button>
          <el-button :loading="savingScript" :disabled="!hasProject" @click="handleSaveScript">保存剧本</el-button>
          <el-button type="primary" :loading="analyzingAssets" :disabled="!scriptForm.id" @click="handleAnalyzeAssets">
            分析资产
          </el-button>
        </div>
      </section>

      <!-- ====== Step 03: Assets ====== -->
      <section v-if="activeStep === 'assets' && hasProject" class="form-step-panel">
        <div class="section-head">
          <div>
            <span class="section-kicker">Step 03</span>
            <h2>资产配置</h2>
            <p>AI 自动提取的角色档案与场景站位信息，确认后进入分镜规划。</p>
          </div>
          <div class="section-head-actions">
            <div class="image-model-inline">
              <span class="image-model-label">图片模型</span>
              <el-select v-model="ideaForm.imageModel" size="small" filterable :loading="loadingModels" placeholder="请选择图片模型" style="width:220px">
                <el-option v-for="item in imageModels" :key="item.id ?? item.modelName" :label="item.modelDescribe || item.modelName || ''" :value="item.modelName || ''" />
              </el-select>
            </div>
            <el-tag v-if="!selectedImageModel" type="danger" size="small" effect="light">未选择—图片生成不可用</el-tag>
            <el-tag v-else type="success" size="small" effect="light">{{ imageModelLabel }}</el-tag>
            <span class="image-model-label" style="margin-left:12px">视觉风格</span>
            <el-tag type="primary" size="small" effect="light">{{ artStyleLabels[currentArtStyle] || currentArtStyle }}</el-tag>
          </div>
        </div>

        <!-- Characters -->
        <div v-if="characters.length > 0" class="asset-section">
          <h3 class="asset-section-title">角色档案 ({{ characters.length }})</h3>
          <div class="asset-card-list">
            <article v-for="ch in characters" :key="ch.id" class="asset-card">
              <div class="asset-card-head">
                <span class="asset-name">{{ ch.name }}</span>
                <div class="asset-tags">
                  <el-tag size="small" :type="roleLevelTagMap[ch.roleLevel || ''] || 'info'">{{ roleLevelLabels[ch.roleLevel || ''] || ch.roleLevel }} ({{ ch.roleLevel }})</el-tag>
                  <el-tag v-if="ch.gender" size="small">{{ ch.gender }}</el-tag>
                  <el-tag v-if="ch.ageRange" size="small" type="warning">{{ ch.ageRange }}</el-tag>
                  <el-tag v-if="ch.costumeTier" size="small" type="success">服饰 Lv{{ ch.costumeTier }}</el-tag>
                </div>
              </div>
              <p v-if="ch.introduction" class="asset-intro">{{ ch.introduction }}</p>
              <p v-if="ch.personalityTags" class="asset-tags-line">
                <el-tag v-for="tag in (ch.personalityTags || '').split(',').filter(Boolean)" :key="tag" size="small" class="personality-tag">{{ tag }}</el-tag>
              </p>
              <p v-if="ch.visualDescription" class="asset-visual-desc">{{ ch.visualDescription }}</p>
              <!-- 子形象列表（含图片画廊） -->
              <div v-if="ch.appearances?.length" class="appearance-list">
                <div v-for="ap in ch.appearances" :key="ap.id" class="appearance-item">
                  <div class="appearance-item-header">
                    <span class="appearance-chip">{{ ap.changeReason || `形象 ${ap.appearanceIndex}` }}</span>
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
                    <span v-else class="asset-reference-hint">可选，不上传则按文字提示生成</span>
                  </div>
                  <!-- 图片画廊 -->
                  <div v-if="parseJsonStrArray(ap.imageUrls).length" class="image-gallery">
                    <el-tooltip
                      v-for="(url, i) in parseJsonStrArray(ap.imageUrls)" :key="i"
                      :content="parseJsonStrArray(ap.imageDescriptions)[i] || '无提示词记录'"
                      placement="bottom"
                      :show-after="300"
                    >
                      <div
                        class="image-gallery-item role-img"
                        :class="{ selected: i === ap.selectedImageIndex }"
                      >
                        <img
                          :src="url"
                          :alt="`${ap.changeReason || '形象'}-${i}`"
                          referrerpolicy="no-referrer"
                          loading="lazy"
                          @click="openExternal(url)"
                        />
                        <span class="gallery-index" @click.stop="handleSelectAppearanceImage(ap, i)">{{ i + 1 }}</span>
                        <button
                          type="button"
                          class="gallery-delete"
                          :disabled="parseJsonStrArray(ap.imageUrls).length <= 1"
                          :title="parseJsonStrArray(ap.imageUrls).length <= 1 ? '至少保留一张图片' : '删除图片'"
                          @click.stop="handleDeleteAppearanceImage(ap, i)"
                        >×</button>
                        <el-icon v-if="i === ap.selectedImageIndex" class="gallery-check"><CircleCheckFilled /></el-icon>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Locations -->
        <div v-if="locations.length > 0" class="asset-section">
          <h3 class="asset-section-title">场景站位 ({{ locations.length }})</h3>
          <div class="asset-card-list">
            <article v-for="loc in locations" :key="loc.id" class="asset-card location-card">
              <div class="asset-card-head">
                <span class="asset-name">{{ loc.name }}</span>
                <el-tag v-if="loc.hasCrowd" size="small" type="warning">有群演</el-tag>
              </div>
              <p v-if="loc.summary" class="asset-intro">{{ loc.summary }}</p>
              <div v-if="loc.availableSlots" class="slots-block">
                <span class="slots-label">可站位置：</span>
                <ul class="slots-list">
                  <li v-for="(slot, i) in parseJsonField<string[]>(loc.availableSlots) || []" :key="i">{{ slot }}</li>
                </ul>
              </div>
              <div v-if="loc.descriptions" class="descs-block">
                <span class="slots-label">场景描述：</span>
                <ul class="slots-list">
                  <li v-for="(desc, i) in (parseJsonField<string[]>(loc.descriptions) || []).slice(0, 2)" :key="i">{{ desc }}</li>
                </ul>
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
                  <span v-else class="asset-reference-hint">可选，不上传则按文字提示生成</span>
                </div>
                <div v-if="parseJsonStrArray(loc.imageUrls).length" class="image-gallery">
                  <el-tooltip
                    v-for="(url, i) in parseJsonStrArray(loc.imageUrls)" :key="i"
                    :content="parseJsonStrArray(loc.imageDescriptions)[i] || '无提示词记录'"
                    placement="bottom"
                    :show-after="300"
                  >
                    <div
                      class="image-gallery-item loc-img"
                      :class="{ selected: i === loc.selectedImageIndex }"
                    >
                      <img
                        :src="url"
                        :alt="`${loc.name}-${i}`"
                        referrerpolicy="no-referrer"
                        loading="lazy"
                        @click="openExternal(url)"
                      />
                      <span class="gallery-index" @click.stop="handleSelectLocationImage(loc, i)">{{ i + 1 }}</span>
                      <button
                        type="button"
                        class="gallery-delete"
                        :disabled="parseJsonStrArray(loc.imageUrls).length <= 1"
                        :title="parseJsonStrArray(loc.imageUrls).length <= 1 ? '至少保留一张图片' : '删除图片'"
                        @click.stop="handleDeleteLocationImage(loc, i)"
                      >×</button>
                      <el-icon v-if="i === loc.selectedImageIndex" class="gallery-check"><CircleCheckFilled /></el-icon>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </article>
          </div>
        </div>

        <el-empty v-if="characters.length === 0 && locations.length === 0" description="还没有资产，请先在上一步点击「分析资产」" />

        <div class="step-actions">
          <el-button @click="activeStep = 'script'">上一步</el-button>
          <el-button :loading="analyzingAssets" :disabled="!scriptForm.id" @click="handleAnalyzeAssets">
            <el-icon><RefreshRight /></el-icon>重新分析
          </el-button>
          <el-button type="primary" :loading="regeneratingStoryboard" :disabled="!scriptForm.id || composeBusy" @click="handleGenerateStoryboard">
            生成分镜
          </el-button>
        </div>
      </section>

      <!-- ====== Step 04: Storyboard ====== -->
      <section v-if="activeStep === 'storyboard' && hasProject" class="form-step-panel">
        <div class="section-head">
          <div>
            <span class="section-kicker">Step 04</span>
            <h2>分镜确认</h2>
            <p>逐个检查镜头标题、角色站位、场景、摄影规则、表演指导和视频提示词。</p>
          </div>
          <div class="storyboard-header-actions">
            <el-form-item label="视频模型" class="video-model-inline">
              <el-select v-model="ideaForm.videoModel" filterable :loading="loadingModels" placeholder="选择视频模型">
                <el-option v-for="item in videoModels" :key="item.id ?? item.modelName" :label="item.modelDescribe || item.modelName || ''" :value="item.modelName || ''" />
              </el-select>
            </el-form-item>
            <el-button :loading="regeneratingStoryboard" :disabled="!scriptForm.id || composeBusy" @click="handleGenerateStoryboard">重新生成</el-button>
            <el-tooltip :disabled="!!ideaForm.videoModel || storyboardDrafts.length === 0" content="请先选择视频模型">
              <el-button :loading="generatingAllVideos" :disabled="!ideaForm.videoModel || storyboardDrafts.length === 0 || composeBusy" @click="handleGenerateAllVideos">
                一键生成全部视频
              </el-button>
            </el-tooltip>
          </div>
        </div>

        <div v-if="storyboardDrafts.length > 0" class="composition-toolbar">
          <div class="composition-toolbar-main">
            <div class="composition-heading">
              <strong>成片合成</strong>
              <span>已选择 {{ selectedComposeCount }}/{{ completedVideoCount }} 个已完成镜头；至少选择 2 个</span>
            </div>
            <div class="composition-controls">
              <div class="composition-clip-select">
                <el-select
                  v-model="composeStoryboardIds"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
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

        <div v-if="storyboardDrafts.length > 0" class="storyboard-list">
          <article v-for="item in storyboardDrafts" :key="item.id ?? item.sceneNo" class="storyboard-card">
            <!-- top bar -->
            <div class="storyboard-card-head">
              <div class="scene-no-badge">镜头 {{ item.sceneNo }}</div>
              <div class="scene-tags">
                <el-tag v-if="item.sceneType" size="small" :type="sceneTypeTagMap[item.sceneType] || 'info'">{{ sceneTypeLabels[item.sceneType] || item.sceneType }}</el-tag>
                <el-tag v-if="item.shotType" size="small" type="info">{{ item.shotType }}</el-tag>
                <el-tag v-if="item.cameraMove" size="small" type="info">{{ item.cameraMove }}</el-tag>
                <el-tag v-if="item.locationName" size="small" effect="plain" type="success">{{ item.locationName }}</el-tag>
              </div>
              <el-input-number v-model="item.durationSeconds" :min="1" :max="60" size="small" class="duration-picker" />
            </div>

            <el-input v-model="item.sceneTitle" placeholder="镜头标题" class="scene-title-input" />

            <div class="scene-meta-row">
              <el-select v-model="item.sceneType" placeholder="场景类型" size="small" class="scene-type-select">
                <el-option v-for="opt in sceneTypeOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
              </el-select>
              <el-select v-model="item.shotType" placeholder="镜头景别" size="small" clearable class="shot-type-select">
                <el-option v-for="opt in shotTypeOptions" :key="opt" :label="opt" :value="opt" />
              </el-select>
              <el-select v-model="item.cameraMove" placeholder="镜头运动" size="small" clearable class="camera-move-select">
                <el-option v-for="opt in cameraMoveOptions" :key="opt" :label="opt" :value="opt" />
              </el-select>
              <el-input v-model="item.locationName" placeholder="场景名" size="small" class="location-name-input" />
            </div>

            <!-- Characters in shot -->
            <div v-if="parseJsonField<CharacterRef[]>(item.charactersJson)?.length" class="characters-row">
              <span class="chars-label">角色站位：</span>
              <span v-for="(cr, ci) in parseJsonField<CharacterRef[]>(item.charactersJson)!" :key="ci" class="character-chip">
                {{ cr.name }}
                <small v-if="cr.appearance">({{ cr.appearance }})</small>
                <em v-if="cr.slot">{{ cr.slot }}</em>
              </span>
            </div>

            <el-input v-model="item.sceneText" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" placeholder="镜头画面描述" />
            <el-input v-model="item.videoPrompt" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" placeholder="视频提示词" />

            <!-- Photography rules -->
            <details v-if="item.photographyRules" class="rules-detail">
              <summary>摄影规则</summary>
              <div class="rules-body">
                <template v-if="parseJsonField<PhotographyRule>(item.photographyRules)">
                  <p v-if="parseJsonField<PhotographyRule>(item.photographyRules)!.scene_summary">
                    场景：{{ parseJsonField<PhotographyRule>(item.photographyRules)!.scene_summary }}
                  </p>
                  <p v-if="parseJsonField<PhotographyRule>(item.photographyRules)!.lighting">
                    灯光：{{ parseJsonField<PhotographyRule>(item.photographyRules)!.lighting!.direction }} / {{ parseJsonField<PhotographyRule>(item.photographyRules)!.lighting!.quality }}
                  </p>
                  <p v-if="parseJsonField<PhotographyRule>(item.photographyRules)!.depth_of_field">
                    景深：{{ parseJsonField<PhotographyRule>(item.photographyRules)!.depth_of_field }}
                  </p>
                  <p v-if="parseJsonField<PhotographyRule>(item.photographyRules)!.color_tone">
                    色调：{{ parseJsonField<PhotographyRule>(item.photographyRules)!.color_tone }}
                  </p>
                  <div v-if="parseJsonField<PhotographyRule>(item.photographyRules)!.characters?.length" class="photo-chars">
                    <span v-for="(pc, pci) in parseJsonField<PhotographyRule>(item.photographyRules)!.characters!" :key="pci" class="photo-char-item">
                      {{ pc.name }}：{{ pc.screen_position }} · {{ pc.posture }} · 面向{{ pc.facing }}
                    </span>
                  </div>
                </template>
              </div>
            </details>

            <!-- Acting notes -->
            <details v-if="item.actingNotes" class="rules-detail">
              <summary>表演指导</summary>
              <div class="rules-body">
                <p v-for="(an, ai) in parseJsonField<ActingNote[]>(item.actingNotes) || []" :key="ai" class="acting-line">
                  <strong>{{ an.name }}</strong>：{{ an.acting }}
                </p>
              </div>
            </details>

            <!-- Image prompt -->
            <el-input v-if="item.imagePrompt" v-model="item.imagePrompt" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="图片提示词" />

            <!-- Source text -->
            <p v-if="item.sourceText" class="source-text-ref">
              原文：{{ item.sourceText }}
            </p>

            <!-- Reference Images -->
            <div v-if="getStoryboardRefImages(item).charImgs.length || getStoryboardRefImages(item).locImg" class="storyboard-ref-images">
              <span class="ref-label">参考图：</span>
              <div class="ref-imgs-row">
                <el-tooltip v-for="ci in getStoryboardRefImages(item).charImgs" :key="ci.name" :content="ci.name" placement="bottom">
                  <img :src="ci.url" :alt="ci.name" referrerpolicy="no-referrer" class="ref-thumb role-ref" @click="openExternal(ci.url)" />
                </el-tooltip>
                <img v-if="getStoryboardRefImages(item).locImg" :src="getStoryboardRefImages(item).locImg!" alt="场景参考" referrerpolicy="no-referrer" class="ref-thumb loc-ref" @click="openExternal(getStoryboardRefImages(item).locImg)" />
              </div>
            </div>

            <!-- Video -->
            <div v-if="item.videoUrl && item.videoStatus === 'done'" class="video-download-bar">
              <span class="video-done-label">视频已生成</span>
              <a :href="item.videoUrl" target="_blank" rel="noopener noreferrer" class="video-download-btn">
                <el-button size="small" type="success" plain>下载视频</el-button>
              </a>
            </div>

            <div class="storyboard-bottom">
              <div class="video-status-area">
                <el-tag v-if="item.videoStatus === 'done'" size="small" type="success">已生成</el-tag>
                <el-tag v-else-if="item.videoStatus === 'generating'" size="small" type="warning"><el-icon class="is-loading"><Loading /></el-icon>生成中</el-tag>
                <el-button v-if="item.videoStatus === 'generating'" size="small" text @click="handleCheckVideoProgress(item)">查看进度</el-button>
                <template v-else-if="item.videoStatus === 'failed'">
                  <el-tag size="small" type="danger">生成失败</el-tag>
                  <span class="video-failed-hint">镜头内容已保留，可直接重试</span>
                </template>
                <el-tag v-else size="small" type="info">待生成</el-tag>
              </div>
              <div class="storyboard-actions">
                <el-button
                  v-if="item.videoStatus === 'failed'"
                  size="small"
                  type="danger"
                  plain
                  :loading="generatingVideo[item.id ?? '']"
                  :disabled="!ideaForm.videoModel || composeBusy"
                  @click="handleRetryVideo(item)"
                >
                  重试生成
                </el-button>
                <el-tooltip v-else :disabled="!!ideaForm.videoModel && item.videoStatus !== 'generating'" :content="!ideaForm.videoModel ? '请先选择视频模型' : '正在生成中'">
                  <el-button size="small" type="primary" :loading="generatingVideo[item.id ?? '']" :disabled="item.videoStatus === 'generating' || !ideaForm.videoModel || composeBusy" @click="handleGenerateVideo(item)">
                    {{ item.videoStatus === 'done' ? '重新生成视频' : '生成视频' }}
                  </el-button>
                </el-tooltip>
                <el-button size="small" :loading="savingStoryboard" :disabled="composeBusy || savingStoryboard" @click="handleSaveStoryboard(item)">保存镜头</el-button>
              </div>
            </div>
          </article>
        </div>
        <el-empty v-else description="还没有分镜，请先在资产配置步骤生成分镜" />
        <div class="step-actions">
          <el-button @click="activeStep = 'assets'">上一步</el-button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.short-drama-page {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 304px minmax(0, 1fr);
  gap: 16px;
  width: 100%;
  height: calc(100vh - var(--header-container-default-heigth));
  min-height: 0;
  padding: 14px 18px 18px;
  overflow: hidden;
  color: var(--drama-text);
  background:
    radial-gradient(circle at 86% 0%, rgb(56 189 248 / 8%), transparent 26%),
    var(--drama-canvas);
  *, *::before, *::after { box-sizing: border-box; }
}

.project-sidebar, .hero-panel, .step-panel, .form-step-panel {
  min-width: 0;
  background: var(--drama-surface);
  border: 1px solid var(--drama-border);
  border-radius: 12px;
  box-shadow: 0 14px 38px rgb(37 99 235 / 7%);
  backdrop-filter: blur(12px);
}

.project-sidebar { display: flex; flex-direction: column; height: 100%; min-height: 0; overflow: hidden; }
.sidebar-head, .section-head { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; justify-content: space-between; }
.sidebar-head { padding: 18px 18px 14px; border-bottom: 1px solid #edf1f5; }

h1, h2, h3, p { margin: 0; }
h1 { font-size: 26px; font-weight: 780; line-height: 1.18; color: #1f2329; }
h2 { font-size: 18px; font-weight: 720; line-height: 1.35; color: #242a33; }
h3 { font-size: 15px; font-weight: 700; color: #343b46; }
p { margin-top: 6px; font-size: 13px; line-height: 1.65; color: #6b7280; }

.project-list { display: grid; gap: 8px; padding: 12px; overflow: auto; overscroll-behavior: contain; scrollbar-gutter: stable; &.empty { min-height: 96px; align-content: center; } }
.project-empty { padding: 16px; font-size: 13px; line-height: 1.5; color: #667085; text-align: center; background: #f8fafc; border: 1px dashed #d8dee8; border-radius: 8px; }
.project-item {
  display: grid; gap: 6px; width: 100%; min-width: 0; padding: 12px; text-align: left; cursor: pointer;
  background: #fff; border: 1px solid #e6eaf0; border-radius: 8px; transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
  &:hover { background: #f8fbff; border-color: #bfdbfe; }
  &.active { background: #eff6ff; border-color: #60a5fa; box-shadow: 0 0 0 3px rgb(37 99 235 / 9%); }
}
.project-title { overflow: hidden; font-size: 14px; font-weight: 700; color: #242a33; text-overflow: ellipsis; white-space: nowrap; }
.project-desc { display: -webkit-box; overflow: hidden; font-size: 12px; line-height: 1.5; color: #6f7785; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.project-row, .storyboard-bottom { display: flex; align-items: center; justify-content: space-between; }
.project-row { font-size: 12px; em { font-style: normal; color: rgb(0 0 0 / 45%); } small { color: var(--el-color-danger); } }

.workspace { display: grid; grid-template-rows: auto auto minmax(0, 1fr); gap: 14px; height: 100%; min-width: 0; min-height: 0; overflow: hidden auto; overscroll-behavior: contain; }
.hero-panel, .form-step-panel { padding: 18px 20px; }
.hero-panel {
  min-height: 82px; position: relative; overflow: hidden;
  background: linear-gradient(90deg, rgb(37 99 235 / 7%) 0 1px, transparent 1px), linear-gradient(180deg, rgb(56 189 248 / 6%) 0 1px, transparent 1px), linear-gradient(120deg, #fff, #f0f9ff);
  background-size: 28px 28px;
  &::before { position: absolute; top: 18px; right: 22px; width: 84px; height: 2px; content: ""; background: linear-gradient(90deg, #6c88b5, transparent); opacity: .55; }
}
.hero-copy { display: grid; gap: 8px; max-width: 760px; position: relative; z-index: 1; }

.section-kicker { font-size: 12px; font-weight: 700; line-height: 1.3; color: #2563eb; text-transform: uppercase; }
.section-head-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.image-model-inline { display: flex; align-items: center; gap: 8px; }
.image-model-label { font-size: 12px; font-weight: 600; color: #4a5568; white-space: nowrap; }
.form-hint { font-size: 12px; color: #94a3b8; margin-top: 4px; }

.step-panel { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; padding: 0; overflow: hidden; background: #fff; }

.step-item {
  position: relative; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 3px 10px; min-height: 64px;
  padding: 11px 14px; text-align: left; cursor: pointer; background: transparent; border: 0;
  border-right: 1px solid #edf1f5; border-radius: 0; transition: background .2s ease;
  &:last-child { border-right: 0; }
  &::after { position: absolute; right: 16px; bottom: 0; left: 16px; height: 3px; content: ""; background: transparent; border-radius: 999px 999px 0 0; }
}
.step-item span { grid-row: span 2; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; font-size: 12px; font-weight: 800; line-height: 1; color: #6a7280; background: #fbfcfe; border: 1px solid #d8dee8; border-radius: 8px; }
.step-item strong { min-width: 0; overflow: hidden; font-size: 14px; font-weight: 750; line-height: 1.35; color: #262b33; text-overflow: ellipsis; white-space: nowrap; }
.step-item small { min-width: 0; overflow: hidden; font-size: 12px; line-height: 1.35; color: #7b8491; text-overflow: ellipsis; white-space: nowrap; }
.step-item:hover, .step-item.active { background: #f9fbfd; }
.step-item.active::after { background: linear-gradient(90deg, #2563eb, #38bdf8); }
.step-item.active span { color: #fff; background: linear-gradient(145deg, #2563eb, #38bdf8); border-color: #2563eb; box-shadow: 0 6px 14px rgb(37 99 235 / 20%); }
.step-item.completed:not(.active) span { color: #2563eb; background: #eff6ff; border-color: #bfdbfe; }

.form-step-panel { display: grid; gap: 16px; align-content: start; width: 100%; min-height: 0; overflow: hidden auto; }
.idea-step { min-height: 0; overflow: visible; &.expanded { box-shadow: 0 18px 42px rgb(32 36 43 / 7%); } }
.creator-form { display: grid; gap: 13px; min-width: 0; min-height: 0; overflow: visible; }
.idea-field { min-height: 0; margin-bottom: 0; :deep(.el-textarea__inner) { height: clamp(160px, 26vh, 300px); min-height: 160px !important; } }
.idea-step.expanded .idea-field :deep(.el-textarea__inner) { height: clamp(110px, 15vh, 156px); min-height: 110px !important; }
.single-step-form, .script-grid, .storyboard-list { min-height: 0; overflow: auto; }
.advanced-options { display: grid; grid-template-columns: repeat(2, minmax(200px, 1fr)); gap: 12px 16px; align-items: start; overflow: hidden; padding: 12px; background: #f8fafc; border: 1px solid #e4e9f1; border-radius: 8px; :deep(.el-form-item) { min-width: 0; margin-bottom: 0; } }
.ratio-group { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); width: 100%; height: 34px; :deep(.el-radio-button__inner) { width: 100%; height: 34px; min-height: 34px; padding-right: 8px; padding-left: 8px; overflow: hidden; line-height: 18px; text-overflow: ellipsis; white-space: nowrap; background: #fff; border-color: #d8dee8; } :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) { color: #fff; background: #2563eb; border-color: #2563eb; box-shadow: -1px 0 0 0 #2563eb; } }

:deep(.el-button--primary) { --el-button-bg-color: #2563eb; --el-button-border-color: #2563eb; --el-button-hover-bg-color: #1d4ed8; --el-button-hover-border-color: #1d4ed8; --el-button-active-bg-color: #1e40af; --el-button-active-border-color: #1e40af; box-shadow: 0 7px 18px rgb(37 99 235 / 18%); }

.creator-actions, .step-actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: flex-end; padding-top: 0; }
.creator-actions :deep(.el-button) { flex-shrink: 0; min-width: 118px; height: 38px; }

// ---- SSE Progress ----
.sse-progress-panel { display: flex; justify-content: center; padding: 20px 24px; }
.sse-progress-card { width: 100%; max-width: 720px; padding: 24px 28px; text-align: center; background: #fff; border: 1px solid #e4e9f1; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,.06); }
.sse-spinner { color: #2563eb; animation: sseSpin 1.4s linear infinite; margin-bottom: 6px; }
@keyframes sseSpin { to { transform: rotate(360deg); } }
.sse-msg { margin: 4px 0 12px; color: #7f8b9a; font-size: 13px; }
.sse-stream-text {
  max-height: 110px; overflow-y: auto; margin: 0 0 14px; padding: 10px 14px;
  background: #fafbfc; border: 1px solid #e8ecf1; border-radius: 8px; text-align: left;
}
.sse-stream-text pre {
  white-space: pre-wrap; word-break: break-word; margin: 0;
  font-size: 12px; line-height: 1.6; color: #8899a8; font-family: 'SF Mono', 'Fira Code', monospace;
}
.sse-dual-stream { display: flex; gap: 16px; margin-bottom: 14px; }
.sse-stream-col { flex: 1; min-width: 0; }
.sse-col-label { font-size: 12px; font-weight: 600; color: #5a6a7e; margin-bottom: 6px; text-align: left; }
.sse-stream-text.dual { max-height: 180px; margin: 0; }
.sse-steps { display: flex; flex-direction: column; gap: 5px; text-align: left; }
.sse-step { display: flex; align-items: center; gap: 6px; padding: 4px 10px; font-size: 13px; border-radius: 6px; background: #f8fafc; color: #b0b8c4; transition: all .3s; }
.sse-step .sse-dot { width: 8px; height: 8px; border-radius: 50%; background: #d8dee8; flex-shrink: 0; }
.sse-step.running { color: #1d4ed8; background: #eff6ff; }
.sse-step.running .sse-dot { background: #2563eb; animation: ssePulse 1s ease-in-out infinite; }
.sse-step.done { color: #2e7d32; background: #e8f5e9; }
.sse-step.done .sse-dot { background: #2e7d32; }
.sse-step.error { color: #c62828; background: #ffebee; }
.sse-step.error .sse-dot { background: #c62828; }
@keyframes ssePulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
.sse-running { color: #2563eb; font-weight: 600; letter-spacing: 1px; }
.sse-check { color: #2e7d32; }

.script-grid { margin-top: 0; }
.script-meta { display: grid; grid-template-columns: minmax(0, 1fr) minmax(180px, 240px); gap: 14px; }

// ---- Assets ----
.asset-section { margin-top: 4px; }
.asset-section-title { margin-bottom: 10px; }
.asset-card-list { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(min(360px, 100%), 1fr)); }
.asset-card { padding: 14px; background: #fbfcfd; border: 1px solid #e5e7eb; border-radius: 8px; display: grid; gap: 8px; }
.asset-card.location-card { background: #f8fdf8; border-color: #dcf0dc; }
.asset-card-head { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.asset-name { font-size: 15px; font-weight: 750; color: #242a33; }
.asset-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.asset-intro { font-size: 12px; color: #6b7280; line-height: 1.5; margin-top: 0; }
.asset-tags-line { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 0; }
.personality-tag { background: #f0f4f8; border-color: #d8dee8; color: #5a6474; }
.asset-visual-desc { font-size: 12px; color: #4b5563; line-height: 1.65; margin-top: 2px; }
.appearance-list { display: flex; flex-direction: column; gap: 12px; margin-top: 6px; }
.appearance-item { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; background: #fff; transition: border-color .2s; }
.appearance-item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 6px; }
.appearance-chip { font-size: 13px; padding: 4px 12px; background: #eef2f8; border-radius: 999px; color: #3a4454; font-weight: 650; letter-spacing: .01em; }
.appearance-img-actions { display: flex; gap: 6px; flex-shrink: 0; }
.image-gallery { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
.image-gallery-item {
  position: relative; aspect-ratio: 3/2; border: 2px solid #e8ecf1; border-radius: 8px; overflow: hidden; cursor: pointer; transition: all .2s ease;
  &:hover { border-color: #a8b5c8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.08); }
  &.selected { border-color: #2563eb; box-shadow: 0 0 0 3px rgb(37 99 235 / 12%); }
  &.loc-img { aspect-ratio: 16/9; }
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .gallery-index {
    position: absolute; top: 4px; left: 5px; font-size: 11px; font-weight: 600; color: #fff; cursor: pointer; z-index: 2;
    background: rgba(0,0,0,.6); padding: 2px 7px; border-radius: 4px; line-height: 1.4; backdrop-filter: blur(4px);
  }
  .gallery-check {
    position: absolute; bottom: 4px; right: 4px; font-size: 16px; color: #22c55e;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,.4));
  }
  .gallery-delete {
    position: absolute; top: 5px; right: 5px; z-index: 3;
    width: 24px; height: 24px; padding: 0; border: 0; border-radius: 50%;
    background: rgb(15 23 42 / 72%); color: #fff; cursor: pointer;
    font-size: 18px; line-height: 22px; transition: background .15s, opacity .15s;
    &:hover:not(:disabled) { background: #dc2626; }
    &:disabled { cursor: not-allowed; opacity: .35; }
  }
}
.image-gallery-item.role-img { aspect-ratio: 3/2; }
.image-gallery-item.loc-img { aspect-ratio: 16/9; }
.location-image-section { margin-top: 10px; border-top: 1px solid #e5ebd8; padding-top: 10px; }
.location-img-actions { display: flex; gap: 6px; margin-bottom: 10px; }
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
.asset-reference-preview { width: 52px; height: 38px; border: 1px solid #d8dee8; border-radius: 4px; object-fit: cover; }
.asset-reference-hint { color: #94a3b8; font-size: 12px; }
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
.reference-upload-button:hover { border-color: #2563eb; color: #2563eb; }
.reference-upload-button.disabled { cursor: wait; opacity: .6; }
.reference-upload-button input { display: none; }
.form-hint { font-size: 12px; color: #94a3b8; margin-top: 4px; }

.appearance-row { display: flex; gap: 6px; flex-wrap: wrap; }
.slots-label, .chars-label { font-size: 12px; font-weight: 650; color: #6b7280; }
.slots-list { margin: 4px 0 0 0; padding-left: 18px; font-size: 12px; color: #4b5563; line-height: 1.6; }
.descs-block { margin-top: 8px; }

// ---- Storyboard ----
.storyboard-list { grid-template-columns: repeat(auto-fill, minmax(min(420px, 100%), 1fr)); gap: 14px; margin-top: 18px; }
.storyboard-card { min-width: 0; align-content: start; padding: 14px; background: #fbfcfd; border: 1px solid #e5e7eb; border-radius: 8px; display: grid; gap: 10px; }
.storyboard-card-head { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: space-between; }
.scene-no-badge { font-size: 14px; font-weight: 750; color: #242a33; }
.scene-tags { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
.scene-type-tag { font-weight: 650; }
.shot-tag, .camera-tag { background: #f0f4f8; border-color: #d8dee8; color: #5a6474; }
.duration-picker { margin-left: auto; }
.scene-title-input { margin-top: 2px; }
.scene-meta-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.scene-type-select { width: 110px; min-width: 110px; }
.shot-type-select { width: 150px; min-width: 140px; }
.camera-move-select { width: 140px; min-width: 130px; }
.location-name-input { width: 130px; min-width: 120px; }

.characters-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.character-chip { font-size: 12px; padding: 3px 10px; background: #e8f0fe; border: 1px solid #c8ddf8; border-radius: 6px; color: #345681; small { color: #6889a8; margin-left: 2px; } em { display: block; font-style: normal; font-size: 11px; color: #8a9fb5; margin-top: 2px; } }

.rules-detail { margin-top: 2px; summary { font-size: 12px; font-weight: 650; color: #5b6f95; cursor: pointer; padding: 4px 0; } .rules-body { margin-top: 6px; padding: 10px; background: #f8fafc; border-radius: 6px; font-size: 12px; line-height: 1.6; color: #4b5563; p { margin-top: 2px; } } }
.photo-chars { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
.photo-char-item { font-size: 11px; padding: 3px 8px; background: #e8f0fe; border-radius: 4px; color: #345681; }
.acting-line { margin-top: 4px !important; strong { color: #242a33; } }

.source-text-ref { font-size: 11px; color: #9ca3af; line-height: 1.5; font-style: italic; margin: 0; }

.storyboard-ref-images { display: flex; gap: 8px; align-items: flex-start; padding: 8px 10px; background: #f8fafc; border: 1px dashed #d8dee8; border-radius: 6px; }
.ref-label { font-size: 12px; font-weight: 650; color: #6b7280; white-space: nowrap; line-height: 48px; }
.ref-imgs-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.ref-thumb { width: 72px; height: 48px; object-fit: cover; border-radius: 4px; border: 2px solid #e8ecf1; cursor: pointer; transition: all .15s; }
.ref-thumb:hover { border-color: #2563eb; transform: scale(1.05); }
.ref-thumb.role-ref { aspect-ratio: 3/2; height: auto; }
.ref-thumb.loc-ref { aspect-ratio: 16/9; height: auto; }

.storyboard-bottom { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.video-status-area { display: flex; align-items: center; gap: 4px; }
.storyboard-actions { display: flex; gap: 6px; align-items: center; }
.video-download-bar { display: flex; align-items: center; gap: 10px; margin-top: 8px; padding: 8px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; }
.video-done-label { font-size: 13px; font-weight: 650; color: #166534; }
.video-download-btn { text-decoration: none; }
.storyboard-header-actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-end; }
.video-model-inline { margin-bottom: 0; min-width: 200px; }
.composition-toolbar { display: grid; gap: 14px; margin-top: 18px; padding: 16px 0; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
.composition-toolbar-main { display: grid; grid-template-columns: minmax(150px, 0.4fr) minmax(0, 1.6fr); gap: 18px; align-items: center; }
.composition-heading { display: grid; gap: 3px; }
.composition-heading strong { color: #202631; font-size: 15px; }
.composition-heading span, .composition-duration { color: #667085; font-size: 13px; }
.composition-controls { display: flex; min-width: 0; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: flex-end; }
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
  background: linear-gradient(90deg, #2563eb, #38bdf8, transparent);
  opacity: .72;
}

:deep(.el-form-item) { margin-bottom: 0; }
:deep(.el-form-item__label) { min-height: 22px; padding-bottom: 6px; font-size: 13px; font-weight: 650; line-height: 1.5; color: #343b46; }
:deep(.el-input__wrapper), :deep(.el-textarea__inner) { background: #fff; box-shadow: 0 0 0 1px #d8dee8 inset; }
:deep(.el-input__wrapper:hover), :deep(.el-textarea__inner:hover) { box-shadow: 0 0 0 1px #c7d0dc inset; }
:deep(.el-input__wrapper.is-focus), :deep(.el-textarea__inner:focus) { background: #fff; box-shadow: 0 0 0 1px #60a5fa inset, 0 0 0 4px rgb(37 99 235 / 7%); }
:deep(.el-input__inner), :deep(.el-textarea__inner) { font-size: 14px; line-height: 1.7; }
:deep(.el-textarea__inner) { resize: vertical; }
:deep(.el-button) { font-weight: 650; }
:deep(.el-button .el-icon) { margin-right: 4px; }

@media (width <= 1100px) {
  .short-drama-page, .advanced-options, .script-meta, .scene-meta-row { grid-template-columns: 1fr; }
  .project-sidebar { height: auto; max-height: 280px; }
  .step-panel { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .step-item:nth-child(2n) { border-right: 0; }
  .composition-toolbar-main { grid-template-columns: 1fr; }
  .composition-controls { justify-content: flex-start; }
}
@media (width <= 640px) {
  .short-drama-page { height: calc(100vh - var(--header-container-default-heigth)); gap: 12px; padding: 12px; }
  .workspace { padding-right: 0; }
  .hero-panel { min-height: auto; }
  .section-head { flex-direction: column; }
  h1 { font-size: 26px; }
  .step-panel { grid-template-columns: 1fr; }
  .step-item { border-right: 0; border-bottom: 1px solid #edf0f3; &:last-child { border-bottom: 0; } }
  .form-step-panel { padding: 16px; }
  .creator-actions, .step-actions { align-items: stretch; :deep(.el-button) { width: 100%; margin-left: 0; } }
  .storyboard-bottom { flex-wrap: wrap; gap: 8px; }
  .composition-controls { display: grid; grid-template-columns: 1fr; }
  .transition-segmented, .transition-duration-select, .compose-ratio-select { width: 100%; min-width: 0; }
  .composition-status { align-items: stretch; }
  .composition-status { flex-wrap: wrap; }
  .composition-download { width: 100%; margin-left: 0; }
  .composition-progress { min-width: 100%; }
  .asset-reference-input { align-items: flex-start; }
  .asset-reference-preview { width: 80px; height: 56px; }
}
.video-failed-hint { font-size: 11px; color: #b45309; }
.composition-clip-select { min-width: 240px; }
.composition-clip-select :deep(.el-select) { width: 100%; }
</style>



