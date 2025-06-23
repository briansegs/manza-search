import { Art } from '@/payload-types'
import { Category } from '@/payload-types'

export type ArtHeroProps = {
  ads: Art['pageAds']
}

export type ArtWork = Pick<Category, 'title' | 'slug'> & {
  artWorkImage: { media: null }
}

export type ArtCategory = Pick<Category, 'title' | 'slug' | 'id'> & {
  artWork: ArtWork[]
}

export type ArtContentProps = {
  content: ArtCategory[] | null | undefined
}
