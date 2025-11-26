<script lang="ts" setup>
const appConfig = useAppConfig()

const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
]
const neutrals = ["slate", "gray", "zinc", "neutral", "stone"]

const handleClickPrimary = (color: string) => {
  appConfig.ui.colors.primary = color
}
const handleClickNeutral = (color: string) => {
  appConfig.ui.colors.neutral = color
}
</script>
<template>
  <UPopover>
    <UButton color="primary" icon="i-lucide:palette" variant="ghost" />

    <template #content>
      <div class="p-4 space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Primary</p>
          <div class="grid grid-cols-3 gap-3">
            <UButton
              v-for="color in colors"
              :key="color"
              variant="outline"
              color="neutral"
              class="cursor-pointer"
              :disabled="color === appConfig.ui.colors.primary"
              @click="() => handleClickPrimary(color)"
            >
              <div class="flex justify-between items-center w-full gap-x-2">
                <div
                  class="size-2 rounded-full bg-(--chip-light) dark:bg-(--chip-dark)"
                  :style="{
                    '--chip-light': `var(--color-${color}-500)`,
                    '--chip-dark': `var(--color-${color}-400)`,
                  }"
                />
                <p class="capitalize">{{ color }}</p>
              </div>
            </UButton>
          </div>
        </div>
        <USeparator />
        <div class="space-y-2">
          <p class="text-sm">Neutral</p>
          <div class="grid grid-cols-3 gap-3">
            <UButton
              v-for="neutral in neutrals"
              :key="neutral"
              variant="outline"
              color="neutral"
              :disabled="neutral === appConfig.ui.colors.neutral"
              @click="() => handleClickNeutral(neutral)"
            >
              <div class="flex justify-between items-center w-full gap-x-2">
                <div
                  class="size-2 rounded-full bg-(--chip-light) dark:bg-(--chip-dark)"
                  :style="{
                    '--chip-light': `var(--color-${neutral === 'neutral' ? 'old-neutral' : neutral}-500)`,
                    '--chip-dark': `var(--color-${neutral === 'neutral' ? 'old-neutral' : neutral}-400)`,
                  }"
                />
                <p class="capitalize">{{ neutral }}</p>
              </div>
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<style scoped></style>
