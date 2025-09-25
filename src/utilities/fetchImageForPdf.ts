// utils/fetchImageForPdf.ts
export function fetchImageForPdf(url: string): string | null {
  try {
    if (!url) return null

    // Ensure it's a Cloudinary URL
    if (url.includes('/upload/')) {
      // f_auto = automatic format negotiation
      // q_auto = optimized quality
      // Replace extension to .png to be explicit (optional)
      const transformedUrl = url.replace('/upload/', '/upload/f_auto,q_auto/')

      return transformedUrl
    }

    // For non-Cloudinary URLs, just return as-is
    return url
  } catch (err) {
    console.error('Image URL normalization failed', err)
    return null
  }
}
