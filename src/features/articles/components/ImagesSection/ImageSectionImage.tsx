import { ImageDetailDialog } from '@/features/shared/components/ImageDetailDialog'
import { ImageExtraContentButton } from '@/features/articles/components/ArticleImages/ImageExtraContentButton'
import { ImageSectionImageProps } from './types'

export function ImageSectionImage({ hasValidLink, link, image }: ImageSectionImageProps) {
  return (
    <ImageDetailDialog
      image={image}
      hasValidLink={hasValidLink}
      link={link}
      triggerClassName="border-content relative h-72 w-96 flex-shrink-0 overflow-hidden rounded-primary"
    >
      {image && <ImageExtraContentButton image={image} />}
    </ImageDetailDialog>
  )
}
