import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { TooltipProvider } from '@/features/shared/components/ui/tooltip'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from './ConvexClientProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <ThemeProvider>
          <HeaderThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </HeaderThemeProvider>
        </ThemeProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  )
}
