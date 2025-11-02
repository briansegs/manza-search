import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { ExtraContentPopoverMenu } from '../ExtraContentPopoverMenu'
import { BookCardButton } from './BookCardButton'
import { Book } from '@/payload-types'
import { useAuth } from '@clerk/nextjs'

export type BookExtraContentButtonProps = {
  book: Book
}

export function BookExtraContentButton({ book }: BookExtraContentButtonProps) {
  const { isSignedIn } = useAuth()

  async function handleSave() {
    console.log('book: ', book)
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
      disabled: !isSignedIn,
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
