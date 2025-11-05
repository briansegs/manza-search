'use client'

import { create } from 'zustand'

type ReadModeActions = {
  toggleReadMode: () => void
}

export type ReadModeState = {
  readMode: boolean
  actions: ReadModeActions
}

const useReadModeStore = create<ReadModeState>((set) => ({
  readMode: false,
  actions: {
    toggleReadMode: () =>
      set((state) => ({
        readMode: !state.readMode,
      })),
  },
}))

export const useReadMode = () => useReadModeStore((state) => state.readMode)

export const useReadModeActions = () => useReadModeStore((state) => state.actions)
