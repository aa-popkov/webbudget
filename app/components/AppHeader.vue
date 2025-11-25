<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui"

const navLinks: NavigationMenuItem[] = [
  {
    label: "Home",
    icon: "i-lucide-home",
    to: "/",
  },
  {
    label: "Projects",
    icon: "i-lucide-folder",
    to: "/projects",
  },
  {
    label: "Blog",
    icon: "i-lucide-file-text",
    to: "/blog",
  },
  {
    label: "Speaking",
    icon: "i-lucide-mic",
    to: "/speaking",
  },
  {
    label: "About",
    icon: "i-lucide-user",
    to: "/about",
  },
]
</script>

<template>
  <UHeader mode="drawer">
    <template #title>
      <div class="flex items-center group gap-x-1">
        <UIcon
          name="i-game-icons:two-coins"
          class="dark:group-hover:text-amber-300 group-hover:text-amber-400 text-primary transition-colors duration-300"
        />
        <p>
          <span>Web</span>
          <span class="text-primary">Budget</span>
        </p>
      </div>
    </template>

    <UNavigationMenu
      :items="navLinks"
      variant="link"
      class="bg-muted/80 backdrop-blur-lg rounded-full px-4"
    />

    <template #right>
      <UColorModeButton />

      <AuthState>
        <template #default="{ loggedIn, clear, user }">
          <UAvatar
            v-if="loggedIn"
            :src="user?.avatarUrl"
            size="xs"
            @click="
              async () => {
                await clear()
                await $router.push('/auth')
              }
            "
          />
          <UButton
            v-else
            color="neutral"
            variant="ghost"
            to="/auth"
            icon="i-lucide:log-in"
          />
        </template>
        <template #placeholder>
          <USkeleton class="size-8 rounded-full" />
        </template>
      </AuthState>
    </template>
    <template #body>
      <UNavigationMenu
        :items="navLinks"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>

<style scoped></style>
