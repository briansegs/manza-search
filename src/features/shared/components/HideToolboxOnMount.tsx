'use client'

import { useEffect } from 'react'
import { useChromeActions } from '@/stores/chromeStore'

export function HideToolboxOnMount() {
  const { setHideToolbox } = useChromeActions()

  useEffect(() => {
    setHideToolbox(true)
    return () => setHideToolbox(false)
  }, [setHideToolbox])

  return null
}
