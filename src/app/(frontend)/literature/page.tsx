import React from 'react'
import PageClient from './page.client'

import { RightMenuContainer } from '@/features/shared/components/RightMenu'
import { BottomMenu } from '@/features/shared/components/BottomMenu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Literature as LiteratureGlobalType } from '@/payload-types'
import { SuggestedArticles } from '@/features/shared/components/SuggestedArticles'
import { LiteratureTopMenuContainer } from '@/features/literature/components/LiteratureTopMenuContainer'
import { LiteratureContent } from '@/features/literature/components/LiteratureContent'
import { LiteratureHero } from '@/features/literature/components/LiteratureHero'
import { bookData } from '@/features/literature/mockData'

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

        <LiteratureHero ads={pageAds} />

        <LiteratureTopMenuContainer />

        <LiteratureContent content={bookData} />

        <RightMenuContainer />

        <BottomMenu />
      </div>
    </section>
  )
}
