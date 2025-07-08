'use client'

import { Id } from 'convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'
import { useMutationState } from '../hooks/useMutationState'
import { api } from '../../../../convex/_generated/api'
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
import { activeConversationStateType } from '../components/sidebar/MessengerSidebarWrapper'

type RemoveFriendDialogProps = Pick<activeConversationStateType, 'setActiveConversation'> & {
  conversationId: Id<'conversations'>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function RemoveFriendDialog({
  setActiveConversation,
  conversationId,
  open,
  setOpen,
}: RemoveFriendDialogProps) {
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
            This action cannot be undone. all messages will be deleted and you will not be able to
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
