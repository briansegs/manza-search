import { cn } from '@/utilities/ui'
import { ScopeContentContainerProps } from '../types'

export function ScopeContentContainer({ slug, title, children }: ScopeContentContainerProps) {
  return (
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
          'custom-scrollbar flex-1 overflow-y-auto',
        )}
      >
        {children}
      </div>
    </div>
  )
}
