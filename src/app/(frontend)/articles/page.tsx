import React from 'react'
import PageClient from './page.client'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const articles = await payload.find({
    collection: 'articles',
    sort: 'createdAt',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pb-24 pt-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none dark:prose-invert">
          <h1>Articles</h1>
        </div>
      </div>

      <div className="container">
        {articles.totalDocs > 1 && articles.page && (
          <ol className="flex flex-col gap-4">
            {articles.docs.map(({ slug, meta }) => (
              <li className="list-inside list-disc hover:underline" key={slug}>
                <Link href={`/articles/${slug}`}>
                  <span className="text-lg font-bold">{meta?.title}:</span> {meta?.description}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Articles | Manza Search`,
  }
}
