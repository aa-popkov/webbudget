import { z } from "zod"

export const UserZodSchema = z.object({
  id: z.uuidv4(),
  email: z.email(),
  lastAuth: z.string().nullable().default(null),
})
export type User = z.infer<typeof UserZodSchema>

export const UserInputSchema = UserZodSchema.pick({ email: true })
export type UserInput = z.infer<typeof UserInputSchema>
