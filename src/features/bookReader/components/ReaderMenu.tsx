import { Book, Chapter } from '@/payload-types'
import { Dispatch, SetStateAction } from 'react'

import { ReaderMenuPageSelect } from './ReaderMenuPageSelect'
import { ReaderMenuSummaryPopover } from './ReaderMenuSummaryPopover'
import { ReaderMenuAuthorBadge } from './ReaderMenuAuthorBadge'
import { ReaderMenuTextEnlargeButton } from './ReaderMenuTextEnlargeButton'
import { ReaderMenuBookmarkDropdown } from './ReaderMenuBookmarkDropdown'
import { ReaderMenuInformationPopover } from './ReaderMenuInformationPopover'
import { ReaderDownloadButton } from './ReaderDownloadButton'
import { Menu } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type Page = NonNullable<Chapter['content']>[number]

type ReaderMenuProps = Omit<Book['content'], 'cover' | 'chapters'> & {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  pages: Page[]
  chapters: Chapter[]
  textEnlarge: boolean
  setTextEnlarge: Dispatch<SetStateAction<boolean>>
}

export function ReaderMenu({
  author,
  summary,
  information,
  currentPage,
  setCurrentPage,
  pages,
  chapters,
  textEnlarge,
  setTextEnlarge,
}: ReaderMenuProps) {
  return (
    <div
      className="flex w-full items-center justify-between gap-2 rounded-lg bg-black p-3"
      onFocusCapture={(e) => {
        // Prevent focus events from bubbling up to parent components
        e.stopPropagation()
      }}
    >
      <ReaderMenuAuthorBadge author={author} />

      <div className="hidden w-full justify-between gap-2 sm:flex">
        <ReaderMenuSummaryPopover summary={summary} />

        <ReaderMenuInformationPopover information={information} />

        <ReaderMenuPageSelect
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          chapters={chapters}
        />

        <ReaderMenuBookmarkDropdown currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <ReaderMenuTextEnlargeButton textEnlarge={textEnlarge} setTextEnlarge={setTextEnlarge} />

        <ReaderDownloadButton />
      </div>

      <div className="sm:hidden">
        <ReaderMobileMenu
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          chapters={chapters}
          summary={summary}
          information={information}
          textEnlarge={textEnlarge}
          setTextEnlarge={setTextEnlarge}
        />
      </div>
    </div>
  )
}

export type ReaderMobileMenuProps = Omit<ReaderMenuProps, 'author'>

export function ReaderMobileMenu({
  summary,
  information,
  currentPage,
  setCurrentPage,
  pages,
  chapters,
  textEnlarge,
  setTextEnlarge,
}: ReaderMobileMenuProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu className="text-white" />
      </PopoverTrigger>

      <PopoverContent className="space-y-3 border-secondary-blue bg-black">
        <ReaderMenuPageSelect
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          chapters={chapters}
        />

        <div className="flex items-center justify-between">
          <ReaderMenuSummaryPopover summary={summary} />
          <ReaderMenuInformationPopover information={information} />
          <ReaderMenuBookmarkDropdown currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <ReaderMenuTextEnlargeButton textEnlarge={textEnlarge} setTextEnlarge={setTextEnlarge} />
          <ReaderDownloadButton />
        </div>
      </PopoverContent>
    </Popover>
  )
}
