import { Article, ArticleMedia, Book } from '@/payload-types'
import { FiloActions } from '@/stores/filoStore'

export type ArticleWithType = Article & {
  type: 'article'
}

export type ArticleMediaWithType = ArticleMedia & {
  type: 'image'
}

export type BookWithType = Book & {
  type: 'book'
}

export type FiloContent = ArticleWithType | ArticleMediaWithType | BookWithType

export type FiloContentCardProps = {
  content: FiloContent
}

export type FiloDialogHeaderProps = Pick<FiloActions, 'setOpen'>

export type RemoveFiloItemButtonProps = {
  onClick: () => void
  disabled: boolean
}

export type SaveButtonAuthenticatedProps = {
  article: Article
}
