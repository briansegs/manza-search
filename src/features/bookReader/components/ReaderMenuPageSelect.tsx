import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Chapter } from '@/payload-types'
import { Dispatch, SetStateAction } from 'react'

export type PageOnly = NonNullable<Chapter['content']>[number]

export type ReaderMenuPageSelectProps = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  pages: PageOnly[]
  chapters: Chapter[]
}

export function ReaderMenuPageSelect({
  currentPage,
  setCurrentPage,
  pages,
  chapters,
}: ReaderMenuPageSelectProps) {
  return (
    <Select
      value={`Page: ${currentPage}`}
      onValueChange={(value) => {
        const pageNumber = parseInt(value.replace('Page: ', ''), 10)
        setCurrentPage(pageNumber)
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SelectTrigger className="h-8 ring-offset-secondary-blue focus:ring-secondary-blue">
            <SelectValue placeholder={pages.length > 0 ? `Page: ${currentPage}` : 'No pages'} />
          </SelectTrigger>
        </TooltipTrigger>

        <TooltipContent>Page Select</TooltipContent>
      </Tooltip>

      <SelectContent>
        <SelectItem value="Page: 0">Cover</SelectItem>
        {chapters?.map((chapter, chapterIndex) => {
          if (!chapter) return null

          if ('title' in chapter && chapter.title) {
            const pagesBefore =
              chapters
                ?.slice(0, chapterIndex)
                .reduce((sum, ch) => sum + (ch?.content?.length ?? 0), 0) ?? 0

            return (
              <SelectGroup key={chapter.id}>
                <SelectLabel>{chapter.title}</SelectLabel>
                {chapter.content?.map((page, pageIndex) => {
                  const pageNumber = pagesBefore + pageIndex + 1

                  return (
                    <SelectItem key={page.id} value={`Page: ${pageNumber}`}>
                      {`Page: ${pageNumber}`}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            )
          }
        })}
      </SelectContent>
    </Select>
  )
}
