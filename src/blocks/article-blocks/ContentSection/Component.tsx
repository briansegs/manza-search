import { ContentSection as ContentSectionProps } from '@/payload-types'
import React from 'react'
import { renderMedia, TitleBar } from '../components'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

const buttonStyles = 'bg-slate-200 hover:bg-slate-300 text-black border-2 border-black'

export const ContentSection: React.FC<ContentSectionProps> = (props) => {
  const { title, alignment, image1, image2, content } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content flex w-full flex-col gap-8 px-16 py-12">
        <div className="flex justify-end">
          <div className="flex w-64 justify-around">
            <Button className={`${buttonStyles}`}>B</Button>
            <Button className={`${buttonStyles}`}>A</Button>
            <Button className={`${buttonStyles}`}>LM</Button>
          </div>
        </div>

        {alignment !== 'left & right' ? (
          <div
            className={clsx(
              'flex w-full justify-between gap-8',
              alignment === 'right' && 'flex-row-reverse',
            )}
          >
            {image1 && (
              <div className="flex-shrink-0">
                <div className="border-content relative size-64 overflow-hidden rounded-lg">
                  {renderMedia(image1)}
                </div>
              </div>
            )}

            {content && (
              <div className={clsx(image1 && 'mt-2')}>
                <RichText data={content} enableGutter={false} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between gap-8">
            {image1 && (
              <div className="flex-shrink-0">
                <div className="border-content relative size-64 overflow-hidden rounded-lg">
                  {renderMedia(image1)}
                </div>
              </div>
            )}

            {content && (
              <div className={clsx((image1 || image2) && 'mt-2')}>
                <RichText data={content} enableGutter={false} />
              </div>
            )}

            {image2 && (
              <div className="flex-shrink-0">
                <div className="border-content relative size-64 overflow-hidden rounded-lg">
                  {renderMedia(image2)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
