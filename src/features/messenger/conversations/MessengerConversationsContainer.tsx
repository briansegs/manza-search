import React from 'react'
import { MessengerItemList } from '@/features/messenger/components/item-list/MessengerItemList'
import { ChatIdType } from '../components/sidebar/MessengerSidebarWrapper'

type MessengerConversationsContainerProps = {
  activeConversation: ChatIdType
}

export function MessengerConversationsContainer({
  activeConversation,
}: MessengerConversationsContainerProps) {
  return (
    <MessengerItemList activeConversation={activeConversation} title="Conversations">
      Conversations
    </MessengerItemList>
  )
}
