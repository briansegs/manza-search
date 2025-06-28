import { Article, Category, Literature } from '@/payload-types'

type LiteratureArticleGroup = {
  category: Pick<Category, 'title' | 'slug' | 'id'>
  articles: Article[]
}

export type LiteratureHeroProps = {
  ads: Literature['pageAds']
}

export type LiteratureContentItemProps = Pick<Article, 'title' | 'heroImage' | 'slug'>

export type LiteratureContentProps = {
  articlesByTopic?: LiteratureArticleGroup[]
  paidTopSpot?: Literature['paidTopSpot']
}
