import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/features/shared/components/ui/dialog'
import { MessengerButton } from './MessengerButton'
import { MessengerLayout } from './MessengerLayout'

export function MessengerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MessengerButton />
      </DialogTrigger>

      <DialogTitle className="sr-only">Messenger</DialogTitle>

      <DialogContent className="h-[90%] max-w-[80%]">
        <MessengerLayout />
      </DialogContent>
    </Dialog>
  )
}
