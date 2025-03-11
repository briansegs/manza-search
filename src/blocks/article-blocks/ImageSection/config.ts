import { Block } from 'payload'

export const ImageSection: Block = {
  slug: 'imageSection',
  interfaceName: 'ImageSection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'title',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
