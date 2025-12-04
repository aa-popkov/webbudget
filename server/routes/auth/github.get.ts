import { eq } from "drizzle-orm"
import { getDatabase } from "~~/database/drizzle"
import { usersTable } from "~~/database/schema"

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens: _ }) {
    if (!user.email) {
      throw createError({
        statusCode: 401,
        message: "Email is required",
      })
    }
    const db = getDatabase()
    const userId = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email))
      .limit(1)

    if (!userId.length) {
      console.error("User not found")
      return sendRedirect(event, "/auth?error=permission_denied", 302)
    }

    await setUserSession(event, {
      user: {
        id: userId[0].id,
        email: user.email,
        avatarUrl: user.avatar_url,
      },
    })

    await db
      .update(usersTable)
      .set({
        lastAuth: new Date(),
      })
      .where(eq(usersTable.id, userId[0].id))

    return sendRedirect(event, "/")
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error)
    return sendRedirect(event, "/")
  },
})
