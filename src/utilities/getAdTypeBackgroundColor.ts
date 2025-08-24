import { AdType } from '@/features/articles/components/ArticleAds/types'

export function getAdTypeBackgroundColor(adType: AdType) {
  return {
    'bg-red-600': adType === 'red',
    'bg-black': adType === 'black',
    'bg-yellow-400': adType === 'yellow',
    'bg-green-600': adType === 'green',
    'bg-secondary-blue': adType === 'blue',
  }
}
