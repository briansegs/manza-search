import { Id } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'

export type TabsType = 'friends' | 'conversations'

export type Tab = {
  name: string
  slug: TabsType
  icon: React.ReactNode
  count?: number
}

export type currentTabStateType = {
  currentTab: TabsType
  setCurrentTab: Dispatch<SetStateAction<TabsType>>
}

export type ChatIdType = Id<'conversations'> | null | undefined

export type activeConversationStateType = {
  activeConversation: ChatIdType
  setActiveConversation: Dispatch<SetStateAction<ChatIdType>>
}

export type MessengerNavbarProps = Pick<activeConversationStateType, 'activeConversation'> &
  currentTabStateType

export type MessengerItemListProps = React.PropsWithChildren &
  Pick<activeConversationStateType, 'activeConversation'> & {
    title: string
    actionComponent?: React.ReactNode
  }
