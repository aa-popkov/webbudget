<script setup lang="ts">
import { getPaginationRowModel } from "@tanstack/vue-table"
import useDateFormat from "~/composables/dateFormat"

defineProps<{
  isLoading: boolean
  data: {
    amount: number
    type: boolean
    date: string
    category: string
  }[]
}>()

const pagination = ref({
  pageIndex: 0,
  pageSize: 5,
})
const table = useTemplateRef("table")
const { formatDateByString } = useDateFormat()
</script>
<template>
  <div>
    <div class="flex justify-between items-center">
      <slot name="date-range" />

      <UPagination
        :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
    <UTable
      ref="table"
      v-model:pagination="pagination"
      :data="data"
      class="flex-1"
      :loading="isLoading"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
    >
      <template #type-cell="{ row }">
        <UBadge
          :variant="'outline'"
          :color="row.original.type ? 'success' : 'error'"
        >
          {{ row.original.type ? "Income" : "Expense" }}
        </UBadge>
      </template>
      <template #date-cell="{ row }">
        <p>{{ formatDateByString(row.original.date) }}</p>
      </template>
    </UTable>
  </div>
</template>
