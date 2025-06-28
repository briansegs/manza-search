import { cn } from '@/utilities/ui'
import React from 'react'
import { PageContentContainer } from '@/features/shared/components/PageContentContainer'
import { LiteratureContentItem } from './LiteratureContentItem'
import { LiteratureContentProps } from '../types'

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

export function LiteratureContent({ articlesByTopic, paidTopSpot }: LiteratureContentProps) {
  if (
    (!articlesByTopic || articlesByTopic.length === 0) &&
    (!paidTopSpot || paidTopSpot.length === 0)
  ) {
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
      {paidTopSpot && Array.isArray(paidTopSpot) && paidTopSpot.length > 0 && (
        <PageContentContainer slug="paid-top-spot" title="Paid Top Spot">
          {paidTopSpot.map((article) => {
            if (typeof article === 'string') return null

            const { id, title, slug: articleSlug, meta } = article

            return (
              meta?.image &&
              typeof meta?.image === 'object' && (
                <LiteratureContentItem
                  heroImage={meta?.image}
                  slug={articleSlug ? articleSlug : ''}
                  title={title}
                  key={id}
                />
              )
            )
          })}
        </PageContentContainer>
      )}

      {articlesByTopic?.map(({ articles, category }) => {
        const { id, title, slug } = category

        if (articles.length === 0) return null

        return (
          <PageContentContainer key={id} slug={slug ?? ''} title={title}>
            {articles.map(({ title, heroImage, slug }) => (
              <LiteratureContentItem heroImage={heroImage} title={title} slug={slug} key={slug} />
            ))}
          </PageContentContainer>
        )
      })}
    </div>
  )
}
