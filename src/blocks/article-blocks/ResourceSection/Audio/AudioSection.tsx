import React from 'react'
import TitleBar from '../../TitleBar'
import { ResourceWithSlug } from '../types'

type AudioType = {
  name: string
}

const audio: AudioType[] = []

export function AudioSection(props: ResourceWithSlug) {
  const { title } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content relative w-full">
        <div className="custom-scrollbar overflow-x-auto pb-4 pt-8 sm:pb-8">
          <div className="mx-auto flex w-fit gap-8 px-4 xl:px-16">
            {audio && audio.length > 0 ? (
              audio.map((audio, index) => (
                <div
                  key={index}
                  className="border-content relative h-72 w-96 flex-shrink-0 overflow-hidden rounded-lg"
                >
                  {audio ? audio.name : 'audio missing'}
                </div>
              ))
            ) : (
              <div className="py-4 text-center">No audio available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
