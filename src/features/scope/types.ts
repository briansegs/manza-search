import { ReactNode } from 'react'
import { Article, Category, Media, Topic } from '@/payload-types'

type ScopeCategory = Pick<Category, 'id' | 'title' | 'slug' | 'Topic'>

type ScopeArticle = Pick<Article, 'id' | 'title' | 'heroImage' | 'categories' | 'slug'>

type MenuData = {
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
}

export type ScopeContentProps = MenuData & {
  articles: ScopeArticle[]
  categories: ScopeCategory[]
}

export type ScopeContentItemProps = {
  title: string
  slug: string
  media: Media
}

export type TopMenuContainerProps = MenuData

export type LeftMenuProps = MenuData

export type LeftMenuContainerProps = MenuData

export type ScopeContentContainerProps = {
  slug: string
  title: string
  children: ReactNode
}
