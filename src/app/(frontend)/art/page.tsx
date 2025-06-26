import React from 'react'
import PageClient from './page.client'

import { RightMenuContainer } from '@/features/shared/components/RightMenu'
import { BottomMenu } from '@/features/shared/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Art as ArtGlobalType } from '@/payload-types'

import { SuggestedArticles } from '@/features/shared/components/SuggestedArticles'
import { ArtTopMenuContainer } from '@/features/art/components/ArtTopMenuContainer'
import { ArtContent } from '@/features/art/components/ArtContent'
import { ArtHero } from '@/features/art/components/ArtHero'
import { artWorkData } from '@/features/art/mockData'

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

        <ArtTopMenuContainer />

        <ArtContent content={artWorkData} />

        <RightMenuContainer />

        <BottomMenu />
      </div>
    </section>
  )
}
