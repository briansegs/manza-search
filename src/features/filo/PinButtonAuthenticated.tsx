'use client'

import { ArticleMenuButton } from '../articles/components/ArticleMenuButton'
import { api } from '../../../convex/_generated/api'
import { useMutationState } from '../../hooks/useMutationState'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import { useQuery } from 'convex/react'
import { PinButtonAuthenticatedProps } from './types'

export function PinButtonAuthenticated({ article }: PinButtonAuthenticatedProps) {
  const { mutate: pinArticle, pending: pinArticlePending } = useMutationState(api.pin.pinContent)
  const { mutate: removePin, pending: removePinnedPending } = useMutationState(api.pin.unpinContent)

  const pinnedArticle = useQuery(api.pin.getPinned, { contentId: article.id })

  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    setPinned(!!pinnedArticle)
  }, [setPinned, pinnedArticle])

  async function handlePin() {
    if (pinned) {
      try {
        await removePin({ contentId: article.id })
        toast.success('Article unpinned!')
      } catch (error) {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      }
    } else {
      try {
        await pinArticle({ contentId: article.id, contentType: 'article' })
        toast.success('Article pinned!')
      } catch (error) {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      }
    }
  }

  return (
    <ArticleMenuButton
      className={cn({ 'text-yellow-200': pinned })}
      disabled={pinArticlePending || removePinnedPending}
      onClick={handlePin}
    >
      PIN
    </ArticleMenuButton>
  )
}
