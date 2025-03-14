import React from 'react'
import { MenuButtonDark, MenuButtonLight } from './components'

const TopMenu = () => {
  return (
    <div className="sticky top-0 z-10 ml-auto hidden h-20 w-[750px] items-center justify-center rounded-xl border-4 border-black bg-menu-primary hover:bg-black lg:flex">
      <div className="flex">
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
    </div>
  )
}

export default TopMenu
