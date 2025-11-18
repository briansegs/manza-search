import { Article, ArticleMedia, Book } from '@/payload-types'
import { FiloActions } from '@/stores/filoStore'
import { Doc } from 'convex/_generated/dataModel'

export type ArticleWithType = Article & {
  type: 'article'
}

export type ArticleMediaWithType = ArticleMedia & {
  type: 'image'
}

export type BookWithType = Book & {
  type: 'book'
}

type TabsNames = 'pin' | 'save' | 'history' | 'lists'

export type FiloContent = ArticleWithType | ArticleMediaWithType | BookWithType

export type FiloContentCardProps = {
  content: FiloContent
  removeFn?: (args: { contentId: string }) => Promise<void> | null
  pending?: boolean
  name?: string
}

export type FiloListCardProps = {
  content: FiloContent
  removeFn?: (args: { contentId: string; listId?: string }) => Promise<void> | null
  pending?: boolean
  name?: string
  groupId: string
}

export type handleRemoveSaveProps = {
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

export type PinButtonAuthenticatedProps = {
  article: Article
}

export type ListedGroup = {
  _id: string
  name: string
  items: FiloContent[]
}

type BaseSection = {
  pending?: boolean
  removeFn?: (args: { contentId: string }) => Promise<void> | null
}

type PinSection = BaseSection & {
  name: 'pin'
  content: FiloContent[]
}

type SaveSection = BaseSection & {
  name: 'save'
  content: FiloContent[]
}

type ListSection = {
  name: 'lists'
  content: ListedGroup[]
  removeFn?: (args: { contentId: string; listId?: string }) => Promise<void> | null
  pending: boolean
}

export type HistoryContent = Doc<'history'> & { article?: Article }

type HistorySection = BaseSection & {
  name: 'history'
  content: HistoryContent[]
  removeFn?: (args: { visitId: string }) => Promise<void> | null
  pending: boolean
}

type Section = PinSection | SaveSection | ListSection | HistorySection

export type FiloTabsProps = {
  sections: Section[]
  defaultSection: TabsNames
  isPending: boolean
}

export type FiloListHeaderProps = {
  group: ListedGroup
}

export type FiloRemoveListButtonProps = {
  group: ListedGroup
}

export type FiloHistoryCardProps = {
  index: number
  section: HistorySection
  historyContent: HistoryContent
}

export type FiloClearHistoryButtonProps = {
  disabled: boolean
}
