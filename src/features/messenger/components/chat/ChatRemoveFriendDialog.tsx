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
import { ChatRemoveFriendDialogProps } from './types'

export function ChatRemoveFriendDialog({
  setActiveConversation,
  conversationId,
  open,
  setOpen,
}: ChatRemoveFriendDialogProps) {
  const { mutate: removeFriend, pending } = useMutationState(api.friend.remove)

  const handleRemoveFriend = async () => {
    removeFriend({ conversationId })
      .then(() => {
        setActiveConversation(null)
        toast.success('Removed friend')
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
            This action cannot be undone. All messages will be deleted and you will not be able to
            message this user. All group chats will still work as normal
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>

          <AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
