'use client'

import { useMutationState } from '../../../../hooks/useMutationState'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ChatLeaveGroupDialogProps } from './types'

export function ChatLeaveGroupDialog({
  setActiveConversation,
  conversationId,
  open,
  setOpen,
}: ChatLeaveGroupDialogProps) {
  const { mutate: leaveGroup, pending } = useMutationState(api.conversation.leaveGroup)

  const handleLeaveGroup = async () => {
    leaveGroup({ conversationId })
      .then(() => {
        setActiveConversation(null)
        toast.success('Group left')
      })
      .catch((error) => {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. You will not be able to see any previous messages or send
            new messages to this group.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>

          <AlertDialogAction disabled={pending} onClick={handleLeaveGroup}>
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
