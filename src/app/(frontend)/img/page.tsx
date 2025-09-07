import React from 'react'
import PageClient from './page.client'
import { Metadata } from 'next'

import { RightMenuContainer } from '@/features/shared/components/RightMenu'
import { BottomMenu } from '@/features/shared/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Img as ImgGlobalType } from '@/payload-types'

import { SuggestedArticles } from '@/features/shared/components/SuggestedArticles'
import { ImgHero } from '@/features/img/components/ImgHero'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ImgTopMenuContainer } from '@/features/img/components/ImgTopMenuContainer'
import { ImgContent } from '@/features/img/components/ImgContent'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  try {
    const [imgData, articlesByCategory]: [
      ImgGlobalType,
      Awaited<ReturnType<typeof getArticlesByCategory>>,
    ] = await Promise.all([getCachedGlobal('img', 2)(), getArticlesByCategory()])

    const { suggestedArticles, pageAds } = imgData

    return (
      <section>
        <PageClient />
        <div className="min-h-screen w-full pb-24">
          <SuggestedArticles articles={suggestedArticles} />

          <div className="mx-auto flex w-3/4 justify-center rounded-b-[10px] bg-black md:w-1/2 xl:w-1/3">
            <h2 className="py-2 text-center font-serif text-xl uppercase text-white">
              Img HomePage
            </h2>
          </div>

          <ImgHero ads={pageAds} />

          <ImgTopMenuContainer />

          <ImgContent articlesByCategory={articlesByCategory} />

          <RightMenuContainer />

          <BottomMenu />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Img Page Error: ', error)

    return (
      <section>
        <PageClient />
        <div className="flex min-h-screen w-full items-center justify-center">
          <h2 className="text-xl">Unable to load img page data. Please try again later.</h2>
        </div>
      </section>
    )
  }
}

export function generateMetadata(): Metadata {
  return {
    title: `Img | Manza Search`,
  }
}

async function getArticlesByCategory() {
  try {
    const payload = await getPayload({ config: configPromise })

    const categories = await payload.find({
      collection: 'categories',
      depth: 2,
      limit: 0,
      select: {
        title: true,
        slug: true,
      },
    })

    const categoryIds = categories.docs.map((category) => category.id)

    const articles = await payload.find({
      collection: 'articles',
      limit: 0,
      depth: 2,
      where: {
        categories: {
          in: categoryIds,
        },
      },
    })

    const articlesByCategory = categories.docs.map((category) => {
      const relatedArticles = articles.docs.filter((article) =>
        article.categories?.some((c) => typeof c !== 'string' && c.id === category.id),
      )

      return {
        category: category,
        articles: relatedArticles,
      }
    })

    return articlesByCategory
  } catch (error) {
    console.error('Fetching data failed:', error)
    return []
  }
}
