import { Doc } from 'convex/_generated/dataModel'
import z from 'zod'

type Saves = Doc<'savedContent'>

export const fetchSavedContentSchema = z.object({
  saveList: z.array(z.custom<Saves>()),
})
