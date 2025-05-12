import type { GlobalConfig } from 'payload'
import { revalidateScope } from './hooks/revalidateScope'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Scope: GlobalConfig = {
  slug: 'scope',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    livePreview: {
      url: () => {
        const encodedParams = new URLSearchParams({
          slug: 'scope',
          collection: 'scope',
          path: '/',
          previewSecret: process.env.PREVIEW_SECRET || '',
        })
        const url = `/next/preview?${encodedParams.toString()}`
        return url
      },
    },
    preview: () => {
      const encodedParams = new URLSearchParams({
        slug: 'scope',
        collection: 'scope',
        path: '/',
        previewSecret: process.env.PREVIEW_SECRET || '',
      })
      const url = `/next/preview?${encodedParams.toString()}`
      return url
    },
  },
  fields: [
    {
      name: 'suggestedArticles',
      label: 'Suggested Articles',
      type: 'relationship',
      relationTo: 'articles',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [revalidateScope],
  },
}
