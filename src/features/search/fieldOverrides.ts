import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: 'Meta',
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: 'Title',
      },
      {
        type: 'text',
        name: 'description',
        label: 'Description',
      },
      {
        name: 'image',
        label: 'Image',
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: 'Categories',
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
      },
      {
        name: 'id',
        type: 'text',
      },
      {
        name: 'title',
        type: 'text',
      },
    ],
  },
  {
    label: 'Authors',
    name: 'authors',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'id',
        type: 'text',
      },
      {
        name: 'name',
        type: 'text',
      },
    ],
  },
  {
    label: 'PublishedAt',
    name: 'publishedAt',
    type: 'date',
    admin: {
      readOnly: true,
    },
  },
  {
    label: 'UpdatedAt',
    name: 'updatedAt',
    type: 'date',
    admin: {
      readOnly: true,
    },
  },
]
