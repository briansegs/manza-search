'use client'

import {
  GalleryImageItem,
  ImageSourceKey,
} from '@/features/articles/components/ArticleImages/types'
import { useEffect, useState, useRef, useCallback } from 'react'

export function useInfiniteImages(
  slug: string,
  initialImages: GalleryImageItem[],
  imagesType: ImageSourceKey,
  limit: number,
  threshold: number = 200,
) {
  const [images, setImages] = useState(initialImages)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setImages(initialImages)
    setPage(1)
    setHasMore(true)
  }, [slug, imagesType, initialImages])

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const nextPage = page + 1
    const res = await fetch(
      `/api/article-images/${slug}?page=${nextPage}&imagesType=${imagesType}&limit=${limit}`,
    )
    const data = await res.json()

    if (data.docs?.length > 0) {
      setImages((prev) => [...prev, ...data.docs])
      setPage(nextPage)
      setHasMore(nextPage < data.totalPages)
    } else {
      setHasMore(false)
    }

    setLoading(false)
  }, [page, slug, imagesType, limit, hasMore, loading])

  useEffect(() => {
    const node = loaderRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchMore()
        }
      },
      {
        rootMargin: `0px 0px ${threshold}px 0px`,
        threshold: 0.1,
      },
    )

    observer.observe(node)
    return () => {
      if (node) observer.unobserve(node)
      observer.disconnect()
    }
  }, [fetchMore, threshold])

  return { images, loaderRef, hasMore, loading }
}
