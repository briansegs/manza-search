'use client'

import { useReadMode } from '@/providers/ReadModeProvider'
import { ArticleMenuButton } from '../../components/ArticleMenuButton'
import { cn } from '@/utilities/ui'

export function ReadModeButton() {
  const { readMode, toggleReadMode } = useReadMode()

  return (
    <ArticleMenuButton className={cn({ 'text-yellow-300': readMode })} onClick={toggleReadMode}>
      RM
    </ArticleMenuButton>
  )
}
