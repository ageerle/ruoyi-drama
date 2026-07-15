import type { ComposerTranslation } from 'vue-i18n';
import type {
  ShortDramaAspectRatio,
  ShortDramaTransitionType,
} from '@/api/shortDrama/types';

/**
 * 短剧相关选项映射的共享本地化构建函数。
 * value 始终是稳定 code（后端枚举），label 随当前语言变化。
 * 调用方需用 computed 包裹以保证切换语言时响应。
 */

export interface LabeledOption<V extends string> {
  label: string;
  value: V;
}

export function getArtStyleOptions(t: ComposerTranslation): LabeledOption<string>[] {
  return [
    { label: t('shortDrama.options.artStyle.realistic'), value: 'realistic' },
    { label: t('shortDrama.options.artStyle.americanComic'), value: 'american-comic' },
    { label: t('shortDrama.options.artStyle.chineseComic'), value: 'chinese-comic' },
    { label: t('shortDrama.options.artStyle.japaneseAnime'), value: 'japanese-anime' },
  ];
}

export function getVideoRatioOptions(t: ComposerTranslation): LabeledOption<ShortDramaAspectRatio>[] {
  return [
    { label: t('shortDrama.options.ratio.vertical'), value: '9:16' },
    { label: t('shortDrama.options.ratio.horizontal'), value: '16:9' },
    { label: t('shortDrama.options.ratio.square'), value: '1:1' },
  ];
}

export function getTransitionOptions(t: ComposerTranslation): LabeledOption<ShortDramaTransitionType>[] {
  return [
    { label: t('shortDrama.options.transition.none'), value: 'none' },
    { label: t('shortDrama.options.transition.dissolve'), value: 'dissolve' },
    { label: t('shortDrama.options.transition.fade'), value: 'fade' },
    { label: t('shortDrama.options.transition.slide'), value: 'slide' },
  ];
}

/** 艺术风格 code → 本地化标签，未知 code 回退到「自定义风格」 */
export function artStyleLabel(value: string | undefined | null, t: ComposerTranslation): string {
  if (!value) return t('shortDrama.options.artStyle.realistic');
  switch (value) {
    case 'realistic': return t('shortDrama.options.artStyle.realistic');
    case 'american-comic': return t('shortDrama.options.artStyle.americanComic');
    case 'chinese-comic': return t('shortDrama.options.artStyle.chineseComic');
    case 'japanese-anime': return t('shortDrama.options.artStyle.japaneseAnime');
    default: return t('shortDrama.options.artStyle.custom');
  }
}
