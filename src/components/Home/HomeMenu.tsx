import { cn } from '@/utilities/ui'
import React from 'react'
import DropdownMenu from '../DropdownMenu'
import { RightMenu } from '../../features/shared/components/RightMenu'

const itemStyles = 'hover:text-secondary-blue cursor-pointer'

const menuItems = ['pinned', 'loved', 'saved', 'history', 'lists', 'shared']

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
          {menuItems.map((item, index) => (
            <li className={itemStyles} key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={cn('flex justify-between gap-2 px-1 pt-1', 'lg:pt-2 xl:hidden')}>
        <DropdownMenu label="Menu">
          <ul className="list-inside list-disc space-y-6 font-serif uppercase text-white">
            {menuItems.map((item, index) => (
              <li className={itemStyles} key={index}>
                {item}
              </li>
            ))}
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
