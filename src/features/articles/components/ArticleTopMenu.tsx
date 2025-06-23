import scrollToTop from '@/utilities/scrollToTop'
import React from 'react'
import { ArticleMenuButton } from './ArticleMenuButton'
import { ArticleTopMenuProps } from '../types'
import { cn } from '@/utilities/ui'

export function ArticleTopMenu({ styles }: ArticleTopMenuProps) {
  return (
    <div className={cn(styles, 'flex')}>
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
