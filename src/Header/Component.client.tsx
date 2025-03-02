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

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
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
    <header
      className="bg-header flex h-16 items-center text-white"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex justify-between py-2">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>

        <div className="prose flex-grow text-center dark:prose-invert">
          <div className="mx-auto max-w-[30rem]">
            <Search />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
            {'|'}
            <SignUpButton />
          </SignedOut>

          <SignedIn>
            <HeaderNav data={data} />
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
