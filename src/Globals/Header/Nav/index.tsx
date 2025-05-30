'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <div className="hidden h-16 bg-black lg:flex">
      <div className="container flex w-2/3 min-w-fit items-center justify-center overflow-x-auto rounded-b-xl border-4 border-black bg-secondary-blue">
        <nav className="container flex w-full items-center justify-around gap-2">
          <Button
            className="font-serif text-lg uppercase text-white hover:text-blue-800 hover:no-underline xl:text-xl"
            variant="link"
            size="clear"
          >
            Start
          </Button>

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

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="font-serif text-lg uppercase text-white hover:text-blue-800 hover:no-underline xl:text-xl"
                variant="link"
                size="clear"
              >
                More
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                'rounded-lg border-2 border-black bg-menu font-serif text-white',
                'h-28',
              )}
            >
              Content...
            </PopoverContent>
          </Popover>
        </nav>
      </div>
    </div>
  )
}

export const MobileHeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <div className="flex bg-secondary-blue p-4">
      <nav className="container flex w-full flex-col items-center justify-between gap-2">
        <Button
          className="font-serif text-lg uppercase text-white hover:text-blue-800 hover:no-underline xl:text-xl"
          variant="link"
          size="clear"
        >
          Start
        </Button>

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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="font-serif text-lg uppercase text-white hover:text-blue-800 hover:no-underline xl:text-xl"
              variant="link"
              size="clear"
            >
              More
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn('rounded-lg border-2 border-black bg-menu font-serif text-white', 'h-28')}
          >
            Content...
          </PopoverContent>
        </Popover>
      </nav>
    </div>
  )
}
