import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'A website for articles and research.',
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
