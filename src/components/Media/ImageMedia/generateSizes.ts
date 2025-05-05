type Breakpoints = Record<string, number>
type SizeMap = Partial<Record<keyof Breakpoints, string>>

/**
 * Turn Tailwind‐style breakpoints into a `sizes` string.
 *
 * @param breakpoints – tailwind numbers, e.g. { sm:640, md:768, … }
 * @param sizeAtBp     – optional override map:  at md use "50vw", at lg use "33vw", etc.
 * @param fallback     – final fallback if no media query matches (e.g. "100vw" or "400px")
 */
export function generateSizes(
  breakpoints: Breakpoints,
  sizeAtBp: SizeMap = {},
  fallback = '100vw',
): string {
  // 1) sort ascending by pixel width
  const entries = Object.entries(breakpoints).sort(([, a], [, b]) => a - b) as [
    keyof Breakpoints,
    number,
  ][]

  // 2) map into "(max-width: XXXpx) YYY" pieces
  const parts = entries.map(([bpName, px]) => {
    // if user passed a custom value for this bp, use it; otherwise default to 100vw
    const sz = sizeAtBp[bpName] ?? '100vw'
    return `(max-width: ${px}px) ${sz}`
  })

  // 3) tack on the global fallback
  parts.push(fallback)

  return parts.join(', ')
}
