import { ImageDetailDialog } from '@/features/shared/components/ImageDetailDialog'
import { GalleryImageProps } from './types'
import { ImageExtraContentButton } from './ImageExtraContentButton'

export function GalleryImage({ link, image, imageWidth, hasValidLink }: GalleryImageProps) {
  return (
    <ImageDetailDialog
      image={image}
      hasValidLink={hasValidLink}
      link={link}
      triggerClassName="group relative overflow-hidden border-2 border-black shadow-[10px_10px_10px_black] hover:border-secondary-blue"
      style={{ width: `${imageWidth}px`, flexShrink: 0 }}
    >
      {image && <ImageExtraContentButton image={image} />}
    </ImageDetailDialog>
  )
}
