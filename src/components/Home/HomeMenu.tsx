import React from 'react'

const itemStyles = 'hover:text-secondary-blue cursor-pointer'

const HomeMenu: React.FC = () => {
  return (
    <div className="mt-20 w-52 bg-menu font-serif text-white">
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
  )
}

export default HomeMenu
