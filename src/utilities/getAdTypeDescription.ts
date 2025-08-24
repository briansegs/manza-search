import { AdType } from '@/features/articles/components/ArticleAds/types'

export function getAdTypeDescription(adType: AdType) {
  switch (adType) {
    case 'black':
      return 'Black Friday discount'
    case 'red':
      return 'Time limited'
    case 'green':
      return 'Great pricing'
    case 'yellow':
      return 'Fair pricing'
    case 'blue':
      return 'Manza ad'
    default:
      return 'Unknown ad type'
  }
}
