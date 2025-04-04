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

  return <button onClick={handleClick}>{children}</button>
}

export default ScrollToSection
