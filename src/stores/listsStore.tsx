'use client'

import { create } from 'zustand'

type ContentType = 'article' | 'image' | 'book' | null

export type ListsActions = {
  setOpen: (open: boolean) => void
  setContentId: (contentId: string) => void
  setContentType: (contentType: ContentType) => void
}

export type ListsState = {
  open: boolean
  contentId: string | null
  contentType: ContentType
  actions: ListsActions
}

const useListsStore = create<ListsState>((set) => ({
  open: false,
  contentId: null,
  contentType: null,
  actions: {
    setOpen: (open) => set({ open }),
    setContentId: (contentId) => set({ contentId }),
    setContentType: (contentType) => set({ contentType }),
  },
}))

export const useListsOpen = () => useListsStore((state) => state.open)

export const useListsContentId = () => useListsStore((state) => state.contentId)

export const useListsContentType = () => useListsStore((state) => state.contentType)

export const useListsActions = () => useListsStore((state) => state.actions)
