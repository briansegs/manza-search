import React from 'react'
import MenuButton from '../MenuButton'
import AuthorsButton from './AuthorsButton'
import scrollToTop from '@/utilities/scrollToTop'

const MenuSeparator = () => <div className="mb-2 h-1 w-full bg-black" />

interface LeftMenuProps {
  authors: string[]
}

const LeftMenu: React.FC<LeftMenuProps> = ({ authors }) => {
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

        <AuthorsButton authors={authors}>Authors</AuthorsButton>
      </div>

      <MenuSeparator />

      <div className="flex flex-col items-center">
        <MenuButton dark>OVS</MenuButton>
      </div>
    </>
  )
}

export default LeftMenu
