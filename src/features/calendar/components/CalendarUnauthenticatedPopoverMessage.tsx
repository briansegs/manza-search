import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarButton } from './CalendarButton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

type CalendarUnauthenticatedPopoverMessageProps = {
  error: string
}

export function CalendarUnauthenticatedPopoverMessage({
  error,
}: CalendarUnauthenticatedPopoverMessageProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <CalendarButton />
      </PopoverTrigger>

      <PopoverContent className="min-w-fit max-w-md border-black bg-menu text-white" asChild>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle className="mt-1 text-red-400">Unable to initialize calendar</AlertTitle>

          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </PopoverContent>
    </Popover>
  )
}
