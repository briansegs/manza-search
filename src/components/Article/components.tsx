import { Button } from '../ui/button'

export const MenuButtonDark = ({ name }: { name: string }) => (
  <Button className="bg-black font-sans text-sm hover:bg-white hover:text-black">{name}</Button>
)

export const MenuButtonLight = ({ name }: { name: string }) => (
  <Button className="bg-transparent font-serif text-lg hover:bg-transparent hover:text-navBar">
    {name}
  </Button>
)
