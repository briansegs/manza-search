import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MessengerButton } from './MessengerButton'

export function MessengerUnauthenticatedPopoverMessage() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MessengerButton />
      </PopoverTrigger>

      <PopoverContent className="w-fit border-black bg-menu text-white">
        Sign in to use the messenger
      </PopoverContent>
    </Popover>
  )
}
