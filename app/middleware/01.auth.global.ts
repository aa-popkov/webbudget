export default defineNuxtRouteMiddleware((to, _) => {
  const { loggedIn } = useUserSession()
  if (!to.meta.public && !loggedIn.value) {
    return navigateTo("/auth")
  }
  if (to.meta.public && loggedIn.value) {
    return navigateTo("/")
  }
})
