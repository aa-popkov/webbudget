<script lang="ts" setup>
import { getLocalTimeZone, today } from "@internationalized/date"

const { $fetchWithHeaders } = useFetchWithHeaders()

const dateRange = ref({
  start: today(getLocalTimeZone()).subtract({ weeks: 1 }),
  end: today(getLocalTimeZone()),
})
const daRangeTs = computed(() => {
  return `${dateRange.value.start.toDate(getLocalTimeZone()).toISOString()}--${dateRange.value.end.toDate(getLocalTimeZone()).toISOString()}`
})

const {
  data: dataBudget,
  refresh: refreshBudget,
  pending: pendingBudget,
} = await useAsyncData(
  "amounts",
  () => $fetchWithHeaders(`/api/budget?dateRange=${daRangeTs.value}`),
  {
    watch: [() => dateRange.value.end],
  }
)
</script>
<template>
  <div class="py-4 space-y-4">
    <UCard>
      <BudgetAddForm @refresh="refreshBudget" />
    </UCard>

    <BudgetTable :data="dataBudget ?? []" :is-loading="pendingBudget">
      <template #date-range>
        <DateRangePicker v-model:date-range="dateRange" />
      </template>
    </BudgetTable>

    <div class="grid lg:grid-cols-2 grid-cols-1 gap-2 min-h-[600px]">
      <UCard>
        <BudgetPieChart
          v-if="!pendingBudget"
          title="Sum by Category"
          :data="
            dataBudget?.map((x) => ({ name: x.category, value: x.amount })) ??
            []
          "
        />
      </UCard>

      <UCard>
        <BudgetPieChart
          v-if="!pendingBudget"
          title="Sum by Type"
          :data="
            dataBudget?.map((x) => {
              return {
                name: x.type ? 'Income' : 'Expense',
                value: x.amount,
              }
            }) ?? []
          "
          :colors="['#ff6467', '#05df72']"
        />
      </UCard>
    </div>
  </div>
</template>

<style></style>
