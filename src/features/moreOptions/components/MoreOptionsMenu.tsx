import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'

import React from 'react'
import { MoreOptionsContent } from './MoreOptionsContent'

export function MoreOptionsMenu() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bottom-2 right-2 block h-fit rounded-[8px] border-2 border-white bg-menu px-2 py-0 hover:bg-black sm:absolute">
          MO
        </Button>
      </PopoverTrigger>

      <MoreOptionsContent />
    </Popover>
  )
}
