'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { FiloClearHistoryButton } from '@/features/filo/FiloClearHistoryButton'
import { useFiloContent } from '@/features/filo/useFiloContent'
import { HistoryContent } from '@/features/filo/types'
import { FiloHistoryCard } from '@/features/filo/FiloHistoryCard'
import { ArticleMenuButton } from '../articles/components/ArticleMenuButton'

export function HistoryButtonAuthenticated() {
  const { sections } = useFiloContent()

  const history = sections.find((section) => section.name === 'history')

  const hasHistory = history?.content?.length !== 0

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ArticleMenuButton disabled={!hasHistory}>History</ArticleMenuButton>
      </PopoverTrigger>

      <PopoverContent className="custom-scrollbar flex max-h-[560px] w-full max-w-lg flex-col gap-2 overflow-y-scroll border-2 border-black bg-menu p-4 text-white sm:p-6">
        <div className="w-full space-y-2">
          <div className="mb-2 flex justify-center">
            <FiloClearHistoryButton disabled={!hasHistory} />
          </div>

          {history?.content.map((content, index) => {
            const historyContent = content as HistoryContent

            return (
              <FiloHistoryCard
                key={historyContent._id}
                index={index}
                historyContent={historyContent}
                section={history}
              />
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
