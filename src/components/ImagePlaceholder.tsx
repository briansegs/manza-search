import React from 'react'
import MissingImage from './ImageMissing'

const ImagePlaceholder: React.FC = () => (
  <div className="flex h-full items-center justify-center bg-card p-4">
    <MissingImage />
  </div>
)

export default ImagePlaceholder
