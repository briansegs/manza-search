import { Block, Field } from 'payload'

import { link } from '@/fields/link'

const AdFields: Field[] = [
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
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
]

export const AdSection: Block = {
  slug: 'adSection',
  interfaceName: 'AdSection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'ads',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: AdFields,
      maxRows: 3,
    },
  ],
}
