import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MessengerButton } from './MessengerButton'
import { MessengerLayout } from './MessengerLayout'
import { cn } from '@/utilities/ui'

export function MessengerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MessengerButton />
      </DialogTrigger>

      <DialogTitle className="sr-only">Messenger</DialogTitle>
      <DialogDescription className="sr-only">Messenger dialog content</DialogDescription>

      <DialogContent
        aria-description="Messenger dialog content"
        className={cn(
          'sm:px-6 md:h-[90%] md:max-w-[80%]',
          'h-full max-w-full px-0',
          'border-black bg-menu',
        )}
        closeButtonStyles="text-white"
      >
        <MessengerLayout />
      </DialogContent>
    </Dialog>
  )
}
