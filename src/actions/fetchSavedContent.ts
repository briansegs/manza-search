'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { actionClient } from '@/lib/safe-action'
import { fetchSavedContentSchema } from './schemas'

export const fetchSavedContent = actionClient
  .inputSchema(fetchSavedContentSchema)
  .action(async ({ parsedInput: { saveList } }) => {
    if (!saveList?.length) {
      console.warn('fetchSavedContent called with no saveList.')
      return []
    }

    try {
      const payload = await getPayload({ config: configPromise })

      const savedIds = saveList.map((saved) => saved.contentId)

      const [articleResults, imageResults] = await Promise.all([
        await payload.find({
          collection: 'articles',
          pagination: false,
          where: {
            id: { in: savedIds },
          },
          depth: 1,
        }),
        await payload.find({
          collection: 'article-media',
          pagination: false,
          where: {
            id: { in: savedIds },
          },
          depth: 1,
        }),
      ])

      const articles = articleResults.docs.map((doc) => ({ ...doc, type: 'article' as const }))

      const images = imageResults.docs.map((doc) => ({ ...doc, type: 'image' as const }))

      const mergedList = [...articles, ...images].sort(
        (articles, images) =>
          saveList.findIndex((saved) => saved.contentId === articles.id) -
          saveList.findIndex((saved) => saved.contentId === images.id),
      )

      return mergedList
    } catch (error) {
      console.error('[fetchSavedContent] Failed to query articles:', error)
      throw new Error('Failed to fetch saved content.')
    }
  })
