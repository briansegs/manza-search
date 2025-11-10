import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { useMutationState } from '@/hooks/useMutationState'
import { ArticleMedia } from '@/payload-types'
import { useAuth } from '@clerk/nextjs'
import { api } from '../../../../../convex/_generated/api'
import { ConvexError } from 'convex/values'
import { toast } from 'sonner'
import { ExtraContentPopoverMenu } from '../ExtraContentPopoverMenu'

export type ImageExtraContentButtonProps = {
  image: string | null | ArticleMedia
}

export function ImageExtraContentButton({ image }: ImageExtraContentButtonProps) {
  const { mutate: saveImage, pending: saveImagePending } = useMutationState(api.save.saveContent)
  const { mutate: pinImage, pending: pinImagePending } = useMutationState(api.pin.pinContent)
  const { isSignedIn } = useAuth()

  async function handleSave() {
    if (typeof image === 'object' && image?.id)
      await saveImage({ contentId: image?.id, contentType: 'image' })
        .then(() => {
          toast.success('Image saved!')
        })
        .catch((error) => {
          toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
        })
  }

  async function handlePin() {
    if (typeof image === 'object' && image?.id)
      await pinImage({ contentId: image?.id, contentType: 'image' })
        .then(() => {
          toast.success('Image pinned!')
        })
        .catch((error) => {
          toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
        })
  }

  const menuItems = [
    {
      name: 'pin',
      onClick: handlePin,
      disabled: !isSignedIn || pinImagePending,
    },
    {
      name: 'save',
      onClick: handleSave,
      disabled: !isSignedIn || saveImagePending,
    },
    {
      name: 'download',
      onClick: () => {},
      disabled: true,
    },
    {
      name: 'share',
      onClick: () => {},
      disabled: true,
    },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="absolute bottom-2 right-2 h-fit rounded-full bg-red-600 px-2.5 py-1">
          e
        </Button>
      </PopoverTrigger>

      <ExtraContentPopoverMenu menuItems={menuItems} />
    </Popover>
  )
}
