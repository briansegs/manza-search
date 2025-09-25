'use client'

import { useReadMode } from '@/providers/ReadModeProvider'

import TitleBar from '../../TitleBar'
import { ResourceWithSlug } from '../types'
import { Book } from '@/payload-types'
import { ArticleBooksLink } from '@/features/articles/components/BooksSection/ArticleBooksLink'
import { BookCard } from '@/features/articles/components/BooksSection/BookCard'

type BooksClientProps = ResourceWithSlug & {
  books: (string | Book)[]
}

export function BooksClient(props: BooksClientProps) {
  const { readMode } = useReadMode()

  const { title, books, slug } = props

  const allBooksAreIds = books?.every((book) => typeof book === 'string')

  if (readMode) return null

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content relative w-full">
        {books && books.length > 0 && (
          <div className="absolute right-0 top-0">
            <ArticleBooksLink slug={slug} />
          </div>
        )}

        <div className="custom-scrollbar overflow-x-auto pb-4 pt-8 sm:pb-8">
          <div className="mx-auto flex w-fit gap-8 px-4 xl:px-16">
            {books && books.length > 0 && !allBooksAreIds ? (
              books.map((book) => {
                if (typeof book === 'string') return null

                return <BookCard key={book.id} book={book} />
              })
            ) : (
              <div className="py-4 text-center">No books available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
