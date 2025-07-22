import { Id } from 'convex/_generated/dataModel'
import { SlotInfo } from 'react-big-calendar'
import { Dispatch, SetStateAction } from 'react'

export type DialogOpen = boolean

export type setDialogOpen = Dispatch<SetStateAction<boolean>>

export type ParsedCalendarEvent = {
  start: Date
  end: Date
  _id: Id<'events'>
  _creationTime: number
  description?: string | undefined
  allDay?: boolean | undefined
  alertTime?: string | undefined
  title: string
  userId: Id<'users'>
}

export type CalendarSlot = SlotInfo
