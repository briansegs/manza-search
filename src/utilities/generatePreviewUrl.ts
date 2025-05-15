export const generatePreviewUrl =
  (slug: string) =>
  (doc: Record<string, unknown>, { locale: _ }: { locale?: string } = {}) => {
    const encodedParams = new URLSearchParams({
      slug,
      collection: slug,
      path: `/${slug !== 'home' ? slug : ''}`,
      previewSecret: process.env.PREVIEW_SECRET || '',
    })

    return `/next/preview?${encodedParams.toString()}`
  }
