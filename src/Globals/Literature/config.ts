import type { GlobalConfig } from 'payload'
import { revalidateLiterature } from './hooks/revalidateLiterature'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { link } from '@/fields/link'

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
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'suggestedArticles',
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
          label: 'Suggested Articles',
        },
        {
          fields: [
            {
              name: 'pageAds',
              label: 'Page Ad',
              type: 'array',
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'literature-media',
                },
                {
                  name: 'enableLink',
                  type: 'checkbox',
                },
                link({
                  overrides: {
                    admin: {
                      condition: (_, { enableLink }) => Boolean(enableLink),
                    },
                  },
                  appearances: false,
                  disableLabel: true,
                }),
              ],
            },
          ],
          label: 'Page Ads',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateLiterature],
  },
}
