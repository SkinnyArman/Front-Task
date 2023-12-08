<template>
  <table class="w-full caption-bottom text-sm">
    <thead class="[&amp;_tr]:border-b">
      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <th
          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
        >
          User
        </th>
        <th
          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
        >
          Date
        </th>
        <th
          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
        >
          Ad Title
        </th>
        <th
          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
        >
          Ad Field
        </th>
        <th
          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
        >
          Old Value
        </th>
        <th
          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
        >
          New Value
        </th>
      </tr>
    </thead>
    <tbody class="[&amp;_tr:last-child]:border-0">
      <tr
        v-for="transaction in props.transactions"
        :key="transaction.id"
        class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      >
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          {{ transaction.name }}
        </td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          {{ transaction.date }}
        </td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          {{ transaction.title }}
        </td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          {{ transaction.field }}
        </td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          {{ transaction.old_value }}
        </td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          {{ transaction.new_value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Transaction } from '../types/Transaction'
type Proptype = {
  transactions: Transaction[]
}
const props = defineProps<Proptype>()
</script>

<style></style>
