'use client'

import { isValidLink } from '@/utilities/isValidLink'
import { useEffect, useMemo, useRef, useState } from 'react'
import { GalleryImageItem, GalleryMedia, ImageGalleryProps } from './types'
import { GalleryImage } from './GalleryImage'
import { useInfiniteImages } from '@/hooks/useInfiniteImages'
import { LoaderCircle } from 'lucide-react'

const GAP = 16 // px gap between images
const MIN_ROW_HEIGHT = 150
const MAX_ROW_HEIGHT = 250
const TARGET_HEIGHT = 200

// Normalize image data and calculate aspect ratio
const getImageAspectRatio = (item: GalleryImageItem) => {
  const media: GalleryMedia | undefined =
    typeof item.image !== 'string' && item.image ? item.image : undefined
  const width = media?.cloudinary?.width ?? 1
  const height = media?.cloudinary?.height ?? 1
  return width / height
}

const calculateJustifiedRows = (
  images: GalleryImageItem[],
  containerWidth: number,
  targetHeight = TARGET_HEIGHT,
) => {
  const rows: GalleryImageItem[][] = []
  let currentRow: GalleryImageItem[] = []
  let currentRowWidth = 0

  for (const item of images) {
    const scaledWidth = targetHeight * getImageAspectRatio(item)
    const spacing = currentRow.length ? GAP : 0

    if (currentRowWidth + spacing + scaledWidth <= containerWidth) {
      currentRow.push(item)
      currentRowWidth += spacing + scaledWidth
    } else {
      if (currentRow.length) rows.push([...currentRow])
      currentRow = [item]
      currentRowWidth = scaledWidth
    }
  }

  if (currentRow.length) rows.push(currentRow)
  return rows
}

const calculateRowHeight = (row: GalleryImageItem[], containerWidth: number) => {
  const totalAspectRatio = row.reduce((sum, item) => sum + getImageAspectRatio(item), 0)
  return Math.max(
    MIN_ROW_HEIGHT,
    Math.min(MAX_ROW_HEIGHT, (containerWidth - (row.length - 1) * GAP) / totalAspectRatio),
  )
}

export function ImageGallery({
  images: initialImages,
  tabTitle,
  slug,
  imagesType,
  imageLimit,
  hasImagesToLoad,
}: ImageGalleryProps) {
  const { images, loaderRef, hasMore, loading } = useInfiniteImages(
    slug,
    initialImages || [],
    imagesType,
    imageLimit,
  )
  const [containerWidth, setContainerWidth] = useState(1200)
  const containerRef = useRef<HTMLDivElement>(null)

  const justifiedRows = useMemo(
    () => calculateJustifiedRows(images ?? [], containerWidth, TARGET_HEIGHT),
    [images, containerWidth],
  )

  // Resize observer to update container width
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width)
    })

    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [])

  if (!images || images.length === 0) {
    return <div className="bg-white pt-12 text-center">{`No Images for ${tabTitle} yet`}</div>
  }

  return (
    <div className="flex h-full w-full flex-col items-center bg-white p-4">
      <div ref={containerRef} className="flex w-full flex-col gap-4">
        {justifiedRows.map((row, rowIndex) => {
          const rowHeight = calculateRowHeight(row, containerWidth)

          return (
            <div key={rowIndex} className="flex gap-4" style={{ height: `${rowHeight}px` }}>
              {row.map((item) => {
                const image: GalleryMedia | undefined =
                  typeof item.image !== 'string' && item.image ? item.image : undefined
                const imageWidth = rowHeight * getImageAspectRatio(item)
                const link = 'link' in item ? item.link : undefined
                const hasValidLink = isValidLink(link)

                return (
                  <GalleryImage
                    key={item.id}
                    link={link}
                    image={image}
                    imageWidth={imageWidth}
                    hasValidLink={hasValidLink}
                  />
                )
              })}
            </div>
          )
        })}
      </div>

      {hasImagesToLoad && hasMore && (
        <div ref={loaderRef} className="flex justify-center">
          {loading && <LoaderCircle className="my-8 size-14 animate-spin text-muted" />}
        </div>
      )}
    </div>
  )
}
