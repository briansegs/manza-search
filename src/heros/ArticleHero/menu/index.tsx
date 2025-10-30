'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SectionOptions, useFilo } from '@/providers/FiloProvider'
import { cn } from '@/utilities/ui'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { AlertCircle } from 'lucide-react'

type FiloUnauthenticatedPopoverProps = {
  triggerTitle: string
}

export function FiloUnauthenticatedPopover({ triggerTitle }: FiloUnauthenticatedPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="font-serif text-xl hover:text-secondary-blue focus:outline-none">
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

export function MenuUnauthenticated() {
  return (
    <div className="flex items-center gap-6">
      <FiloUnauthenticatedPopover triggerTitle="Menu" />

      <ul className="list-inside list-disc space-y-1 font-serif text-lg">
        {filoSections.map((section) => (
          <li key={section}>
            <FiloUnauthenticatedPopover triggerTitle={section} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const filoSections = ['pin', 'save', 'history', 'lists'] as const

export function ArticleHeroMenu() {
  const { setOpen, setSection } = useFilo()

  const handleOpen = (section: SectionOptions) => {
    setOpen(true)
    setSection(section)
  }

  return (
    <>
      <Authenticated>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => handleOpen('pin')}
            className="font-serif text-xl hover:text-secondary-blue focus:outline-none"
          >
            Menu
          </button>

          <ul className="list-inside list-disc space-y-1 font-serif text-lg">
            {filoSections.map((section) => (
              <li key={section}>
                <button
                  type="button"
                  onClick={() => handleOpen(section)}
                  className={cn(
                    'cursor-pointer hover:text-secondary-blue focus:outline-none',
                    'capitalize',
                  )}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Authenticated>

      <Unauthenticated>
        <MenuUnauthenticated />
      </Unauthenticated>

      <AuthLoading>
        <MenuUnauthenticated />
      </AuthLoading>
    </>
  )
}
