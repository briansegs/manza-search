import { CollectionConfig } from 'payload'
import { lexicalEditor, FixedToolbarFeature, HeadingFeature } from '@payloadcms/richtext-lexical'

export const Chapters: CollectionConfig = {
  slug: 'chapters',
  admin: {
    useAsTitle: 'title',
  },
  labels: { singular: 'Chapter', plural: 'Chapters' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'author', type: 'relationship', relationTo: 'users', hasMany: false, required: true },
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        {
          slug: 'textPage',
          labels: { singular: 'Text Page', plural: 'Text Pages' },
          fields: [
            {
              name: 'body',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  FixedToolbarFeature(),
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
                ],
              }),
              validate: (val) => {
                if (!val) return 'Content is required'
                const plainText = JSON.stringify(val) // Lexical content is JSON
                if (plainText.length > 3000) {
                  return 'Page must be under 3000 characters'
                }
                return true
              },
            },
          ],
        },
        {
          slug: 'imagePage',
          labels: { singular: 'Image Page', plural: 'Image Pages' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'book-media', required: true },
            { name: 'caption', type: 'text' },
          ],
        },
      ],
    },
  ],
}
