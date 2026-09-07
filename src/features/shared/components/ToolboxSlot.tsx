'use client'

import { useHideToolbox } from '@/stores/chromeStore'
import { RightMenuContainer, RightMenuMobileContainer } from './RightMenu'

export function ToolboxSlot() {
  const hideToolbox = useHideToolbox()

  if (hideToolbox) return null

  return (
    <>
      <RightMenuContainer />
      <RightMenuMobileContainer />
    </>
  )
}
