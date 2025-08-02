import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React, { Suspense } from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return (
    <Suspense fallback={null}>
      <HeaderClient data={headerData} />
    </Suspense>
  )
}
