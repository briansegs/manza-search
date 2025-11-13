'use client'

import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { ArticleMenuButton } from '../ArticleMenuButton'
import { SaveButtonAuthenticated } from '@/features/filo/SaveButtonAuthenticated'
import { SaveButtonProps } from './types'

export function SaveButton({ article }: SaveButtonProps) {
  return (
    <>
      <Authenticated>
        <SaveButtonAuthenticated article={article} />
      </Authenticated>

      <Unauthenticated>
        <ArticleMenuButton disabled={true}>SAVE</ArticleMenuButton>
      </Unauthenticated>

      <AuthLoading>
        <ArticleMenuButton disabled={true}>SAVE</ArticleMenuButton>
      </AuthLoading>
    </>
  )
}
