import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { useMutationState } from '@/features/messenger/hooks/useMutationState'
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

  const menuItems = [
    {
      name: 'pin',
      onClick: () => {},
      disabled: !isSignedIn,
    },
    {
      name: 'save',
      onClick: handleSave,
      disabled: !isSignedIn || saveImagePending,
    },
    {
      name: 'download',
      onClick: () => {},
      disabled: !isSignedIn,
    },
    {
      name: 'share',
      onClick: () => {},
      disabled: !isSignedIn,
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
