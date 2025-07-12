import { MessengerItemList } from '@/features/messenger/components/MessengerItemList'
import { ConversationsDirectMessageItem } from './ConversationsDirectMessageItem'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Loader2 } from 'lucide-react'
import { ConversationsCreateGroupDialog } from './ConversationsCreateGroupDialog'
import { ConversationsGroupItem } from './ConversationsGroupItem'
import { ConversationsContainerProps } from './types'

export function ConversationsContainer({
  activeConversation,
  setActiveConversation,
}: ConversationsContainerProps) {
  const conversations = useQuery(api.conversations.get)

  return (
    <MessengerItemList
      activeConversation={activeConversation}
      title="Conversations"
      action={<ConversationsCreateGroupDialog />}
    >
      {!conversations && (
        <div className="flex h-[80%] w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {conversations?.length === 0 && (
        <p className="flex h-[80%] w-full items-center justify-center">No conversations found</p>
      )}

      {conversations?.map((conversations) => {
        if (conversations.conversation.isGroup)
          return (
            <ConversationsGroupItem
              key={conversations.conversation._id}
              id={conversations.conversation._id}
              name={conversations.conversation.name || ''}
              setActiveConversation={setActiveConversation}
              lastMessageContent={conversations.lastMessage?.content}
              lastMessageSender={conversations.lastMessage?.sender}
              unseenCount={conversations.unseenCount}
            />
          )

        return (
          <ConversationsDirectMessageItem
            key={conversations.conversation._id}
            id={conversations.conversation._id}
            imageUrl={conversations.otherMember?.imageUrl || ''}
            username={conversations.otherMember?.username || ''}
            email={conversations.otherMember?.email || ''}
            setActiveConversation={setActiveConversation}
            lastMessageContent={conversations.lastMessage?.content}
            lastMessageSender={conversations.lastMessage?.sender}
            unseenCount={conversations.unseenCount}
          />
        )
      })}
    </MessengerItemList>
  )
}
