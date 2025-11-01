import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMutationState } from '@/features/messenger/hooks/useMutationState'
import { ArticleMedia } from '@/payload-types'
import { useAuth } from '@clerk/nextjs'
import { api } from 'convex/_generated/api'
import { ConvexError } from 'convex/values'
import { toast } from 'sonner'

export type ImageExtraContentButtonProps = {
  image: string | null | ArticleMedia
}

export function ImageExtraContentButton({ image }: ImageExtraContentButtonProps) {
  const { mutate: saveImage, pending: saveImagePending } = useMutationState(api.save.saveContent)
  const { isSignedIn } = useAuth()

  async function handleSave() {
    if (typeof image === 'object')
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
    },
    {
      name: 'save',
      onClick: handleSave,
      disabled: !isSignedIn || saveImagePending,
    },
    {
      name: 'download',
      onClick: () => {},
    },
    {
      name: 'share',
      onClick: () => {},
    },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="absolute bottom-2 right-2 h-fit rounded-full bg-red-600 px-2.5 py-1">
          e
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex w-40 flex-col items-center border-2 border-black">
        <div className="font-serif text-lg font-bold text-secondary-blue">Extra Content</div>
        <ul className="flex w-full flex-col items-center">
          {menuItems.map(({ name, onClick, disabled }) => {
            return (
              <li key={name} className="w-full">
                <Button
                  onClick={onClick}
                  variant="ghost"
                  className="w-full font-serif font-bold"
                  disabled={disabled}
                >
                  {name}
                </Button>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
