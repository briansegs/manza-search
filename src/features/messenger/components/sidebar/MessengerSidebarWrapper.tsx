'use client'

import { useState } from 'react'
import { MessengerNavbar } from './nav/MessengerNavbar'
import { MessengerFriendsContainer } from '../../friends/MessengerFriendsContainer'
import { MessengerConversationsContainer } from '../../conversations/MessengerConversationsContainer'
import { cn } from '@/utilities/ui'
import { ChatFallback } from '../../chat/ChatFallback'
import { ChatContainer } from '../../chat/ChatContainer'

export type TabsType = 'friends' | 'conversations'

export type ChatIdType = string | null | undefined

const defaultTab = 'conversations'

export function MessengerSidebarWrapper() {
  const [currentTab, setCurrentTab] = useState<TabsType>(defaultTab)
  const [activeConversation, setActiveConversation] = useState<ChatIdType>(null)

  return (
    <div className={cn('flex h-full w-full flex-col gap-4 p-4', 'lg:flex-row-reverse')}>
      <main className="flex h-full w-full gap-4 lg:h-full">
        {currentTab === 'friends' && (
          <MessengerFriendsContainer activeConversation={activeConversation} />
        )}

        {currentTab === 'conversations' && (
          <MessengerConversationsContainer activeConversation={activeConversation} />
        )}

        {activeConversation ? (
          <ChatContainer activeConversation={activeConversation} />
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
