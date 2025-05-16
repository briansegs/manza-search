import React from 'react'
import { RightMenu } from '@/components/RightMenuContainer'

const TopMenuContainer: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 mt-1">
      {/* Only visible on mobile devices */}
      <div className="ml-auto flex px-1 sm:hidden lg:hidden">
        <RightMenu />
      </div>
    </div>
  )
}

export default TopMenuContainer
