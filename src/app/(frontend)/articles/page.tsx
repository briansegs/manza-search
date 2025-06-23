import React from 'react'
import PageClient from './page.client'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import { ArticleArchive } from '@/features/articles/components/ArticleArchive'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const articles = await payload.find({
    collection: 'articles',
    sort: '-updatedAt',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      updatedAt: true,
    },
  })

  return (
    <div className="pb-24 pt-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none">
          <h1>Articles</h1>
        </div>
      </div>

      <div className="container">
        <ArticleArchive articles={articles.docs} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Articles | Manza Search`,
  }
}
