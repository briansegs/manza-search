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
import TopMenuContainer from '@/components/Article/TopMenuContainer'
import RightMenuContainer from '@/components/Article/RightMenuContainer'
import BottomMenu from '@/components/Article/BottomMenu'
import { ArticleHero } from '@/heros/ArticleHero'
import { RenderArticleBlocks } from '@/blocks/RenderArticleBlocks'
import LeftMenuContainer from '@/components/Article/LeftMenu/LeftMenuContainer'

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

  const { relatedArticles, layout } = article

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RelatedArticles articles={relatedArticles} />

      <div className="flex">
        <LeftMenuContainer article={article} />

        <div className="flex w-full min-w-0 flex-col">
          <TopMenuContainer article={article} />

          {/* Hero & Content */}
          <ArticleHero article={article} />

          <RenderArticleBlocks blocks={layout ?? []} />
        </div>
      </div>
      <RightMenuContainer />

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
