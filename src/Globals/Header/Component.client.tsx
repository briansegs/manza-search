'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav, MobileHeaderNav } from './Nav/HeaderNav'

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Search } from '@/search/Component'
import { Menu, ShoppingCart, User } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function HeaderClient({ data }: { data: Header }) {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

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
        className="flex h-16 bg-primary-blue text-white"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container flex items-center justify-between py-2">
          <Link href="/">
            <Logo loading="eager" priority="high" src="/manzaSearch-logo-long.png" />
          </Link>

          <div className="prose mx-auto hidden max-w-[30rem] flex-grow text-center lg:block">
            <Search />
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <Link href="/settings">Settings</Link>
            <Link href="/shopping-cart">
              <span className="sr-only">Shopping cart</span>
              <ShoppingCart className="w-5" />
            </Link>

            <div className="flex h-9 w-[50px] items-center justify-center">
              <ClerkLoading>
                <p>Sign in</p>
              </ClerkLoading>

              <ClerkLoaded>
                <SignedOut>
                  <SignInButton />
                </SignedOut>

                <SignedIn>
                  <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-9 h-9' } }} />
                </SignedIn>
              </ClerkLoaded>
            </div>
          </div>

          <div className="block lg:hidden">
            <Popover>
              <PopoverTrigger>
                <Menu />
              </PopoverTrigger>
              <PopoverContent className="block overflow-hidden rounded-xl border-4 border-black bg-primary-blue p-0 lg:hidden">
                <div className="w- flex items-center justify-between gap-4 px-2 py-3 text-white">
                  <Link href="/settings">Settings</Link>

                  <div className="flex gap-4">
                    <Link href="/shopping-cart">
                      <span className="sr-only">Shopping cart</span>
                      <ShoppingCart className="w-5" />
                    </Link>

                    <SignedOut>
                      <SignInButton />
                    </SignedOut>

                    <SignedIn>
                      <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-9 h-9' } }} />
                    </SignedIn>
                  </div>
                </div>

                <div className="bg-black px-2 py-2">
                  <div className="mx-auto w-64">
                    <Search />
                  </div>
                </div>

                <MobileHeaderNav data={data} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <HeaderNav data={data} />
    </>
  )
}
