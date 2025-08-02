import { cn } from '@/utilities/ui'
import React from 'react'

import { SearchCard } from './SearchCard'
import { SearchListProps } from '../types'

export function SearchList(props: SearchListProps) {
  const { articles } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="space-y-6">
          {articles?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <SearchCard doc={result} />
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
