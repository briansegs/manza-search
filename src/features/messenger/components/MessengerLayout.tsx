'use client'

import { useState } from 'react'
import { MessengerNavbar } from './MessengerNavbar'
import { FriendsContainer } from './friends/FriendsContainer'
import { ConversationsContainer } from './conversations/ConversationsContainer'
import { cn } from '@/utilities/ui'
import { ChatFallback } from './chat/ChatFallback'
import { ChatContainer } from './chat/ChatContainer'
import { ChatIdType, TabsType } from './types'

const defaultTab = 'conversations'

export function MessengerLayout() {
  const [currentTab, setCurrentTab] = useState<TabsType>(defaultTab)
  const [activeConversation, setActiveConversation] = useState<ChatIdType>(null)

  return (
    <div
      className={cn('flex h-full w-full flex-col gap-4 px-1 py-4', 'sm:px-4 lg:flex-row-reverse')}
    >
      <main className="flex h-full w-full gap-4 lg:h-full">
        {currentTab === 'friends' && <FriendsContainer activeConversation={activeConversation} />}

        {currentTab === 'conversations' && (
          <ConversationsContainer
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
