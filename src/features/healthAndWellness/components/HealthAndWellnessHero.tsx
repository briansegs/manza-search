import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
} from '@/features/shared/components/ui/carousel'

import { CMSLink } from '@/components/Link'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { isValidLink } from '@/utilities/isValidLink'
import { HealthAndWellnessHeroProps } from '../types'

export function HealthAndWellnessHero({ ads }: HealthAndWellnessHeroProps) {
  if (!ads || ads.length === 0) {
    return null
  }

  return (
    <div className="mt-1 flex w-full justify-center">
      <div className="w-full max-w-4xl rounded-[10px] bg-black px-2 pt-2">
        <Carousel>
          <CarouselContent className="-ml-1">
            {ads.map(({ media, enableLink, link, id }) => {
              const hasValidLink = isValidLink(link)

              return (
                <CarouselItem key={id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="relative aspect-square border-2 border-black">
                    {hasValidLink && enableLink ? (
                      <CMSLink {...link}>
                        {media ? <RenderMedia media={media} /> : <ImagePlaceholder />}
                      </CMSLink>
                    ) : media ? (
                      <RenderMedia media={media} />
                    ) : (
                      <ImagePlaceholder />
                    )}
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <CarouselDotButtons />
        </Carousel>
      </div>
    </div>
  )
}
