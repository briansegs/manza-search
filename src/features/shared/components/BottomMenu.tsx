import React from 'react'
import { Button } from '@/features/shared/components/ui/button'
import { DocPadPopoverButton } from '@/features/docPad/components/DocPadPopoverButton'
import { Popover, PopoverContent, PopoverTrigger } from '@/features/shared/components/ui/popover'
import { cn } from '@/utilities/ui'

export function BottomMenu() {
  return (
    <div className="fixed bottom-0 z-10 flex h-12 w-full justify-between sm:h-16">
      <div className="w-28">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="size-full rounded-b-none rounded-tl-none rounded-tr-xl bg-menu-red font-serif text-base hover:bg-pink-500">
              Tools
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn('rounded-lg border-2 border-black bg-menu font-serif text-white', 'h-28')}
          >
            Content...
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1 overflow-hidden rounded-t-xl border-[5px] border-green-600">
        <div className="flex size-full items-center justify-center bg-menu hover:bg-black">
          <DocPadPopoverButton />
        </div>
      </div>

      <div className="w-28">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="size-full rounded-b-none rounded-tl-xl rounded-tr-none bg-blue-800 font-serif text-base hover:bg-green-600">
              Menu box
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn('rounded-lg border-2 border-black bg-menu font-serif text-white', 'h-28')}
          >
            Content...
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
