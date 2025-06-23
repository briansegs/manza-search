'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'

export function HomeWelcomeBanner() {
  const { isLoaded, user } = useUser()

  const name = isLoaded && user && user.firstName ? user.firstName : ''

  return (
    <div className="flex h-6 w-[98%] items-center justify-center bg-black shadow-[10px_10px_10px_black]">
      <div className="font-serif text-white">
        Welcome
        {<span className="ml-1 text-green-500 underline">{name}</span>}!
      </div>
    </div>
  )
}
