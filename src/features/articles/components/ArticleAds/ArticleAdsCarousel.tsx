import { Carousel } from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'
import { ArticleAdsCarouselProps } from './types'

export function ArticleAdsCarousel({ children }: ArticleAdsCarouselProps) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          playOnInit: true,
          delay: 5000 + Math.random() * 2 * 1000,
        }),
      ]}
    >
      {children}
    </Carousel>
  )
}
