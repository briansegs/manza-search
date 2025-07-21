'use client'

import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import moment from 'moment'
import { useState, useCallback, useMemo } from 'react'
import { EventDialog } from '../event/components/EventDialog'
import { SlotDialog } from '../slot/components/SlotDialog'
import { api } from '../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { CalendarSlot, ParsedCalendarEvent } from '../types'

// 👇 Create the localizer
const localizer = momentLocalizer(moment)

export function CalendarLayout() {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>('month')
  const [selectedEvent, setSelectedEvent] = useState<ParsedCalendarEvent | null>(null)
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [slotDialogOpen, setSlotDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null)

  const events = useQuery(api.events.get)

  const parsedEvents = useMemo(() => {
    if (!events) return []

    return events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }))
  }, [events])

  const handleSelectEvent = useCallback((event: ParsedCalendarEvent) => {
    setSelectedEvent(event)
    setEventDialogOpen(true)
  }, [])

  const handleSlotSelect = useCallback((slot: CalendarSlot) => {
    setSelectedSlot(slot)
    setSlotDialogOpen(true)
  }, [])

  const scrollToTime = useMemo(() => new Date(1970, 1, 1, 6), [])

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [])
  const onView = useCallback((newView: View) => setView(newView), [])

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-white p-4">
      <Calendar
        localizer={localizer}
        events={parsedEvents}
        date={date}
        view={view}
        onNavigate={onNavigate}
        onView={onView}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSlotSelect}
        selectable
        scrollToTime={scrollToTime}
        className="w-full"
      />

      <EventDialog
        eventDialogOpen={eventDialogOpen}
        setEventDialogOpen={setEventDialogOpen}
        selectedEvent={selectedEvent!}
      />

      <SlotDialog
        slotDialogOpen={slotDialogOpen}
        setSlotDialogOpen={setSlotDialogOpen}
        selectedSlot={selectedSlot!}
      />
    </div>
  )
}
