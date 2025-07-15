'use client'

import { useQuery } from 'convex/react'
import { MessengerDialog } from './MessengerDialog'
import { MessengerUnauthenticatedPopoverMessage } from './MessengerUnauthenticatedPopoverMessage'
import { MessengerButton } from './MessengerButton'
import { useUser } from '@clerk/nextjs'
import { api } from '../../../../convex/_generated/api'

export function Messenger() {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser()

  const convexUser = useQuery(api.user.get, { clerkId: clerkUser?.id || '' })

  const isDesynced = isSignedIn && isLoaded && !convexUser

  if (!isLoaded) {
    return <MessengerButton />
  }

  if (isDesynced) {
    return (
      <MessengerUnauthenticatedPopoverMessage error="Authenticated user not found in chat database. Please contact the site owner to resolve." />
    )
  }

  if (!isSignedIn) {
    return <MessengerUnauthenticatedPopoverMessage error="Sign in to use the messenger" />
  }

  return <MessengerDialog />
}
