import React from 'react'
import MissingImage from '../../../components/ImageMissing'

export function ImagePlaceholder() {
  return (
    <div className="flex h-full items-center justify-center bg-card p-4">
      <MissingImage />
    </div>
  )
}
