import type { GlobalConfig } from 'payload'
import { revalidateLiterature } from './hooks/revalidateLiterature'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Literature: GlobalConfig = {
  slug: 'literature',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    livePreview: {
      url: () => {
        const encodedParams = new URLSearchParams({
          slug: 'literature',
          collection: 'literature',
          path: '/',
          previewSecret: process.env.PREVIEW_SECRET || '',
        })
        const url = `/next/preview?${encodedParams.toString()}`
        return url
      },
    },
    preview: () => {
      const encodedParams = new URLSearchParams({
        slug: 'literature',
        collection: 'literature',
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
    afterChange: [revalidateLiterature],
  },
}
