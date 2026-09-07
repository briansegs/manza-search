export type WebResult = {
  title: string
  url: string
  description: string
  hostname: string
}

export type ImageResult = {
  title: string
  image: string
  thumbnail: string
  url: string
  source: string
  width: number
  height: number
}

export type VideoResult = {
  title: string
  url: string
  description: string
  image: string
  duration: string
  publisher: string
}

export type WebSearchResponse = {
  web: WebResult[]
  images: ImageResult[]
  videos: VideoResult[]
}
