import { getAdTypeBackgroundColor } from '@/utilities/getAdTypeBackgroundColor'
import { ArticleAdTypeBadgeProps } from './types'
import { cn } from '@/utilities/ui'

export function ArticleAdTypeBadge({ adType }: ArticleAdTypeBadgeProps) {
  return (
    <div
      className={cn(
        'absolute right-0 top-0 border-b-2 border-l-2 border-black px-4 py-2 font-serif text-3xl text-white',
        getAdTypeBackgroundColor(adType),
      )}
    >
      mAD
    </div>
  )
}
