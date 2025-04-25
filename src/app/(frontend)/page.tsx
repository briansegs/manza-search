import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import NotFound from './not-found'
import RightMenuContainer from '@/components/Article/RightMenuContainer'
import BottomMenu from '@/components/Article/BottomMenu'
import { auth, currentUser } from '@clerk/nextjs/server'
import { RenderHomeBlocks } from '@/blocks/RenderHomeBlocks'
import { Home } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import SuggestedArticles from '@/components/Home/SuggestedArticles'
import { CMSLink } from '@/components/Link'
import { renderMedia, renderPlaceholder } from '@/blocks/article-blocks/components'

const itemStyles = 'hover:text-secondary-blue cursor-pointer'

// export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const { isEnabled: draft } = await draftMode()

  const { userId } = await auth()

  let name = ''

  if (userId) {
    const user = await currentUser()
    name = user?.firstName as string
  }

  const content: Home = await getCachedGlobal('home', 1)()

  if (!content) {
    return <NotFound />
  }

  const { layout, suggestedArticles, enableLink, link, media } = content

  const hasValidLink = link && (link.type === 'reference' ? link.reference : link.type === 'custom')

  return (
    <section className="h-screen pb-24">
      <PageClient />

      {draft && <LivePreviewListener />}

      <SuggestedArticles articles={suggestedArticles} />

      <div className="mt-10 flex h-full gap-2">
        <div className="mt-20 w-52 bg-menu font-serif text-white">
          <div className="p-1">Menu</div>
          <ul className="list-inside list-disc space-y-6 pl-6 pt-6 uppercase">
            <li className={itemStyles}>pinned</li>
            <li className={itemStyles}>loved</li>
            <li className={itemStyles}>saved</li>
            <li className={itemStyles}>history</li>
            <li className={itemStyles}>lists</li>
            <li className={itemStyles}>shared</li>
          </ul>
        </div>

        <div className="flex flex-1 flex-col items-center">
          <div className="flex h-6 w-[98%] items-center justify-center bg-black shadow-[10px_10px_10px_black]">
            <div className="font-serif text-white">
              Welcome
              {name && <span className="ml-1 text-green-500 underline">{name}</span>}!
            </div>
          </div>

          <div className="size-full overflow-y-auto border-[1px] border-black p-4">
            <RenderHomeBlocks blocks={layout ?? []} />
          </div>
        </div>

        <div className="relative mt-16 w-52 border-2 border-black">
          {hasValidLink && enableLink ? (
            <CMSLink {...link}>{media ? renderMedia(media) : renderPlaceholder()}</CMSLink>
          ) : media ? (
            renderMedia(media)
          ) : (
            renderPlaceholder()
          )}
        </div>
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
