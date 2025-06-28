import { cn } from '@/utilities/ui'
import React from 'react'
import { PageContentContainer } from '@/features/shared/components/PageContentContainer'
import { HealthAndWellnessContentItem } from './HealthAndWellnessContentItem'
import { HealthAndWellnessContentProps } from '../types'

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

export function HealthAndWellnessContent({
  articlesByTopic,
  paidTopSpot,
}: HealthAndWellnessContentProps) {
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

            if (!meta?.image || typeof meta.image !== 'object') {
              return null
            }

            return (
              <HealthAndWellnessContentItem
                heroImage={meta.image}
                slug={articleSlug}
                title={title}
                key={id}
              />
            )
          })}
        </PageContentContainer>
      )}

      {articlesByTopic?.map(({ articles, category }) => {
        if (!category || articles.length === 0) return null

        const { id, title, slug } = category

        return (
          <PageContentContainer key={id} slug={slug ?? ''} title={title}>
            {articles.map(({ title, heroImage, slug }) => (
              <HealthAndWellnessContentItem
                heroImage={heroImage}
                title={title}
                slug={slug}
                key={slug}
              />
            ))}
          </PageContentContainer>
        )
      })}
    </div>
  )
}
