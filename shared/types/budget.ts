import z from "zod"

export const budgetRowZodSchema = z.object({
  id: z.uuidv4(),
  date: z.date().default(new Date()),
  category: z.string(),
  amount: z.number(),
})

export type BudgetRow = z.infer<typeof budgetRowZodSchema>