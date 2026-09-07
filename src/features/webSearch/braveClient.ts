import 'server-only'
import type { ImageResult, VideoResult, WebResult } from './types'

const BRAVE_API_KEY = process.env.BRAVE_SEARCH_API_KEY

type BraveWebResponse = {
  web?: {
    results?: Array<{
      title: string
      url: string
      description: string
      meta_url?: { hostname?: string }
    }>
  }
}

type BraveImagesResponse = {
  results?: Array<{
    title: string
    url: string
    source: string
    thumbnail?: { src?: string }
    properties?: { url?: string; width?: number; height?: number }
  }>
}

type BraveVideosResponse = {
  results?: Array<{
    title: string
    url: string
    description: string
    thumbnail?: { src?: string }
    video?: { duration?: string; publisher?: string; creator?: string }
  }>
}

function stripTags(text: string): string {
  return text.replace(/<[^>]*>/g, '')
}

async function braveFetch<T>(
  endpoint: 'web' | 'images' | 'videos',
  query: string,
  count: number,
): Promise<T> {
  if (!BRAVE_API_KEY) {
    throw new Error('BRAVE_SEARCH_API_KEY is not set')
  }

  const url = new URL(`https://api.search.brave.com/res/v1/${endpoint}/search`)
  url.searchParams.set('q', query)
  url.searchParams.set('count', String(count))

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-Subscription-Token': BRAVE_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error(`Brave ${endpoint} search failed: ${response.status} ${await response.text()}`)
  }

  return response.json()
}

export async function searchWeb(query: string, count = 10): Promise<WebResult[]> {
  const json = await braveFetch<BraveWebResponse>('web', query, count)

  return (json.web?.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    description: stripTags(r.description),
    hostname: r.meta_url?.hostname ?? new URL(r.url).hostname,
  }))
}

export async function searchImages(query: string, count = 10): Promise<ImageResult[]> {
  const json = await braveFetch<BraveImagesResponse>('images', query, count)

  return (json.results ?? []).map((r) => ({
    title: r.title,
    image: r.properties?.url ?? '',
    thumbnail: r.thumbnail?.src ?? '',
    url: r.url,
    source: r.source,
    width: r.properties?.width ?? 0,
    height: r.properties?.height ?? 0,
  }))
}

export async function searchVideos(query: string, count = 10): Promise<VideoResult[]> {
  const json = await braveFetch<BraveVideosResponse>('videos', query, count)

  return (json.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    description: stripTags(r.description),
    image: r.thumbnail?.src ?? '',
    duration: r.video?.duration ?? '',
    publisher: r.video?.publisher ?? r.video?.creator ?? '',
  }))
}
