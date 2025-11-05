'use client'

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/utilities/ui'
import { api } from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { useEffect, useMemo, useState } from 'react'
import { fetchSavedContent } from '@/actions/fetchSavedContent'
import { useAction } from 'next-safe-action/hooks'
import { parseActionError } from '@/utilities/parseActionError'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { FiloDialogHeader } from './FiloDialogHeader'
import { FiloContentCard } from './FiloContentCard'
import { FiloContent } from './types'
import { useFiloActions, useFiloOpen, useFiloSection } from '@/stores/filoStore'
import { fetchPinnedContent } from '@/actions/fetchPinnedContent'
import { useMutationState } from '@/hooks/useMutationState'

export function FiloDialog() {
  const open = useFiloOpen()
  const { setOpen } = useFiloActions()
  const section = useFiloSection()

  const [savedContent, setSavedContent] = useState<FiloContent[]>([])
  const [pinnedContent, setPinnedContent] = useState<FiloContent[]>([])

  const savedResult = useQuery(api.saves.getSaved)
  const pinnedResult = useQuery(api.pins.getPinned)

  const { mutate: removeContent, pending: removeContentPending } = useMutationState(
    api.save.unsaveContent,
  )

  const { mutate: unpinContent, pending: unpinContentPending } = useMutationState(
    api.pin.unpinContent,
  )

  const {
    execute: fetchSaved,
    result: fetchSavedResult,
    isPending: fetchSavedIsPending,
  } = useAction(fetchSavedContent, {
    onSuccess: () => {
      setSavedContent(fetchSavedResult.data || [])
    },
    onError: (actionError) => {
      const errorMsg = parseActionError(actionError.error)

      console.error(errorMsg)
      toast.error(errorMsg)
    },
  })

  const {
    execute: fetchPinned,
    result: fetchPinnedResult,
    isPending: fetchPinnedIsPending,
  } = useAction(fetchPinnedContent, {
    onSuccess: () => {
      setPinnedContent(fetchPinnedResult.data || [])
    },
    onError: (actionError) => {
      const errorMsg = parseActionError(actionError.error)

      console.error(errorMsg)
      toast.error(errorMsg)
    },
  })

  useEffect(() => {
    if (savedResult === undefined) return

    if (savedResult.length > 0) {
      fetchSaved({ saveList: savedResult })
    } else {
      setSavedContent([])
    }
  }, [savedResult, fetchSaved])

  useEffect(() => {
    if (pinnedResult === undefined) return

    if (pinnedResult.length > 0) {
      fetchPinned({ pinList: pinnedResult })
    } else {
      setPinnedContent([])
    }
  }, [pinnedResult, fetchPinned])

  const filoSections = useMemo(
    () => [
      {
        name: 'pin',
        content: pinnedContent,
        removeFn: unpinContent,
        removePending: unpinContentPending,
      },
      {
        name: 'save',
        content: savedContent,
        removeFn: removeContent,
        removePending: removeContentPending,
      },
      { name: 'history', content: null },
      { name: 'lists', content: null },
    ],
    [
      savedContent,
      removeContent,
      removeContentPending,
      pinnedContent,
      unpinContent,
      unpinContentPending,
    ],
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby="Filo content"
        className="flex h-[560px] flex-col gap-2 border-2 border-black bg-primary-blue p-4 sm:p-6"
        closeButtonStyles="hidden"
      >
        <FiloDialogHeader setOpen={setOpen} />

        <DialogDescription className="sr-only">
          A list of tabs that filo content when clicked
        </DialogDescription>

        <Tabs defaultValue={section} className="flex min-h-0 w-full flex-1 flex-col">
          <TabsList className="flex h-fit w-full flex-wrap gap-2 bg-black py-2">
            {filoSections?.map((section, index) => {
              return (
                <TabsTrigger
                  key={section.name}
                  value={section.name}
                  className={cn(
                    'bg-white capitalize text-black',
                    'aria-[selected=false]:hover:bg-secondary-blue aria-[selected=false]:hover:text-white data-[state=active]:bg-secondary-blue data-[state=active]:text-white',
                  )}
                >
                  {section.name || `Section ${index + 1}`}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {filoSections?.map((section, index) => {
            return (
              <TabsContent
                key={section.name + index}
                value={section.name}
                className="custom-scrollbar relative mx-auto w-full flex-1 overflow-y-scroll p-0"
              >
                <div className="flex h-full w-full flex-wrap justify-center gap-6 pl-2 text-white sm:justify-start">
                  {section?.content?.map((content) => {
                    return (
                      <FiloContentCard
                        key={content.id}
                        content={content}
                        removeFn={section.removeFn}
                        pending={section.removePending}
                        name={section.name}
                      />
                    )
                  })}

                  {fetchSavedIsPending ||
                    (fetchPinnedIsPending && (
                      <div className="mt-4 flex w-full items-center justify-center">
                        <Spinner className="h-12 w-12" />
                      </div>
                    ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
