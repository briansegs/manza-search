'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'

export function SignedInButton() {
  return (
    <SignedIn>
      <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-16 h-16' } }} />
    </SignedIn>
  )
}
