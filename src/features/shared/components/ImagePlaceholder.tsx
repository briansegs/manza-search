import React from 'react'
import MissingImage from '../../../components/ImageMissing'
import { cn } from '@/utilities/ui'

type ImagePlaceholderProps = {
  className?: string
}

export function ImagePlaceholder({ className }: ImagePlaceholderProps) {
  return (
    <div className={cn('flex h-full items-center justify-center bg-card p-4', className)}>
      <MissingImage />
    </div>
  )
}
