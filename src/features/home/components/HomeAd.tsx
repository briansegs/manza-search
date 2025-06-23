import React from 'react'
import { CMSLink } from '../../../components/Link'
import { cn } from '@/utilities/ui'
import { isValidLink } from '@/utilities/isValidLink'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { HomeAdProps } from '../types'
import { RenderMedia } from '@/features/shared/components/RenderMedia'

export function HomeAd({ enableLink, link, media }: HomeAdProps) {
  const hasValidLink = isValidLink(link)

  return (
    <div
      className={cn(
        'relative mt-4 h-[588px] w-52 self-center border-2 border-black',
        'xl:mt-20 xl:self-start',
      )}
    >
      {hasValidLink && enableLink ? (
        <CMSLink {...link}>{media ? <RenderMedia media={media} /> : <ImagePlaceholder />}</CMSLink>
      ) : media ? (
        <RenderMedia media={media} />
      ) : (
        <ImagePlaceholder />
      )}
    </div>
  )
}
