export default defineOAuthGoogleEventHandler({
  config: {},
  async onSuccess(event, { user, tokens: _ }) {
    await setUserSession(event, {
      user: {
        email: user.email,
        avatarUrl: user.picture,
      },
    })
    return sendRedirect(event, "/")
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("Google OAuth error:", error)
    return sendRedirect(event, "/")
  },
})
