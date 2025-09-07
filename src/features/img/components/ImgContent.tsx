import { cn } from '@/utilities/ui'
import React from 'react'
import { PageContentContainer } from '@/features/shared/components/PageContentContainer'
import { ImgContentItem } from './ImgContentItem'
import { ImgContentProps } from '../types'

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

export function ImgContent({ articlesByCategory }: ImgContentProps) {
  if (!articlesByCategory || articlesByCategory.length === 0) {
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
      {articlesByCategory?.map(({ articles, category }) => {
        if (!category || articles.length === 0) return null

        const { id, title, slug } = category

        return (
          <PageContentContainer key={id} slug={slug ?? ''} title={title}>
            {articles.map(({ title, heroImage, slug }) => (
              <ImgContentItem heroImage={heroImage} title={title} slug={slug} key={slug} />
            ))}
          </PageContentContainer>
        )
      })}
    </div>
  )
}
