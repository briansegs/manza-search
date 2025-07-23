import { cn } from '@/utilities/ui'
import React from 'react'
import { ScopeContentProps, SectionItemProps } from '../types'
import { ScopeContentItem } from './ScopeContentItem'
import { ScopeContentContainer } from './ScopeContentContainer'
import { Separator } from '@/components/ui/separator'

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="ml-0 text-center font-serif text-5xl lg:ml-40 lg:text-left">{title}</h2>
)

const SectionItem = ({ category, articles }: SectionItemProps) => {
  return (
    <ScopeContentContainer slug={category.slug || ''} title={category.title} key={category.id}>
      {articles.map(
        ({ id, title, slug: articleSlug, heroImage }) =>
          heroImage &&
          typeof heroImage === 'object' && (
            <ScopeContentItem media={heroImage} slug={articleSlug || ''} title={title} key={id} />
          ),
      )}
    </ScopeContentContainer>
  )
}

export function ScopeContent({ sectionData, articles, categories }: ScopeContentProps) {
  const miscArticles = articles.filter((article) => !article.categories)

  const categoriesWithOutTopic = categories.filter((category) => !category.Topic)

  const miscCategoriesArticles = categoriesWithOutTopic.map((category) => {
    const categoryArticles = articles.filter((article) =>
      article?.categories?.some((c) => typeof c !== 'string' && c.id === category.id),
    )

    return {
      category,
      articles: categoryArticles,
    }
  })

  const isMiscContent =
    (miscArticles && miscArticles?.length > 0) ||
    (miscCategoriesArticles && miscCategoriesArticles?.length > 0)

  if ((!sectionData || sectionData?.length === 0) && !isMiscContent) {
    return <NoContent />
  }

  return (
    <div className="mt-6 space-y-4">
      {sectionData?.length > 0 &&
        sectionData?.map((data, index) => {
          if (!data) return null
          const { topic, articlesByCategory } = data

          const hasArticles = articlesByCategory.some(({ articles }) => articles.length > 0)

          if (articlesByCategory.length === 0 || !hasArticles) return null

          return (
            <div key={topic.slug}>
              <SectionTitle title={topic.title} />

              <div
                className={cn(
                  'flex w-full flex-wrap justify-center gap-12',
                  'mt-4 px-2',
                  'lg:px-32',
                )}
              >
                {articlesByCategory.map(({ category, articles }) => {
                  if (!articles || articles.length === 0) return null

                  return <SectionItem key={category.id} category={category} articles={articles} />
                })}
              </div>

              <Separator
                className={cn('mx-auto mt-12 w-[90%] bg-primary', {
                  hidden: index === sectionData.length - 1 && !isMiscContent,
                })}
              />
            </div>
          )
        })}

      {isMiscContent && (
        <>
          <SectionTitle title="Miscellaneous" />

          <div
            id="misc"
            className={cn('flex w-full flex-wrap justify-center gap-12', 'mt-4 px-2', 'lg:px-32')}
          >
            {miscCategoriesArticles?.length > 0 &&
              miscCategoriesArticles?.map(({ category, articles }) => {
                if (!articles || articles.length === 0) return null

                return <SectionItem key={category.id} category={category} articles={articles} />
              })}

            {miscArticles?.length > 0 && (
              <ScopeContentContainer title="Miscellaneous Articles" slug="">
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
            )}
          </div>
        </>
      )}
    </div>
  )
}
