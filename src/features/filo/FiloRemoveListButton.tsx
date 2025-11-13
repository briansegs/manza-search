'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useMutationState } from '@/hooks/useMutationState'
import { api } from '../../../convex/_generated/api'
import { ConvexError } from 'convex/values'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { FiloRemoveListButtonProps } from './types'

export function FiloRemoveListButton({ group }: FiloRemoveListButtonProps) {
  const { mutate: removeList, pending } = useMutationState(api.list.removeList)

  async function handleRemove() {
    try {
      await removeList({ listId: group._id })
      toast.success(`${group.name} removed!`)
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" className="size-8 rounded-full bg-black/50 p-1 text-white">
          <X className="size-5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border-black bg-menu">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">{`List: ${group.name}`}</AlertDialogTitle>
          <AlertDialogDescription className="text-accent">
            Are you sure you want to delete this list?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent text-white">Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={pending}
            onClick={handleRemove}
            className="bg-red-600 hover:bg-red-900"
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
