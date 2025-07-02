import { Dialog, DialogContent, DialogTrigger } from '../shared/components/ui/dialog'
import { MessengerButton } from './MessengerButton'

export function MessengerDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <MessengerButton />
      </DialogTrigger>

      <DialogContent>Hello</DialogContent>
    </Dialog>
  )
}
