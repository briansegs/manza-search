'use client'

import { Bookmark } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { ReaderMenuButton } from '@/features/bookReader/components/ReaderMenuButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utilities/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export type ReaderMenuBookmarkDropdownProps = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export function ReaderMenuBookmarkDropdown({
  currentPage,
  setCurrentPage,
}: ReaderMenuBookmarkDropdownProps) {
  const [bookmarkedPage, setBookmarkedPage] = useState<null | number>(null)

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <ReaderMenuButton>
              <Bookmark className={cn(bookmarkedPage !== null && 'fill-red-400')} />
            </ReaderMenuButton>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>Bookmark</TooltipContent>
      </Tooltip>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          {bookmarkedPage !== null
            ? bookmarkedPage === 0
              ? 'Cover'
              : `Page: ${bookmarkedPage}`
            : ''}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setBookmarkedPage(currentPage)}>
          Set Bookmark
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={bookmarkedPage === null}
          onClick={() => setBookmarkedPage(null)}
        >
          Remove Bookmark
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={bookmarkedPage === null}
          onClick={() => {
            if (bookmarkedPage !== null) setCurrentPage(bookmarkedPage)
          }}
        >
          Go to Bookmark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
