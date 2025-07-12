'use client'

import { useQuery } from 'convex/react'
import { MessengerItemList } from '../MessengerItemList'
import { activeConversationStateType } from '../MessengerLayout'
import { FriendsAddDialog } from './FriendsAddDialog'
import { api } from '../../../../../convex/_generated/api'
import { Loader2 } from 'lucide-react'
import { FriendsRequestItem } from './FriendsRequestItem'

type FriendsContainerProps = {
  activeConversation: activeConversationStateType['activeConversation']
}

export function FriendsContainer({ activeConversation }: FriendsContainerProps) {
  const requests = useQuery(api.requests.get)

  return (
    <MessengerItemList
      activeConversation={activeConversation}
      title="Friends"
      action={<FriendsAddDialog />}
    >
      {!requests && (
        <div className="flex h-[80%] w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {requests?.length === 0 && (
        <p className="flex h-[80%] w-full items-center justify-center">No friend requests found</p>
      )}

      {requests?.map((request) => (
        <FriendsRequestItem
          key={request.request._id}
          id={request.request._id}
          imageUrl={request.sender.imageUrl}
          username={request.sender.username}
          email={request.sender.email}
        />
      ))}
    </MessengerItemList>
  )
}
