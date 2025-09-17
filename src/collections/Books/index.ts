import { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { link } from '@/fields/link'
import { revalidateBook, revalidateDeleteBook } from './hooks.ts/revalidateBook'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: { singular: 'Book', plural: 'Books' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',
          fields: [
            { name: 'summary', type: 'textarea' },
            { name: 'information', type: 'textarea' },
            { name: 'cover', type: 'upload', relationTo: 'book-media' },
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'users',
              required: true,
            },
            {
              name: 'chapters',
              type: 'relationship',
              relationTo: 'chapters',
              hasMany: true,
              admin: {
                allowCreate: true,
                allowEdit: true,
                isSortable: true,
                appearance: 'drawer',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'Meta',
          fields: [
            {
              name: 'shop',
              type: 'group',
              fields: [
                { name: 'name', type: 'text' },
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
                  linkTypeOptions: 'external-only',
                }),
              ],
            },
            {
              name: 'price',
              type: 'number',
              min: 0,
              admin: {
                step: 0.01,
                description: 'Price in USD ($)',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateBook],
    afterDelete: [revalidateDeleteBook],
  },
}
