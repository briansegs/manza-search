import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'

import React from 'react'
import { MoreOptionsContent } from './MoreOptionsContent'
import { MoreOptionsIcon } from '@/components/site-icons'

export function MoreOptionsMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bottom-2 right-2 m-1 block h-fit rounded-[8px] border-2 border-white bg-menu px-2 py-1 hover:bg-black sm:absolute sm:m-0">
          <MoreOptionsIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <MoreOptionsContent />
    </Popover>
  )
}
