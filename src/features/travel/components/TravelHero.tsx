import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
} from '@/components/ui/carousel'

import { CMSLink } from '@/components/Link'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import RenderMedia from '@/components/RenderMedia'
import { isValidLink } from '@/utilities/isValidLink'
import { TravelHeroProps } from '../types'

export function TravelHero({ images }: TravelHeroProps) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="mt-1 flex w-full justify-center">
      <div className="w-full max-w-4xl rounded-[10px] bg-black px-2 pt-2">
        <Carousel>
          <CarouselContent className="-ml-1">
            {images.map(({ media, enableLink, link, id }) => {
              const hasValidLink = isValidLink(link)

              return (
                <CarouselItem key={id} className="pl-1">
                  <div className="relative aspect-video border-2 border-black md:aspect-[16/6]">
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
