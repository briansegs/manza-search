'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type BeforeLoginClientProps = {
  userTypes: string[]
}

export function BeforeLoginClient({ userTypes }: BeforeLoginClientProps) {
  const [userType, setUserType] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const typeFromLS = localStorage.getItem('user-type')
    const typeFromSP = searchParams.get('user-type')
    const type = typeFromSP || typeFromLS

    if (type && userTypes.includes(type)) {
      setUserType(type)
    } else {
      setUserType(null)
    }
  }, [searchParams, userTypes])

  return (
    <div className="space-y-6 pb-4">
      <h1 className="text-center font-serif font-bold capitalize">
        {' '}
        {userType ? `${userType} Login` : 'Login'}
      </h1>
      <p className="font-serif text-xl">
        <b>Welcome back!</b>
        {' Login to add, edit, delete, and manage your content.'}
      </p>
    </div>
  )
}
