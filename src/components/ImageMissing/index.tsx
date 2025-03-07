import { Image } from 'lucide-react'
import React from 'react'

const MissingImage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-2">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image /> <div className="font-medium">Image Missing</div>
    </div>
  )
}

export default MissingImage
