import React from 'react'
import { MenuButton } from './components'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '../ui/button'
import { LeftMenu } from './LeftMenuContainer'
import { ChevronDown } from 'lucide-react'
import { RightMenu } from './RightMenuContainer'

const TopMenu = ({ styles }: { styles?: string }) => (
  <div className={`${styles} flex`}>
    <MenuButton scroll light>
      TOP
    </MenuButton>
    <MenuButton light>HIGHLIGHT</MenuButton>
    <MenuButton light>LOVE</MenuButton>
    <MenuButton light>PIN</MenuButton>
    <MenuButton light>SAVE</MenuButton>
    <MenuButton light>History</MenuButton>
    <MenuButton light>RM</MenuButton>
    <MenuButton light>LIST</MenuButton>

    <MenuButton dark>SHARE</MenuButton>
  </div>
)

const TopMenuContainer = () => {
  return (
    <div className="sticky top-0 z-10">
      <div className="ml-auto hidden h-20 w-[750px] items-center justify-center rounded-xl border-4 border-black bg-menu-primary hover:bg-black lg:flex">
        <TopMenu />
      </div>

      <div className="sticky top-0 z-10 ml-auto flex justify-between px-1 lg:hidden">
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex gap-2 rounded-xl border-4 border-black bg-menu-primary hover:bg-black">
                Resources <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit rounded-xl border-4 border-black bg-menu-primary hover:bg-black lg:hidden">
              <LeftMenu />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex gap-2 rounded-xl border-4 border-black bg-menu-primary hover:bg-black">
                Actions <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit rounded-xl border-4 border-black bg-menu-primary hover:bg-black lg:hidden">
              <TopMenu styles="flex-col items-center" />
            </PopoverContent>
          </Popover>
        </div>

        <div className="block sm:hidden">
          <RightMenu />
        </div>
      </div>
    </div>
  )
}

export default TopMenuContainer
