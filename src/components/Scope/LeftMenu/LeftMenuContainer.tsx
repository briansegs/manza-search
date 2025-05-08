import React from 'react'
import LeftMenu from '.'
import { cn } from '@/utilities/ui'

interface LeftMenuContainerProps {
  categories: {
    id: string
    title: string
    slug?: string | null | undefined
  }[]
}

const LeftMenuContainer: React.FC<LeftMenuContainerProps> = ({ categories }) => {
  return (
    <div
      className={cn(
        'fixed left-0 top-[30%] z-50',
        'min-h-96 w-fit max-w-44 flex-col rounded-r-xl',
        'border-4 border-black bg-menu',
        'pb-4',
        'hover:bg-black',
        'hidden lg:flex',
      )}
    >
      <div className={cn('bg-black font-serif text-white underline', 'mb-2 px-4 py-2')}>
        Table of Content
      </div>
      <LeftMenu categories={categories} />
    </div>
  )
}

export default LeftMenuContainer
