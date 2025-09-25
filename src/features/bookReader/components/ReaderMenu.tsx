import { ReaderMenuPageSelect } from './ReaderMenuPageSelect'
import { ReaderMenuSummaryPopover } from './ReaderMenuSummaryPopover'
import { ReaderMenuAuthorBadge } from './ReaderMenuAuthorBadge'
import { ReaderMenuTextEnlargeButton } from './ReaderMenuTextEnlargeButton'
import { ReaderMenuBookmarkDropdown } from './ReaderMenuBookmarkDropdown'
import { ReaderMenuInformationPopover } from './ReaderMenuInformationPopover'
import { ReaderDownloadButton } from './ReaderDownloadButton'
import { Menu } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ReaderMenuProps, ReaderMobileMenuProps } from '../types'
import { Chapter } from '@/payload-types'
import { getBookPages } from '../getBookPages'

export function ReaderMenu({
  book,
  currentPage,
  setCurrentPage,
  textEnlarge,
  setTextEnlarge,
}: ReaderMenuProps) {
  const { content } = book

  const { summary, information, authorName, authorImage, chapters } = content || {}

  const pages = getBookPages(chapters || [])

  const chaptersOnly: Chapter[] = (chapters ?? []).filter(
    (ch): ch is Chapter => typeof ch === 'object' && ch !== null,
  )

  return (
    <div
      className="flex w-full items-center justify-between gap-2 rounded-lg bg-black p-3"
      onFocusCapture={(e) => {
        // Prevent focus events from bubbling up to parent components
        e.stopPropagation()
      }}
    >
      <ReaderMenuAuthorBadge authorName={authorName} authorImage={authorImage} />

      <div className="hidden w-full justify-between gap-2 sm:flex">
        <ReaderMenuSummaryPopover summary={summary} />

        <ReaderMenuInformationPopover information={information} />

        <ReaderMenuPageSelect
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          chapters={chaptersOnly}
        />

        <ReaderMenuBookmarkDropdown currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <ReaderMenuTextEnlargeButton textEnlarge={textEnlarge} setTextEnlarge={setTextEnlarge} />

        <ReaderDownloadButton book={book} />
      </div>

      <div className="sm:hidden">
        <ReaderMobileMenu
          book={book}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          chapters={chaptersOnly}
          textEnlarge={textEnlarge}
          setTextEnlarge={setTextEnlarge}
        />
      </div>
    </div>
  )
}

export function ReaderMobileMenu({
  book,
  currentPage,
  setCurrentPage,
  pages,
  chapters,
  textEnlarge,
  setTextEnlarge,
}: ReaderMobileMenuProps) {
  const { content } = book

  const { summary, information } = content || {}

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
          <ReaderDownloadButton book={book} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
