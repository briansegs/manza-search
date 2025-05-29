import React from 'react'
import PageClient from './page.client'

import RightMenuContainer from '@/components/RightMenuContainer'
import BottomMenu from '@/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Article, Category, Travel as TravelGlobalType } from '@/payload-types'
import SuggestedArticles from '@/components/SuggestedArticles'
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
    const travelData: TravelGlobalType = await getCachedGlobal('travel', 2)()

    const { suggestedArticles, heroImages, adImages } = travelData

    console.log('travelData: ', travelData)
    console.log('adImages: ', adImages)

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

    return (
      <section>
        <PageClient />
        <div className="min-h-screen w-full pb-24">
          <SuggestedArticles articles={suggestedArticles} />

          <TravelTitle />

          <TravelHero images={heroImages} />

          <TopMenuContainer />

          <TravelContent content={articlesByContinents} adImages={adImages} />

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
