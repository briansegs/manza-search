import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'

import { CMSLink } from '@/components/Link'
import { ImageExtraContentButton } from '@/features/articles/components/ArticleImages/ImageExtraContentButton'
import { ImageSectionImageProps } from './types'

export function ImageSectionImage({ hasValidLink, link, image }: ImageSectionImageProps) {
  const content = image ? <RenderMedia media={image} /> : <ImagePlaceholder />

  return (
    <div className="border-content relative h-72 w-96 flex-shrink-0 overflow-hidden rounded-primary">
      {hasValidLink ? <CMSLink {...link}>{content}</CMSLink> : content}

      {image && <ImageExtraContentButton />}
    </div>
  )
}
