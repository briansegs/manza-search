'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { format } from 'date-fns'
import { useState } from 'react'

import { EventEditDialog } from './EventEditDialog'
import { EventDeleteDialog } from './EventDeleteDialog'
import { EventDialogProps } from '../types'

export function EventDialog({
  eventDialogOpen,
  setEventDialogOpen,
  selectedEvent,
}: EventDialogProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  return (
    <>
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogTrigger asChild>
          <div id="popover-trigger" />
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="font-medium">{selectedEvent?.title}</DialogTitle>

            <DialogDescription className="sr-only">
              Event Dialog for {selectedEvent?.title}
            </DialogDescription>
          </DialogHeader>

          <ul className="ml-2 space-y-4">
            <li>
              All day:&nbsp;
              <span className="text-muted-foreground">{selectedEvent?.allDay ? 'Yes' : 'No'}</span>
            </li>
            <li>
              Start:&nbsp;
              <span className="text-muted-foreground">
                {selectedEvent?.start ? format(selectedEvent.start, "PP 'at' p") : ''}
              </span>
            </li>
            <li>
              End:&nbsp;
              <span className="text-muted-foreground">
                {selectedEvent?.end ? format(selectedEvent.end, "PP 'at' p") : ''}
              </span>
            </li>
          </ul>

          {selectedEvent?.description && (
            <div>
              <div>Description:</div>

              <p className="ml-2 text-sm">{selectedEvent.description}</p>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setEditDialogOpen(true)}>Edit</Button>

            <Button onClick={() => setDeleteDialogOpen(true)} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EventEditDialog
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        selectedEvent={selectedEvent}
        setEventDialogOpen={setEventDialogOpen}
      />

      <EventDeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        selectedEvent={selectedEvent}
        setEventDialogOpen={setEventDialogOpen}
      />
    </>
  )
}
