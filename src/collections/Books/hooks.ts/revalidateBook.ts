import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { Book } from '@/payload-types'

export const revalidateBook: CollectionAfterChangeHook<Book> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Find all articles that reference this book
    const articles = await payload.find({
      collection: 'articles',
      where: {
        books: { contains: doc.id },
      },
      select: { slug: true },
      limit: 1000,
      overrideAccess: false,
    })

    for (const article of articles.docs) {
      const path = `/articles/${article.slug}`

      payload.logger.info(`Revalidating article due to book change at path: ${path}`)

      revalidatePath(path)
      revalidateTag('articles-sitemap')
    }
  }

  return doc
}

export const revalidateDeleteBook: CollectionAfterDeleteHook<Book> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Same lookup in case the book was deleted
    const articles = await payload.find({
      collection: 'articles',
      where: {
        books: { contains: doc.id },
      },
      select: { slug: true },
      limit: 1000,
      overrideAccess: false,
    })

    for (const article of articles.docs) {
      const path = `/articles/${article.slug}`

      payload.logger.info(`Revalidating article due to book deletion at path: ${path}`)

      revalidatePath(path)
      revalidateTag('articles-sitemap')
    }
  }

  return doc
}
