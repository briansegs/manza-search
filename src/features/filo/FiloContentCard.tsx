import { Media } from '@/components/Media'
import { RenderMedia } from '../shared/components/RenderMedia'
import { ImagePlaceholder } from '../shared/components/ImagePlaceholder'
import { FiloContent } from './FiloDialog'
import { RemoveFiloItemButton } from './RemoveFiloItemButton'
import { useMutationState } from '../messenger/hooks/useMutationState'
import { api } from '../../../convex/_generated/api'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'

export type FiloContentCardProps = {
  content: FiloContent
}

export function FiloContentCard({ content }: FiloContentCardProps) {
  const { mutate: removeContent, pending: removeContentPending } = useMutationState(
    api.save.unsaveContent,
  )

  async function handleRemove() {
    try {
      await removeContent({ contentId: content.id })
      toast.success('Content removed!')
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
    }
  }

  let mediaElement: React.ReactNode = <ImagePlaceholder className="p-0 text-black" />
  let label: string = `${content.type}`

  switch (content.type) {
    case 'article':
      if (content.heroImage && typeof content.heroImage !== 'string') {
        mediaElement = (
          <Media imgClassName="size-full object-cover" resource={content.heroImage} fill />
        )
      }

      label = content.title
      break

    case 'image':
      mediaElement = <RenderMedia media={content} />

      label = content.alt
      break

    case 'book':
      if (content?.content?.cover && typeof content?.content?.cover !== 'string') {
        mediaElement = <RenderMedia media={content.content.cover} />
      }

      label = content.title
      break
  }

  return (
    <div className="space-y-2">
      <div className="relative h-40 w-32 overflow-hidden rounded-md border-2 border-black">
        {mediaElement}

        <RemoveFiloItemButton onClick={handleRemove} disabled={removeContentPending} />
      </div>

      <div className="w-32 truncate text-center text-lg">{label}</div>
    </div>
  )
}
