import React from 'react'
import { Button } from '../ui/button'

const BottomMenu = () => {
  return (
    <div className="fixed bottom-0 z-10 flex h-12 w-full justify-between bg-menu-red sm:h-16">
      <div className="w-28 py-1 pr-1">
        <Button className="size-full rounded-b-none rounded-tl-none rounded-tr-xl bg-menu-red font-serif text-base hover:bg-pink-500">
          Tools
        </Button>
      </div>

      <div className="flex-1 border-y-4 border-menu-red">
        <div className="flex size-full items-center justify-center rounded-t-xl bg-menu-primary hover:bg-black">
          <Button className="h-fit rounded-[8px] border-2 border-white bg-menu-primary px-1 py-[1px] font-serif font-semibold text-white hover:bg-black">
            DOC PAD
          </Button>
        </div>
      </div>

      <div className="w-28 py-1 pl-1">
        <Button className="size-full rounded-b-none rounded-tl-xl rounded-tr-none bg-blue-800 font-serif text-base hover:bg-green-600">
          Menu box
        </Button>
      </div>
    </div>
  )
}

export default BottomMenu
