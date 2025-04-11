import React from 'react'
import DictionaryButton from './DictionaryButton'
import MoreOptions from './MoreOptions'

export const RightMenu = () => (
  <div className="relative flex size-fit flex-col items-center justify-center rounded-xl bg-menu-red p-1 shadow-[10px_10px_10px_black] hover:bg-black sm:size-28 sm:flex-row sm:p-0">
    <DictionaryButton />

    <MoreOptions />
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
