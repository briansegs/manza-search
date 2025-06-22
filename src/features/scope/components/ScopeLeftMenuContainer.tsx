import React from 'react'
import { ScopeLeftMenu } from './ScopeLeftMenu'
import { cn } from '@/utilities/ui'
import { LeftMenuContainerProps } from '../types'

export function ScopeLeftMenuContainer({ categories }: LeftMenuContainerProps) {
  return (
    <div
      className={cn(
        'fixed left-0 top-[30%] z-50',
        'h-96 w-fit max-w-[148px] flex-col rounded-r-xl',
        'border-4 border-black bg-menu',
        'pb-4',
        'hover:bg-black',
        'hidden lg:flex',
      )}
    >
      <div className={cn('bg-black font-serif text-white underline', 'mb-2 px-4 py-2')}>
        Table of Content
      </div>

      <ScopeLeftMenu categories={categories} />
    </div>
  )
}
