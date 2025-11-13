import { Article } from '@/payload-types'

export type ArticleTopMenuProps = {
  styles?: string
  article: Article
}

export type PinButtonProps = {
  article: Article
}

export type SaveButtonProps = {
  article: Article
}
