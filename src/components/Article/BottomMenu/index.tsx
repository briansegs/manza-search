import React from 'react'
import { Button } from '../../ui/button'
import DocPad from './DocPad'

const BottomMenu = () => {
  return (
    <div className="fixed bottom-0 z-10 flex h-12 w-full justify-between sm:h-16">
      <div className="w-28">
        <Button className="size-full rounded-b-none rounded-tl-none rounded-tr-xl bg-menu-red font-serif text-base hover:bg-pink-500">
          Tools
        </Button>
      </div>

      <div className="flex-1 overflow-hidden rounded-t-xl border-[5px] border-green-600">
        <div className="flex size-full w-full items-center justify-center bg-menu hover:bg-black">
          <DocPad />
        </div>
      </div>

      <div className="w-28">
        <Button className="size-full rounded-b-none rounded-tl-xl rounded-tr-none bg-blue-800 font-serif text-base hover:bg-green-600">
          Menu box
        </Button>
      </div>
    </div>
  )
}

export default BottomMenu
