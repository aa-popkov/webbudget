<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => (colorMode.value === "dark" ? "#1b1718" : "white"))

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.svg" }],
  htmlAttrs: {
    lang: "en",
  },
})

const title = "WebBudget App"
const description = ""

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  // ogImage: "https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png",
  // twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png",
  twitterCard: "summary_large_image",
})
</script>
<template>
  <UApp>
    <AppHeader />

    <UMain
      class="lg:min-h-[calc(100vh-var(--ui-header-height)-6rem-1px)] min-h-[calc(100vh-var(--ui-header-height)-13rem-1px)]"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <USeparator
      icon="i-simple-icons-nuxtdotjs"
      type="dashed"
      class="h-px my-2"
    />

    <AppFooter />
  </UApp>
</template>
