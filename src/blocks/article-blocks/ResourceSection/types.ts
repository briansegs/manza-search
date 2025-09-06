import { Article, ResourceSection } from '@/payload-types'

type ExternalImages = Article['outside-images']
type InternalImages = Article['internal-images']

export type ResourceWithSlug = ResourceSection & {
  slug: string
}

export type ImagesClientProps = ResourceWithSlug & {
  imagesData: {
    internalImages: InternalImages
    outsideImages: ExternalImages
  }
}
