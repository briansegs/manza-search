import { ResourceSection as ResourceSectionProps } from '@/payload-types'
import React from 'react'
import Images from './Images'
import { TitleBar } from '../components'
import Books from './Books'
import Audio from './Audio'
import Videos from './Videos'
import Shop from './Shop'

const resource = {
  images: Images,
  books: Books,
  audio: Audio,
  videos: Videos,
  shop: Shop,
}

export const ResourceSection: React.FC<ResourceSectionProps> = (props) => {
  const { title, type } = props

  if (!type) return null

  const ResourceToRender = resource[type]
  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content w-full overflow-x-auto py-4 sm:py-8">
        <div className="mx-auto flex w-fit gap-8 px-4 xl:px-16">
          <ResourceToRender />
        </div>
      </div>
    </div>
  )
}
