import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/utilities/ui'
import { format } from 'date-fns'
import { ChatMessageProps } from './types'

export function ChatMessage({
  fromCurrentUser,
  senderImage,
  senderName,
  lastByUser,
  content,
  createdAt,
  seen,
  type,
}: ChatMessageProps) {
  const formatTime = (timestamp: number) => {
    try {
      return format(timestamp, 'HH:mm')
    } catch (_error) {
      return 'Invalid time'
    }
  }

  return (
    <div
      className={cn('flex items-end', {
        'justify-end': fromCurrentUser,
      })}
    >
      <div
        className={cn('mx-2 flex w-full flex-col', {
          'order-1 items-end': fromCurrentUser,
          'order-2 items-start': !fromCurrentUser,
        })}
      >
        <div
          className={cn('max-w-[70%] rounded-lg px-4 py-2', {
            'bg-primary text-primary-foreground': fromCurrentUser,
            'bg-white text-secondary-foreground': !fromCurrentUser,
            'rounded-br-none': !lastByUser && fromCurrentUser,
            'rounded-bl-none': !lastByUser && !fromCurrentUser,
          })}
        >
          {type === 'text' ? (
            <p className="whitespace-pre-wrap text-wrap break-words break-all">{content}</p>
          ) : null}

          <p
            className={cn('my-1 flex w-full text-xs', {
              'justify-end text-primary-foreground': fromCurrentUser,
              'justify-start text-secondary-foreground': !fromCurrentUser,
            })}
          >
            {formatTime(createdAt)}
          </p>
        </div>

        {seen}
      </div>

      <Avatar
        className={cn('relative h-8 w-8', {
          'order-2': fromCurrentUser,
          'order-1': !fromCurrentUser,
          invisible: lastByUser,
        })}
      >
        <AvatarImage src={senderImage} />

        <AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
      </Avatar>
    </div>
  )
}
