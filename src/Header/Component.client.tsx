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
    <header className="flex h-16 bg-header text-white" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container flex items-center justify-between py-2">
        <Link href="/">
          <Logo loading="eager" priority="high" src="/manzaSearch-logo-long.png" />
        </Link>

        <div className="prose mx-auto max-w-[30rem] flex-grow text-center dark:prose-invert">
          <Search />
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
            <span className="mx-2 h-5 w-[2px] bg-gray-300/70" />
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
