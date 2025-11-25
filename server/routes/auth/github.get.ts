export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens: _ }) {
    await setUserSession(event, {
      user: {
        githubId: user.id,
        avatarUrl: user.avatar_url,
      },
    })

    return sendRedirect(event, "/")
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error)
    return sendRedirect(event, "/")
  },
})
