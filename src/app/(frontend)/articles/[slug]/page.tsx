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
import RightButtonMenu from '@/components/Article/RightButtonMenu'
import BottomMenu from '@/components/Article/BottomMenu'
import { ArticleHero } from '@/heros/ArticleHero'

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

  const { relatedArticles } = article

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Related Articles */}
      <RelatedArticles articles={relatedArticles} />

      <div className="flex h-[200vh] w-full">
        {/* Left Menu */}
        <LeftMenu />

        <div className="flex w-full flex-col">
          {/* Top Menu */}
          <TopMenu />

          {/* Hero & Content */}

          {/* ArticleHero */}
          <ArticleHero article={article} />
        </div>
      </div>

      {/* Right multiple purpose button */}
      <RightButtonMenu />

      {/* Bottom menu */}
      <BottomMenu />
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
