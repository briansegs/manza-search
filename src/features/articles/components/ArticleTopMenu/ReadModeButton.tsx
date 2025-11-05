'use client'

import { useReadMode, useReadModeActions } from '@/stores/readModeStore'
import { ArticleMenuButton } from '../ArticleMenuButton'
import { cn } from '@/utilities/ui'

export function ReadModeButton() {
  const readMode = useReadMode()
  const { toggleReadMode } = useReadModeActions()

  return (
    <ArticleMenuButton className={cn({ 'text-yellow-200': readMode })} onClick={toggleReadMode}>
      RM
    </ArticleMenuButton>
  )
}
