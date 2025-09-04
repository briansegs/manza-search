import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { ImageSourceKey } from '@/features/articles/components/ArticleImages/types'

function isImageType(value: string | null): value is ImageSourceKey {
  return value === 'outside-images' || value === 'internal-images'
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug = '' } = await params

  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 30)

  const paramImagesType = searchParams.get('imagesType')
  const imagesType: ImageSourceKey = isImageType(paramImagesType)
    ? paramImagesType
    : 'outside-images'

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
  const allImages = article?.[imagesType] || []

  const totalDocs = allImages.length
  const totalPages = Math.ceil(totalDocs / limit)

  const start = (page - 1) * limit
  const end = start + limit

  const docs = allImages.slice(start, end)

  return NextResponse.json({
    docs,
    page,
    limit,
    totalDocs,
    totalPages,
  })
}
