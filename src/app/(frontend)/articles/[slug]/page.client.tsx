'use client'
import { useMutationState } from '@/hooks/useMutationState'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { api } from '../../../../../convex/_generated/api'
import React, { useEffect } from 'react'

type PageClientProps = {
  articleId: string
}

const PageClient: React.FC<PageClientProps> = ({ articleId }) => {
  /* Force the header to be light mode */
  const { setHeaderTheme } = useHeaderTheme()
  const { mutate: recordVisit } = useMutationState(api.history.recordVisit)

  useEffect(() => {
    if (!articleId) return
    recordVisit({ articleId })
  }, [articleId, recordVisit])

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])
  return <React.Fragment />
}

export default PageClient
