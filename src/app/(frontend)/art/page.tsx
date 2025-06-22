import React from 'react'
import PageClient from './page.client'

import RightMenuContainer from '@/components/RightMenuContainer'
import BottomMenu from '@/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Art as ArtGlobalType } from '@/payload-types'
import { SuggestedArticles } from '@/features/shared/components/SuggestedArticles'
import TopMenuContainer from '@/components/Art/TopMenuContainer'
import ArtContent from '@/components/Art/ArtContent'
import ArtHero from '@/components/Art/ArtHero'
import { artWorkData } from '@/components/Art/ArtContent/mockData'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const artData: ArtGlobalType = await getCachedGlobal('art', 1)()

  if (!artData) {
    return (
      <section>
        <PageClient />
        <div className="flex min-h-screen w-full items-center justify-center">
          <h2 className="text-xl">Unable to load art data. Please try again later.</h2>
        </div>
      </section>
    )
  }

  const { suggestedArticles, pageAds } = artData

  return (
    <section>
      <PageClient />
      <div className="min-h-screen w-full pb-24">
        <SuggestedArticles articles={suggestedArticles} />

        <div className="mx-auto flex w-3/4 justify-center rounded-b-[10px] bg-black md:w-1/2 xl:w-1/3">
          <h2 className="py-2 text-center font-serif text-xl uppercase text-white">Art HomePage</h2>
        </div>

        <ArtHero ads={pageAds} />

        <TopMenuContainer />

        <ArtContent content={artWorkData} />

        <RightMenuContainer />

        <BottomMenu />
      </div>
    </section>
  )
}
