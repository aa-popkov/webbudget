import z from "zod"
import { v4 as uuidv4 } from "uuid"

export const budgetRowZodSchema = z.object({
  id: z.uuidv4().default(uuidv4()),
  date: z.date().default(new Date()),
  category: z.string(),
  amount: z.number(),
})

export type BudgetRow = z.infer<typeof budgetRowZodSchema>