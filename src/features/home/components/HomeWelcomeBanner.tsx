'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'

export function HomeWelcomeBanner() {
  const { isLoaded, user } = useUser()

  const name = isLoaded && user && user.firstName ? user.firstName : ''

  return (
    <div className="flex min-h-6 w-fit items-center justify-center rounded-primary bg-black shadow-[10px_10px_10px_black] sm:w-[350px] md:w-[400px] lg:w-[600px]">
      <div className="text-wrap px-4 py-2 font-serif text-2xl text-white">
        Welcome
        {<span className="ml-1">{name}</span>}!
      </div>
    </div>
  )
}
