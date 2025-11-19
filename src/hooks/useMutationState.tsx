/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'convex/react'
import { useCallback, useState } from 'react'

export function useMutationState(mutationToRun: any) {
  const [pending, setPending] = useState(false)

  const mutationFn = useMutation(mutationToRun)

  const mutate = useCallback(
    async (payload: any) => {
      setPending(true)
      try {
        return await mutationFn(payload)
      } finally {
        setPending(false)
      }
    },
    [mutationFn],
  )

  return { mutate, pending }
}
