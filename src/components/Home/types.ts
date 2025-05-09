import { Article, Home, HomeMedia, Page } from '@/payload-types'

export interface HomeAdProps {
  media?: (string | null) | HomeMedia
  enableLink?: boolean | null
  link?: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?:
      | ({
          relationTo: 'pages'
          value: string | Page
        } | null)
      | ({
          relationTo: 'articles'
          value: string | Article
        } | null)
    url?: string | null
  }
}

export interface SuggestedArticlesProps {
  articles: Home['suggestedArticles']
}
