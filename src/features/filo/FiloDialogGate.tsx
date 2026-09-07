'use client'

import { useUser } from '@clerk/nextjs'
import { FiloDialog } from './FiloDialog'

export function FiloDialogGate() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) return null

  return <FiloDialog />
}
