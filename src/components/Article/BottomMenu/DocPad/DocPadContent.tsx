'use client'

import { PopoverContent } from '@/components/ui/popover'
import useBreakpoint from '@/hooks/useBreakpoint'
import React from 'react'
import DocPadEditor from './DocPadEditor'

const DocPadContent: React.FC = () => {
  const { isMobileSM } = useBreakpoint()

  // Offset values optimized for different viewport sizes
  const MOBILE_OFFSET = 10
  const DESKTOP_OFFSET = 19
  return (
    <PopoverContent
      side="top"
      sideOffset={isMobileSM ? MOBILE_OFFSET : DESKTOP_OFFSET}
      className="w-[100vw] rounded-primary border-4 border-black bg-menu px-1 pb-1 pt-0 md:px-2 md:pb-2 lg:w-[80vw]"
    >
      <div className="flex w-full flex-col items-center gap-0 md:gap-7">
        <header className="h-fit rounded-b-[8px] border-[1px] border-white bg-black px-14 py-[1px] font-serif font-semibold text-white">
          PAD
        </header>

        <DocPadEditor />
      </div>
    </PopoverContent>
  )
}

export default DocPadContent
