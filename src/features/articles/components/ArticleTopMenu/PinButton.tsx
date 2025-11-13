'use client'

import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { ArticleMenuButton } from '../ArticleMenuButton'
import { PinButtonAuthenticated } from '@/features/filo/PinButtonAuthenticated'
import { PinButtonProps } from './types'

export function PinButton({ article }: PinButtonProps) {
  return (
    <>
      <Authenticated>
        <PinButtonAuthenticated article={article} />
      </Authenticated>

      <Unauthenticated>
        <ArticleMenuButton disabled={true}>PIN</ArticleMenuButton>
      </Unauthenticated>

      <AuthLoading>
        <ArticleMenuButton disabled={true}>PIN</ArticleMenuButton>
      </AuthLoading>
    </>
  )
}
