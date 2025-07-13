import { ReactNode } from 'react'
import { Article, Category, Media, Topic } from '@/payload-types'

type ScopeCategory = Pick<Category, 'id' | 'title' | 'slug' | 'Topic'>

type ScopeArticle = Pick<Article, 'id' | 'title' | 'heroImage' | 'categories' | 'slug'>

export type ScopeContentProps = {
  sectionData: ({
    topic: Topic
    articlesByCategory: {
      category: {
        id: string
        title: string
        slug?: string | null | undefined
      }
      articles: ScopeArticle[]
    }[]
  } | null)[]
  articles: ScopeArticle[]
  categories: ScopeCategory[]
}

export type ScopeContentItemProps = {
  title: string
  slug: string
  media: Media
}

export type TopMenuContainerProps = {
  categories: ScopeCategory[]
}

export type LeftMenuProps = {
  categories: ScopeCategory[]
}

export type LeftMenuContainerProps = {
  categories: ScopeCategory[]
}

export type ScopeContentContainerProps = {
  slug: string
  title: string
  children: ReactNode
}
