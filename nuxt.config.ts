// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],

  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    session: {
      password: "",
      maxAge: 60 * 60,
    },
  },
  vite: {
    server: {
      allowedHosts: ["tenue.serveo.net"],
    },
  },
})
