import React from 'react'
import PageClient from './page.client'

import RightMenuContainer from '@/components/RightMenuContainer'
import BottomMenu from '@/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Sound as SoundGlobalType } from '@/payload-types'
import SuggestedArticles from '@/components/SuggestedArticles'
import TopMenuContainer from '@/components/Sound/TopMenuContainer'
import SoundContent from '@/components/Sound/SoundContent'
import SoundHero from '@/components/Sound/SoundHero'
import { audioData } from '@/components/Sound/SoundContent/mockData'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const soundData: SoundGlobalType = await getCachedGlobal('sound', 1)()

  if (!soundData) {
    return (
      <section>
        <PageClient />
        <div className="flex min-h-screen w-full items-center justify-center">
          <h2 className="text-xl">Unable to load sound data. Please try again later.</h2>
        </div>
      </section>
    )
  }

  const { suggestedArticles, pageAds } = soundData

  return (
    <section>
      <PageClient />
      <div className="min-h-screen w-full pb-24">
        <SuggestedArticles articles={suggestedArticles} />

        <div className="mx-auto flex w-3/4 justify-center rounded-b-[10px] bg-black md:w-1/2 xl:w-1/3">
          <h2 className="py-2 text-center font-serif text-xl uppercase text-white">
            Sound HomePage
          </h2>
        </div>

        <SoundHero ads={pageAds} />

        <TopMenuContainer />

        <SoundContent content={audioData} />

        <RightMenuContainer />

        <BottomMenu />
      </div>
    </section>
  )
}
