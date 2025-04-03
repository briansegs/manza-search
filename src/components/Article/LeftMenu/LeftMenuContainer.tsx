import React from 'react'
import { Article } from '@/payload-types'
import LeftMenu from '.'
import getAuthorList from '@/utilities/getAuthorList'

interface LeftMenuContainerProps {
  article: Article
}

const LeftMenuContainer: React.FC<LeftMenuContainerProps> = ({ article }) => {
  const { populatedAuthors, externalAuthors } = article

  const authorList = getAuthorList({ populatedAuthors, externalAuthors })
  return (
    <div className="sticky top-0 hidden h-[650px] w-28 flex-col rounded-r-xl border-4 border-black bg-menu-primary py-4 hover:bg-black lg:flex">
      <LeftMenu authors={authorList} />
    </div>
  )
}

export default LeftMenuContainer
