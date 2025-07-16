'use client'

import { createContext, useContext, useState } from 'react'

type ContextType = {
  readMode: boolean
  toggleReadMode: () => void
}

const initialContext: ContextType = {
  readMode: false,
  toggleReadMode: () => null,
}

const ReadModeContext = createContext(initialContext)

export const ReadModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [readMode, setReadMode] = useState<boolean>(false)

  return (
    <ReadModeContext.Provider
      value={{
        readMode,
        toggleReadMode: () => setReadMode((prev) => !prev),
      }}
    >
      {children}
    </ReadModeContext.Provider>
  )
}

export const useReadMode = () => {
  const context = useContext(ReadModeContext)

  if (!context) throw new Error('useReadMode must be used within ReadModeProvider')

  return context
}
