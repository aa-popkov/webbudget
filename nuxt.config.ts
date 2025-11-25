import { readFileSync } from "node:fs"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],

  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    googleSheets: {
      serviceAccount: JSON.parse(
        readFileSync("google_service_account.json", {
          encoding: "utf-8",
        })
      ),
    },
  },
  vite: {
    server: {
      allowedHosts: ["tenue.serveo.net"],
    },
  },
})
