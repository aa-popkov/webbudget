<script lang="ts" setup>
import type { NavigationMenuItem, DropdownMenuItem } from "@nuxt/ui"

const { clear, loggedIn, user, ready } = useUserSession()
const router = useRouter()

const navLinks: NavigationMenuItem[] = [
  {
    label: "Home",
    icon: "i-lucide-home",
    to: "/",
  },
  {
    label: "Budget",
    icon: "i-game-icons:two-coins",
    to: "/budget",
  },
  {
    label: "About",
    icon: "i-lucide-user",
    to: "/about",
  },
]
const userMenu: DropdownMenuItem[][] = [
  [
    {
      label: user.value?.email,
    },
  ],
  [
    {
      label: "Users",
      icon: "i-lucide-settings",
      to: "/admin/users",
      class: user.value?.email === "smile3d007@gmail.com" ? "" : "hidden",
    },
  ],
  [
    {
      label: "Profile",
      icon: "i-lucide-user",
    },
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      class: "text-error",
      ui: {
        itemLeadingIcon: "text-error",
      },
      onClick: async () => {
        await clear()
        await router.push("/auth")
      },
    },
  ],
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
      <div v-if="ready">
        <UDropdownMenu v-if="loggedIn" :items="userMenu">
          <UAvatar :src="user?.avatarUrl" size="xs" />
        </UDropdownMenu>
        <UButton
          v-else
          color="neutral"
          variant="ghost"
          to="/auth"
          icon="i-lucide:log-in"
        />
      </div>
      <USkeleton v-else class="size-8 rounded-full" />
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
