import { Block, Field } from 'payload'

import { link } from '@/fields/link'

const BlockFields: Field[] = [
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
]

export const PromoBlock: Block = {
  slug: 'promoBlock',
  interfaceName: 'PromoBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'content',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: BlockFields,
      maxRows: 6,
    },
  ],
}
