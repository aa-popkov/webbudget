import { getDatabase } from "~~/database/drizzle"
import { budgetTable } from "~~/database/schema"

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await readBody<BudgetAmountInput>(event)
  const db = getDatabase()

  await db
    .insert(budgetTable)
    .values({
      userId: user.id,
      amount: body.amount,
      categoryId: body.categoryId,
      date: new Date(body.date),
      type: body.type,
    })
    .execute()

  return
})
