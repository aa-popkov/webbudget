<script setup lang="ts">
import {
  type AnyCalendarDate,
  type CalendarDate,
  today,
  getLocalTimeZone,
} from "@internationalized/date"
import useDateFormat from "~/composables/dateFormat"

const { formatDate } = useDateFormat()

const modelValue = defineModel<{
  start: AnyCalendarDate
  end: AnyCalendarDate
}>("date-range", {
  required: true,
})

const dateRange = computed({
  get: () => ({
    start: modelValue.value.start as CalendarDate,
    end: modelValue.value.end as CalendarDate,
  }),
  set: (v) => {
    modelValue.value.start = v.start
    modelValue.value.end = v.end
  },
})

const ranges = [
  {
    label: "Last 7 days",
    onSelect: () => {
      modelValue.value.start = today(getLocalTimeZone()).subtract({ weeks: 1 })
      modelValue.value.end = today(getLocalTimeZone())
    },
  },
  {
    label: "Last month",
    onSelect: () => {
      modelValue.value.start = today(getLocalTimeZone()).subtract({ months: 1 })
      modelValue.value.end = today(getLocalTimeZone())
    },
  },
  {
    label: "Last year",
    onSelect: () => {
      modelValue.value.start = today(getLocalTimeZone()).subtract({ years: 1 })
      modelValue.value.end = today(getLocalTimeZone())
    },
  },
]
</script>

<template>
  <UPopover
    arrow
    :content="{
      align: 'start',
      side: 'bottom',
    }"
  >
    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
      <template v-if="modelValue.start">
        <template v-if="modelValue.end">
          {{ formatDate(dateRange.start) }} -
          {{ formatDate(dateRange.end) }}
        </template>

        <template v-else>
          {{ formatDate(dateRange.start) }}
        </template>
      </template>
      <template v-else> Pick a date </template>
    </UButton>

    <template #content>
      <UFieldGroup class="w-full">
        <UButton
          v-for="item in ranges"
          :key="item.label"
          class="w-full justify-center"
          variant="outline"
          @click="item.onSelect"
          >{{ item.label }}</UButton
        >
      </UFieldGroup>
      <UCalendar v-model="dateRange" class="p-2" :number-of-months="2" range />
    </template>
  </UPopover>
</template>

<style></style>
