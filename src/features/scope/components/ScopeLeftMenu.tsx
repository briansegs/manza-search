import { ScrollToSection } from '@/features/shared/components/ScrollToSection'
import scrollToTop from '@/utilities/scrollToTop'
import { cn } from '@/utilities/ui'
import React from 'react'
import { LeftMenuProps } from '../types'

export function ScopeLeftMenu({ categories }: LeftMenuProps) {
  return (
    <ul
      className={cn(
        'flex flex-col gap-2',
        'font-serif text-white',
        'px-4',
        'custom-scrollbar overflow-auto',
      )}
    >
      <li>
        <button onClick={scrollToTop} className="hover:text-secondary-blue">
          TOP
        </button>
      </li>

      {categories.map(({ id, slug, title }) => (
        <li key={id} className="hover:text-secondary-blue">
          <ScrollToSection className="max-w-[107px] truncate capitalize" id={slug ?? ''}>
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
