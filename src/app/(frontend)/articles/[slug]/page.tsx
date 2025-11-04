import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageClient from './page.client'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import React, { cache } from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RelatedArticles } from '@/features/articles/components/RelatedArticles'
import { ArticleTopMenuContainer } from '@/features/articles/components/ArticleTopMenuContainer'
import { RightMenuContainer } from '@/features/shared/components/RightMenu'
import { BottomMenu } from '@/features/shared/components/BottomMenu'
import { ArticleHero } from '@/heros/ArticleHero'
import { RenderArticleBlocks } from '@/blocks/RenderArticleBlocks'
import { ArticleLeftMenuContainer } from '@/features/articles/components/ArticleLeftMenuContainer'
import { TextSizeProvider } from '@/providers/TextSizeProvider'
import { ArticleAdsContainer } from '@/features/articles/components/ArticleAds/ArticleAdsContainer'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { ArticleAd as ArticleAdsGlobalType } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { FiloProvider } from '@/providers/FiloProvider'
import { FiloDialog } from '@/features/filo/FiloDialog'
import { auth } from '@clerk/nextjs/server'

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
  const article = await queryArticleBySlug({ slug, draft })
  const { userId } = await auth()

  const ads: ArticleAdsGlobalType = await getCachedGlobal('article-ads', 2)()

  if (!article) return <PayloadRedirects url={url} />

  const { relatedArticles, layout: blocks } = article

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RelatedArticles articles={relatedArticles} />

      <div className="flex">
        <ArticleLeftMenuContainer url={url} article={article} />

        <div className="flex w-full min-w-0 flex-col">
          <TextSizeProvider>
            <FiloProvider>
              <ArticleTopMenuContainer
                url={url}
                article={article}
                className="hidden sm:block lg:ml-auto"
              />
              {/* Hero & Content */}
              <ArticleHero article={article} />
              <ArticleTopMenuContainer url={url} article={article} className="sm:hidden" />
              <ArticleAdsContainer ads={ads} />
              <RenderArticleBlocks blocks={blocks ?? []} slug={slug} />

              {userId && <FiloDialog />}
            </FiloProvider>
          </TextSizeProvider>
        </div>
      </div>
      <RightMenuContainer />

      <BottomMenu />
    </article>
  )
}

const queryArticleBySlug = cache(async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  try {
    const result = await payload.find({
      collection: 'articles',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: { slug: { equals: slug } },
      depth: 1,
    })

    const article = result.docs?.[0] || null

    return article
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        error.name === 'TypeError' &&
        error.message.includes("reading 'type'") &&
        process.env.NODE_ENV === 'development'
      ) {
        console.error('Error querying article by slug:', error)
        payload.logger.error(
          `Possible error finding a field that may not exist or be malformed. This could stem from access controls or a hook/hooks on the article config or one of its relationships.`,
        )
      } else {
        console.error('Error querying article by slug:', error)
      }
    } else {
      console.error('Unknown error querying article by slug:', error)
    }
    return null
  }
})

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const article = await queryArticleBySlug({ slug, draft })

  return generateMeta({ doc: article })
}
