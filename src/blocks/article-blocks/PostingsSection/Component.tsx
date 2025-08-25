'use client'

import { CMSLink } from '@/components/Link'
import { PostingsSection as PostingsSectionProps } from '@/payload-types'
import React from 'react'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import TitleBar from '../TitleBar'
import { useReadMode } from '@/providers/ReadModeProvider'

export const PostingsSectionBlock: React.FC<PostingsSectionProps> = (props) => {
  const { readMode } = useReadMode()

  const { title, postings } = props

  if (readMode) return null

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content custom-scrollbar w-full overflow-x-auto py-4 md:py-8">
        <div className="mx-auto flex w-fit gap-6 px-4 xl:px-16">
          {postings && postings.length > 0 ? (
            postings.map(({ id, link, media }) => {
              const hasValidLink =
                link && (link.type === 'reference' ? link.reference : link.type === 'custom')

              return (
                <div
                  key={id}
                  className="border-content relative h-72 w-[406px] flex-shrink-0 overflow-hidden rounded-primary hover:shadow-[10px_10px_10px_#60b3d3]"
                >
                  {hasValidLink ? (
                    <CMSLink {...link}>
                      {media ? <RenderMedia media={media} /> : <ImagePlaceholder />}
                    </CMSLink>
                  ) : media ? (
                    <RenderMedia media={media} />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>
              )
            })
          ) : (
            <div className="py-4 text-center">No postings available</div>
          )}
        </div>
      </div>
    </div>
  )
}
