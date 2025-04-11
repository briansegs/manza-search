import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'
import React from 'react'

const buttonStyles =
  'size-14 rounded-full border-4 border-black font-serif text-white shadow-[10px_10px_10px_black] hover:text-white/50'

interface MOMuneButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const MOMuneButton: React.FC<MOMuneButtonProps> = ({ className, ...props }) => (
  <button className={cn(buttonStyles, className)} {...props} />
)

const MoreOptions: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bottom-2 right-2 block h-fit rounded-[8px] border-2 border-white bg-menu px-2 py-0 hover:bg-black sm:absolute">
          MO
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={'left'}
        sideOffset={80}
        className="mt-12 flex h-64 w-fit gap-2 border-0 bg-transparent p-0 shadow-none sm:mt-0"
      >
        <div className="flex w-[90px] flex-col justify-between gap-2 py-9">
          <MOMuneButton className="self-end bg-[#0011ff]">P</MOMuneButton>
          <MOMuneButton className="bg-[#ff1c00]">M</MOMuneButton>
          <MOMuneButton className="self-end bg-[#8a1384]">E</MOMuneButton>
        </div>

        <div className="flex flex-col justify-between py-1.5">
          <MOMuneButton className="bg-[#ffc8ce]">S</MOMuneButton>
          <MOMuneButton className="bg-[#006c00]">K</MOMuneButton>
        </div>

        <div className="h-60">
          <MOMuneButton className="ml-1 bg-[#0011ff]">B</MOMuneButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default MoreOptions
