'use client'

import { useReadMode } from '@/providers/ReadModeProvider'
import { ArticleMenuButton } from '../ArticleMenuButton'
import { cn } from '@/utilities/ui'

export function ReadModeButton() {
  const { readMode, toggleReadMode } = useReadMode()

  return (
    <ArticleMenuButton className={cn({ 'text-yellow-200': readMode })} onClick={toggleReadMode}>
      RM
    </ArticleMenuButton>
  )
}
