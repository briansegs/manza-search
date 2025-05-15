import { cn } from '@/utilities/ui'
import React from 'react'
import PageContentContainer from '@/components/PageContentContainer'
import LiteratureContentItem from './LiteratureContentItem'

export interface Book {
  slug: string
  title: string
  bookImage: { media: null }
}

export interface LiteratureCategory {
  slug: string
  title: string
  id?: string
  books: Book[]
}

interface LiteratureContentProps {
  content: LiteratureCategory[] | null | undefined
}

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

const LiteratureContent: React.FC<LiteratureContentProps> = ({ content }) => {
  if (!content) {
    return <NoContent />
  }

  return (
    <div
      className={cn(
        'flex w-full flex-wrap justify-center gap-12',
        'mt-1 px-2',
        'lg:mt-12 lg:px-32',
      )}
    >
      {content.map((category) => {
        const { id, title, slug, books } = category

        return (
          <PageContentContainer key={id} slug={slug} title={title}>
            {books.map(
              ({ title, bookImage, slug }) =>
                bookImage &&
                typeof bookImage === 'object' && (
                  <LiteratureContentItem
                    bookImage={bookImage}
                    title={title}
                    slug={slug}
                    key={slug}
                  />
                ),
            )}
          </PageContentContainer>
        )
      })}
    </div>
  )
}

export default LiteratureContent
