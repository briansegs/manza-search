'use client'

import { useUser } from '@clerk/nextjs'
import { api } from '../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { CalendarButton } from './CalendarButton'
import { CalendarUnauthenticatedPopoverMessage } from './CalendarUnauthenticatedPopoverMessage'
import { CalendarDialog } from './CalendarDialog'

export function Calendar() {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser()

  const convexUser = useQuery(api.user.get, { clerkId: clerkUser?.id || '' })

  const isDesynced = isSignedIn && isLoaded && !convexUser

  if (!isLoaded) {
    return <CalendarButton />
  }

  if (isDesynced) {
    return (
      <CalendarUnauthenticatedPopoverMessage error="Authenticated user not found in database. Please contact the site owner to resolve." />
    )
  }

  if (!isSignedIn) {
    return <CalendarUnauthenticatedPopoverMessage error="Sign in to use the calendar" />
  }

  return <CalendarDialog />
}
