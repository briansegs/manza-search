import React from 'react'
import { MenuButtonDark, MenuButtonLight } from './components'

export const LeftMenu = () => (
  <>
    <div className="flex flex-col items-center gap-4">
      <MenuButtonLight name="TOP" />
      <MenuButtonLight name="IMG" />
      <MenuButtonLight name="VIDS" />
    </div>

    <div className="mb-2 h-1 w-full bg-black" />

    <div className="flex flex-col items-center gap-4">
      <MenuButtonDark name="TBL" />

      <MenuButtonLight name="Articles" />
      <MenuButtonLight name="SHOP" />
      <MenuButtonLight name="Authors" />
    </div>

    <div className="mb-2 h-1 w-full bg-black" />

    <div className="flex flex-col items-center">
      <MenuButtonDark name="OVS" />
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
