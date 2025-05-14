import React from 'react'
import PageClient from './page.client'

import RightMenuContainer from '@/components/RightMenuContainer'
import BottomMenu from '@/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Literature as LiteratureGlobalType } from '@/payload-types'
import SuggestedArticles from '@/components/Literature/SuggestedArticles'
import TopMenuContainer from '@/components/Literature/TopMenuContainer'
import LiteratureContent from '@/components/Literature/LiteratureContent'
import LiteratureHero from '@/components/Literature/LiteratureHero'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const LiteratureData: LiteratureGlobalType = await getCachedGlobal('literature', 1)()

  return (
    <section>
      <PageClient />
      <div className="min-h-screen w-full">
        <SuggestedArticles articles={LiteratureData.suggestedArticles} />

        <div className="mx-auto flex w-3/4 justify-center rounded-b-[10px] bg-black md:w-1/2 xl:w-1/3">
          <h2 className="py-2 font-serif text-xl uppercase text-white">Literature HomePage</h2>
        </div>
        <TopMenuContainer />

        <LiteratureHero />

        <LiteratureContent />

        <RightMenuContainer />

        <BottomMenu />
      </div>
    </section>
  )
}
