'use client'

import { useSearchParams } from 'next/navigation'

type BeforeLoginClientProps = {
  userTypes: string[]
}

export function BeforeLoginClient({ userTypes }: BeforeLoginClientProps) {
  const searchParams = useSearchParams()

  const type = searchParams.get('user-type') || localStorage.getItem('user-type') || null

  let userType = null

  if (type && userTypes.includes(type)) {
    userType = type
  }

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
