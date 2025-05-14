import { cn } from '@/utilities/ui'
import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
} from '@/components/ui/carousel'

const LiteratureHero = () => {
  return (
    <div className={cn('flex w-full justify-center', 'mt-1', 'lg:mt-12')}>
      <div className={cn('w-full max-w-4xl')}>
        <Carousel>
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="border-2 border-black bg-card text-card-foreground">
                  <div className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselDotButtons />
        </Carousel>
      </div>
    </div>
  )
}

export default LiteratureHero
