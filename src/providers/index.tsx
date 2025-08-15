import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from './ConvexClientProvider'
import { Toaster } from '@/components/ui/sonner'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ClerkProvider afterSignOutUrl="/signin">
      <ConvexClientProvider>
        <ThemeProvider>
          <HeaderThemeProvider>
            <TooltipProvider>
              {children}
              <Toaster richColors />
            </TooltipProvider>
          </HeaderThemeProvider>
        </ThemeProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  )
}
