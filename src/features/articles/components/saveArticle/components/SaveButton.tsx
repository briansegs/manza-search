'use client'

import { Article } from '@/payload-types'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { ArticleMenuButton } from '../../ArticleMenuButton'
import { SaveButtonAuthenticated } from '@/features/filo/SaveButtonAuthenticated'

type SaveButtonProps = {
  article: Article
}

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
