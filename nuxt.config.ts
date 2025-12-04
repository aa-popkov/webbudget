// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/ui",
    "nuxt-auth-utils",
    "nuxt-echarts",
  ],

  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    session: {
      password: "",
      maxAge: 60 * 60,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
  },
  echarts: {
    renderer: ["svg", "canvas"],
    charts: ["BarChart", "LineChart", "PieChart"],
    components: [
      "DatasetComponent",
      "GridComponent",
      "TooltipComponent",
      "TitleComponent",
      "LegendComponent",
    ],
    features: ["LabelLayout", "UniversalTransition"],
  },
})
