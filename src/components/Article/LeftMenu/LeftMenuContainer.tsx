import React from 'react'
import { Article } from '@/payload-types'
import LeftMenu from '.'
import getAuthorList from '@/utilities/getAuthorList'
import getSectionTitles from '@/utilities/getSectionTitles'

interface LeftMenuContainerProps {
  article: Article
}

const LeftMenuContainer: React.FC<LeftMenuContainerProps> = ({ article }) => {
  const { populatedAuthors, externalAuthors, otherVerifiedSources, layout } = article

  const authorList = getAuthorList({ populatedAuthors, externalAuthors })

  const sectionTitles = getSectionTitles({ layout })

  return (
    <div className="bg-menu sticky top-0 hidden h-[650px] w-28 flex-col rounded-r-xl border-4 border-black py-4 hover:bg-black lg:flex">
      <LeftMenu
        authors={authorList}
        otherVerifiedSources={otherVerifiedSources}
        sectionTitles={sectionTitles}
      />
    </div>
  )
}

export default LeftMenuContainer
