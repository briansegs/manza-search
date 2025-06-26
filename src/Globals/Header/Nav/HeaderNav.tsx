'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export function HeaderNav({ data }: { data: HeaderType }) {
  const navItems = data?.navItems || []

  return (
    <div className="hidden h-16 bg-black lg:flex">
      <div className="container flex w-2/3 min-w-fit items-center justify-center overflow-x-auto rounded-b-xl border-4 border-black bg-secondary-blue">
        <nav className="container flex w-full items-center justify-around gap-2">
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

export function MobileHeaderNav({ data }: { data: HeaderType }) {
  const navItems = data?.navItems || []

  return (
    <div className="flex bg-secondary-blue p-4">
      <nav className="container flex w-full flex-col items-center justify-between gap-2">
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
  )
}
