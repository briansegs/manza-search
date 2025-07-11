import React, { ReactNode } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface DropdownMenuProps {
  label: string
  children: ReactNode
}

export function DropdownMenu({ label, children }: DropdownMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex gap-2 rounded-xl border-4 border-black bg-menu hover:bg-black">
          {label} <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit rounded-xl border-4 border-black bg-menu hover:bg-black lg:hidden">
        {children}
      </PopoverContent>
    </Popover>
  )
}
