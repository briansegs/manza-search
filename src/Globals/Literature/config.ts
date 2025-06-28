import type { GlobalConfig } from 'payload'
import { revalidateLiterature } from './hooks/revalidateLiterature'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { link } from '@/fields/link'
import { generatePreviewUrl } from '@/utilities/generatePreviewUrl'

const slug = 'literature'

export const Literature: GlobalConfig = {
  slug,
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    livePreview: {
      url: generatePreviewUrl(slug),
    },
    preview: generatePreviewUrl(slug),
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
        {
          fields: [
            {
              name: 'paidTopSpot',
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
          label: 'Paid Top Spot',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateLiterature],
  },
}
