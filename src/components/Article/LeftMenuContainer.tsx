import React from 'react'
import MenuButton, { scrollToTop } from './MenuButton'

const MenuSeparator = () => <div className="mb-2 h-1 w-full bg-black" />

export const LeftMenu = () => (
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
      <MenuButton>Authors</MenuButton>
    </div>

    <MenuSeparator />

    <div className="flex flex-col items-center">
      <MenuButton dark>OVS</MenuButton>
    </div>
  </>
)

const LeftMenuContainer = () => {
  return (
    <div className="sticky top-0 hidden h-[650px] w-28 flex-col rounded-r-xl border-4 border-black bg-menu-primary py-4 hover:bg-black lg:flex">
      <LeftMenu />
    </div>
  )
}

export default LeftMenuContainer
