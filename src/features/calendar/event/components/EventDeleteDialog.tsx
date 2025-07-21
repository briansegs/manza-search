'use client'

import { useMutationState } from '@/features/messenger/hooks/useMutationState'
import { api } from '../../../../../convex/_generated/api'

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
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'

type EventDeleteDialogProps = {
  deleteDialogOpen: boolean
  setDeleteDialogOpen: any
  selectedEvent: any
  setEventDialogOpen: any
}

export function EventDeleteDialog({
  deleteDialogOpen,
  setDeleteDialogOpen,
  selectedEvent,
  setEventDialogOpen,
}: EventDeleteDialogProps) {
  const { mutate: deleteEvent, pending } = useMutationState(api.event.deleteEvent)

  async function handleDeleteEvent() {
    deleteEvent({ id: selectedEvent._id })
      .then(() => {
        setDeleteDialogOpen(false)
        setEventDialogOpen(false)
        toast.success('Removed event')
      })
      .catch((error) => {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      })
  }

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>

          <AlertDialogAction disabled={pending} onClick={handleDeleteEvent}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
