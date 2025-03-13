import { Button } from '@/components/ui/button'
import { Media } from '@/payload-types'
import React from 'react'
import { renderMedia, renderPlaceholder } from '../../components'
import clsx from 'clsx'

type VideosType = {
  image?: Media
  id: string
  name: string
}

const videos: VideosType[] = [
  {
    id: '67d0ada48f59c7a439a3055d',
    name: 'Video 1',
  },
  {
    id: '67d0ada88f59c7a439a3055f',
    name: 'Video 2',
  },
  {
    id: '67d0adaa8f59c7a439a30561',
    name: 'Video 3',
  },
  {
    id: '67d0adac8f59c7a439a30563',
    name: 'Video 4',
  },
  {
    id: '67d0adae8f59c7a439a30565',
    name: 'Video 5',
  },
]

const buttonStyles =
  'size-14 rounded-full border-4 border-white bg-black text-xl text-white hover:bg-black hover:text-navBar'

const Videos = () => {
  return (
    <>
      {videos && videos.length > 0 ? (
        videos.map(({ image, id, name }) => (
          <div key={id} className="border-content h-fit rounded-lg bg-header">
            <div className="relative h-64 w-96 flex-shrink-0 overflow-hidden">
              {image ? renderMedia(image) : renderPlaceholder()}
            </div>

            <div className="flex flex-col gap-2 p-2">
              <div className="mb-3 font-serif text-xl text-white">
                <div>Name: {name}</div>
              </div>

              <div className="mb-3 flex justify-center gap-4">
                <Button className={clsx(buttonStyles)}>B</Button>
                <Button className={clsx(buttonStyles)}>A</Button>
                <Button className={clsx(buttonStyles)}>LM</Button>
                <Button className={clsx(buttonStyles)}>QS</Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-4 text-center">No videos available</div>
      )}
    </>
  )
}
export default Videos
