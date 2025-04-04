import React from 'react'
import MenuButton from '../MenuButton'
import PopoverButton from '../PopoverButton'
import scrollToTop from '@/utilities/scrollToTop'
import { Article } from '@/payload-types'

const MenuSeparator = () => <div className="mb-2 h-1 w-full bg-black" />

interface LeftMenuProps {
  authors: string[]
  otherVerifiedSources: Article['otherVerifiedSources']
}

const LeftMenu: React.FC<LeftMenuProps> = ({ authors, otherVerifiedSources }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <MenuButton onClick={scrollToTop}>TOP</MenuButton>
        <MenuButton>IMG</MenuButton>
        <MenuButton>VIDS</MenuButton>
      </div>

      <MenuSeparator />

      <div className="flex flex-col items-center gap-4">
        <MenuButton dark>TBL</MenuButton>

        <MenuButton>Articles</MenuButton>

        <MenuButton>SHOP</MenuButton>

        <PopoverButton data={authors}>Authors</PopoverButton>
      </div>

      <MenuSeparator />

      <div className="flex flex-col items-center">
        <PopoverButton data={otherVerifiedSources} dark>
          OVS
        </PopoverButton>
      </div>
    </>
  )
}

export default LeftMenu
