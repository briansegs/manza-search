import { ImagesClient } from './ImagesSection.client'

import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ResourceWithSlug } from '../types'

export async function ImagesSection(props: ResourceWithSlug) {
  const { slug } = props
  const { isEnabled: draft } = await draftMode()

  const images = await queryArticleImagesBySlug({ slug, draft })

  return <ImagesClient imagesData={images} {...props} />
}

const queryArticleImagesBySlug = cache(
  async ({ slug, draft }: { slug: string; draft: boolean }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'articles',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: { equals: slug },
      },
    })

    const article = result.docs?.[0] || null
    const imageLimit = 5

    const allOutsideImages = article?.['outside-images'] || []
    const allInternalImages = article?.['internal-images'] || []

    return {
      outsideImages: allOutsideImages.slice(0, imageLimit),
      internalImages: allInternalImages.slice(0, imageLimit),
    }
  },
)
