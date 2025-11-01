'use client'

import { SectionOptions, useFilo } from '@/providers/FiloProvider'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'

import { FiloMenu } from './FiloMenu'
import { FiloMenuUnauthenticated } from './FiloMenuUnauthenticated'

export function ArticleHeroMenu() {
  const { setOpen, setSection } = useFilo()

  const filoSections = ['pin', 'save', 'history', 'lists'] as const

  const handleOpen = (section: SectionOptions) => {
    setOpen(true)
    setSection(section)
  }

  return (
    <>
      <Authenticated>
        <FiloMenu handleOpen={handleOpen} filoSections={filoSections} />
      </Authenticated>

      <Unauthenticated>
        <FiloMenuUnauthenticated filoSections={filoSections} />
      </Unauthenticated>

      <AuthLoading>
        <FiloMenu disabled filoSections={filoSections} />
      </AuthLoading>
    </>
  )
}
