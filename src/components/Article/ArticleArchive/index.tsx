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
          {articles?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="" key={index}>
                  <ArticleCard className="" doc={result} relationTo="articles" showCategories />
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
