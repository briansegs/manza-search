import { revalidateArticleAds } from './hooks/revalidateArticleAds'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { link } from '@/fields/link'

import { Field, GlobalConfig, OptionObject } from 'payload'

const adTypes: OptionObject[] = [
  {
    label: 'Black - Black Friday discount',
    value: 'black',
  },
  {
    label: 'Red - Time limited',
    value: 'red',
  },
  {
    label: 'Green - Great pricing',
    value: 'green',
  },
  {
    label: 'Yellow - Fair pricing',
    value: 'yellow',
  },
  {
    label: 'Blue - Manza ad',
    value: 'blue',
  },
]

const AdFields: Field[] = [
  {
    name: 'media',
    type: 'upload',
    relationTo: 'ad-media',
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

export const ArticleAds: GlobalConfig = {
  slug: 'article-ads',
  dbName: 'article-ads',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },

  fields: [
    {
      name: 'adCollections',
      label: 'Ad Collections',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'adGroups',
          label: 'Ad Groups',
          type: 'array',
          maxRows: 5,
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'adType',
              label: 'Ad type',
              type: 'select',
              options: adTypes,
              required: true,
            },
            {
              name: 'groupImage',
              label: 'Group Image',
              type: 'upload',
              relationTo: 'ad-media',
              required: true,
            },
            {
              name: 'adSections',
              label: 'Ad Sections',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  label: 'Title',
                  type: 'text',
                },
                {
                  name: 'ads',
                  label: 'Ads',
                  type: 'array',
                  fields: AdFields,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateArticleAds],
  },
}
