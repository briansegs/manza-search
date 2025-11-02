'use client'

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFilo } from '@/providers/FiloProvider'
import { cn } from '@/utilities/ui'
import { api } from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { fetchSavedContent } from '@/actions/fetchSavedContent'
import { useAction } from 'next-safe-action/hooks'
import { Article, ArticleMedia, Book } from '@/payload-types'
import { parseActionError } from '@/utilities/parseActionError'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { Media } from '@/components/Media'
import MissingImage from '@/components/ImageMissing'
import { RenderMedia } from '../shared/components/RenderMedia'
import { ImagePlaceholder } from '../shared/components/ImagePlaceholder'
import { Button } from '@/components/ui/button'
import { FiloDialogHeader } from './FiloDialogHeader'

export type ArticleWithType = Article & {
  type: 'article'
}

export type ArticleMediaWithType = ArticleMedia & {
  type: 'image'
}

export type BookWithType = Book & {
  type: 'book'
}

export type FiloContent = ArticleWithType | ArticleMediaWithType | BookWithType

export function FiloDialog() {
  const { open, setOpen, section } = useFilo()

  const [savedContent, setSavedContent] = useState<FiloContent[]>([])

  const savedResult = useQuery(api.saves.getSaved)

  const saveList = useMemo(() => {
    if (!savedResult) return null
    return savedResult
  }, [savedResult])

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
    if (saveList?.length) {
      execute({ saveList })
    }
  }, [saveList, execute])

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
        className="flex h-[560px] flex-col gap-2 border-2 border-black bg-primary-blue"
        closeButtonStyles="hidden"
      >
        <FiloDialogHeader setOpen={setOpen} />

        <DialogDescription className="sr-only">
          A list of tabs that filo content when clicked
        </DialogDescription>

        <Tabs defaultValue={section} className="flex min-h-0 w-full flex-1 flex-col">
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
              <TabsContent
                key={section.name + index}
                value={section.name}
                className="custom-scrollbar relative mx-auto w-full flex-1 overflow-y-scroll p-0"
              >
                <div className="custom-scrollbar flex h-full w-full flex-wrap gap-6 pl-2 text-white">
                  {section?.content?.map((content) => {
                    switch (content.type) {
                      case 'article':
                        return (
                          <div className="space-y-2">
                            <div className="relative h-40 w-32 overflow-hidden rounded-md border-2 border-black">
                              {content.heroImage && typeof content.heroImage !== 'string' ? (
                                <Media
                                  imgClassName="size-full object-cover"
                                  resource={content.heroImage}
                                  fill
                                />
                              ) : (
                                <div className="flex size-full flex-col items-center justify-center overflow-hidden rounded-md bg-card text-black">
                                  <MissingImage />
                                </div>
                              )}

                              <RemoveFiloItemButton onClick={() => {}} />
                            </div>

                            <div className="w-32 truncate text-center text-lg">{content.title}</div>
                          </div>
                        )
                      case 'image':
                        return (
                          <div className="space-y-2">
                            <div
                              key={content.id}
                              className="relative h-40 w-32 overflow-hidden rounded-md border-2 border-black"
                            >
                              {content ? <RenderMedia media={content} /> : <ImagePlaceholder />}

                              <RemoveFiloItemButton onClick={() => {}} />
                            </div>

                            <div className="w-32 truncate text-center text-lg">{content.alt}</div>
                          </div>
                        )
                      case 'book':
                        return (
                          <div className="space-y-2">
                            <div
                              key={content.id}
                              className="relative h-40 w-32 overflow-hidden rounded-md border-2 border-black"
                            >
                              {typeof content?.content?.cover !== 'string' &&
                              content?.content?.cover ? (
                                <RenderMedia media={content.content.cover} />
                              ) : (
                                <div className="flex size-full flex-col items-center justify-center overflow-hidden rounded-md bg-card text-black">
                                  <MissingImage />
                                </div>
                              )}

                              <RemoveFiloItemButton onClick={() => {}} />
                            </div>

                            <div className="w-32 truncate text-center text-lg">{content.title}</div>
                          </div>
                        )
                      default:
                        return null
                    }
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

export type RemoveFiloItemButtonProps = {
  onClick: () => void
}

export function RemoveFiloItemButton({ onClick }: RemoveFiloItemButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="absolute right-1 top-1 size-8 rounded-full bg-black/50 p-1 text-white"
    >
      <X className="size-5" />
    </Button>
  )
}
