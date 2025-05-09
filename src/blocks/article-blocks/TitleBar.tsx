import React from 'react'

interface TitleBarProps {
  title: string | null | undefined
}

const TitleBar: React.FC<TitleBarProps> = ({ title }) => (
  <div className="border-content w-full bg-primary-blue pl-10">
    <p className="min-h-[28px] font-serif text-lg capitalize text-white">{title || ''}</p>
  </div>
)

export default TitleBar
