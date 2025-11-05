import { create } from 'zustand'

export type TextSizeOptions = 'off' | 'large' | 'x-large'

type TextSizeActions = {
  setTextSize: (size: TextSizeOptions) => void
}

export type TextSizeState = {
  textSize: TextSizeOptions
  actions: TextSizeActions
}

const useTextSizeStore = create<TextSizeState>((set) => ({
  textSize: 'off',
  actions: {
    setTextSize: (textSize) => set({ textSize }),
  },
}))

export const useTextSize = () => useTextSizeStore((state) => state.textSize)

export const useTextSizeActions = () => useTextSizeStore((state) => state.actions)
