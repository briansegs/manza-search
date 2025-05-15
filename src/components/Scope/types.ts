import { Category, Media, Scope } from '@/payload-types'

interface ScopeCategory {
  id: string
  title: string
  slug?: string | null | undefined
}

interface ScopeArticle {
  id: string
  title: string
  heroImage?: string | Media | null | undefined
  categories?: (string | Category)[] | null | undefined
  slug?: string | null | undefined
}

export interface ScopeContentProps {
  categories?: ScopeCategory[]
  articles: ScopeArticle[]
}

export interface ScopeContentItemProps {
  title: string
  slug: string
  media: Media
}

export interface SuggestedArticlesProps {
  articles: Scope['suggestedArticles']
}

export interface TopMenuContainerProps {
  categories: {
    id: string
    title: string
    slug?: string | null | undefined
  }[]
}
