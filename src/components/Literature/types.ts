import { Literature } from '@/payload-types'

export interface SuggestedArticlesProps {
  articles: Literature['suggestedArticles']
}

export interface LiteratureHeroProps {
  ads: Literature['pageAds']
}
