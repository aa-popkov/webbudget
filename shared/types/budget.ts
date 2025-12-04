import z from "zod"

export const BudgetAmountZodSchema = z.object({
  id: z.uuidv4(),
  userId: z.uuidv4(),
  amount: z.float64("Required"),
  categoryId: z.uuidv4("Required"),
  date: z.string("Required"),
  type: z.boolean().default(false),
})
export type BudgetAmount = z.infer<typeof BudgetAmountZodSchema>

export const BudgetAmountInputZodSchema = BudgetAmountZodSchema.omit({
  id: true,
  userId: true,
})
export type BudgetAmountInput = z.infer<typeof BudgetAmountInputZodSchema>

export const BudgetCategoryZodSchema = z.object({
  id: z.uuidv4(),
  userId: z.uuidv4(),
  name: z.string("Required"),
})
export type BudgetCategory = z.infer<typeof BudgetCategoryZodSchema>

export const BudgetCategoryInputZodSchema = BudgetCategoryZodSchema.omit({
  id: true,
  userId: true,
})
export type BudgetCategoryInput = z.infer<typeof BudgetCategoryInputZodSchema>
