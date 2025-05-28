import type { GlobalConfig } from 'payload'
import { revalidateTravel } from './hooks/revalidateTravel'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { link } from '@/fields/link'
import { generatePreviewUrl } from '@/utilities/generatePreviewUrl'

const slug = 'travel'

export const Travel: GlobalConfig = {
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
                  relationTo: 'travel-media',
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
    afterChange: [revalidateTravel],
  },
}
