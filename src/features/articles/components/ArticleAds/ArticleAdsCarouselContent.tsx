import { ArticleAdsCarouselItem } from './ArticleAdsCarouselItem'
import { ArticleAdsCarouselContentProps } from './types'

import { CarouselContent } from '@/components/ui/carousel'

export function ArticleAdsCarouselContent({ adGroups }: ArticleAdsCarouselContentProps) {
  return (
    <div className="border-content h-72 w-[406px] flex-shrink-0 overflow-hidden rounded-primary hover:shadow-[10px_10px_10px_#60b3d3]">
      <CarouselContent className="-ml-1 h-72">
        {adGroups.map(({ groupImage, id, adType, adSections }) => {
          return (
            <ArticleAdsCarouselItem
              key={id}
              groupImage={groupImage}
              adType={adType}
              adSections={adSections}
            />
          )
        })}
      </CarouselContent>
    </div>
  )
}
