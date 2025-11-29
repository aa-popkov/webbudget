<script lang="ts" setup>
definePageMeta({
  public: "true",
})

const providers = [
  {
    label: "Google",
    icon: "i-simple-icons-google",
    onClick: () => {
      window.location.href = "/auth/google"
    },
  },
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    onClick: () => {
      window.location.href = "/auth/github"
    },
  },
  {
    label: "Yandex",
    icon: "i-fa7-brands:yandex",
    onClick: () => {
      window.location.href = "/auth/yandex"
    },
    ui: {
      leadingIcon: "text-error",
    },
  },
]
</script>

<template>
  <div class="m-auto h-full">
    <div class="flex flex-col items-center justify-center gap-4 p-4">
      <UPageCard class="w-full max-w-md">
        <UAuthForm
          title="Authentication"
          description="Select provider"
          icon="i-lucide-user"
          :providers="providers"
        />
        <UAlert
          v-if="$route.query.error === 'permission_denied'"
          color="error"
          title="Error, Permission Denied"
          description="You don't have permission to access this App"
          icon="i-lucide:message-circle-warning"
        />
        <UAlert
          v-if="$route.query.error === 'email_not_verified'"
          color="error"
          title="Error, can't get email"
          description="You don't provide a email"
          icon="i-lucide:message-circle-warning"
        />
      </UPageCard>
    </div>
  </div>
</template>

<style></style>
