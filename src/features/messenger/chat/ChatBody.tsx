'use client'

import { useQuery } from 'convex/react'
import { activeConversationStateType } from '../components/sidebar/MessengerSidebarWrapper'
import { api } from '../../../../convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { ChatMessage } from './ChatMessage'

type ChatBodyProps = Pick<activeConversationStateType, 'activeConversation'>

export function ChatBody({ activeConversation: conversationId }: ChatBodyProps) {
  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<'conversations'>,
  })

  return (
    <div className="no-scrollbar flex w-full flex-1 flex-col-reverse gap-2 overflow-x-scroll p-3">
      {messages?.map(({ message, senderImage, senderName, isCurrentUser }, index) => {
        const lastByUser =
          messages[index - 1]?.message.senderId === messages[index]?.message.senderId

        return (
          <ChatMessage
            key={message._id}
            fromCurrentUser={isCurrentUser}
            senderImage={senderImage}
            senderName={senderName}
            lastByUser={lastByUser}
            content={message.content}
            createdAt={message._creationTime}
            type={message.type}
          />
        )
      })}
    </div>
  )
}
