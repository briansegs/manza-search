import React from 'react'

import { cn } from '@/utilities/ui'
import { DictionaryButton } from '@/features/dictionary/components/DictionaryButton'
import { MoreOptionsMenu } from '@/features/moreOptions/components/MoreOptionsMenu'

export function RightMenu() {
  return (
    <div
      className={cn(
        'relative flex size-fit items-center justify-center rounded-xl bg-menu-red px-2 shadow-[10px_10px_10px_black] hover:bg-black',
        'sm:size-28 sm:p-0',
      )}
    >
      <DictionaryButton />

      <MoreOptionsMenu />
    </div>
  )
}

export function RightMenuContainer() {
  return (
    <div className="fixed right-0 top-[35%] z-50 hidden sm:block">
      <RightMenu />
    </div>
  )
}
