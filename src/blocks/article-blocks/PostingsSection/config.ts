import { Block, Field } from 'payload'

import { link } from '@/fields/link'

const PostingsFields: Field[] = [
  {
    name: 'media',
    type: 'upload',
    relationTo: 'article-media',
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

export const PostingsSection: Block = {
  slug: 'postingsSection',
  interfaceName: 'PostingsSection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'postings',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: PostingsFields,
      maxRows: 3,
    },
  ],
}
