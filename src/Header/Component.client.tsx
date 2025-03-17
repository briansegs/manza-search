'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Search } from '@/search/Component'
import { ShoppingCart } from 'lucide-react'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const navItems = data?.navItems || []

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      <header
        className="flex h-16 bg-header text-white"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container flex items-center justify-between py-2">
          <Link href="/">
            <Logo loading="eager" priority="high" src="/manzaSearch-logo-long.png" />
          </Link>

          <div className="prose mx-auto hidden max-w-[30rem] flex-grow text-center dark:prose-invert lg:block">
            <Search />
          </div>

          <div className="flex items-center gap-4">
            <Link href="/settings">Settings</Link>
            <Link href="/shopping-cart">
              <span className="sr-only">Shopping cart</span>
              <ShoppingCart className="w-5" />
            </Link>

            <SignedOut>
              <SignInButton />
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

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
    </>
  )
}
