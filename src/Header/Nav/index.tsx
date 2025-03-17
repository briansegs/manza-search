'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <div className="flex h-16 bg-black">
      <div className="container flex w-2/3 items-center justify-between overflow-x-auto rounded-b-xl border-4 border-black bg-navBar">
        <nav className="container flex w-full items-center justify-between gap-2">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="font-serif text-lg uppercase text-white hover:text-blue-800 hover:no-underline xl:text-xl"
              />
            )
          })}
        </nav>
      </div>
    </div>
  )
}
