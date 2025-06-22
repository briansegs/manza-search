import React from 'react'
import PageClient from './page.client'

import { RightMenuContainer } from '@/features/shared/components/RightMenu'
import BottomMenu from '@/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Article, Category, Travel as TravelGlobalType } from '@/payload-types'
import { SuggestedArticles } from '@/features/shared/components/SuggestedArticles'
import TopMenuContainer from '@/components/Travel/TopMenuContainer'
import TravelContent from '@/components/Travel/TravelContent'
import TravelHero from '@/components/Travel/TravelHero'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import TravelTitle from '@/components/Travel/TravelTitle'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 600

const continents = [
  { title: 'Africa', slug: 'south-america' },
  { title: 'Antarctica', slug: 'antarctica' },
  { title: 'Asia', slug: 'asia' },
  { title: 'Europe', slug: 'europe' },
  { title: 'North America', slug: 'north-america' },
  { title: 'Oceania', slug: 'oceania' },
  { title: 'South America', slug: 'south-america' },
]

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  try {
    const articles = await payload.find({
      collection: 'articles',
      sort: '-updatedAt',
      depth: 1,
      overrideAccess: false,
      where: {
        categories: {
          exists: true,
        },
      },
    })

    const articlesByContinents: {
      title: string
      slug: string
      articles: Article[]
    }[] = continents.map((continent) => ({
      title: continent.title,
      slug: continent.slug,
      articles: articles.docs.filter((article) =>
        article.categories?.some(
          (cat: string | Category) => cat && typeof cat !== 'string' && cat.slug === continent.slug,
        ),
      ),
    }))

    const travelData: TravelGlobalType = await getCachedGlobal('travel', 1)()

    return (
      <section>
        <PageClient />
        <div className="min-h-screen w-full pb-24">
          <SuggestedArticles articles={travelData?.suggestedArticles} />

          <TravelTitle />

          <TravelHero images={travelData?.heroImages} />

          <TopMenuContainer />

          <TravelContent content={articlesByContinents || []} adImages={travelData?.adImages} />

          <RightMenuContainer />

          <BottomMenu />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error: ', error)

    return (
      <section>
        <PageClient />
        <div className="flex min-h-screen w-full items-center justify-center">
          <h2 className="text-xl">Unable to load travel data. Please try again later.</h2>
        </div>
      </section>
    )
  }
}

export function generateMetadata(): Metadata {
  return {
    title: `Travel | Manza Search`,
  }
}
