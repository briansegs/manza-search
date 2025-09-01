'use client'

import { isValidLink } from '@/utilities/isValidLink'
import { CMSLink } from '@/components/Link'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { useEffect, useRef, useState } from 'react'
import { ArticleImageItem, ArticleMediaOnly, ImageGalleryProps } from './types'

const GAP = 16 // px gap between images

const calculateJustifiedRows = (
  images: ArticleImageItem[],
  containerWidth: number,
  targetHeight = 200,
) => {
  const rows: ArticleImageItem[][] = []
  let currentRow: ArticleImageItem[] = []
  let currentRowWidth = 0

  for (const item of images ?? []) {
    const image = typeof item.image !== 'string' && item.image ? item.image : undefined
    const aspectRatio = (image?.cloudinary?.width || 0) / (image?.cloudinary?.height || 1)
    const scaledWidth = targetHeight * aspectRatio

    if (currentRowWidth + (currentRow.length ? GAP : 0) + scaledWidth <= containerWidth) {
      currentRow.push(item)
      currentRowWidth += (currentRow.length ? GAP : 0) + scaledWidth
    } else {
      if (currentRow.length) rows.push([...currentRow])
      currentRow = [item]
      currentRowWidth = scaledWidth
    }
  }

  if (currentRow.length) rows.push(currentRow)
  return rows
}

export function ImageGallery({ images, tabTitle }: ImageGalleryProps) {
  const [containerWidth, setContainerWidth] = useState(1200)
  const [justifiedRows, setJustifiedRows] = useState<ArticleImageItem[][]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate rows whenever images or container width change
  useEffect(() => {
    setJustifiedRows(calculateJustifiedRows(images ?? [], containerWidth, 200))
  }, [images, containerWidth])

  // Resize observer to update container width
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
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
          // Calculate row height based on total aspect ratios
          const totalAspectRatio = row.reduce((sum, item) => {
            const media = typeof item.image !== 'string' && item.image ? item.image : undefined
            return sum + (media?.cloudinary?.width ?? 0) / (media?.cloudinary?.height ?? 1)
          }, 0)

          const rowHeight = Math.max(
            150,
            Math.min(250, (containerWidth - (row.length - 1) * GAP) / totalAspectRatio),
          )

          return (
            <div key={rowIndex} className="flex gap-4" style={{ height: `${rowHeight}px` }}>
              {row.map(({ id, link, enableLink, image: imageItem }) => {
                const image: ArticleMediaOnly | undefined =
                  typeof imageItem !== 'string' && imageItem ? imageItem : undefined
                const imageWidth =
                  rowHeight * ((image?.cloudinary?.width ?? 0) / (image?.cloudinary?.height ?? 1))
                const hasValidLink = isValidLink(link)

                return (
                  <div
                    key={id}
                    className="group relative overflow-hidden border-2 border-black shadow-[10px_10px_10px_black] hover:border-secondary-blue"
                    style={{ width: `${imageWidth}px`, flexShrink: 0 }}
                  >
                    {hasValidLink && enableLink ? (
                      <CMSLink {...link}>
                        {image ? (
                          <RenderMedia media={image} className="h-full w-full object-cover" />
                        ) : (
                          <ImagePlaceholder />
                        )}
                      </CMSLink>
                    ) : image ? (
                      <RenderMedia media={image} className="h-full w-full object-cover" />
                    ) : (
                      <ImagePlaceholder />
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
