import type { GlobalConfig } from 'payload'
import { revalidateScope } from './hooks/revalidateScope'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { generatePreviewUrl } from '@/utilities/generatePreviewUrl'

const slug = 'scope'

export const Scope: GlobalConfig = {
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
