import { cn } from '@/utilities/ui'
import React from 'react'
import { ScopeContentProps } from '../types'
import { ScopeContentItem } from './ScopeContentItem'
import { ScopeContentContainer } from './ScopeContentContainer'

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

export function ScopeContent({ categories, articles }: ScopeContentProps) {
  const miscArticles = articles.filter((article) => !article.categories)

  if (!categories || (categories?.length === 0 && !miscArticles) || miscArticles?.length === 0) {
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
      {categories && categories.length > 0
        ? categories?.map((category) => {
            const { id, title, slug } = category

            const categoryArticles = articles.filter((article) => {
              if (article.categories) {
                return article.categories?.some((category) =>
                  typeof category !== 'string' ? category.slug === slug : false,
                )
              }

              return false
            })

            return categoryArticles ? (
              <ScopeContentContainer slug={slug || ''} title={title} key={id}>
                {categoryArticles.map(
                  ({ id, title, slug: articleSlug, heroImage }) =>
                    heroImage &&
                    typeof heroImage === 'object' && (
                      <ScopeContentItem
                        media={heroImage}
                        slug={articleSlug ? articleSlug : ''}
                        title={title}
                        key={id}
                      />
                    ),
                )}
              </ScopeContentContainer>
            ) : null
          })
        : null}

      {miscArticles && miscArticles.length > 0 ? (
        <ScopeContentContainer title="Miscellaneous" slug="misc">
          {miscArticles.map(
            ({ id, title, slug: articleSlug, heroImage }) =>
              heroImage &&
              typeof heroImage === 'object' && (
                <ScopeContentItem
                  media={heroImage}
                  slug={articleSlug ? articleSlug : ''}
                  title={title}
                  key={id}
                />
              ),
          )}
        </ScopeContentContainer>
      ) : null}
    </div>
  )
}
