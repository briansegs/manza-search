'use client'

import { Card } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Loader2 } from 'lucide-react'
import { ChatHeader } from './ChatHeader'
import { ChatBody } from './ChatBody'
import { ChatInput } from './ChatInput'
import { useEffect, useState } from 'react'
import { ChatRemoveFriendDialog } from './ChatRemoveFriendDialog'
import { Id } from 'convex/_generated/dataModel'
import { ChatDeleteGroupDialog } from './ChatDeleteGroupDialog'
import { ChatLeaveGroupDialog } from './ChatLeaveGroupDialog'
import { ChatContainerProps } from './types'

export function ChatContainer({
  children,
  activeConversation,
  setActiveConversation,
}: ChatContainerProps) {
  const [mounted, setMounted] = useState(false)

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false)

  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false)

  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false)

  // const [callType, setCallType] = useState<'audio' | 'video' | null>(null)

  const conversation = useQuery(
    api.conversation.get,
    activeConversation ? { id: activeConversation } : 'skip',
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="h-full w-full p-4">
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Card>
    )
  }

  if (!conversation) {
    return (
      <Card className="h-full w-full p-4">
        <div className="flex h-full w-full items-center justify-center">
          <p className="flex h-full w-full items-center justify-center">Conversation not found</p>
        </div>
      </Card>
    )
  }

  if (conversation === undefined) {
    return (
      <Card className="h-full w-full p-4">
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Card>
    )
  }

  return (
    <Card className="flex max-h-[calc(100vh-5.1rem)] w-full flex-col gap-2 p-2 md:max-h-[calc(100vh-9.9rem)]">
      <ChatRemoveFriendDialog
        conversationId={activeConversation as Id<'conversations'>}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
        setActiveConversation={setActiveConversation}
      />

      <ChatLeaveGroupDialog
        conversationId={activeConversation as Id<'conversations'>}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}
        setActiveConversation={setActiveConversation}
      />

      <ChatDeleteGroupDialog
        conversationId={activeConversation as Id<'conversations'>}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}
        setActiveConversation={setActiveConversation}
      />

      <ChatHeader
        imageUrl={conversation.isGroup ? undefined : conversation.otherMember?.imageUrl}
        name={
          conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username || conversation.otherMember?.email || ''
        }
        setActiveConversation={setActiveConversation}
        options={
          conversation.isGroup
            ? [
                {
                  label: 'Leave group',
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: 'Delete group',
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true),
                },
              ]
            : [
                {
                  label: 'Remove friend',
                  destructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
        }
      />

      <ChatBody
        activeConversation={activeConversation}
        members={
          conversation.isGroup
            ? conversation.otherMembers
              ? conversation.otherMembers
              : []
            : conversation.otherMember
              ? [conversation.otherMember]
              : []
        }
      />

      <ChatInput activeConversation={activeConversation} />

      {children}
    </Card>
  )
}
