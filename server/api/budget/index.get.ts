import { eq, between, sql, and, desc } from "drizzle-orm"
import { getDatabase } from "~~/database/drizzle"
import { budgetTable, categoryTable, usersTable } from "~~/database/schema"

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const query = getQuery<{
    order?: string
    limit: string
    offset: string
    dateRange?: string
  }>(event)

  const db = getDatabase()

  const amountsQuery = db
    .select({
      amount: budgetTable.amount,
      type: budgetTable.type,
      date: budgetTable.date,
      category: categoryTable.name,
    })
    .from(budgetTable)
    .innerJoin(
      usersTable,
      and(
        eq(budgetTable.userId, usersTable.id),
        eq(usersTable.email, user.email)
      )
    )
    .innerJoin(categoryTable, eq(categoryTable.id, budgetTable.categoryId))
    .limit(parseInt(query.limit))
    .offset(parseInt(query.offset))

  if (query.order) {
    amountsQuery.orderBy(sql`${query.order}`)
  } else {
    amountsQuery.orderBy(desc(budgetTable.date))
  }

  if (query.dateRange) {
    const [start, end] = query.dateRange.split("--").map((x) => new Date(x))
    amountsQuery.where(between(budgetTable.date, start, end))
  }

  const amounts = await amountsQuery.execute()

  return amounts
})
