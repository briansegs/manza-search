import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SectionOptions } from '@/stores/filoStore'
import { AlertCircle } from 'lucide-react'

export type FiloMenuUnauthenticatedProps = {
  filoSections: readonly SectionOptions[]
}

export function FiloMenuUnauthenticated({ filoSections }: FiloMenuUnauthenticatedProps) {
  return (
    <div className="flex items-center gap-6">
      <FiloUnauthenticatedPopover triggerTitle="Menu" />

      <ul className="list-inside list-disc space-y-1 font-serif text-xl">
        {filoSections.map((section) => (
          <li key={section}>
            <FiloUnauthenticatedPopover triggerTitle={section} />
          </li>
        ))}
      </ul>
    </div>
  )
}

type FiloUnauthenticatedPopoverProps = {
  triggerTitle: string
}

export function FiloUnauthenticatedPopover({ triggerTitle }: FiloUnauthenticatedPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="font-serif text-xl capitalize hover:text-secondary-blue focus:outline-none">
          {triggerTitle}
        </button>
      </PopoverTrigger>

      <PopoverContent className="min-w-fit max-w-md border-black bg-menu text-white" asChild>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle className="mt-1 text-red-400">Unable to initialize Filo menu</AlertTitle>

          <AlertDescription>Sign in to use the Filo menu</AlertDescription>
        </Alert>
      </PopoverContent>
    </Popover>
  )
}
