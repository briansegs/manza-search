import { NavBarClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { NavBar as NavBarType } from '@/payload-types'

export async function NavBar() {
  const navBarData: NavBarType = await getCachedGlobal('navBar', 1)()

  return <NavBarClient data={navBarData} />
}
