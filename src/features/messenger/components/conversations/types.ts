import { Id } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'
import { activeConversationStateType, ChatIdType } from '../types'

export type ConversationsContainerProps = activeConversationStateType

type ConversationsItem = {
  setActiveConversation: Dispatch<SetStateAction<ChatIdType>>
  id: Id<'conversations'>
  lastMessageSender?: string
  lastMessageContent?: string
  unseenCount: number
}

export type ConversationsDirectMessageItemProps = ConversationsItem & {
  imageUrl: string
  username: string
  email: string
}

export type ConversationsGroupItemProps = ConversationsItem & {
  name: string
}
