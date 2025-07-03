import { Card } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import React from 'react'
import { ChatIdType } from '../sidebar/MessengerSidebarWrapper'

type MessengerItemListProps = React.PropsWithChildren & {
  title: string
  action?: React.ReactNode
  activeConversation: ChatIdType
}

export function MessengerItemList({
  children,
  title,
  action: Action,
  activeConversation,
}: MessengerItemListProps) {
  const isActive = !!activeConversation

  return (
    <Card
      className={cn('hidden h-full w-full p-2 lg:w-80 lg:flex-none', {
        block: !isActive,
        'lg:block': isActive,
      })}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

        {Action ? Action : null}
      </div>

      <div className="flex h-full w-full flex-col items-center justify-start gap-2">{children}</div>
    </Card>
  )
}
