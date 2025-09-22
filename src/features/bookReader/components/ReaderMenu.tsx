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

export function ReaderMenu({
  authorName,
  authorImage,
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
      <ReaderMenuAuthorBadge authorName={authorName} authorImage={authorImage} />

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
