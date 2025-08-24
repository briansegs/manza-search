import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateArticleAds: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating article ads`)

    revalidateTag(`global_${doc.globalType}`)
    revalidateTag('articles-sitemap')
    revalidatePath('/articles')
  }

  return doc
}
