import { ImagesClient } from './ImagesSection.client'

import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ResourceSection } from '@/payload-types'

type ImagesProps = ResourceSection & {
  slug: string
}

export async function ImagesSection(props: ImagesProps) {
  const { slug } = props

  const images = await queryArticleImagesBySlug({ slug })

  return <ImagesClient imagesData={images} {...props} />
}

const queryArticleImagesBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

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
})
