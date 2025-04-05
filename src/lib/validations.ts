import z from 'zod'

export const DictAnswerSchema = z.object({
  word: z
    .string()
    .min(2, { message: 'Must be at least 2 characters' })
    .max(45, { message: 'Must be 45 characters or fewer' })
    .regex(/^[a-zA-Z]+$/, 'Only alphabetic characters are allowed'),
})
