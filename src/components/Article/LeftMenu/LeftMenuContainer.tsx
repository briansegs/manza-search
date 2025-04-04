import React from 'react'
import { Article } from '@/payload-types'
import LeftMenu from '.'
import getAuthorList from '@/utilities/getAuthorList'

interface LeftMenuContainerProps {
  article: Article
}

export interface sectionTitle {
  id?: string | null
  title?: string | null
}

export function getSectionTitles({ layout }: { layout: Article['layout'] }): sectionTitle[] {
  return layout?.map(({ id, title }) => ({ id: id, title: title })) ?? []
}

const LeftMenuContainer: React.FC<LeftMenuContainerProps> = ({ article }) => {
  const { populatedAuthors, externalAuthors, otherVerifiedSources, layout } = article

  const authorList = getAuthorList({ populatedAuthors, externalAuthors })

  const sectionTitles = getSectionTitles({ layout })

  return (
    <div className="sticky top-0 hidden h-[650px] w-28 flex-col rounded-r-xl border-4 border-black bg-menu-primary py-4 hover:bg-black lg:flex">
      <LeftMenu
        authors={authorList}
        otherVerifiedSources={otherVerifiedSources}
        sectionTitles={sectionTitles}
      />
    </div>
  )
}

export default LeftMenuContainer
