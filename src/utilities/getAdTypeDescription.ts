import { AdType } from '@/features/articles/components/ArticleAds/types'

const DESCRIPTIONS = {
  black: 'Black Friday discount',
  red: 'Time limited',
  green: 'Great pricing',
  yellow: 'Fair pricing',
  blue: 'Manza ad',
} as const satisfies Record<AdType, string>

export function getAdTypeDescription(adType: AdType): string {
  return DESCRIPTIONS[adType] ?? 'Unknown ad type'
}
