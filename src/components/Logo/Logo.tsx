import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="flex items-center gap-1">
      <img
        alt="Manza Search Logo"
        width={44}
        height={44}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('h-11 w-11', className)}
        src="/favicon.svg"
      />

      <div className="text-nowrap font-serif text-2xl font-medium">Manza search</div>
    </div>
  )
}
