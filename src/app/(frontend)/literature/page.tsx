import React from 'react'
import PageClient from './page.client'

import RightMenuContainer from '@/components/RightMenuContainer'
import BottomMenu from '@/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Literature as LiteratureGlobalType } from '@/payload-types'
import SuggestedArticles from '@/components/SuggestedArticles'
import TopMenuContainer from '@/components/Literature/TopMenuContainer'
import LiteratureContent from '@/components/Literature/LiteratureContent'
import LiteratureHero from '@/components/Literature/LiteratureHero'
import { bookData } from '@/components/Literature/LiteratureContent/mockData'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const literatureData: LiteratureGlobalType = await getCachedGlobal('literature', 1)()

  if (!literatureData) {
    return (
      <section>
        <PageClient />
        <div className="flex min-h-screen w-full items-center justify-center">
          <h2 className="text-xl">Unable to load literature data. Please try again later.</h2>
        </div>
      </section>
    )
  }

  const { suggestedArticles, pageAds } = literatureData

  return (
    <section>
      <PageClient />
      <div className="min-h-screen w-full pb-24">
        <SuggestedArticles articles={suggestedArticles} />

        <div className="mx-auto flex w-3/4 justify-center rounded-b-[10px] bg-black md:w-1/2 xl:w-1/3">
          <h2 className="py-2 text-center font-serif text-xl uppercase text-white">
            Literature HomePage
          </h2>
        </div>

        <TopMenuContainer />

        <LiteratureHero ads={pageAds} />

        <LiteratureContent content={bookData} />

        <RightMenuContainer />

        <BottomMenu />
      </div>
    </section>
  )
}
