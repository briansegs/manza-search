'use client'

import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { ListButtonProps } from './types'
import { ListsButtonAuthenticated } from './ListsButtonAuthenticated'
import { ArticleMenuButton } from '../../ArticleMenuButton'

export function ListsButton({ content, contentType }: ListButtonProps) {
  return (
    <>
      <Authenticated>
        <ListsButtonAuthenticated content={content} contentType={contentType}>
          <ArticleMenuButton>LIST</ArticleMenuButton>
        </ListsButtonAuthenticated>
      </Authenticated>

      <Unauthenticated>
        <ArticleMenuButton disabled={true}>LIST</ArticleMenuButton>
      </Unauthenticated>

      <AuthLoading>
        <ArticleMenuButton disabled={true}>LIST</ArticleMenuButton>
      </AuthLoading>
    </>
  )
}
