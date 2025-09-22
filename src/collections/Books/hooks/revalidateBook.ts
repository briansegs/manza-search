import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { Book } from '@/payload-types'

export const revalidateBook: CollectionAfterChangeHook<Book> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Only revalidate if book is published
    if (doc._status === 'published') {
      // Revalidate the global books route
      revalidatePath('/literature')
      revalidateTag('articles-sitemap')

      // Find all articles referencing this book
      const articles = await payload.find({
        collection: 'articles',
        where: { books: { contains: doc.id } },
        select: { slug: true },
        limit: 1000,
        overrideAccess: false,
      })

      for (const article of articles.docs) {
        const path = `/articles/${article.slug}`
        payload.logger.info(`Revalidating article due to book change at path: ${path}`)
        revalidatePath(path)
      }
    }

    // If previously published book is now draft or deleted, revalidate routes too
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath('/literature')
      revalidateTag('articles-sitemap')

      const previousArticles = await payload.find({
        collection: 'articles',
        where: { books: { contains: previousDoc.id } },
        select: { slug: true },
        limit: 1000,
        overrideAccess: false,
      })

      for (const article of previousArticles.docs) {
        const path = `/articles/${article.slug}`
        payload.logger.info(`Revalidating article due to book unpublish at path: ${path}`)
        revalidatePath(path)
      }
    }
  }

  return doc
}

export const revalidateDeleteBook: CollectionAfterDeleteHook<Book> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Revalidate global books route
    revalidatePath('/literature')
    revalidateTag('articles-sitemap')

    // Find all articles that referenced the deleted book
    const articles = await payload.find({
      collection: 'articles',
      where: { books: { contains: doc.id } },
      select: { slug: true },
      limit: 1000,
      overrideAccess: false,
    })

    for (const article of articles.docs) {
      const path = `/articles/${article.slug}`
      payload.logger.info(`Revalidating article due to book deletion at path: ${path}`)
      revalidatePath(path)
    }
  }

  return doc
}
