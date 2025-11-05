'use client'

import { create } from 'zustand'

export type SectionOptions = 'pin' | 'save' | 'history' | 'lists'

export type FiloActions = {
  setOpen: (open: boolean) => void
  setSection: (section: SectionOptions) => void
}

export type FiloState = {
  open: boolean
  section: SectionOptions
  actions: FiloActions
}

const useFiloStore = create<FiloState>((set) => ({
  section: 'pin',
  open: false,
  actions: {
    setSection: (section) => set({ section }),
    setOpen: (open) => set({ open }),
  },
}))

export const useFiloSection = () => useFiloStore((state) => state.section)

export const useFiloOpen = () => useFiloStore((state) => state.open)

export const useFiloActions = () => useFiloStore((state) => state.actions)
