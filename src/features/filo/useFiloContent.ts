import { useEffect, useState, useMemo } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { fetchSavedContent } from '@/actions/fetchSavedContent'
import { fetchPinnedContent } from '@/actions/fetchPinnedContent'
import { useMutationState } from '@/hooks/useMutationState'
import { parseActionError } from '@/utilities/parseActionError'
import { toast } from 'sonner'
import { FiloContent } from './types'

export function useFiloContent() {
  const [savedContent, setSavedContent] = useState<FiloContent[]>([])
  const [pinnedContent, setPinnedContent] = useState<FiloContent[]>([])

  const savedResult = useQuery(api.saves.getSaved)
  const pinnedResult = useQuery(api.pins.getPinned)

  const removeSaved = useMutationState(api.save.unsaveContent)
  const removePinned = useMutationState(api.pin.unpinContent)

  const {
    execute: fetchSaved,
    result: fetchSavedResult,
    isPending: fetchSavedIsPending,
  } = useAction(fetchSavedContent, {
    onSuccess: () => {
      setSavedContent(fetchSavedResult.data || [])
    },
    onError: (actionError) => {
      const errorMsg = parseActionError(actionError.error)

      console.error(errorMsg)
      toast.error(errorMsg)
    },
  })

  const {
    execute: fetchPinned,
    result: fetchPinnedResult,
    isPending: fetchPinnedIsPending,
  } = useAction(fetchPinnedContent, {
    onSuccess: () => {
      setPinnedContent(fetchPinnedResult.data || [])
    },
    onError: (actionError) => {
      const errorMsg = parseActionError(actionError.error)

      console.error(errorMsg)
      toast.error(errorMsg)
    },
  })

  useEffect(() => {
    if (savedResult === undefined) return

    if (savedResult.length > 0) {
      fetchSaved({ saveList: savedResult })
    } else {
      setSavedContent([])
    }
  }, [savedResult, fetchSaved])

  useEffect(() => {
    if (pinnedResult === undefined) return

    if (pinnedResult.length > 0) {
      fetchPinned({ pinList: pinnedResult })
    } else {
      setPinnedContent([])
    }
  }, [pinnedResult, fetchPinned])

  const sections = useMemo(
    () => [
      {
        name: 'pin',
        content: pinnedContent,
        removeFn: removePinned.mutate,
        pending: removePinned.pending,
      },
      {
        name: 'save',
        content: savedContent,
        removeFn: removeSaved.mutate,
        pending: removeSaved.pending,
      },
      { name: 'history', content: null },
      { name: 'lists', content: null },
    ],
    [pinnedContent, savedContent, removePinned, removeSaved],
  )

  return {
    sections,
    isPending: fetchSavedIsPending || fetchPinnedIsPending,
  }
}
