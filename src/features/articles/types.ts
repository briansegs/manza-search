import { Article } from '@/payload-types'
import { sectionTitle } from '@/utilities/getSectionTitles'
import { ButtonProps } from '../shared/components/ui/button'
import { ReactNode } from 'react'

export type CardArticleData = Pick<Article, 'slug' | 'meta' | 'title' | 'updatedAt'>

export type ArticleCardProps = {
  alignItems?: 'center'
  className?: string
  doc?: CardArticleData
  relationTo?: 'articles'
  title?: string
  updatedAt?: string
}

export type ArticleArchiveProps = {
  articles: CardArticleData[]
}

export type ArticleLeftMenuProps = Pick<Article, 'otherVerifiedSources'> & {
  authors: string[]
  sectionTitles: sectionTitle[]
}

export interface ArticleLeftMenuContainerProps {
  article: Article
}

export type ArticleMenuButtonProps = ButtonProps & {
  dark?: boolean
}

export type PopoverButtonProps = {
  data?: (string | NonNullable<Article['otherVerifiedSources']>[number] | sectionTitle)[]
  children: ReactNode
  dark?: boolean
}

export type ArticleTopMenuContainerProps = {
  article: Article
  className: string
}

export type RelatedArticlesProps = {
  articles: Article['relatedArticles']
}
