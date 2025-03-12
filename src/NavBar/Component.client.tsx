'use client'

import React from 'react'
import type { NavBar } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface NavBarClientProps {
  data: NavBar
}

export const NavBarClient: React.FC<NavBarClientProps> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <div className="flex h-16 bg-black">
      <div className="container flex w-2/3 items-center justify-between rounded-b-xl border-4 border-black bg-navBar">
        <nav className="flex w-full items-center justify-center gap-8">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="font-serif text-xl uppercase text-white hover:text-black hover:no-underline"
              />
            )
          })}
        </nav>
      </div>
    </div>
  )
}
