import { eq } from "drizzle-orm"
import { getDatabase } from "~~/database/drizzle"
import { usersTable } from "~~/database/schema"

export default defineOAuthYandexEventHandler({
  async onSuccess(event, { user, tokens: _ }) {
    if (!user.default_email) {
      throw createError({
        statusCode: 401,
        message: "Email is required",
      })
    }
    const db = getDatabase()
    const userId = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.default_email))
      .limit(1)

    if (!userId.length) {
      return sendRedirect(event, "/auth?error=permission_denied")
    }

    await setUserSession(event, {
      user: {
        id: userId[0].id,
        email: user.default_email,
        avatarUrl: `https://avatars.yandex.net/get-yapic/${user.default_avatar_id}/islands-50`,
      },
    })

    await db
      .update(usersTable)
      .set({
        lastAuth: new Date().toISOString(),
      })
      .where(eq(usersTable.id, userId[0].id))

    return sendRedirect(event, "/")
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("Yandex OAuth error:", error)
    return sendRedirect(event, "/")
  },
})
