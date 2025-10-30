'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

export type SectionOptions = 'pin' | 'save' | 'history' | 'lists'

type ContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  section: SectionOptions
  setSection: (section: SectionOptions) => void
}

const initialContext: ContextType = {
  section: 'pin',
  setSection: () => null,
  open: false,
  setOpen: () => null,
}

const FiloContext = createContext(initialContext)

export const FiloProvider = ({ children }: { children: React.ReactNode }) => {
  const [section, setSection] = useState<SectionOptions>(initialContext.section)
  const [open, setOpen] = useState<boolean>(initialContext.open)

  return (
    <FiloContext.Provider
      value={{
        open,
        setOpen,
        section,
        setSection,
      }}
    >
      {children}
    </FiloContext.Provider>
  )
}

export const useFilo = () => {
  const context = useContext(FiloContext)

  if (!context) throw new Error('useFilo must be used within FiloProvider')

  return context
}
