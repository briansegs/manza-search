import { Article, ArticleMedia } from '@/payload-types'

export type ArticleImage = Article['images']

export type ArticleImageItem = NonNullable<ArticleImage>[number]

export type ArticleMediaOnly = Extract<ArticleImageItem['image'], ArticleMedia>

export type ImageGalleryProps = {
  images: ArticleImage
  tabTitle: string
}

export type RelatedImagesProps = {
  images: Omit<Article['relatedImages'], 'title' | 'updatedAt' | 'createdAt'>
}

export type ArticleImageGalleryProps = {
  externalImages: ArticleImage
  internalImages: ArticleImage
}

export type GalleryImageProps = Pick<ArticleImageItem, 'link' | 'enableLink'> & {
  image: ArticleMediaOnly | undefined
  imageWidth: number
  hasValidLink: boolean
}
