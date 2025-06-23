import { cn } from '@/utilities/ui'
import React from 'react'
import PageContentContainer from '@/components/PageContentContainer'
import { LiteratureContentItem } from './LiteratureContentItem'
import { LiteratureContentProps } from '../types'

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

export function LiteratureContent({ content }: LiteratureContentProps) {
  if (!content || content.length === 0) {
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
