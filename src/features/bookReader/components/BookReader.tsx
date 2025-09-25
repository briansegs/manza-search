'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BookCardButton } from '@/features/articles/components/BooksSection/BookCardButton'
import { ReaderMenu } from '@/features/bookReader/components/ReaderMenu'
import { ReaderView } from '@/features/bookReader/components/ReaderView'
import { useState } from 'react'
import { cn } from '@/utilities/ui'
import { BookReaderProps } from '../types'

export function BookReader({ book }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [textEnlarge, setTextEnlarge] = useState(false)

  const { title } = book

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
          book={book}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTextEnlarge={setTextEnlarge}
          textEnlarge={textEnlarge}
        />

        <ReaderView
          book={book}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          textEnlarge={textEnlarge}
        />
      </DialogContent>
    </Dialog>
  )
}
