import { DialogOpen, ParsedCalendarEvent, setDialogOpen } from '../types'

type SetEventDialogOpen = {
  setEventDialogOpen: setDialogOpen
}

type EventData = {
  selectedEvent: ParsedCalendarEvent
}

export type EventEditDialogProps = EventData &
  SetEventDialogOpen & {
    editDialogOpen: DialogOpen
    setEditDialogOpen: setDialogOpen
  }

export type EventDialogProps = EventData &
  SetEventDialogOpen & {
    eventDialogOpen: DialogOpen
  }

export type EventDeleteDialogProps = EventData &
  SetEventDialogOpen & {
    deleteDialogOpen: DialogOpen
    setDeleteDialogOpen: setDialogOpen
  }
