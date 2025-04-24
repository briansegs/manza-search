import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import NotFound from './not-found'
import RightMenuContainer from '@/components/Article/RightMenuContainer'
import BottomMenu from '@/components/Article/BottomMenu'

const itemStyles = 'hover:text-secondary-blue cursor-pointer'

const name = 'Brian'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const { isEnabled: draft } = await draftMode()

  const page = await getMedia()

  if (!page) {
    return <NotFound />
  }

  console.log('page: ', page)

  return (
    <section className="h-screen pb-24 pt-10">
      <PageClient />

      {draft && <LivePreviewListener />}

      {/* Add suggestions */}

      <div className="flex h-full gap-2">
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
              Welcome<span className="text-green-500">{name ? ' ' + name : ''}</span>!
            </div>
          </div>

          <div className="size-full border-[1px] border-black">
            {/* <RenderBlocks blocks={sections} /> */}
          </div>
        </div>

        <div className="mt-16 w-52 bg-black"></div>
      </div>

      <RightMenuContainer />

      <BottomMenu />
    </section>
  )
}

const getMedia = cache(async () => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'home-media',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
  })

  return result.docs?.[0] || null
})

export function generateMetadata(): Metadata {
  return {
    title: `Home | Manza Search`,
  }
}
