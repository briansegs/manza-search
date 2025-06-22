import React from 'react'
import PageClient from './page.client'

import RightMenuContainer from '@/components/RightMenuContainer'
import BottomMenu from '@/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HealthAndWellness as HealthAndWellnessGlobalType } from '@/payload-types'
import { SuggestedArticles } from '@/features/shared/components/SuggestedArticles'
import TopMenuContainer from '@/components/HealthAndWellness/TopMenuContainer'
import HealthAndWellnessContent from '@/components/HealthAndWellness/HealthAndWellnessContent'
import HealthAndWellnessHero from '@/components/HealthAndWellness/HealthAndWellnessHero'
import { itemData } from '@/components/HealthAndWellness/HealthAndWellnessContent/mockData'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const healthAndWellnessData: HealthAndWellnessGlobalType = await getCachedGlobal(
    'health-and-wellness',
    1,
  )()

  if (!healthAndWellnessData) {
    return (
      <section>
        <PageClient />
        <div className="flex min-h-screen w-full items-center justify-center">
          <h2 className="text-xl">
            Unable to load health and wellness data. Please try again later.
          </h2>
        </div>
      </section>
    )
  }

  const { suggestedArticles, pageAds } = healthAndWellnessData

  return (
    <section>
      <PageClient />
      <div className="min-h-screen w-full pb-24">
        <SuggestedArticles articles={suggestedArticles} />

        <div className="mx-auto flex w-3/4 justify-center rounded-b-[10px] bg-black md:w-1/2 xl:w-1/3">
          <h2 className="py-2 text-center font-serif text-xl uppercase text-white">
            Health and Wellness HomePage
          </h2>
        </div>

        <HealthAndWellnessHero ads={pageAds} />

        <TopMenuContainer />

        <HealthAndWellnessContent content={itemData} />

        <RightMenuContainer />

        <BottomMenu />
      </div>
    </section>
  )
}
