import { Art, Article, Category } from '@/payload-types'

type ArtArticleGroup = {
  category: Pick<Category, 'title' | 'slug' | 'id'>
  articles: Article[]
}

export type ArtContentItemProps = Pick<Article, 'title' | 'heroImage' | 'slug'>

export type ArtHeroProps = {
  ads: Art['pageAds']
}

export type ArtContentProps = {
  articlesByTopic?: ArtArticleGroup[]
  paidTopSpot?: Art['paidTopSpot']
}
