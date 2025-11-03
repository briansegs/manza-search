import { Article, ArticleMedia, Book } from '@/payload-types'
import { Dispatch, SetStateAction } from 'react'

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

export type FiloDialogHeaderProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export type RemoveFiloItemButtonProps = {
  onClick: () => void
  disabled: boolean
}

export type SaveButtonAuthenticatedProps = {
  article: Article
}
