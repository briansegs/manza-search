import React from 'react'
import { RightMenu } from '@/features/shared/components/RightMenu'

export function HealthAndWellnessTopMenuContainer() {
  return (
    <div className="sticky top-0 z-10 mt-1">
      {/* Only visible on mobile devices */}
      <div className="flex justify-end px-1 pb-1 sm:hidden">
        <RightMenu />
      </div>
    </div>
  )
}
