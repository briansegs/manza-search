import { Dispatch, SetStateAction } from 'react'
import { activeConversationStateType } from '../types'
import { Id } from 'convex/_generated/dataModel'

export type ChatContainerProps = React.PropsWithChildren & activeConversationStateType

type ChatDialogProps = Pick<activeConversationStateType, 'setActiveConversation'> & {
  conversationId: Id<'conversations'>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export type ChatRemoveFriendDialogProps = ChatDialogProps

export type ChatLeaveGroupDialogProps = ChatDialogProps

export type ChatDeleteGroupDialogProps = ChatDialogProps

export type ChatBodyProps = Pick<activeConversationStateType, 'activeConversation'> & {
  members: {
    lastSeenMessageId?: Id<'messages'>
    username?: string
    email?: string
    [key: string]: unknown
  }[]
}

export type ChatHeaderProps = Pick<activeConversationStateType, 'setActiveConversation'> & {
  imageUrl?: string
  name: string | undefined
  options?: {
    label: string
    destructive: boolean
    onClick: () => void
  }[]
}

export type ChatInputProps = Pick<activeConversationStateType, 'activeConversation'>

export type ChatMessageProps = {
  fromCurrentUser: boolean
  senderImage: string
  senderName: string
  lastByUser: boolean
  content: string[]
  createdAt: number
  seen?: React.ReactNode
  type: string
}
