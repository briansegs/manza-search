import { Block } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { MediaBlock } from '@/blocks/MediaBlock/config'

export const ContentSection: Block = {
  slug: 'contentSection',
  interfaceName: 'ContentSection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'alignment',
      type: 'radio',
      label: 'Image Placement',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Left & Right',
          value: 'left & right',
        },
      ],
    },
    {
      name: 'image1',
      type: 'upload',
      relationTo: 'media',
      label: 'Image 1',
      hasMany: false,
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      label: 'Image 2',
      admin: {
        condition: (_, siblingData) => siblingData.alignment === 'left & right',
      },
      hasMany: false,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
    },
  ],
}
