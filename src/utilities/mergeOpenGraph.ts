import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Manza Search provides curated articles and in-depth research tools for students, professionals, and anyone interested in deep knowledge.',
  images: [
    {
      url: `${getServerSideURL()}/manza-search-OG.webp`,
    },
  ],
  siteName: 'Manza Search',
  title: 'Manza Search',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
