import React from 'react'
import MenuButton from './MenuButton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '../ui/button'
import { ChevronDown } from 'lucide-react'
import { RightMenu } from './RightMenuContainer'
import { Article } from '@/payload-types'
import getAuthorList from '@/utilities/getAuthorList'
import LeftMenu from './LeftMenu'
import scrollToTop from '@/utilities/scrollToTop'

const TopMenu = ({ styles }: { styles?: string }) => (
  <div className={`${styles} flex`}>
    <MenuButton onClick={scrollToTop}>TOP</MenuButton>
    <MenuButton>HIGHLIGHT</MenuButton>
    <MenuButton>LOVE</MenuButton>
    <MenuButton>PIN</MenuButton>
    <MenuButton>SAVE</MenuButton>
    <MenuButton>History</MenuButton>
    <MenuButton>RM</MenuButton>
    <MenuButton>LIST</MenuButton>

    <MenuButton dark>SHARE</MenuButton>
  </div>
)

interface TopMenuContainerProps {
  article: Article
}

const TopMenuContainer: React.FC<TopMenuContainerProps> = ({ article }) => {
  const { populatedAuthors, externalAuthors } = article

  const authorList = getAuthorList({ populatedAuthors, externalAuthors })

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
              <LeftMenu authors={authorList} />
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
