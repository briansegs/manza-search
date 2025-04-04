import { Block } from 'payload'

export const ResourceSection: Block = {
  slug: 'resourceSection',
  interfaceName: 'ResourceSection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Resource Type',
      options: [
        {
          label: 'Images',
          value: 'images',
        },
        {
          label: 'Books',
          value: 'books',
        },
        {
          label: 'Audio',
          value: 'audio',
        },
        {
          label: 'Videos',
          value: 'videos',
        },
        {
          label: 'Shop',
          value: 'shop',
        },
      ],
    },
  ],
}
