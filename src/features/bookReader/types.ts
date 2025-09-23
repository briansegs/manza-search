import { Book, Chapter } from '@/payload-types'
import { Dispatch, RefObject, SetStateAction } from 'react'

type PageState = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

type TextEnlargeState = {
  textEnlarge: boolean
  setTextEnlarge: Dispatch<SetStateAction<boolean>>
}

type BookContent = NonNullable<Book['content']>

type Page = NonNullable<Chapter['content']>[number]

type BookNavigationState = {
  pages: Page[]
  chapters: Chapter[]
}

type BookAuthor = Pick<BookContent, 'authorName' | 'authorImage'>
type BookSummary = Pick<BookContent, 'summary'>
type BookInfo = Pick<BookContent, 'information'>
type BookCover = Pick<BookContent, 'cover'>
type BookIdentification = Pick<Book, 'title' | 'id'>

export type BookReaderProps = BookIdentification & {
  content: BookContent
}

export type ReaderMenuProps = PageState &
  TextEnlargeState &
  BookAuthor &
  BookSummary &
  BookInfo &
  BookNavigationState &
  BookIdentification

export type ReaderMobileMenuProps = Omit<ReaderMenuProps, 'authorName' | 'authorImage'>

export type ReaderMenuAuthorBadgeProps = BookAuthor

export type ReaderMenuBookmarkDropdownProps = PageState

export type ReaderMenuInformationPopoverProps = BookInfo

export type ReaderMenuPageSelectProps = PageState & BookNavigationState

export type ReaderMenuSummaryPopoverProps = BookSummary

export type ReaderMenuTextEnlargeButtonProps = TextEnlargeState

export type ReaderNextPageButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void
  disabled: boolean
}

export type ReaderViewProps = PageState &
  BookCover &
  Pick<TextEnlargeState, 'textEnlarge'> &
  Pick<BookNavigationState, 'pages'>

export type ViewMobileButtonsProps = Omit<ReaderViewProps, 'cover' | 'textEnlarge'> & {
  viewRef: RefObject<HTMLDivElement | null>
}
