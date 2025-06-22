import { ReactNode } from 'react'
import { Article, Category, Media } from '@/payload-types'

type ScopeCategory = Pick<Category, 'id' | 'title' | 'slug'>

type ScopeArticle = Pick<Article, 'id' | 'title' | 'heroImage' | 'categories' | 'slug'>

export type ScopeContentProps = {
  categories?: ScopeCategory[]
  articles: ScopeArticle[]
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
