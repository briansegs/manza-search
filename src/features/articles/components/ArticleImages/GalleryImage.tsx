import { CMSLink } from '@/components/Link'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { ArticleMediaOnly, GalleryImageProps } from './types'
import { ImageExtraContentButton } from './ImageExtraContentButton'

export function GalleryImage({
  link,
  enableLink,
  image,
  imageWidth,
  hasValidLink,
}: GalleryImageProps) {
  return (
    <div
      className="group relative overflow-hidden border-2 border-black shadow-[10px_10px_10px_black] hover:border-secondary-blue"
      style={{ width: `${imageWidth}px`, flexShrink: 0 }}
    >
      {hasValidLink && enableLink ? (
        <CMSLink {...link}>
          {image ? <RenderGalleryImage image={image} /> : <ImagePlaceholder />}
        </CMSLink>
      ) : image ? (
        <RenderGalleryImage image={image} />
      ) : (
        <ImagePlaceholder />
      )}

      {image && <ImageExtraContentButton />}
    </div>
  )
}

type RenderGalleryImageProps = {
  image: ArticleMediaOnly
}

function RenderGalleryImage({ image }: RenderGalleryImageProps) {
  return <RenderMedia media={image} className="h-full w-full object-cover" />
}
