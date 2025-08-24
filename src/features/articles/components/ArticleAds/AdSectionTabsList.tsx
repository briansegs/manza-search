import { AdSectionTabsListProps } from './types'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/utilities/ui'

export function AdSectionTabsList({ adSections }: AdSectionTabsListProps) {
  return (
    <TabsList className="mt-4 h-fit w-full flex-wrap gap-2 bg-black">
      {adSections?.map(({ title, id }) => {
        if (!title && !id) return null

        return (
          <TabsTrigger
            key={id}
            value={id || ''}
            className={cn(
              'capitalize text-muted',
              'aria-[selected=false]:hover:text-secondary-blue',
            )}
          >
            {title}
          </TabsTrigger>
        )
      })}
    </TabsList>
  )
}
