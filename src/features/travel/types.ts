import { Article, Media, Travel } from '@/payload-types'
import { ReactNode } from 'react'

export type TravelHeroProps = {
  images: Travel['heroImages']
}

export type TravelCategory = {
  title: string
  slug: string
  articles: Article[]
}

export type TravelAd = {
  title: string
  slug: string
  ad: { media: Media }
}

export type TravelContentBlock = TravelCategory | TravelAd

export type TravelContentProps = {
  content: TravelCategory[] | null | undefined
  adImages: Travel['adImages']
}

export type TravelContentContainerProps = {
  slug: string
  title: string
  children: ReactNode
  ad: { media: Media } | undefined
}

export type TravelContentItem = Pick<Article, 'title' | 'heroImage' | 'slug'>
