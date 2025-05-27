'use client'

import React from 'react'
import useBreakpoint from '@/hooks/useBreakpoint'
import { PopoverContent } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'

const buttonStyles =
  'size-14 rounded-full border-4 border-black font-serif text-white shadow-[10px_10px_10px_black] hover:text-white/50'

interface MOMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const MOMenuButton: React.FC<MOMenuButtonProps> = ({ className, ...props }) => (
  <button className={cn(buttonStyles, className)} {...props} />
)

const MoreOptionsContent: React.FC = () => {
  const { isMobileSM } = useBreakpoint()

  return (
    <PopoverContent
      side={isMobileSM ? 'bottom' : 'left'}
      sideOffset={isMobileSM ? 20 : 80}
      className="w-fit border-0 bg-transparent p-0 shadow-none"
    >
      {isMobileSM ? (
        <div className="mr-4 flex w-32 flex-wrap gap-2">
          <MOMenuButton className="bg-[#ffc8ce]">S</MOMenuButton>
          <MOMenuButton className="ml-1 bg-[#0011ff]">B</MOMenuButton>
          <MOMenuButton className="self-end bg-[#0011ff]">P</MOMenuButton>
          <MOMenuButton className="bg-[#ff1c00]">M</MOMenuButton>
          <MOMenuButton className="self-end bg-[#8a1384]">E</MOMenuButton>
          <MOMenuButton className="bg-[#006c00]">K</MOMenuButton>
        </div>
      ) : (
        <div className="mt-12 flex h-64 w-fit gap-2 sm:mt-0">
          <div className="flex w-[90px] flex-col justify-between gap-2 py-9">
            <MOMenuButton className="self-end bg-[#0011ff]">P</MOMenuButton>
            <MOMenuButton className="bg-[#ff1c00]">M</MOMenuButton>
            <MOMenuButton className="self-end bg-[#8a1384]">E</MOMenuButton>
          </div>

          <div className="flex flex-col justify-between py-1.5">
            <MOMenuButton className="bg-[#ffc8ce]">S</MOMenuButton>
            <MOMenuButton className="bg-[#006c00]">K</MOMenuButton>
          </div>

          <div className="h-60">
            <MOMenuButton className="ml-1 bg-[#0011ff]">B</MOMenuButton>
          </div>
        </div>
      )}
    </PopoverContent>
  )
}

export default MoreOptionsContent
