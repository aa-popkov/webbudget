<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui"
import { type CalendarDate, getLocalTimeZone } from "@internationalized/date"
import useDateFormat from "~/composables/dateFormat"

const emit = defineEmits<{
  (e: "refresh"): Promise<void>
}>()

const { $fetchWithHeaders } = useFetchWithHeaders()
const {
  data: dataCategory,
  refresh: refreshCategory,
  pending: pendingCategory,
} = await useAsyncData("category", () =>
  $fetchWithHeaders("/api/budget/category")
)
const { formatDate } = useDateFormat()
const toast = useToast()
const state = reactive<Partial<BudgetAmountInput>>({})

const onSubmit = async (event: FormSubmitEvent<BudgetAmountInput>) => {
  await $fetch("/api/budget", {
    method: "POST",
    body: event.data,
  })
  toast.add({
    title: "Success",
    description: "Success added!",
    color: "success",
  })
  await emit("refresh")
}

const handleCreateCategory = async (item: string) => {
  await $fetch("/api/budget/category", {
    method: "POST",
    body: {
      name: item,
    },
  })
  await refreshCategory()
}

const calendarDate = shallowRef<CalendarDate>()
const date = computed({
  get: () => calendarDate.value,
  set: (v) => {
    calendarDate.value = v
    state.date = v?.toDate(getLocalTimeZone()).toISOString()
  },
})
</script>
<template>
  <UForm
    :schema="BudgetAmountInputZodSchema"
    :state="state"
    class="flex items-start justify-evenly flex-col lg:flex-row gap-y-4"
    @submit="onSubmit"
  >
    <UFormField name="amount" label="Amount">
      <UInputNumber
        v-model="state.amount"
        :step-snapping="false"
        :format-options="{
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }"
        :min="0"
        :step="100"
      />
    </UFormField>
    <UFormField name="type" label="Type">
      <div class="flex items-center gap-x-2">
        <USwitch v-model="state.type" />
        <UBadge :color="state.type ? 'success' : 'error'" variant="outline">{{
          state.type ? "Income" : "Expense"
        }}</UBadge>
      </div>
    </UFormField>
    <UFormField name="date" label="Amount date">
      <UPopover>
        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
          {{ calendarDate ? formatDate(calendarDate) : "Select a date" }}
        </UButton>

        <template #content>
          <UCalendar v-model="date" class="p-2" />
        </template>
      </UPopover>
    </UFormField>

    <UFormField name="categoryId" label="Category">
      <USelectMenu
        v-model="state.categoryId"
        create-item
        label-key="name"
        value-key="id"
        :items="dataCategory"
        :loading="pendingCategory"
        class="w-48"
        @create="handleCreateCategory"
      />
    </UFormField>
    <div>
      <div>&nbsp;</div>
      <UButton type="submit" variant="outline" size="sm">Submit</UButton>
    </div>
  </UForm>
</template>

<style></style>
