'use client'

import { Article } from '@/payload-types'
import { ArticleMenuButton } from '../articles/components/ArticleMenuButton'
import { api } from '../../../convex/_generated/api'
import { useMutationState } from '../messenger/hooks/useMutationState'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import { useQuery } from 'convex/react'

type SaveButtonAuthenticatedProps = {
  article: Article
}

export function SaveButtonAuthenticated({ article }: SaveButtonAuthenticatedProps) {
  const { mutate: saveArticle, pending: saveArticlePending } = useMutationState(
    api.save.saveContent,
  )
  const { mutate: removeArticle, pending: removeArticlePending } = useMutationState(
    api.save.unsaveContent,
  )

  const savedArticle = useQuery(api.save.getSaved, { contentId: article.id })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(!!savedArticle)
  }, [setSaved, savedArticle])

  async function handleSave() {
    if (saved) {
      try {
        await removeArticle({ contentId: article.id })
        toast.success('Article unsaved!')
      } catch (error) {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      }
    } else {
      try {
        await saveArticle({ contentId: article.id, contentType: 'article' })
        toast.success('Article saved!')
      } catch (error) {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      }
    }
  }

  return (
    <ArticleMenuButton
      className={cn({ 'text-yellow-200': saved })}
      disabled={saveArticlePending || removeArticlePending}
      onClick={handleSave}
    >
      SAVE
    </ArticleMenuButton>
  )
}
