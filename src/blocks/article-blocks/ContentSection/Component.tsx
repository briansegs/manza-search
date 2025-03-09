import { ContentSection as ContentSectionProps } from '@/payload-types'
import React from 'react'
import { renderMedia, TitleBar } from '../components'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

const buttonStyles = 'bg-slate-200 hover:bg-slate-300 text-black border-2 border-black'

export const ContentSection: React.FC<ContentSectionProps> = (props) => {
  const { title, alignment, media, content } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div
        className={clsx(
          'border-content flex w-full justify-between gap-8 px-16 py-12',
          alignment === 'right' && 'flex-row-reverse',
        )}
      >
        {media && (
          <div className="flex-shrink-0">
            <div className="mb-4 flex justify-around">
              <Button className={`${buttonStyles}`}>B</Button>
              <Button className={`${buttonStyles}`}>A</Button>
              <Button className={`${buttonStyles}`}>LM</Button>
            </div>

            <div className="border-content relative size-64 overflow-hidden rounded-lg">
              {renderMedia(media)}
            </div>
          </div>
        )}
        {content && (
          <div className={clsx(media && 'mt-12')}>
            <RichText data={content} enableGutter={false} />
          </div>
        )}
      </div>
    </div>
  )
}
