import { CarouselItem } from '@/components/ui/carousel'
import { Dialog } from '@/components/ui/dialog'
import { ArticleAdsCarouselItemProps } from './types'
import { ArticleAdsDialogTrigger } from './ArticleAdsDialogTrigger'
import { ArticleAdsDialogContent } from './ArticleAdsDialogContent'

export function ArticleAdsCarouselItem({
  groupImage,
  adType,
  adSections,
}: ArticleAdsCarouselItemProps) {
  return (
    <CarouselItem className="relative">
      <Dialog>
        <ArticleAdsDialogTrigger groupImage={groupImage} adType={adType} />

        <ArticleAdsDialogContent adSections={adSections} />
      </Dialog>
    </CarouselItem>
  )
}
