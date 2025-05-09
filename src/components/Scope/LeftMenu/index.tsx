import ScrollToSection from '@/components/ScrollToSection'
import scrollToTop from '@/utilities/scrollToTop'
import { cn } from '@/utilities/ui'
import React from 'react'
import { LeftMenuProps } from './types'

const LeftMenu: React.FC<LeftMenuProps> = ({ categories }) => {
  return (
    <ul className={cn('flex flex-col gap-2', 'font-serif text-white', 'px-4')}>
      <li>
        <button onClick={scrollToTop} className="hover:text-secondary-blue">
          TOP
        </button>
      </li>

      {categories.map(({ id, slug, title }) => (
        <li key={id} className="hover:text-secondary-blue">
          <ScrollToSection className="capitalize" id={slug ?? ''}>
            {title}
          </ScrollToSection>
        </li>
      ))}
      <li className="hover:text-secondary-blue">
        <ScrollToSection className="capitalize" id="misc">
          Miscellaneous
        </ScrollToSection>
      </li>
    </ul>
  )
}

export default LeftMenu
