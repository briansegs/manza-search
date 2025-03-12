import React from 'react'

type AudioType = {
  name: string
}

const audio: AudioType[] = []

const Audio = () => {
  return (
    <>
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
    </>
  )
}

export default Audio
