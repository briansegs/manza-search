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

type BookType = {
  book: Book
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

export type BookReaderProps = BookType

export type ReaderMenuProps = PageState & TextEnlargeState & BookType

export type ReaderMobileMenuProps = ReaderMenuProps & BookNavigationState

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

export type ReaderViewProps = PageState & Pick<TextEnlargeState, 'textEnlarge'> & BookType

export type ViewMobileButtonsProps = PageState &
  Pick<BookNavigationState, 'pages'> & {
    viewRef: RefObject<HTMLDivElement | null>
  }
