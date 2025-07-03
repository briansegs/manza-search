import { Authenticated, Unauthenticated } from 'convex/react'
import { MessengerDialog } from './MessengerDialog'
import { MessengerUnauthenticatedPopoverMessage } from './MessengerUnauthenticatedPopoverMessage'

export function Messenger() {
  return (
    <div>
      <Authenticated>
        <MessengerDialog />
      </Authenticated>

      <Unauthenticated>
        <MessengerUnauthenticatedPopoverMessage />
      </Unauthenticated>
    </div>
  )
}
