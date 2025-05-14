import React from 'react'
import { RightMenu } from '@/components/RightMenuContainer'

const TopMenuContainer: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 mt-1">
      {/* Mobile view */}
      <div className="ml-auto flex justify-between px-1 lg:hidden">
        <div className="block sm:hidden">
          <RightMenu />
        </div>
      </div>
    </div>
  )
}

export default TopMenuContainer
