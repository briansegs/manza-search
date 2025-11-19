'use client'

import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import { HistoryButtonAuthenticated } from '@/features/filo/HistoryButtonAuthenticated'
import { ArticleMenuButton } from '../ArticleMenuButton'

export function HistoryButton() {
  return (
    <>
      <Authenticated>
        <HistoryButtonAuthenticated />
      </Authenticated>

      <Unauthenticated>
        <ArticleMenuButton disabled={true}>History</ArticleMenuButton>
      </Unauthenticated>

      <AuthLoading>
        <ArticleMenuButton disabled={true}>History</ArticleMenuButton>
      </AuthLoading>
    </>
  )
}
