import { Doc } from 'convex/_generated/dataModel'
import z from 'zod'

type Saves = Doc<'savedContent'>

type Pins = Doc<'pinnedContent'>

export const fetchSavedContentSchema = z.object({
  saveList: z.array(z.custom<Saves>()),
})

export const fetchPinnedContentSchema = z.object({
  pinList: z.array(z.custom<Pins>()),
})
