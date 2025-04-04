'use client'

import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { ButtonProps } from '../ui/button'

interface ScrollToSectionProps extends ButtonProps {
  id: string
  children: ReactNode
}

const ScrollToSection: React.FC<ScrollToSectionProps> = ({ id, children, className }) => {
  const handleClick = () => {
    const section = document.getElementById(id)
    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        className,
        'inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 text-left align-middle',
      )}
    >
      {children}
    </button>
  )
}

export default ScrollToSection
