import { Sound, Article, Category } from '@/payload-types'

export type SoundHeroProps = {
  ads: Sound['pageAds']
}

type SoundArticleGroup = {
  category: Pick<Category, 'title' | 'slug' | 'id'>
  articles: Article[]
}

export type SoundContentItemProps = Pick<Article, 'title' | 'heroImage' | 'slug'>

export type SoundContentProps = {
  articlesByTopic?: SoundArticleGroup[]
  paidTopSpot?: Sound['paidTopSpot']
}
