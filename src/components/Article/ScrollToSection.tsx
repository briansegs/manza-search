'use client'

import React, { ReactNode } from 'react'

interface ScrollToSectionProps {
  id: string
  children: ReactNode
}

const ScrollToSection: React.FC<ScrollToSectionProps> = ({ id, children }) => {
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
      className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 text-left align-middle"
    >
      {children}
    </button>
  )
}

export default ScrollToSection
