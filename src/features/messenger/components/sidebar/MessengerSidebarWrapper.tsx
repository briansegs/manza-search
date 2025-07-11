'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { MessengerNavbar } from './nav/MessengerNavbar'
import { MessengerFriendsContainer } from '../../friends/MessengerFriendsContainer'
import { MessengerConversationsContainer } from '../../conversations/MessengerConversationsContainer'
import { cn } from '@/utilities/ui'
import { ChatFallback } from '../../chat/ChatFallback'
import { ChatContainer } from '../../chat/ChatContainer'
import { Id } from 'convex/_generated/dataModel'

export type TabsType = 'friends' | 'conversations'

export type ChatIdType = Id<'conversations'> | null | undefined

export type activeConversationStateType = {
  activeConversation: ChatIdType
  setActiveConversation: Dispatch<SetStateAction<ChatIdType>>
}

export type currentTabStateType = {
  currentTab: TabsType
  setCurrentTab: Dispatch<SetStateAction<TabsType>>
}

const defaultTab = 'conversations'

export function MessengerSidebarWrapper() {
  const [currentTab, setCurrentTab] = useState<TabsType>(defaultTab)
  const [activeConversation, setActiveConversation] = useState<ChatIdType>(null)

  return (
    <div
      className={cn('flex h-full w-full flex-col gap-4 px-1 py-4', 'sm:px-4 lg:flex-row-reverse')}
    >
      <main className="flex h-full w-full gap-4 lg:h-full">
        {currentTab === 'friends' && (
          <MessengerFriendsContainer activeConversation={activeConversation} />
        )}

        {currentTab === 'conversations' && (
          <MessengerConversationsContainer
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />
        )}

        {activeConversation ? (
          <ChatContainer
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />
        ) : (
          <ChatFallback />
        )}
      </main>

      <MessengerNavbar
        activeConversation={activeConversation}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </div>
  )
}
