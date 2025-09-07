import { Img, Article, Category } from '@/payload-types'

type ImgArticleGroup = {
  category: Pick<Category, 'title' | 'slug' | 'id'>
  articles: Article[]
}

export type ImgContentItemProps = Pick<Article, 'title' | 'heroImage' | 'slug'>

export type ImgHeroProps = {
  ads: Img['pageAds']
}

export type ImgContentProps = {
  articlesByTopic?: ImgArticleGroup[]
}
