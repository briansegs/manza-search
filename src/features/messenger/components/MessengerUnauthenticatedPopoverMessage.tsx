import { Popover, PopoverContent, PopoverTrigger } from '../../shared/components/ui/popover'
import { MessengerButton } from './MessengerButton'

export function MessengerUnauthenticatedPopoverMessage() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MessengerButton />
      </PopoverTrigger>

      <PopoverContent>Sign in to use messenger</PopoverContent>
    </Popover>
  )
}
