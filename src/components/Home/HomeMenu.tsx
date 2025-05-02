import { cn } from '@/utilities/ui'
import React from 'react'
import DropdownMenu from '../Article/TopMenu/DropdownMenu'
import { RightMenu } from '../Article/RightMenuContainer'

const itemStyles = 'hover:text-secondary-blue cursor-pointer'

const HomeMenu: React.FC = () => {
  return (
    <div>
      <div
        className={cn(
          'mt-2 hidden h-[588px] w-52 bg-menu font-serif text-white',
          'xl:mt-20 xl:block',
        )}
      >
        <div className="p-1">Menu</div>
        <ul className="list-inside list-disc space-y-6 pl-6 pt-6 uppercase">
          <li className={itemStyles}>pinned</li>
          <li className={itemStyles}>loved</li>
          <li className={itemStyles}>saved</li>
          <li className={itemStyles}>history</li>
          <li className={itemStyles}>lists</li>
          <li className={itemStyles}>shared</li>
        </ul>
      </div>

      <div className="flex gap-2 pl-2 pt-2 xl:hidden">
        <DropdownMenu label="Menu">
          <ul className="list-inside list-disc space-y-6 font-serif uppercase text-white">
            <li className={itemStyles}>pinned</li>
            <li className={itemStyles}>loved</li>
            <li className={itemStyles}>saved</li>
            <li className={itemStyles}>history</li>
            <li className={itemStyles}>lists</li>
            <li className={itemStyles}>shared</li>
          </ul>
        </DropdownMenu>

        <div className="block sm:hidden">
          <RightMenu />
        </div>
      </div>
    </div>
  )
}

export default HomeMenu
