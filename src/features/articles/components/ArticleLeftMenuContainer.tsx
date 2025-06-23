import React from 'react'
import { ArticleLeftMenu } from './ArticleLeftMenu'
import getAuthorList from '@/utilities/getAuthorList'
import getSectionTitles from '@/utilities/getSectionTitles'
import { ArticleLeftMenuContainerProps } from '../types'

export function ArticleLeftMenuContainer({ article }: ArticleLeftMenuContainerProps) {
  const { populatedAuthors, externalAuthors, otherVerifiedSources, layout } = article

  const authorList = getAuthorList({ populatedAuthors, externalAuthors })

  const sectionTitles = getSectionTitles({ layout })

  return (
    <div className="sticky top-0 hidden h-[650px] w-28 flex-col rounded-r-xl border-4 border-black bg-menu py-4 hover:bg-black lg:flex">
      <ArticleLeftMenu
        authors={authorList}
        otherVerifiedSources={otherVerifiedSources}
        sectionTitles={sectionTitles}
      />
    </div>
  )
}
