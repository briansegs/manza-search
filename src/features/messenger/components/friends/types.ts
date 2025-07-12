import { Id } from 'convex/_generated/dataModel'
import { activeConversationStateType } from '../types'

export type FriendsRequestItemProps = {
  id: Id<'requests'>
  imageUrl: string
  username: string
  email: string
}

export type FriendsContainerProps = Pick<activeConversationStateType, 'activeConversation'>
