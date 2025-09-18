import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { User } from 'lucide-react'
import { ReaderMenuAuthorBadgeProps } from '../types'

export function ReaderMenuAuthorBadge({ author }: ReaderMenuAuthorBadgeProps) {
  if (typeof author !== 'object') return null

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex h-8 items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 text-black">
          {typeof author === 'object' ? (
            <>
              <div className="rounded-full bg-blue-300">
                {author.image && typeof author.image === 'object' ? (
                  <Avatar className="h-7 w-7 bg-secondary-blue">
                    <AvatarImage src={author.image.url || ''} />

                    <AvatarFallback className="bg-blue-300">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-7 w-7" />
                )}
              </div>

              {author.name && <div className="max-w-32 truncate">{author.name}</div>}
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
