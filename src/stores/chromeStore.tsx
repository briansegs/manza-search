'use client'

import { create } from 'zustand'

export type ChromeActions = {
  setHideToolbox: (hide: boolean) => void
}

export type ChromeState = {
  hideToolbox: boolean
  actions: ChromeActions
}

const useChromeStore = create<ChromeState>((set) => ({
  hideToolbox: false,
  actions: {
    setHideToolbox: (hideToolbox) => set({ hideToolbox }),
  },
}))

export const useHideToolbox = () => useChromeStore((state) => state.hideToolbox)

export const useChromeActions = () => useChromeStore((state) => state.actions)
