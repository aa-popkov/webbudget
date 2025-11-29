import { getDatabase } from "~~/database/drizzle"
import { categoryTable } from "~~/database/schema"

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await readBody<BudgetCategoryInput>(event)
  const db = getDatabase()

  await db
    .insert(categoryTable)
    .values({
      userId: user.id,
      name: body.name,
    })
    .execute()

  return
})
