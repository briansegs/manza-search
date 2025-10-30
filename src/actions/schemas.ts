import z from 'zod'

export const fetchSavedContentSchema = z.object({
  savedIds: z.array(z.string()),
})
