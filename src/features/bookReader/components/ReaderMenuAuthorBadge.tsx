import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { User } from 'lucide-react'
import { ReaderMenuAuthorBadgeProps } from '../types'

export function ReaderMenuAuthorBadge({ populatedAuthor }: ReaderMenuAuthorBadgeProps) {
  if (typeof populatedAuthor !== 'object') return null

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex h-8 items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 text-black">
          {typeof populatedAuthor === 'object' ? (
            <>
              <div className="rounded-full bg-blue-300">
                {populatedAuthor.image && typeof populatedAuthor.image === 'object' ? (
                  <Avatar className="h-7 w-7 bg-secondary-blue">
                    <AvatarImage src={populatedAuthor.image.url || ''} />

                    <AvatarFallback className="bg-blue-300">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-7 w-7" />
                )}
              </div>

              {populatedAuthor.name && (
                <div className="max-w-32 truncate">{populatedAuthor.name}</div>
              )}
            </>
          ) : (
            <div className="max-w-32 truncate">{'Author missing'}</div>
          )}
        </div>
      </TooltipTrigger>

      <TooltipContent>Author</TooltipContent>
    </Tooltip>
  )
}
