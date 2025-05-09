import React from 'react'
import { RightMenu } from '@/components/RightMenuContainer'

import LeftMenu from './LeftMenu'
import DropdownMenu from '../DropdownMenu'
import { TopMenuContainerProps } from './types'

const TopMenuContainer: React.FC<TopMenuContainerProps> = ({ categories }) => {
  return (
    <div className="sticky top-0 z-10 mt-1">
      {/* Mobile view */}
      <div className="sticky top-0 z-10 ml-auto flex justify-between px-1 lg:hidden">
        <DropdownMenu label="Table of Content">
          <LeftMenu categories={categories} />
        </DropdownMenu>

        <div className="block sm:hidden">
          <RightMenu />
        </div>
      </div>
    </div>
  )
}

export default TopMenuContainer
