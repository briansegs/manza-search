'use client'

/**
 * 'use client' Scrolls the window to the top position.
 */
export default function scrollToTop(): void {
  if (typeof window === 'undefined' || !window.scrollTo) return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
