import { CalendarSlot, DialogOpen, setDialogOpen } from '../types'

export type SlotDialogProps = {
  slotDialogOpen: DialogOpen
  setSlotDialogOpen: setDialogOpen
  selectedSlot: CalendarSlot
}
