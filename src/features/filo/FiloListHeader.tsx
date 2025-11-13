'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useMutationState } from '@/hooks/useMutationState'
import { api } from 'convex/_generated/api'
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
import { ListedGroup } from './types'

export type FiloListHeaderProps = {
  group: ListedGroup
}

export function FiloListHeader({ group }: FiloListHeaderProps) {
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
    <div className="mb-1 flex items-center justify-center gap-4">
      <p className="text-center">{group.name}</p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" className="size-8 rounded-full bg-black/50 p-1 text-white">
            <X className="size-5" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Delete list: ${group.name}`}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this list?
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction disabled={pending} onClick={handleRemove}>
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
