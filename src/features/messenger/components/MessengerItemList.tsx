import { Card } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import React from 'react'
import { MessengerItemListProps } from './types'

export function MessengerItemList({
  children,
  title,
  actionComponent,
  activeConversation,
}: MessengerItemListProps) {
  const isActive = !!activeConversation

  return (
    <Card
      className={cn('hidden h-full w-full p-2 lg:w-80 lg:flex-none', {
        block: !isActive,
        'lg:block': isActive,
      })}
      onFocusCapture={(e) => {
        // Prevent focus events from bubbling up to parent components
        e.stopPropagation()
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

        {actionComponent}
      </div>

      <div className="flex h-full w-full flex-col items-center justify-start gap-2">{children}</div>
    </Card>
  )
}
