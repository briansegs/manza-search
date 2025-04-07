import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React from 'react'

const DocPad: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-fit rounded-[8px] border-2 border-white bg-menu px-1 py-[1px] font-serif font-semibold text-white hover:bg-black">
          DOC PAD
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={10}
        className="w-[80vw] rounded-primary border-4 border-black bg-menu p-0"
      >
        <div className="flex w-full flex-col items-center gap-6">
          <div className="h-fit rounded-b-[8px] border-[1px] border-white bg-black px-14 py-[1px] font-serif font-semibold text-white">
            PAD
          </div>

          <div className="flex w-full justify-between px-4 pb-4">
            <div className="w-32 bg-menu-red"></div>

            <div className="h-[360px] flex-1 bg-white"></div>

            <div className="w-32 bg-menu-red"></div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DocPad
