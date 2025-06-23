import { cn } from '@/utilities/ui'
import { TravelContentContainerProps } from '../types'

export function TravelContentContainer({ slug, title, children, ad }: TravelContentContainerProps) {
  return (
    <div
      id={slug}
      className={cn(
        'h-80 w-96',
        'bg-primary-blue',
        'rounded-[10px] border-2 border-black',
        'flex flex-col',
      )}
    >
      <div className="flex justify-center">
        <div
          className={cn(
            'border-x-[1px] border-b-[1px] border-white',
            'mb-2 bg-black px-2 font-serif text-white',
          )}
        >
          {title}
        </div>
      </div>

      <div
        className={cn(
          'flex w-full flex-wrap justify-center gap-4 px-[25px]',
          'flex-1 overflow-y-auto',
          'relative',
          ad && 'mb-2',
        )}
      >
        {children}
      </div>
    </div>
  )
}
