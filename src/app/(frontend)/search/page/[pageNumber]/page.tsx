import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { SearchList } from '@/features/search/components/SearchList'
import { SearchPageRange } from '@/features/search/components/SearchPageRange'
import { notFound } from 'next/navigation'
import { SearchPagination } from '@/features/search/components/SearchPagination'
import { SearchArticleCardData } from '@/features/search/types'

type Args = {
  searchParams: Promise<{
    q: string
  }>
  params: Promise<{
    pageNumber: string
  }>
}
export default async function Page({
  searchParams: searchParamsPromise,
  params: paramsPromise,
}: Args) {
  const { q: query } = await searchParamsPromise
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const pageLimit = 5

  const articles = await payload.find({
    collection: 'search',
    depth: 1,
    limit: pageLimit,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      authors: true,
      updatedAt: true,
      publishedAt: true,
    },
    page: sanitizedPageNumber,
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: true,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
              {
                'categories.title': {
                  like: query,
                },
              },
              {
                'authors.name': {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <section className="mb-24">
      <PageClient />
      <div className="min-h-screen w-full space-y-12">
        <div className="mx-auto flex w-3/4 justify-center rounded-b-[10px] bg-black md:w-1/2 xl:w-1/3">
          <h2 className="py-2 font-serif text-xl uppercase text-white">Search</h2>
        </div>

        <div className="container">
          <SearchPageRange
            collection="articles"
            currentPage={articles.page}
            limit={pageLimit}
            totalDocs={articles.totalDocs}
          />
        </div>

        {articles.totalDocs > 0 ? (
          <SearchList articles={articles.docs as SearchArticleCardData[]} />
        ) : (
          <div className="container">No results found.</div>
        )}

        <div className="container">
          {articles.totalPages > 1 && articles.page && (
            <SearchPagination page={articles.page} totalPages={articles.totalPages} query={query} />
          )}
        </div>
      </div>
    </section>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search | Manza Search`,
  }
}
