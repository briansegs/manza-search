import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { User } from 'lucide-react'
import { ReaderMenuAuthorBadgeProps } from '../types'
import { cn } from '@/utilities/ui'

export function ReaderMenuAuthorBadge({ authorImage, authorName }: ReaderMenuAuthorBadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            'flex h-8 items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 text-black',
            !authorName && 'min-w-28',
          )}
        >
          {authorName || authorImage ? (
            <>
              <div className="rounded-full bg-blue-300">
                {authorImage && typeof authorImage === 'object' ? (
                  <Avatar className="h-7 w-7 bg-secondary-blue">
                    <AvatarImage src={authorImage.url || ''} />

                    <AvatarFallback className="bg-blue-300">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-7 w-7" />
                )}
              </div>

              {authorName && <div className="max-w-32 truncate">{authorName}</div>}
            </>
          ) : (
            <div className="max-w-32 truncate pl-1 text-secondary-blue">{'No author yet...'}</div>
          )}
        </div>
      </TooltipTrigger>

      <TooltipContent>Author</TooltipContent>
    </Tooltip>
  )
}
