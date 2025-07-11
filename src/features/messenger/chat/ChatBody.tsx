'use client'

import { useQuery } from 'convex/react'
import { activeConversationStateType } from '../components/sidebar/MessengerSidebarWrapper'
import { api } from '../../../../convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { ChatMessage } from './ChatMessage'
import { useMutationState } from '../hooks/useMutationState'
import { useEffect } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type ChatBodyProps = Pick<activeConversationStateType, 'activeConversation'> & {
  members: {
    lastSeenMessageId?: Id<'messages'>
    username?: string
    email?: string
    [key: string]: unknown
  }[]
}

export function ChatBody({ activeConversation: conversationId, members }: ChatBodyProps) {
  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<'conversations'>,
  })

  const { mutate: markRead } = useMutationState(api.conversation.markRead)

  useEffect(() => {
    if (messages && messages.length > 0) {
      markRead({
        conversationId,
        messageId: messages[0]?.message._id,
      })
    }
  }, [messages, conversationId, markRead])

  const formatSeenBy = (names: string[]) => {
    switch (names.length) {
      case 1:
        return <p className="text-right text-sm text-muted-foreground">{`Seen by ${names[0]}`}</p>

      case 2:
        return (
          <p className="text-right text-sm text-muted-foreground">{`Seen by ${names[0]} and ${names[1]}`}</p>
        )

      default:
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="text-right text-sm text-muted-foreground">{`Seen by ${names[0]}, ${names[1]}, and ${names.length - 2} more`}</p>
              </TooltipTrigger>

              <TooltipContent>
                <ul>
                  {names.map((name, index) => {
                    return <li key={index}>{name}</li>
                  })}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
    }
  }

  const getSeenMessage = (messageId: Id<'messages'>) => {
    const seenUsers = members
      .filter((member) => member.lastSeenMessageId === messageId)
      .map((user) => (user.username ? user.username.split(' ')[0] : user.email?.split('@')[0]))
      .filter(Boolean) as string[]

    if (seenUsers.length === 0) return undefined

    return formatSeenBy(seenUsers)
  }

  return (
    <div className="chat-scrollbar flex w-full flex-1 flex-col-reverse gap-2 overflow-auto p-3">
      {messages?.map(({ message, senderImage, senderName, isCurrentUser }, index) => {
        const lastByUser =
          messages[index - 1]?.message.senderId === messages[index]?.message.senderId

        const seenMessage = isCurrentUser ? getSeenMessage(message._id) : undefined

        return (
          <ChatMessage
            key={message._id}
            fromCurrentUser={isCurrentUser}
            senderImage={senderImage}
            senderName={senderName}
            lastByUser={lastByUser}
            content={message.content}
            createdAt={message._creationTime}
            seen={seenMessage}
            type={message.type}
          />
        )
      })}
    </div>
  )
}
