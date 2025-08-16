import type { GlobalConfig } from 'payload'
import { revalidateSignin } from './hooks/revalidateSignin'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { link } from '@/fields/link'
import { generatePreviewUrl } from '@/utilities/generatePreviewUrl'

const slug = 'signin'

export const Signin: GlobalConfig = {
  slug,
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    livePreview: {
      url: generatePreviewUrl(slug),
    },
    preview: generatePreviewUrl(slug),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Ad',
          name: 'pageAd',

          fields: [
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'ad-media',
            },
            link({
              appearances: false,
              disableLabel: true,
              name: 'url',
              label: 'Ad Url',
            }),
          ],
        },
        {
          name: 'signinButtons',
          label: 'Sign In Buttons',
          fields: [
            {
              name: 'links',
              label: 'Links',
              type: 'array',
              maxRows: 5,
              fields: [
                {
                  name: 'title',
                  label: 'Title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'userType',
                  label: 'User Type',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSignin],
  },
}
