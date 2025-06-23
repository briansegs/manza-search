import { cn } from '@/utilities/ui'
import React from 'react'
import PageContentContainer from '@/components/PageContentContainer'
import { SoundContentItem } from './SoundContentItem'
import { SoundContentProps } from '../types'

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

export function SoundContent({ content }: SoundContentProps) {
  if (!content || content.length === 0) {
    return <NoContent />
  }

  return (
    <div
      className={cn(
        'flex w-full flex-wrap justify-center gap-12',
        'mt-1 px-2',
        'lg:mt-12 lg:px-32',
      )}
    >
      {content.map((category) => {
        const { id, title, slug, audio } = category

        return (
          <PageContentContainer key={id} slug={slug} title={title}>
            {audio.map(
              ({ title, audioImage, slug }) =>
                audioImage &&
                typeof audioImage === 'object' && (
                  <SoundContentItem audioImage={audioImage} title={title} slug={slug} key={slug} />
                ),
            )}
          </PageContentContainer>
        )
      })}
    </div>
  )
}
