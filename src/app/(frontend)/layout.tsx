import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Globals/Footer/Component'
import { Header } from '@/Globals/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from '@/providers/ConvexClientProvider'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html
          className={cn(GeistSans.variable, GeistMono.variable)}
          lang="en"
          suppressHydrationWarning
        >
          <head>
            <InitTheme />
            <link href="/favicon.ico" rel="icon" sizes="32x32" />
            <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          </head>
          <body>
            <Providers>
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />

              <Header />
              {children}
              <Footer />
            </Providers>
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
}
