import { eq } from "drizzle-orm"
import { getDatabase } from "~~/database/drizzle"
import { budgetTable } from "~~/database/schema"

export default defineEventHandler(async (event) => {
  const { user: _ } = await requireUserSession(event)
  const amountId = getRouterParam(event, "id")
  if (!amountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Amount ID is required",
    })
  }
  const db = getDatabase()
  const users = await db
    .delete(budgetTable)
    .where(eq(budgetTable.id, amountId))
    .returning()

  return users
})
