import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function ImageExtraContentButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="absolute bottom-2 right-2 h-fit rounded-full bg-red-600 px-2.5 py-1">
          e
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex w-fit flex-col items-center border-2 border-black">
        <div className="font-serif text-lg font-bold text-secondary-blue">Extra Content</div>
        <ul className="flex flex-col items-center">
          <li>
            <Button variant="ghost" className="font-serif font-bold">
              pin
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="font-serif font-bold">
              save
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="font-serif font-bold">
              download
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="font-serif font-bold">
              share
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
