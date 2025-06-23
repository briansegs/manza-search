import scrollToTop from '@/utilities/scrollToTop'
import React from 'react'
import { ArticleMenuButton } from './ArticleMenuButton'

export type TopMenuProps = {
  styles?: string
}

export function ArticleTopMenu({ styles }: TopMenuProps) {
  return (
    <div className={`${styles} flex`}>
      <ArticleMenuButton onClick={scrollToTop}>TOP</ArticleMenuButton>
      <ArticleMenuButton>HIGHLIGHT</ArticleMenuButton>
      <ArticleMenuButton>LOVE</ArticleMenuButton>
      <ArticleMenuButton>PIN</ArticleMenuButton>
      <ArticleMenuButton>SAVE</ArticleMenuButton>
      <ArticleMenuButton>History</ArticleMenuButton>
      <ArticleMenuButton>RM</ArticleMenuButton>
      <ArticleMenuButton>LIST</ArticleMenuButton>

      <ArticleMenuButton dark>SHARE</ArticleMenuButton>
    </div>
  )
}
