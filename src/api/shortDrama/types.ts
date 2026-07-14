export type SnowflakeId = string;

export interface ShortDramaProject {
  id?: SnowflakeId;
  userId?: SnowflakeId;
  projectName: string;
  description?: string;
  status?: string;
  artStyle?: string;
  composeAspectRatio?: ShortDramaAspectRatio;
  createTime?: string;
  updateTime?: string;
}

export interface ShortDramaScript {
  id?: SnowflakeId;
  projectId: SnowflakeId;
  scriptName: string;
  scriptText?: string;
  outlineText?: string;
  tone?: string;
  sourceType?: string;
  createTime?: string;
  updateTime?: string;
}

export interface ShortDramaStoryboard {
  id?: SnowflakeId;
  projectId: SnowflakeId;
  scriptId: SnowflakeId;
  sceneNo: number;
  sceneTitle?: string;
  sceneText?: string;
  sceneType?: string;
  shotType?: string;
  cameraMove?: string;
  charactersJson?: string;
  locationName?: string;
  photographyRules?: string;
  actingNotes?: string;
  continuityJson?: string;
  sourceText?: string;
  imagePrompt?: string;
  durationSeconds?: number;
  videoPrompt?: string;
  videoUrl?: string;
  videoId?: string;
  videoStatus?: string;
  createTime?: string;
  updateTime?: string;
}

export type ShortDramaTransitionType = 'none' | 'dissolve' | 'fade' | 'slide';
export type ShortDramaAspectRatio = '9:16' | '16:9' | '1:1';
export type ShortDramaComposeStatus = 'pending' | 'processing' | 'done' | 'failed';

export interface ShortDramaComposeVideoRequest {
  transitionType: ShortDramaTransitionType;
  transitionDurationSeconds: number;
  aspectRatio: ShortDramaAspectRatio;
  storyboardIds: SnowflakeId[];
}

export interface ShortDramaComposeVideoResult extends ShortDramaComposeVideoRequest {
  projectId: SnowflakeId;
  status: ShortDramaComposeStatus;
  progress?: number;
  outputDurationSeconds?: number;
  videoOssId?: SnowflakeId;
  videoUrl?: string;
  errorMessage?: string;
  composedAt?: string;
}

export interface ShortDramaCharacter {
  id?: SnowflakeId;
  projectId?: SnowflakeId;
  name: string;
  aliases?: string;
  introduction?: string;
  roleLevel?: string;
  gender?: string;
  ageRange?: string;
  personalityTags?: string;
  costumeTier?: number;
  visualDescription?: string;
  referenceImageUrl?: string;
  appearances?: ShortDramaCharacterAppearance[];
}

export interface ShortDramaCharacterAppearance {
  id?: SnowflakeId;
  characterId?: SnowflakeId;
  appearanceIndex?: number;
  changeReason?: string;
  description?: string;
  referenceImageUrl?: string;
  imageUrls?: string;
  imageDescriptions?: string;
  selectedImageIndex?: number;
  previousImageUrls?: string;
  previousDescriptions?: string;
}

export interface ShortDramaLocation {
  id?: SnowflakeId;
  projectId?: SnowflakeId;
  name: string;
  summary?: string;
  hasCrowd?: boolean;
  crowdDescription?: string;
  availableSlots?: string;
  descriptions?: string;
  referenceImageUrl?: string;
  imageUrls?: string;
  imageDescriptions?: string;
  selectedImageIndex?: number;
  previousImageUrls?: string;
  previousDescriptions?: string;
}

export interface ShortDramaDetail {
  project: ShortDramaProject;
  script?: ShortDramaScript;
  characters: ShortDramaCharacter[];
  locations: ShortDramaLocation[];
  storyboards: ShortDramaStoryboard[];
}

export interface ShortDramaIdea {
  idea: string;
  model: string;
  projectName?: string;
  artStyle?: string;
  aspectRatio?: ShortDramaAspectRatio;
}

