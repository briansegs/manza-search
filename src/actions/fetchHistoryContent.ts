'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { actionClient } from '@/lib/safe-action'
import { fetchHistoryContentSchema } from './schemas'

export const fetchHistoryContent = actionClient
  .inputSchema(fetchHistoryContentSchema)
  .action(async ({ parsedInput: { historyList } }) => {
    if (!historyList?.length) {
      console.warn('fetchHistoryContent called with no historyList.')
      return []
    }

    try {
      const payload = await getPayload({ config: configPromise })

      const articleIds = historyList.map((visit) => visit.articleId)

      const articleResults = await payload.find({
        collection: 'articles',
        pagination: false,
        where: {
          id: { in: articleIds },
        },
        depth: 1,
      })

      return historyList.map((visit) => {
        const article = articleResults.docs.find((a) => a.id === visit.articleId)

        return {
          ...visit,
          article,
        }
      })
    } catch (error) {
      console.error('[fetchHistoryContent] Failed to query history content:', error)
      throw new Error('Failed to fetch history content.')
    }
  })
