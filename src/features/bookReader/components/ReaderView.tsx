'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import RichText from '@/components/RichText'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { cn } from '@/utilities/ui'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { ReaderNextPageButton } from '@/features/bookReader/components/ReaderNextPageButton'
import { ReaderViewProps, ViewMobileButtonsProps } from '../types'

export function ReaderView({
  currentPage,
  setCurrentPage,
  pages,
  cover,
  textEnlarge,
}: ReaderViewProps) {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-1 overflow-hidden sm:flex-row">
      <ReaderNextPageButton
        disabled={currentPage <= 0 || pages.length === 0}
        onClick={() => {
          setCurrentPage((page) => Math.max(0, page - 1))
          if (viewRef.current) {
            viewRef.current.scrollTop = 0
          }
        }}
        className="hidden rounded-r-none sm:flex"
      >
        <ChevronLeft />
      </ReaderNextPageButton>

      <div
        ref={viewRef}
        className={cn(
          'custom-scrollbar flex h-full w-full flex-col gap-2 overflow-y-auto bg-white prose-h2:text-3xl',
          currentPage === 0 ? 'p-0' : 'px-6 pb-6 pt-2 [scrollbar-gutter:stable_both-edges]',
          textEnlarge ? 'prose-p:text-xl' : 'prose-p:text-base',
        )}
      >
        {currentPage !== 0 && (
          <div className="text-right text-sm text-muted-foreground">
            {pages.length > 0 ? `Page: ${currentPage}` : 'No pages'}
          </div>
        )}

        {currentPage === 0 ? (
          cover && typeof cover === 'object' ? (
            <div className="relative h-full w-full">
              <RenderMedia media={cover} />
            </div>
          ) : (
            <ImagePlaceholder />
          )
        ) : null}

        {(() => {
          const page = pages?.[currentPage - 1]

          if (!page) return null

          if ('body' in page && page.body) {
            return (
              <RichText className="mx-auto max-w-[48rem]" data={page.body} enableGutter={false} />
            )
          }

          if ('image' in page) {
            return (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                <div className="relative h-full w-full">
                  <RenderMedia media={page.image} />
                </div>

                {page.caption && <div className="">{page.caption}</div>}
              </div>
            )
          }

          return null
        })()}
      </div>

      <ReaderNextPageButton
        disabled={currentPage >= pages.length || pages.length === 0}
        onClick={() => {
          setCurrentPage((page) => Math.min(pages.length, page + 1))
          if (viewRef.current) {
            viewRef.current.scrollTop = 0
          }
        }}
        className="hidden rounded-l-none sm:flex"
      >
        <ChevronRight />
      </ReaderNextPageButton>

      <ViewMobileButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
        viewRef={viewRef}
      />
    </div>
  )
}

export function ViewMobileButtons({
  currentPage,
  setCurrentPage,
  pages,
  viewRef,
}: ViewMobileButtonsProps) {
  return (
    <div className="flex w-full justify-between gap-2 sm:hidden">
      <ReaderNextPageButton
        disabled={currentPage <= 0 || pages.length === 0}
        onClick={() => {
          setCurrentPage((page) => Math.max(0, page - 1))
          if (viewRef.current) {
            viewRef.current.scrollTop = 0
          }
        }}
        className="w-full px-4 py-4"
      >
        <ChevronLeft />
      </ReaderNextPageButton>

      <ReaderNextPageButton
        disabled={currentPage >= pages.length || pages.length === 0}
        onClick={() => {
          setCurrentPage((page) => Math.min(pages.length, page + 1))
          if (viewRef.current) {
            viewRef.current.scrollTop = 0
          }
        }}
        className="w-full px-4 py-4"
      >
        <ChevronRight />
      </ReaderNextPageButton>
    </div>
  )
}
