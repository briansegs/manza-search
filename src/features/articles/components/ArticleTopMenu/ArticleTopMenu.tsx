import scrollToTop from '@/utilities/scrollToTop'
import React from 'react'
import { ArticleMenuButton } from '../ArticleMenuButton'
import { ArticleTopMenuProps } from '../../types'
import { cn } from '@/utilities/ui'
import { ReadModeButton } from './ReadModeButton'
import { TextSizeButton } from './textSize/components/TextSizeButton'
import { SaveButton } from './SaveButton'
import { PinButton } from './PinButton'

export function ArticleTopMenu({ article, styles }: ArticleTopMenuProps) {
  return (
    <div className={cn(styles, 'flex')}>
      <ArticleMenuButton onClick={scrollToTop}>TOP</ArticleMenuButton>
      <ArticleMenuButton>HIGHLIGHT</ArticleMenuButton>
      <ArticleMenuButton>LOVE</ArticleMenuButton>
      <PinButton article={article} />
      <SaveButton article={article} />

      <ArticleMenuButton>History</ArticleMenuButton>
      <TextSizeButton />
      <ReadModeButton />
      <ArticleMenuButton>LIST</ArticleMenuButton>

      <ArticleMenuButton dark>SHARE</ArticleMenuButton>
    </div>
  )
}
