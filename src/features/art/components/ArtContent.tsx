import { cn } from '@/utilities/ui'
import React from 'react'
import PageContentContainer from '@/components/PageContentContainer'
import { ArtContentItem } from './ArtContentItem'
import { ArtContentProps } from '../types'

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

export function ArtContent({ content }: ArtContentProps) {
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
        const { id, title, slug, artWork } = category

        return (
          <PageContentContainer key={id} slug={slug ?? ''} title={title}>
            {artWork.map(
              ({ title, artWorkImage, slug }) =>
                artWorkImage &&
                typeof artWorkImage === 'object' && (
                  <ArtContentItem
                    artWorkImage={artWorkImage}
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
