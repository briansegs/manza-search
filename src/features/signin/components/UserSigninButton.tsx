'use client'

import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, useClerk } from '@clerk/nextjs'
import { SigninButton } from './SigninButton'

export function UserSigninButton() {
  const { openSignIn } = useClerk()

  return (
    <>
      <ClerkLoading>
        <SigninButton disabled>For All Users</SigninButton>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedOut>
          <SigninButton onClick={() => openSignIn({ redirectUrl: '/' })}>
            For All Users
          </SigninButton>
        </SignedOut>

        <SignedIn>
          <SigninButton disabled>For All Users</SigninButton>
        </SignedIn>
      </ClerkLoaded>
    </>
  )
}
