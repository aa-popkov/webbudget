export default defineNuxtRouteMiddleware(async (to, _) => {
  const { loggedIn, fetch } = useUserSession()
  await fetch()
  if (!to.meta.public && !loggedIn.value) {
    return navigateTo("/auth")
  }
  if (to.meta.public && loggedIn.value) {
    return navigateTo("/")
  }
})
