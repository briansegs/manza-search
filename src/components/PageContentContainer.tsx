import React, { ReactNode } from 'react'
import { cn } from '@/utilities/ui'

interface PageContentContainerProps {
  slug: string
  title: string
  children: ReactNode
}

const PageContentContainer: React.FC<PageContentContainerProps> = ({ slug, title, children }) => (
  <div
    id={slug}
    className={cn(
      'h-80 w-96',
      'bg-primary-blue',
      'rounded-[10px] border-2 border-black',
      'flex flex-col gap-12',
    )}
  >
    <div className="flex justify-center">
      <div
        className={cn(
          'border-x-[1px] border-b-[1px] border-white',
          'bg-black px-2 font-serif text-white',
        )}
      >
        {title}
      </div>
    </div>

    <div
      className={cn(
        'flex w-full flex-wrap justify-center gap-4 px-[25px]',
        'flex-1 overflow-y-auto',
      )}
    >
      {children}
    </div>
  </div>
)

export default PageContentContainer
