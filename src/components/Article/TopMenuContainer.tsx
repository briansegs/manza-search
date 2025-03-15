import React from 'react'
import { MenuButtonDark, MenuButtonLight } from './components'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '../ui/button'
import { LeftMenu } from './LeftMenuContainer'
import { ChevronDown } from 'lucide-react'

const TopMenu = ({ styles }: { styles?: string }) => (
  <div className={`${styles} flex`}>
    <MenuButtonLight name="TOP" />
    <MenuButtonLight name="HIGHLIGHT" />
    <MenuButtonLight name="LOVE" />
    <MenuButtonLight name="PIN" />
    <MenuButtonLight name="SAVE" />
    <MenuButtonLight name="History" />
    <MenuButtonLight name="RM" />
    <MenuButtonLight name="LIST" />

    <MenuButtonDark name="SHARE" />
  </div>
)

const TopMenuContainer = () => {
  return (
    <div className="sticky top-0 z-10">
      <div className="ml-auto hidden h-20 w-[750px] items-center justify-center rounded-xl border-4 border-black bg-menu-primary hover:bg-black lg:flex">
        <TopMenu />
      </div>

      <div className="sticky top-0 z-10 ml-auto flex gap-4 pl-1 lg:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex gap-2 rounded-xl border-4 border-black bg-menu-primary hover:bg-black">
              <ChevronDown /> Resources
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit rounded-xl border-4 border-black bg-menu-primary hover:bg-black lg:hidden">
            <LeftMenu />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex gap-2 rounded-xl border-4 border-black bg-menu-primary hover:bg-black">
              <ChevronDown /> Actions
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit rounded-xl border-4 border-black bg-menu-primary hover:bg-black lg:hidden">
            <TopMenu styles="flex-col items-center" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default TopMenuContainer
