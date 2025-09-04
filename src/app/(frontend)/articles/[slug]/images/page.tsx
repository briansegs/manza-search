import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageClient from './page.client'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { RelatedImages } from '@/features/articles/components/ArticleImages/RelatedImages'
import { ArticleImageGallery } from '@/features/articles/components/ArticleImages/ArticleImageGallery'
import { BottomMenu } from '@/features/shared/components/BottomMenu'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ArticleImages({ params }: Args) {
  const { slug = '' } = await params
  const imagesData = await queryArticleImagesBySlug({ slug })

  const {
    relatedImages,
    outsideImages,
    internalImages,
    hasOutsideImagesToLoad,
    hasInternalImagesToLoad,
    imageLimit,
  } = imagesData

  const hasNoImages = internalImages.length === 0 && outsideImages.length === 0

  return (
    <div className="min-h-screen pb-16">
      <PageClient />
      <RelatedImages images={relatedImages || []} />
      <div className="h-full bg-black">
        <div className="h-full">
          {hasNoImages ? (
            <div className="mt-12 bg-white text-center">No Images for this article yet</div>
          ) : (
            <ArticleImageGallery
              internalImages={internalImages}
              externalImages={outsideImages}
              hasOutsideImagesToLoad={hasOutsideImagesToLoad}
              hasInternalImagesToLoad={hasInternalImagesToLoad}
              slug={slug}
              imageLimit={imageLimit}
            />
          )}
        </div>
      </div>

      <BottomMenu />
    </div>
  )
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
      slug: {
        equals: slug,
      },
    },
  })

  const article = result.docs?.[0] || null
  const imageLimit = 30

  const relatedImages = article?.relatedImages

  const allOutsideImages = article?.['outside-images'] || []
  const hasOutsideImagesToLoad = allOutsideImages.length > imageLimit

  const allInternalImages = article?.['internal-images'] || []
  const hasInternalImagesToLoad = allInternalImages.length > imageLimit

  const outsideImages = allOutsideImages.slice(0, imageLimit)
  const internalImages = allInternalImages.slice(0, imageLimit)

  return {
    relatedImages,
    outsideImages,
    internalImages,
    hasOutsideImagesToLoad,
    hasInternalImagesToLoad,
    imageLimit,
  }
})

export async function generateMetadata({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'articles',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const title = result.docs?.[0]?.title
  const pageTitle = title ? `${title} - Images | Manza Search` : 'Article Images | Manza Search'
  return { title: pageTitle }
}
