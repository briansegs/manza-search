'use client'

import { createContext, useContext, useState } from 'react'

export type TextSizeOptions = 'off' | 'large' | 'x-large'

type ContextType = {
  textSize: TextSizeOptions
  setTextSize: (size: TextSizeOptions) => void
}

const initialContext: ContextType = {
  textSize: 'off',
  setTextSize: () => null,
}

const TextSizeContext = createContext(initialContext)

export const TextSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [textSize, setTextSize] = useState<TextSizeOptions>(initialContext.textSize)

  return (
    <TextSizeContext.Provider
      value={{
        textSize,
        setTextSize,
      }}
    >
      {children}
    </TextSizeContext.Provider>
  )
}

export const useTextSize = () => {
  const context = useContext(TextSizeContext)

  if (!context) throw new Error('useTextSize must be used within TextSizeProvider')

  return context
}
