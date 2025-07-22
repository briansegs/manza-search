import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CalendarButton } from './CalendarButton'
import { CalendarLayout } from './CalendarLayout'
import { cn } from '@/utilities/ui'

export function CalendarDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CalendarButton />
      </DialogTrigger>

      <DialogContent
        aria-description="Calendar dialog content"
        className={cn(
          'sm:px-9 md:h-[90%] md:max-w-[80%]',
          'max-w-full px-0 py-9',
          'border-black bg-menu',
          'flex h-full w-full items-center justify-center overflow-y-auto',
        )}
        closeButtonStyles="text-white"
      >
        <DialogTitle className="sr-only">Calendar</DialogTitle>
        <DialogDescription className="sr-only">Calendar dialog content</DialogDescription>

        <CalendarLayout />
      </DialogContent>
    </Dialog>
  )
}
