'use client'

import { createContext, useContext, useState } from 'react'

export type TextSize = 'off' | 'large' | 'x-large'

type ContextType = {
  textSize: TextSize
  setTextSize: (string: TextSize) => void
}

const initialContext: ContextType = {
  textSize: 'off',
  setTextSize: () => null,
}

const TextSizeContext = createContext(initialContext)

export const TextSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [textSize, setTextSize] = useState<TextSize>(initialContext.textSize)

  return (
    <TextSizeContext.Provider
      value={{
        textSize,
        setTextSize: (size) => setTextSize(size),
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
