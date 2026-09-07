import { NextRequest, NextResponse } from 'next/server'
import { searchImages, searchVideos, searchWeb } from '@/features/webSearch/braveClient'
import { searchManzaArticles } from '@/features/webSearch/manzaArticles'
import { checkRateLimit } from '@/features/webSearch/rateLimit'
import type { WebSearchResponse } from '@/features/webSearch/types'

export const maxDuration = 30

const RATE_LIMIT = 20
const RATE_LIMIT_WINDOW_MS = 60_000

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return (forwardedFor.split(',')[0] ?? forwardedFor).trim()

  return request.headers.get('x-real-ip') ?? 'unknown'
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim()

  if (!query) {
    return NextResponse.json({ error: 'Missing "q" query param' }, { status: 400 })
  }

  const { allowed, retryAfterSeconds } = checkRateLimit(
    getClientIp(request),
    RATE_LIMIT,
    RATE_LIMIT_WINDOW_MS,
  )

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
    )
  }

  const [manza, web, images, videos] = await Promise.allSettled([
    searchManzaArticles(query, request.nextUrl.hostname),
    searchWeb(query),
    searchImages(query),
    searchVideos(query),
  ])

  for (const [label, result] of [
    ['manza', manza],
    ['web', web],
    ['images', images],
    ['videos', videos],
  ] as const) {
    if (result.status === 'rejected') {
      console.error(`web-search ${label} failed:`, result.reason)
    }
  }

  const response: WebSearchResponse = {
    web: [
      ...(manza.status === 'fulfilled' ? manza.value : []),
      ...(web.status === 'fulfilled' ? web.value : []),
    ],
    images: images.status === 'fulfilled' ? images.value : [],
    videos: videos.status === 'fulfilled' ? videos.value : [],
  }

  return NextResponse.json(response)
}
