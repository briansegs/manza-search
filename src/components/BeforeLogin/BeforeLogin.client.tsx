'use client'

import { useSearchParams } from 'next/navigation'

type BeforeLoginClientProps = {
  userTypes: string[]
}

export function BeforeLoginClient({ userTypes }: BeforeLoginClientProps) {
  const searchParams = useSearchParams()

  const rawType = searchParams.get('user-type')

  let storedType: string | null = null

  try {
    storedType = localStorage.getItem('user-type')
  } catch (error) {
    console.log(`Error getting item (key: user-type) from localStorage: ${error}`)
  }

  const type = rawType ?? storedType

  const allowedTypes = new Set(userTypes.map((u) => u.toLowerCase()))

  const userType: string | null =
    type && allowedTypes.has(type.toLowerCase()) ? type.toLowerCase() : null

  return (
    <div className="space-y-6 pb-4">
      <h1 className="text-center font-serif font-bold capitalize">
        {userType ? `${userType} Login` : 'Login'}
      </h1>
      <p className="font-serif text-xl">
        <b>Welcome back!</b>
        {' Login to add, edit, delete, and manage your content.'}
      </p>
    </div>
  )
}
