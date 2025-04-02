import React from 'react'
import { MenuButton } from './components'

export const LeftMenu = () => (
  <>
    <div className="flex flex-col items-center gap-4">
      <MenuButton scroll light>
        TOP
      </MenuButton>
      <MenuButton light>IMG</MenuButton>
      <MenuButton light>VIDS</MenuButton>
    </div>

    <div className="mb-2 h-1 w-full bg-black" />

    <div className="flex flex-col items-center gap-4">
      <MenuButton dark>TBL</MenuButton>

      <MenuButton light>Articles</MenuButton>
      <MenuButton light>SHOP</MenuButton>
      <MenuButton light>Authors</MenuButton>
    </div>

    <div className="mb-2 h-1 w-full bg-black" />

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
