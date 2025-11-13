import { Doc } from 'convex/_generated/dataModel'
import z from 'zod'

type Saves = Doc<'savedContent'>

type Pins = Doc<'pinnedContent'>

type ListItems = {
  _id: string
  name: string
  items: Doc<'listedContent'>[]
}

export const fetchSavedContentSchema = z.object({
  saveList: z.array(z.custom<Saves>()),
})

export const fetchPinnedContentSchema = z.object({
  pinList: z.array(z.custom<Pins>()),
})

export const fetchListedContentSchema = z.object({
  listItems: z.array(z.custom<ListItems>()),
})
