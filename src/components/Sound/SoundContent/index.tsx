import { cn } from '@/utilities/ui'
import React from 'react'
import PageContentContainer from '@/components/PageContentContainer'
import SoundContentItem from './SoundContentItem'

export interface Audio {
  slug: string
  title: string
  audioImage: { media: null }
}

export interface SoundCategory {
  slug: string
  title: string
  id?: string
  audio: Audio[]
}

interface SoundContentProps {
  content: SoundCategory[] | null | undefined
}

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

const SoundContent: React.FC<SoundContentProps> = ({ content }) => {
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

export default SoundContent
