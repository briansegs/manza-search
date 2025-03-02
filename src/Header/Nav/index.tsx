'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-3 text-white">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className="text-white" />
      })}
      <Link href="/shopping-cart">
        <span className="sr-only">Shopping cart</span>
        <ShoppingCart className="w-5" />
      </Link>
    </nav>
  )
}
