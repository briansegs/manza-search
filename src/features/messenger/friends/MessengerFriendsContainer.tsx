import { MessengerItemList } from '../components/item-list/MessengerItemList'
import { ChatIdType } from '../components/sidebar/MessengerSidebarWrapper'

type MessengerFriendsContainerProps = {
  activeConversation: ChatIdType
}

export function MessengerFriendsContainer({ activeConversation }: MessengerFriendsContainerProps) {
  return (
    <MessengerItemList activeConversation={activeConversation} title="Friends">
      Friends Container
    </MessengerItemList>
  )
}
