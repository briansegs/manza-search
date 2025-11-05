'use client'

import { Article } from '@/payload-types'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { ArticleMenuButton } from '../ArticleMenuButton'
import { PinButtonAuthenticated } from '@/features/filo/PinButtonAuthenticated'

type PinButtonProps = {
  article: Article
}

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
