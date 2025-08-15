'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'

export function SignedInButton() {
  return (
    <SignedIn>
      <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-12 h-12' } }} />
    </SignedIn>
  )
}
