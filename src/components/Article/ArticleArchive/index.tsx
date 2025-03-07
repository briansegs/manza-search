import { cn } from '@/utilities/ui'
import React from 'react'

import { ArticleCard, CardArticleData } from '../ArticleCard'

export type Props = {
  articles: CardArticleData[]
}

export const ArticleArchive: React.FC<Props> = (props) => {
  const { articles } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="flex flex-col gap-6">
          {(!articles || articles.length === 0) && (
            <p className="text-gray-500">No articles found</p>
          )}
          {articles?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  <ArticleCard doc={result} relationTo="articles" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
