import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import PageClient from './page.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Signin as signinGlobalType } from '@/payload-types'
import { isValidLink } from '@/utilities/isValidLink'
import { CMSLink } from '@/components/Link'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { SigninButton } from '@/features/signin/components/SigninButton'
import { Metadata } from 'next'
import { UserSigninButton } from '@/features/signin/components/UserSigninButton'
import { SignedInButton } from '@/features/signin/components/SignedInButton'

export const dynamic = 'force-static'
export const revalidate = 600

const SigninPage = async () => {
  const signinData: signinGlobalType = await getCachedGlobal('signin', 1)()

  const { pageAd, signinButtons } = signinData

  const hasValidLink = isValidLink(pageAd?.url)

  return (
    <div className={cn('container flex w-full flex-col-reverse gap-2 py-2', 'xl:flex-row')}>
      <PageClient />
      <div
        className={cn(
          'border-content relative h-[600px] w-full overflow-hidden rounded-xl',
          'xl:w-2/3',
        )}
      >
        {hasValidLink ? (
          <CMSLink {...pageAd?.url}>
            {pageAd?.image ? <RenderMedia media={pageAd.image} /> : <ImagePlaceholder />}
          </CMSLink>
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      <div
        className={cn(
          'border-content flex h-[600px] w-full flex-col justify-center gap-10 rounded-xl p-4',
          'xl:w-1/3',
        )}
      >
        <div className="space-y-2 text-center">
          <div className="flex h-12 justify-center">
            <SignedInButton />
          </div>

          <h1 className={cn('font-serif text-3xl font-medium', 'lg:text-4xl xl:text-5xl')}>
            Welcome Back
          </h1>
          <p>How would you like to sign in?</p>
        </div>

        <div
          className={cn(
            'flex w-full flex-col items-stretch gap-2',
            'sm:items-center xl:items-stretch',
          )}
        >
          <UserSigninButton />

          {signinButtons?.links?.map(({ id, title, path }) => {
            if (!path) return null

            return (
              <Link key={id} href={path}>
                <SigninButton>For {title}</SigninButton>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SigninPage

export function generateMetadata(): Metadata {
  return {
    title: `Sign In | Manza Search`,
  }
}
