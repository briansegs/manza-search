'use client'

import { Id } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'
import { ChatIdType } from '../components/sidebar/MessengerSidebarWrapper'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'

type DMConversationItemProps = {
  setActiveConversation: Dispatch<SetStateAction<ChatIdType>>
  id: Id<'conversations'>
  imageUrl: string
  username: string
  email: string
  lastMessageSender?: string
  lastMessageContent?: string
}

export function DMConversationItem({
  setActiveConversation,
  id,
  imageUrl,
  username,
  email,
  lastMessageContent,
  lastMessageSender,
}: DMConversationItemProps) {
  return (
    <Card className="w-full">
      <Button
        onClick={() => setActiveConversation(id)}
        className="h-full w-full justify-start gap-4 truncate p-2 hover:bg-transparent"
        variant="ghost"
      >
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />

            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start truncate">
            <h4 className="truncate text-base">{username ? username : email}</h4>

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
      </Button>
    </Card>
  )
}
