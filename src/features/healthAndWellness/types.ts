import { HealthAndWellness, Article, Category } from '@/payload-types'

export type HealthAndWellnessHeroProps = {
  ads: HealthAndWellness['pageAds']
}

type HealthAndWellnessArticleGroup = {
  category: Pick<Category, 'title' | 'slug' | 'id'>
  articles: Article[]
}

export type HealthAndWellnessContentItemProps = Pick<Article, 'title' | 'heroImage' | 'slug'>

export type HealthAndWellnessContentProps = {
  articlesByTopic?: HealthAndWellnessArticleGroup[]
  paidTopSpot?: HealthAndWellness['paidTopSpot']
}
