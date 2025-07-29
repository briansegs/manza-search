import React from 'react'
import { RightMenu } from '@/features/shared/components/RightMenu'
import getAuthorList from '@/utilities/getAuthorList'
import { ArticleLeftMenu } from './ArticleLeftMenu'
import { ArticleTopMenu } from './ArticleTopMenu'
import { DropdownMenu } from '@/features/shared/components/DropdownMenu'
import getSectionTitles from '@/utilities/getSectionTitles'
import { cn } from '@/utilities/ui'
import { ArticleTopMenuContainerProps } from '../types'

export function ArticleTopMenuContainer({ article, className }: ArticleTopMenuContainerProps) {
  const { populatedAuthors, externalAuthors, otherVerifiedSources, layout } = article

  const authorList = getAuthorList({ populatedAuthors, externalAuthors })

  const sectionTitles = getSectionTitles({ layout })

  return (
    <div className={cn('sticky top-0 z-10', className)}>
      {/* Large device view */}
      <div className="hidden h-20 w-fit items-center justify-center rounded-xl border-4 border-black bg-menu px-4 hover:bg-black lg:flex">
        <ArticleTopMenu />
      </div>

      {/* Mobile view */}
      <div className="sticky top-0 z-10 ml-auto flex justify-between px-1 lg:hidden">
        <div className="flex gap-1">
          <DropdownMenu label="Resources">
            <ArticleLeftMenu
              sectionTitles={sectionTitles}
              otherVerifiedSources={otherVerifiedSources}
              authors={authorList}
            />
          </DropdownMenu>

          <DropdownMenu label="Actions">
            <ArticleTopMenu styles="flex-col items-center" />
          </DropdownMenu>
        </div>

        <div className="block sm:hidden">
          <RightMenu />
        </div>
      </div>
    </div>
  )
}
