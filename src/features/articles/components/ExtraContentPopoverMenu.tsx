import { Button } from '@/components/ui/button'
import { PopoverContent } from '@/components/ui/popover'

type MenuItem = {
  name: string
  onClick: () => void
  disabled: boolean
}

export type ExtraContentPopoverMenuProps = {
  menuItems: MenuItem[]
}

export function ExtraContentPopoverMenu({ menuItems }: ExtraContentPopoverMenuProps) {
  return (
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
  )
}
