import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  src: string
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, src } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="flex items-center gap-1">
      <img
        alt="Manza Search Logo"
        width={'auto'}
        height={48}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('h-12 w-auto', className)}
        src={src}
      />
    </div>
  )
}
