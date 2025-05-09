import { cn } from '@/utilities/ui'
import React from 'react'
import { ScopeContentProps } from '../types'
import ScopeContentContainer from './ScopeContentContainer'

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

const ScopeContent: React.FC<ScopeContentProps> = ({ categories, articles }) => {
  const miscArticles = articles.filter((article) => !article.categories)

  if (!categories && !miscArticles) {
    return <NoContent />
  }

  if (categories?.length === 0 && miscArticles?.length === 0) {
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
        ? categories?.map((categorie) => {
            const { id, title, slug } = categorie

            const categorieArticles = articles.filter((article) => {
              if (article.categories) {
                return article.categories?.some((categorie) =>
                  typeof categorie !== 'string' ? categorie.slug === slug : false,
                )
              }

              return false
            })

            return categorieArticles ? (
              <ScopeContentContainer
                articles={categorieArticles}
                slug={slug ? slug : ''}
                title={title}
                key={id}
              />
            ) : null
          })
        : null}

      {miscArticles && miscArticles.length > 0 ? (
        <ScopeContentContainer title="Miscellaneous" slug="misc" articles={miscArticles} />
      ) : null}
    </div>
  )
}

export default ScopeContent
