import { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

export type UseAutoplayType = {
  autoplayIsPlaying: boolean
  toggleAutoplay: () => void
  onAutoplayButtonClick: (callback: () => void) => void
  hasAutoplay: boolean
}

export const useAutoplay = (emblaApi: EmblaCarouselType | undefined): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false)

  const autoplay = emblaApi?.plugins()?.autoplay
  const hasAutoplay = Boolean(autoplay)

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      if (!autoplay) return

      const resetOrStop =
        autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop

      resetOrStop()
      callback()

      setTimeout(() => {
        autoplay.play()
      }, 5000)
    },
    [autoplay],
  )

  const toggleAutoplay = useCallback(() => {
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [autoplay])

  useEffect(() => {
    if (!autoplay) return

    setAutoplayIsPlaying(autoplay.isPlaying())
    emblaApi
      .on('autoplay:play', () => setAutoplayIsPlaying(true))
      .on('autoplay:stop', () => setAutoplayIsPlaying(false))
      .on('reInit', () => setAutoplayIsPlaying(autoplay.isPlaying()))
  }, [emblaApi, autoplay])

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick,
    hasAutoplay,
  }
}
