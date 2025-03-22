import React from 'react'
import { Button } from '../ui/button'

export const RightMenu = () => (
  <div className="relative flex size-fit flex-col items-center justify-center rounded-xl bg-menu-red p-2 shadow-[10px_10px_10px_black] hover:bg-black sm:size-28 sm:flex-row sm:p-0">
    <Button className="bg-menu-red hover:bg-black">d</Button>

    <Button className="bottom-2 right-2 block h-fit rounded-[8px] border-2 border-white bg-menu-primary px-2 py-0 hover:bg-black sm:absolute">
      MO
    </Button>
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
