import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MessengerButton } from './MessengerButton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

type MessengerUnauthenticatedPopoverMessageProps = {
  error: string
}

export function MessengerUnauthenticatedPopoverMessage({
  error,
}: MessengerUnauthenticatedPopoverMessageProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MessengerButton />
      </PopoverTrigger>

      <PopoverContent className="min-w-fit max-w-md border-black bg-menu text-white" asChild>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle className="mt-1 text-red-400">Unable to initialize chat</AlertTitle>

          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </PopoverContent>
    </Popover>
  )
}
