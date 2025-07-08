import { MessengerItemList } from '@/features/messenger/components/item-list/MessengerItemList'
import { activeConversationStateType } from '../components/sidebar/MessengerSidebarWrapper'
import { DMConversationItem } from './DMConversationItem'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Loader2 } from 'lucide-react'

type MessengerConversationsContainerProps = activeConversationStateType

export function MessengerConversationsContainer({
  activeConversation,
  setActiveConversation,
}: MessengerConversationsContainerProps) {
  const conversations = useQuery(api.conversations.get)

  return (
    <MessengerItemList activeConversation={activeConversation} title="Conversations">
      {!conversations && (
        <div className="flex h-[80%] w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {conversations?.length === 0 && (
        <p className="flex h-[80%] w-full items-center justify-center">No conversations found</p>
      )}

      {conversations?.map((conversations) => {
        if (conversations.conversation.isGroup) return null

        return (
          <DMConversationItem
            key={conversations.conversation._id}
            id={conversations.conversation._id}
            imageUrl={conversations.otherMember?.imageUrl || ''}
            username={conversations.otherMember?.username || ''}
            email={conversations.otherMember?.email || ''}
            setActiveConversation={setActiveConversation}
            lastMessageContent={conversations.lastMessage?.content}
            lastMessageSender={conversations.lastMessage?.sender}
          />
        )
      })}
    </MessengerItemList>
  )
}
