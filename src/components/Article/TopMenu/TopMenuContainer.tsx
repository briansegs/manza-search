import React from 'react'
import { RightMenu } from '@/components/RightMenuContainer'
import { Article } from '@/payload-types'
import getAuthorList from '@/utilities/getAuthorList'
import LeftMenu from '../LeftMenu'
import TopMenu from '.'
import DropdownMenu from '../../DropdownMenu'
import getSectionTitles from '@/utilities/getSectionTitles'

interface TopMenuContainerProps {
  article: Article
}

const TopMenuContainer: React.FC<TopMenuContainerProps> = ({ article }) => {
  const { populatedAuthors, externalAuthors, otherVerifiedSources, layout } = article

  const authorList = getAuthorList({ populatedAuthors, externalAuthors })

  const sectionTitles = getSectionTitles({ layout })

  return (
    <div className="sticky top-0 z-10">
      {/* Large device view */}
      <div className="ml-auto hidden h-20 w-[750px] items-center justify-center rounded-xl border-4 border-black bg-menu hover:bg-black lg:flex">
        <TopMenu />
      </div>

      {/* Mobile view */}
      <div className="sticky top-0 z-10 ml-auto flex justify-between px-1 lg:hidden">
        <div className="flex gap-2">
          <DropdownMenu label="Resources">
            <LeftMenu
              sectionTitles={sectionTitles}
              otherVerifiedSources={otherVerifiedSources}
              authors={authorList}
            />
          </DropdownMenu>

          <DropdownMenu label="Actions">
            <TopMenu styles="flex-col items-center" />
          </DropdownMenu>
        </div>

        <div className="block sm:hidden">
          <RightMenu />
        </div>
      </div>
    </div>
  )
}

export default TopMenuContainer
