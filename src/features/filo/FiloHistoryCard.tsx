import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { ImageOff, X } from 'lucide-react'
import { FiloHistoryCardProps } from './types'
import React from 'react'
import { Media } from '@/components/Media'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'

export function FiloHistoryCard({ historyContent, index, section }: FiloHistoryCardProps) {
  const { article } = historyContent

  async function handleRemove() {
    const removeFn = section.removeFn

    try {
      if (removeFn) {
        await removeFn({ visitId: historyContent._id })
        toast.success('Entry removed!')
      }
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
    }
  }

  let mediaElement: React.ReactNode = (
    <div className="flex h-full items-center justify-center bg-white p-0 text-black">
      <ImageOff />
    </div>
  )

  if (article?.heroImage && typeof article.heroImage !== 'string') {
    mediaElement = <Media imgClassName="size-full object-cover" resource={article.heroImage} fill />
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-2 px-4">
        <div className="flex gap-2">
          <div className="relative h-12 w-12 border border-black">{mediaElement}</div>

          <div>
            <div>{article?.title} </div>
            <div>{`Visited: ${format(historyContent._creationTime, 'MM/dd/yyyy @ h:mm a')}`}</div>
          </div>
        </div>

        <Button
          onClick={handleRemove}
          disabled={section.pending}
          size="icon"
          className="size-8 cursor-pointer rounded-full bg-black/50 p-1 text-white"
        >
          <X className="size-5" />
        </Button>
      </div>

      {index !== section.content.length - 1 && <Separator />}
    </div>
  )
}
