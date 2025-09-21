'use client'

import { useReadMode } from '@/providers/ReadModeProvider'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import TitleBar from '../../TitleBar'
import { ResourceWithSlug } from '../types'
import { Article } from '@/payload-types'
import { isValidLink } from '@/utilities/isValidLink'
import { ArticleBooksLink } from '@/features/articles/components/BooksSection/ArticleBooksLink'
import { BookCard } from '@/features/articles/components/BooksSection/BookCard'

type BooksClientProps = ResourceWithSlug & {
  books: Article['books']
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

                const { title, content, meta, id } = book

                const { cover } = content

                const { shop = {}, price = 0 } = meta || {}

                const coverImage = cover ? <RenderMedia media={cover} /> : <ImagePlaceholder />

                const hasValidLink =
                  (shop?.link && shop.link.type && isValidLink(shop.link)) || false

                return (
                  <BookCard
                    key={id}
                    shop={shop}
                    hasValidLink={hasValidLink}
                    coverImage={coverImage}
                    title={title}
                    price={price}
                    content={content}
                  />
                )
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
