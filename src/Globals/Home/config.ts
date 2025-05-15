import type { GlobalConfig } from 'payload'
import { revalidateHome } from './hooks/revalidateHome'
import { PromoBlock } from '@/blocks/HomeBlocks/PromoBlock/config'
import { link } from '@/fields/link'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { generatePreviewUrl } from '@/utilities/generatePreviewUrl'

const slug = 'home'

export const Home: GlobalConfig = {
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
              name: 'layout',
              type: 'blocks',
              blocks: [PromoBlock],
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
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
              name: 'media',
              type: 'upload',
              relationTo: 'home-media',
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
          label: 'Page Ad',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
}
