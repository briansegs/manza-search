import { CollectionConfig } from 'payload'
import { lexicalEditor, FixedToolbarFeature, HeadingFeature } from '@payloadcms/richtext-lexical'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { revalidateChapter, revalidateDeleteChapter } from './hooks/revalidateChapter'

type LexicalNode = {
  text?: string
  children?: LexicalNode[]
}

function getLexicalPlainTextLength(node: LexicalNode | undefined | null): number {
  if (!node) return 0

  if (typeof node.text === 'string') {
    return node.text.length
  }

  if (Array.isArray(node.children)) {
    return node.children.reduce((acc, child) => acc + getLexicalPlainTextLength(child), 0)
  }

  return 0
}

export const Chapters: CollectionConfig = {
  slug: 'chapters',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
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
                const len = getLexicalPlainTextLength(val.root)
                return len > 2000 ? 'Page must be under 2000 characters' : true
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
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
  hooks: {
    afterChange: [revalidateChapter],
    afterDelete: [revalidateDeleteChapter],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
