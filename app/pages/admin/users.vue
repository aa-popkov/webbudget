<script setup lang="ts">
import type { FormSubmitEvent, TableColumn } from "@nuxt/ui"
import { h, resolveComponent } from "vue"
import {
  UserInputSchema,
  type User,
  type UserInput,
} from "~~/shared/types/user"

const UButton = resolveComponent("UButton")
const UDropdownMenu = resolveComponent("UDropdownMenu")
const { $fetchWithHeaders } = useFetchWithHeaders()

const { data, refresh, pending } = await useAsyncData("users", () =>
  $fetchWithHeaders("/api/user")
)

const email = reactive<Partial<UserInput>>({ email: "" })
const toast = useToast()

const handleDelete = async (id: string) => {
  await $fetch(`/api/user/${id}`, {
    method: "DELETE",
  })
  await refresh()
}

const columns: TableColumn<User>[] = [
  {
    id: "action",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: [
              [
                {
                  label: row.original.id,
                },
              ],
              [
                {
                  label: "Delete",
                  icon: "i-lucide-trash-2",
                  class: "text-error",
                  onClick: async () => {
                    await handleDelete(row.original.id)
                  },
                },
              ],
            ],
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            })
        )
      )
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "lastAuth",
    header: "Last Auth",
    cell: ({ row }) => {
      if (!row.original.lastAuth) {
        return "n/a"
      }
      return new Date(row.original.lastAuth).toLocaleString("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    },
  },
]

const columnVisibility = ref({
  id: false,
})

const onSubmit = async (event: FormSubmitEvent<UserInput>) => {
  await $fetch("/api/user", {
    method: "POST",
    body: event.data,
  })
  toast.add({
    title: "Success",
    description: "User created!",
    color: "success",
  })
  await refresh()
}
</script>

<template>
  <div class="pt-4">
    <UCard class="w-fit">
      <UForm
        :schema="UserInputSchema"
        :state="email"
        class="flex items-start gap-x-2"
        @submit="onSubmit"
      >
        <UFormField name="email">
          <UInput v-model="email.email" placeholder="admin@example.com" />
        </UFormField>

        <UButton
          type="submit"
          icon="i-lucide-user"
          variant="outline"
          class="cursor-pointer"
        >
          Add user
        </UButton>
      </UForm>
    </UCard>
    <UTable
      :data="data"
      :columns="columns"
      :loading="pending"
      :column-visibility="columnVisibility"
    />
  </div>
</template>
