import React from 'react'
import DictionaryButton from './DictionaryButton'
import MoreOptionsButton from './MoreOptionsButton'
import { cn } from '@/utilities/ui'

export const RightMenu = () => (
  <div
    className={cn(
      'relative flex size-fit items-center justify-center rounded-xl bg-menu-red px-2 shadow-[10px_10px_10px_black] hover:bg-black',
      'sm:size-28 sm:p-0',
    )}
  >
    <DictionaryButton />

    <MoreOptionsButton />
  </div>
)

const RightMenuContainer = () => {
  return (
    <div className="fixed right-0 top-[35%] z-50 hidden sm:block">
      <RightMenu />
    </div>
  )
}

export default RightMenuContainer
