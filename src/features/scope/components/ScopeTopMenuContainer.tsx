import React from 'react'
import { RightMenu } from '@/features/shared/components/RightMenu'

import { ScopeLeftMenu } from './ScopeLeftMenu'
import { DropdownMenu } from '@/features/shared/components/DropdownMenu'
import { TopMenuContainerProps } from '../types'

export function ScopeTopMenuContainer({ sectionData }: TopMenuContainerProps) {
  return (
    <div className="sticky top-0 z-10 mt-1">
      {/* Mobile view */}
      <div className="ml-auto flex justify-between px-1 lg:hidden">
        <DropdownMenu label="Table of Content">
          <ScopeLeftMenu sectionData={sectionData} />
        </DropdownMenu>

        <div className="block sm:hidden">
          <RightMenu />
        </div>
      </div>
    </div>
  )
}
