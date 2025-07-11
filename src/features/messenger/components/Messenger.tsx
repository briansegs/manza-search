import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import { MessengerDialog } from './MessengerDialog'
import { MessengerUnauthenticatedPopoverMessage } from './MessengerUnauthenticatedPopoverMessage'
import { MessengerButton } from './MessengerButton'

export function Messenger() {
  return (
    <>
      <Authenticated>
        <MessengerDialog />
      </Authenticated>

      <AuthLoading>
        <MessengerButton />
      </AuthLoading>

      <Unauthenticated>
        <MessengerUnauthenticatedPopoverMessage />
      </Unauthenticated>
    </>
  )
}
