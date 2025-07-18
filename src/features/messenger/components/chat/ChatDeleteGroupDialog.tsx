'use client'

import { useMutationState } from '../../hooks/useMutationState'
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
import { ChatDeleteGroupDialogProps } from './types'

export function ChatDeleteGroupDialog({
  setActiveConversation,
  conversationId,
  open,
  setOpen,
}: ChatDeleteGroupDialogProps) {
  const { mutate: deleteGroup, pending } = useMutationState(api.conversation.deleteGroup)

  const handleDeleteGroup = async () => {
    deleteGroup({ conversationId })
      .then(() => {
        setActiveConversation(null)
        toast.success('Group deleted')
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
            This action cannot be undone. all messages will be deleted and you will not be able to
            message this group.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>

          <AlertDialogAction disabled={pending} onClick={handleDeleteGroup}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
