import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MessengerButton } from './MessengerButton'
import { MessengerLayout } from './MessengerLayout'

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
        className="h-[90%] max-w-[80%] border-black bg-menu"
        closeButtonStyles="text-white"
      >
        <MessengerLayout />
      </DialogContent>
    </Dialog>
  )
}
