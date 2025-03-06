import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageClient from './page.client'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RelatedArticles from '@/components/Article/RelatedArticles'
import TopMenu from '@/components/Article/TopMenu'
import LeftMenu from '@/components/Article/LeftMenu'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const articles = await payload.find({
    collection: 'articles',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = articles.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Article({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/articles/' + slug
  const article = await queryArticleBySlug({ slug })

  if (!article) return <PayloadRedirects url={url} />

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Related Articles */}
      <RelatedArticles />

      <div className="flex h-[200vh] w-full">
        {/* Left Menu */}
        <LeftMenu />

        <div className="flex w-full flex-col">
          {/* Top Menu */}
          <TopMenu />

          {/* Hero & Content */}
          <div className="container">{article.title}</div>
        </div>
      </div>

      {/* Right multiple purpose button */}
      <div className="bg-menu-red fixed right-0 top-1/2 z-50 size-28 rounded-xl"></div>

      {/* Bottom menu */}
      <div className="bg-menu-primary fixed bottom-0 z-10 flex h-14 w-full justify-between">
        <div className="bg-menu-red w-28"></div>
        <div className="flex items-center justify-between">
          <div className="rounded-[8px] border-2 border-white bg-black px-2 py-[1px] text-white">
            Doc Pad
          </div>
        </div>
        <div className="w-28 bg-blue-500"></div>
      </div>
    </article>
  )
}

const queryArticleBySlug = cache(async ({ slug }: { slug: string }) => {
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

  return result.docs?.[0] || null
})

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const article = await queryArticleBySlug({ slug })

  return generateMeta({ doc: article })
}
