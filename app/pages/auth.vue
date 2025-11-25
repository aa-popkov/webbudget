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
      </UPageCard>
    </div>
  </div>
</template>

<style></style>
