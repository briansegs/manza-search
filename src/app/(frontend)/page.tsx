import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import NotFound from './not-found'
import RightMenuContainer from '@/components/Article/RightMenuContainer'
import BottomMenu from '@/components/Article/BottomMenu'
import { RenderHomeBlocks } from '@/blocks/RenderHomeBlocks'
import { Home as HomeCollectionType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import SuggestedArticles from '@/components/Home/SuggestedArticles'
import HomeMenu from '@/components/Home/HomeMenu'
import WelcomeBanner from '@/components/Home/WelcomeBanner'
import HomeAd from '@/components/Home/HomeAd'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const { isEnabled: draft } = await draftMode()

  const content: HomeCollectionType = await getCachedGlobal('home', 1)()

  if (!content) {
    return <NotFound />
  }

  const { layout, suggestedArticles, enableLink, link, media } = content

  return (
    <section className="h-screen pb-24">
      <PageClient />

      {draft && <LivePreviewListener />}

      <SuggestedArticles articles={suggestedArticles} />

      <div className="mt-10 flex h-full gap-2">
        <HomeMenu />

        <div className="flex flex-1 flex-col items-center">
          <WelcomeBanner />

          <div className="size-full overflow-y-auto border-[1px] border-black p-4">
            <RenderHomeBlocks blocks={layout ?? []} />
          </div>
        </div>

        <HomeAd enableLink={enableLink} link={link} media={media} />
      </div>

      <RightMenuContainer />

      <BottomMenu />
    </section>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Home | Manza Search`,
  }
}
