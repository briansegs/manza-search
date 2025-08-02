import { Article } from '@/payload-types'

export type SearchArticleCardData = Pick<
  Article,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'updatedAt'
> & {
  authors: {
    id: string
    name: string
  }[]
}

export type SearchCardProps = {
  doc?: SearchArticleCardData
}

export type SearchListProps = {
  articles: SearchArticleCardData[]
}
