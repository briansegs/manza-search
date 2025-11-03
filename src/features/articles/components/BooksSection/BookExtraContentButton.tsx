import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { ExtraContentPopoverMenu } from '../ExtraContentPopoverMenu'
import { BookCardButton } from './BookCardButton'
import { useAuth } from '@clerk/nextjs'
import { api } from '../../../../../convex/_generated/api'
import { useMutationState } from '@/hooks/useMutationState'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { BookExtraContentButtonProps } from './types'

export function BookExtraContentButton({ book }: BookExtraContentButtonProps) {
  const { mutate: saveBook, pending: saveBookPending } = useMutationState(api.save.saveContent)
  const { isSignedIn } = useAuth()

  async function handleSave() {
    try {
      await saveBook({ contentId: book?.id, contentType: 'book' })
      toast.success('book saved!')
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
    }
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
      disabled: !isSignedIn || saveBookPending,
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
        <BookCardButton className="bg-red-500 hover:bg-red-500 hover:text-white">e</BookCardButton>
      </PopoverTrigger>

      <ExtraContentPopoverMenu menuItems={menuItems} />
    </Popover>
  )
}
