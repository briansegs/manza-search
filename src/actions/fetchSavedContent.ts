'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { actionClient } from '@/lib/safe-action'
import { fetchSavedContentSchema } from './schemas'

export const fetchSavedContent = actionClient
  .inputSchema(fetchSavedContentSchema)
  .action(async ({ parsedInput: { savedIds } }) => {
    if (!savedIds?.length) {
      console.warn('fetchSavedContent called with no savedIds.')
      return []
    }

    try {
      const payload = await getPayload({ config: configPromise })

      const result = await payload.find({
        collection: 'articles',
        pagination: false,
        where: {
          id: { in: savedIds },
        },
        depth: 1,
      })

      const articles = result.docs.map((doc) => ({ ...doc, type: 'article' }))

      return articles
    } catch (error) {
      console.error('[fetchSavedContent] Failed to query articles:', error)
      throw new Error('Failed to fetch saved content.')
    }
  })
