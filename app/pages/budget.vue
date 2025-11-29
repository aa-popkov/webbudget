<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui"
import {
  type CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date"

const { $fetchWithHeaders } = useFetchWithHeaders()
const toast = useToast()
const pagination = ref({
  pageIndex: 0,
  pageSize: 5,
  total: 0,
})

const [
  { data: dataBudget, refresh: refreshBudget, pending: pendingBudget },
  { data: dataCategory, refresh: refreshCategory, pending: pendingCategory },
] = await Promise.all([
  useAsyncData(
    "amounts",
    () =>
      $fetchWithHeaders(
        `/api/budget?offset=${pagination.value.pageIndex * pagination.value.pageSize}&limit=${pagination.value.pageSize}`
      ),
    {
      watch: [() => pagination.value.pageIndex],
      transform: (v) => {
        pagination.value.total = v.total
        return v.data
      },
    }
  ),
  useAsyncData("categories", () => $fetchWithHeaders("/api/budget/category")),
])

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
  await refreshBudget()
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

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
})
const calendarDate = shallowRef<CalendarDate>(today(getLocalTimeZone()))
const date = computed({
  get: () => calendarDate.value,
  set: (v) => {
    calendarDate.value = v
    state.date = v?.toString()
  },
})
</script>
<template>
  <div class="py-4">
    <UCard>
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
            <UBadge
              :color="state.type ? 'success' : 'error'"
              variant="outline"
              >{{ state.type ? "Income" : "Expense" }}</UBadge
            >
          </div>
        </UFormField>
        <UFormField name="date" label="Amount date">
          <UPopover>
            <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
              {{
                calendarDate
                  ? df.format(calendarDate.toDate(getLocalTimeZone()))
                  : "Select a date"
              }}
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
    </UCard>

    <div class="flex justify-end border-t border-default pt-4 px-4">
      <UPagination
        :items-per-page="pagination.pageSize"
        :total="pagination.total"
        @update:page="(p) => (pagination.pageIndex = p - 1)"
      />
    </div>

    <UTable :data="dataBudget" class="flex-1" :loading="pendingBudget">
      <template #type-cell="{ row }">
        <UBadge
          :variant="'outline'"
          :color="row.original.type ? 'success' : 'error'"
        >
          {{ row.original.type ? "Income" : "Expense" }}
        </UBadge>
      </template>
    </UTable>

    <div class="grid lg:grid-cols-2 grid-cols-1 gap-2 min-h-[600px]">
      <UCard >
        <BudgetPieChart
          v-if="!pendingBudget"
          :data="
            dataBudget?.map((x) => ({ name: x.category, value: x.amount })) ??
            []
          "
        />
      </UCard>
      <UCard>
        <BudgetBarChart
          v-if="!pendingBudget"
          :data="
            dataBudget?.map((x) => ({ name: x.category, value: x.amount })) ??
            []
          "
        />
      </UCard>
    </div>
  </div>
</template>

<style></style>
