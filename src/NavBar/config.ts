import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateNavBar } from './hooks/revalidateNavBar'

export const NavBar: GlobalConfig = {
  slug: 'navBar',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 11,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/NavBar/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateNavBar],
  },
}
