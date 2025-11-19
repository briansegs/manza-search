import { Button } from '@/components/ui/button'
import { useMutationState } from '@/hooks/useMutationState'
import { api } from '../../../convex/_generated/api'
import { ConvexError } from 'convex/values'
import { toast } from 'sonner'
import { FiloClearHistoryButtonProps } from './types'

export function FiloClearHistoryButton({ disabled }: FiloClearHistoryButtonProps) {
  const { mutate: removeAllVisits, pending } = useMutationState(api.history.removeAllVisits)

  async function handleClearHistory() {
    try {
      await removeAllVisits({})
      toast.success('History cleared!')
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
    }
  }

  return (
    <Button disabled={pending || disabled} onClick={handleClearHistory} className="bg-black">
      Clear history
    </Button>
  )
}
