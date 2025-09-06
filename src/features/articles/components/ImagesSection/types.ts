import { ArticleMedia } from '@/payload-types'
import { CMSLinkType } from '@/components/Link'

export type ImageSectionImageProps = {
  hasValidLink: boolean
  link?: CMSLinkType
  image?: string | null | ArticleMedia
}

export type ArticleImagesLinkProps = { slug: string }
