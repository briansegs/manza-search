import { Card } from '@/features/shared/components/ui/card'
import React from 'react'
import { ChatIdType } from '../components/sidebar/MessengerSidebarWrapper'

type ChatContainerProps = React.PropsWithChildren & {
  activeConversation: ChatIdType
}

export function ChatContainer({ children, activeConversation }: ChatContainerProps) {
  return (
    <Card className="flex h-full w-full flex-col gap-2 p-2">
      {`Conversation: ${activeConversation}`}
      {children}
    </Card>
  )
}
