import { Article, ArticleMedia } from '@/payload-types'

export type ImageSourceKey = 'outside-images' | 'internal-images'

export type ExternalImages = Article['outside-images']
export type InternalImages = Article['internal-images']

export type GalleryImages = ExternalImages | InternalImages

export type GalleryImageItem = NonNullable<GalleryImages>[number]

export type GalleryMedia = GalleryImageItem['image'] & ArticleMedia

export type GalleryImageWithLink = Extract<GalleryImageItem, { link?: unknown }>

export type ImageGalleryProps = {
  images: GalleryImages
  tabTitle: string
  slug: string
  imagesType: ImageSourceKey
  imageLimit: number
  hasImagesToLoad: boolean
}

export type RelatedImagesProps = {
  images: Omit<Article['relatedImages'], 'title' | 'updatedAt' | 'createdAt'>
}

export type ArticleImageGalleryProps = {
  externalImages: ExternalImages
  internalImages: InternalImages
  hasOutsideImagesToLoad: boolean
  hasInternalImagesToLoad: boolean
  slug: string
  imageLimit: number
}

export type GalleryImageProps = Pick<GalleryImageWithLink, 'link'> & {
  image?: GalleryMedia
  imageWidth: number
  hasValidLink: boolean
}

export type RenderGalleryImageProps = {
  image: GalleryMedia
}

export type ImageExtraContentButtonProps = {
  image: string | null | ArticleMedia
}
