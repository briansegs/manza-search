import React from 'react'
import { Button } from '../ui/button'

const RightButtonMenu = () => {
  return (
    <div className="fixed right-0 top-[35%] z-50 flex size-28 items-center justify-center rounded-xl bg-menu-red shadow-[10px_10px_10px_black]">
      <Button className="bg-menu-red hover:bg-menu-red">d</Button>

      <Button className="absolute bottom-2 right-2 h-fit rounded-[8px] border-2 border-white px-2 py-0">
        MO
      </Button>
    </div>
  )
}

export default RightButtonMenu
