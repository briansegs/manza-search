import React from 'react'
import PageClient from './page.client'

import { RightMenuContainer } from '@/features/shared/components/RightMenu'
import { BottomMenu } from '@/features/shared/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Sound as SoundGlobalType } from '@/payload-types'
import { SuggestedArticles } from '@/features/shared/components/SuggestedArticles'
import { SoundTopMenuContainer } from '@/features/sound/components/SoundTopMenuContainer'
import { SoundContent } from '@/features/sound/components/SoundContent'
import { SoundHero } from '@/features/sound/components/SoundHero'
import { findArticlesByTopic } from '@/utilities/findArticlesByTopic'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  try {
    const soundData: SoundGlobalType = await getCachedGlobal('sound', 2)()

    const articlesByTopic = await findArticlesByTopic('sound')

    const { suggestedArticles, pageAds, paidTopSpot } = soundData

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

          <SoundTopMenuContainer />

          <SoundContent articlesByTopic={articlesByTopic} paidTopSpot={paidTopSpot} />

          <RightMenuContainer />

          <BottomMenu />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Sound Page Error: ', error)

    return (
      <section>
        <PageClient />
        <div className="flex min-h-screen w-full items-center justify-center">
          <h2 className="text-xl">Unable to load sound data. Please try again later.</h2>
        </div>
      </section>
    )
  }
}

export function generateMetadata(): Metadata {
  return {
    title: `Sound | Manza Search`,
  }
}
