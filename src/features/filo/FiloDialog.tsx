'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFilo } from '@/providers/FiloProvider'
import { cn } from '@/utilities/ui'
import { api } from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { fetchSavedContent } from '@/actions/fetchSavedContent'
import { useAction } from 'next-safe-action/hooks'
import { Article } from '@/payload-types'
import { parseActionError } from '@/utilities/parseActionError'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

export type ArticleWithType = Article & {
  type: string
}

export function FiloDialog() {
  const { open, setOpen, section } = useFilo()

  const [savedContent, setSavedContent] = useState<ArticleWithType[]>([])

  const savedList = useQuery(api.saves.getSaved)

  const savedIds = useMemo(() => {
    if (!savedList) return null
    return savedList?.map((item) => item.contentId)
  }, [savedList])

  const { execute, result, isPending } = useAction(fetchSavedContent, {
    onSuccess: () => {
      setSavedContent(result.data || [])
    },
    onError: (actionError) => {
      const errorMsg = parseActionError(actionError.error)

      console.error(errorMsg)
      toast.error(errorMsg)
    },
  })

  useEffect(() => {
    if (savedIds?.length) {
      execute({ savedIds })
    }
  }, [savedIds, execute])

  const filoSections = useMemo(
    () => [
      { name: 'pin', conent: null },
      { name: 'save', content: savedContent },
      { name: 'history', content: null },
      { name: 'lists', content: null },
    ],
    [savedContent],
  )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby="Filo content"
        className="custom-scrollbar flex h-[500px] flex-col gap-2 overflow-y-auto border-2 border-black bg-primary-blue"
        closeButtonStyles="hidden"
      >
        <DialogHeader className="flex w-full flex-row items-center justify-between text-white">
          <DialogTitle className="uppercase">Filo</DialogTitle>

          <Search />

          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </DialogHeader>

        <DialogDescription className="sr-only">
          A list of tabs that filo content when clicked
        </DialogDescription>

        <Tabs defaultValue={section}>
          <TabsList className="h-fit w-full flex-wrap gap-2 bg-black py-2">
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
              <TabsContent key={section.name + index} value={section.name} className="mx-auto">
                <div className="text-white">
                  {section?.content?.map((content) => {
                    return <div key={content.id}>{`${content.type}, ${content.slug}`}</div>
                  })}

                  {isPending && (
                    <div className="mt-4 flex items-center justify-center gap-4">
                      <Spinner className="h-12 w-12" />
                    </div>
                  )}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
