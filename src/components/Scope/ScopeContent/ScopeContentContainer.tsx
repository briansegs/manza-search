import React from 'react'
import { ScopeContentContainerProps } from '../types'
import { cn } from '@/utilities/ui'
import ScopeContentItem from './ScopeContentItem'

const ScopeContentContainer: React.FC<ScopeContentContainerProps> = ({ slug, title, articles }) => (
  <div
    id={slug}
    className={cn(
      'h-80 w-96',
      'bg-primary-blue',
      'rounded-[10px] border-2 border-black',
      'space-y-12',
    )}
  >
    <div className="flex justify-center">
      <div
        className={cn(
          'border-x-[1px] border-b-[1px] border-white',
          'bg-black',
          'font-serif text-white',
          'px-2',
        )}
      >
        {title}
      </div>
    </div>

    <div className="flex w-full flex-wrap justify-center gap-4 px-8">
      {articles.map(
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
    </div>
  </div>
)

export default ScopeContentContainer
