import { useMemo } from 'react'
import useWindowSize from './useWindowSize'

// Tailwind-style breakpoints
const tailwindBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'largeDesktop'

export default function useBreakpoint() {
  const { width } = useWindowSize()

  // SSR-safe width fallback
  const safeWidth = typeof window === 'undefined' ? 0 : width

  // Memoize to avoid unnecessary re-renders
  return useMemo(() => {
    const isMobileSM = safeWidth < tailwindBreakpoints.sm
    const isMobile = safeWidth < tailwindBreakpoints.md
    const isTablet = safeWidth >= tailwindBreakpoints.md && safeWidth < tailwindBreakpoints.lg
    const isDesktop = safeWidth >= tailwindBreakpoints.lg && safeWidth < tailwindBreakpoints.xl
    const isLargeDesktop = safeWidth >= tailwindBreakpoints.xl

    let breakpoint: Breakpoint = 'mobile'
    if (isTablet) breakpoint = 'tablet'
    else if (isDesktop) breakpoint = 'desktop'
    else if (isLargeDesktop) breakpoint = 'largeDesktop'

    return {
      width: safeWidth,
      isMobileSM,
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      breakpoint,
    }
  }, [safeWidth])
}
