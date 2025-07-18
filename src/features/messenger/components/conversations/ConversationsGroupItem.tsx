'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ConversationsGroupItemProps } from './types'

export function ConversationsGroupItem({
  setActiveConversation,
  id,
  name,
  lastMessageContent,
  lastMessageSender,
  unseenCount,
}: ConversationsGroupItemProps) {
  return (
    <Card className="w-full">
      <Button
        onClick={() => setActiveConversation(id)}
        className="h-full w-full justify-between gap-2 p-2 hover:bg-transparent"
        variant="ghost"
        aria-label={`Open conversation with ${name}`}
      >
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarFallback className="bg-white text-lg">
              {name.charAt(0).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start truncate">
            <h4 className="truncate text-base">{name}</h4>

            {lastMessageSender && lastMessageContent ? (
              <span className="flex truncate overflow-ellipsis text-muted-foreground">
                <p className="font-semibold">
                  {lastMessageSender}
                  {':'}&nbsp;
                </p>
                <p className="truncate overflow-ellipsis">{lastMessageContent}</p>
              </span>
            ) : (
              <p className="truncate text-sm text-muted-foreground">Start the conversation!</p>
            )}
          </div>
        </div>

        {unseenCount ? <Badge className="px-2">{unseenCount}</Badge> : null}
      </Button>
    </Card>
  )
}
