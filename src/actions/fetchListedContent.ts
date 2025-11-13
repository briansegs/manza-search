'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { actionClient } from '@/lib/safe-action'
import { fetchListedContentSchema } from './schemas'
import { FiloContent } from '@/features/filo/types'

export const fetchListsContent = actionClient
  .inputSchema(fetchListedContentSchema)
  .action(async ({ parsedInput: { listItems } }) => {
    if (!listItems?.length) return []

    const payload = await getPayload({ config: configPromise })

    const enrichedLists = await Promise.all(
      listItems.map(async (list) => {
        const listedIds = list.items.map((item) => item.contentId)

        const [articles, images, books] = await Promise.all([
          payload.find({
            collection: 'articles',
            pagination: false,
            where: { id: { in: listedIds } },
            depth: 1,
          }),
          payload.find({
            collection: 'article-media',
            pagination: false,
            where: { id: { in: listedIds } },
            depth: 1,
          }),
          payload.find({
            collection: 'books',
            pagination: false,
            where: { id: { in: listedIds } },
            depth: 1,
          }),
        ])

        const combined = [
          ...articles.docs.map((d) => ({ ...d, type: 'article' as const })),
          ...images.docs.map((d) => ({ ...d, type: 'image' as const })),
          ...books.docs.map((d) => ({ ...d, type: 'book' as const })),
        ]

        const ordered = listedIds
          .map((id) => combined.find((doc) => doc.id === id))
          .filter((doc): doc is FiloContent => !!doc)

        return {
          ...list,
          items: ordered,
        }
      }),
    )

    return enrichedLists
  })
