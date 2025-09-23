'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BookCardButton } from '@/features/articles/components/BooksSection/BookCardButton'
import { Chapter } from '@/payload-types'
import { ReaderMenu } from '@/features/bookReader/components/ReaderMenu'
import { ReaderView } from '@/features/bookReader/components/ReaderView'
import { useState } from 'react'
import { cn } from '@/utilities/ui'
import { BookReaderProps } from '../types'

export function BookReader({ content, title, id }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [textEnlarge, setTextEnlarge] = useState(false)

  const { summary, information, authorName, authorImage, chapters, cover } = content

  const pages =
    chapters?.flatMap((chapter) => {
      if (chapter && typeof chapter === 'object' && Array.isArray(chapter.content)) {
        return chapter.content
      }
      return []
    }) ?? []

  const chaptersOnly: Chapter[] = (chapters ?? []).filter(
    (ch): ch is Chapter => typeof ch === 'object' && ch !== null,
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <BookCardButton>QS</BookCardButton>
      </DialogTrigger>

      <DialogContent
        closeButtonStyles="text-white"
        className={cn(
          'flex flex-col border-4 border-black bg-primary-blue font-serif',
          'h-full lg:h-[95%]',
          'max-w-full lg:max-w-[600px] 3xl:max-w-[700px]',
          'p-2 sm:p-6',
        )}
      >
        <DialogTitle className="px-4 text-3xl capitalize text-white">{title}</DialogTitle>

        <ReaderMenu
          id={id}
          title={title}
          authorName={authorName}
          authorImage={authorImage}
          summary={summary}
          information={information}
          chapters={chaptersOnly}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          setTextEnlarge={setTextEnlarge}
          textEnlarge={textEnlarge}
        />

        <ReaderView
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
          cover={cover}
          textEnlarge={textEnlarge}
        />
      </DialogContent>
    </Dialog>
  )
}
