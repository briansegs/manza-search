import { Article, ArticleMedia, Book } from '@/payload-types'

type ListItem = {
  content: Article | ArticleMedia | Book
  contentType: 'article' | 'image' | 'book'
}

export type ListButtonProps = ListItem

export type ListsButtonAuthenticatedProps = ListItem & {
  children: React.ReactNode
}
