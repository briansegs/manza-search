// Keep these in sync with the CSS variables in your tailwind configuration

export const cssVariables = {
  breakpoints: {
    '3xl': 1920,
    '2xl': 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
  },
}

// choose how wide your image _actually_ is at each bp:
export const sizeMap = {
  sm: '100vw', // on viewports ≤640px, image is full width
  md: '90vw', // on ≤768px, maybe it has 5% side padding
  lg: '50vw', // on ≤1024px (two-col), it spans half
  xl: '33vw', // on ≤1280px (three-col), one third
  '2xl': '25vw', // on ≤1536px (four-col), one quarter
  '3xl': '20vw', // on ≤1920px (five-col), one fifth
}
