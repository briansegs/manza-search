'use client'

import TitleBar from '@/blocks/article-blocks/TitleBar'

import { CarouselDotButtons } from '@/components/ui/carousel'

import { ArticleAdsContainerProps } from './types'
import { ArticleAdsCarousel } from './ArticleAdsCarousel'
import { ArticleAdsCarouselContent } from './ArticleAdsCarouselContent'
import { useReadMode } from '@/stores/readModeStore'

export function ArticleAdsContainer({ ads }: ArticleAdsContainerProps) {
  const readMode = useReadMode()

  if (!ads) return null
  if (readMode) return null

  const { adCollections } = ads

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title="Ads" />

      <div className="border-content custom-scrollbar w-full overflow-x-auto py-4 md:py-8">
        <div className="mx-auto flex w-fit gap-6 px-4 xl:px-16">
          {adCollections && adCollections.length > 0 ? (
            adCollections.map(({ id, adGroups }, index) => {
              return (
                <ArticleAdsCarousel key={id ?? `collection-${index}`}>
                  <ArticleAdsCarouselContent adGroups={adGroups} />

                  <CarouselDotButtons className="mt-2" variant="carouselDotLight" />
                </ArticleAdsCarousel>
              )
            })
          ) : (
            <div className="py-4 text-center">No ads available</div>
          )}
        </div>
      </div>
    </div>
  )
}
