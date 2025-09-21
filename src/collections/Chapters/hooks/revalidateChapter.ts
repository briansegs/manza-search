// src/collections/hooks/revalidateChapter.ts
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { Chapter } from '@/payload-types'

export const revalidateChapter: CollectionAfterChangeHook<Chapter> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const revalidateBookAndArticles = async (chapterId: string) => {
      // Fetch all books (filter in JS because chapters is not queryable)
      const allBooks = await payload.find({
        collection: 'books',
        limit: 1000,
        overrideAccess: false,
      })

      const booksWithChapter = allBooks.docs.filter((book) =>
        book.content?.chapters?.includes(chapterId),
      )

      for (const book of booksWithChapter) {
        // Find all articles that reference this book
        const articles = await payload.find({
          collection: 'articles',
          where: { books: { contains: book.id } },
          select: { slug: true },
          limit: 1000,
          overrideAccess: false,
        })

        for (const article of articles.docs) {
          const path = `/articles/${article.slug}/books`
          payload.logger.info(`Revalidating article-books path due to chapter change: ${path}`)
          revalidatePath(path)
        }
      }
    }

    // Always revalidate global books/literature page
    // revalidatePath('/literature')

    // If chapter is published, revalidate related books/articles
    if (doc._status === 'published') {
      await revalidateBookAndArticles(doc.id)
      revalidatePath('/literature')
      revalidateTag('articles-sitemap')
    }

    // If chapter was previously published and is now draft/unpublished, revalidate old paths
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      await revalidateBookAndArticles(previousDoc.id)
      revalidateTag('articles-sitemap')
    }
  }

  return doc
}

export const revalidateDeleteChapter: CollectionAfterDeleteHook<Chapter> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const allBooks = await payload.find({
      collection: 'books',
      limit: 1000,
      overrideAccess: false,
    })

    const booksWithChapter = allBooks.docs.filter((book) =>
      book.content?.chapters?.includes(doc.id),
    )

    for (const book of booksWithChapter) {
      const articles = await payload.find({
        collection: 'articles',
        where: { books: { contains: book.id } },
        select: { slug: true },
        limit: 1000,
        overrideAccess: false,
      })

      for (const article of articles.docs) {
        const path = `/articles/${article.slug}/books`
        payload.logger.info(`Revalidating article-books path due to chapter deletion: ${path}`)
        revalidatePath(path)
      }
    }

    // Revalidate global literature page
    revalidatePath('/literature')
    revalidateTag('articles-sitemap')
  }

  return doc
}
