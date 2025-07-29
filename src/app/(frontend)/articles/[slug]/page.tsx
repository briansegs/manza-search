import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageClient from './page.client'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RelatedArticles } from '@/features/articles/components/RelatedArticles'
import { ArticleTopMenuContainer } from '@/features/articles/components/ArticleTopMenuContainer'
import { RightMenuContainer } from '@/features/shared/components/RightMenu'
import { BottomMenu } from '@/features/shared/components/BottomMenu'
import { ArticleHero } from '@/heros/ArticleHero'
import { RenderArticleBlocks } from '@/blocks/RenderArticleBlocks'
import { ArticleLeftMenuContainer } from '@/features/articles/components/ArticleLeftMenuContainer'
import { ReadModeProvider } from '@/providers/ReadModeProvider'
import { TextSizeProvider } from '@/providers/TextSizeProvider'

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

  const { relatedArticles, layout: blocks } = article

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RelatedArticles articles={relatedArticles} />

      <div className="flex">
        <ArticleLeftMenuContainer article={article} />

        <div className="flex w-full min-w-0 flex-col">
          <ReadModeProvider>
            <TextSizeProvider>
              <ArticleTopMenuContainer article={article} className="hidden sm:block lg:ml-auto" />
              {/* Hero & Content */}
              <ArticleHero article={article} />
              <ArticleTopMenuContainer article={article} className="sm:hidden" />
              <RenderArticleBlocks blocks={blocks ?? []} />
            </TextSizeProvider>
          </ReadModeProvider>
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
