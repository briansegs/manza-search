import { getCachedGlobal } from '@/utilities/getGlobals'
import { BeforeLoginClient } from './BeforeLogin.client'
import type { Signin as signinGlobalType } from '@/payload-types'

export default async function BeforeLogin() {
  const signinData: signinGlobalType = await getCachedGlobal('signin', 1)()

  const { signinButtons } = signinData

  const userTypes = signinButtons?.links?.map((button) => button.userType)

  return <BeforeLoginClient userTypes={userTypes || []} />
}
