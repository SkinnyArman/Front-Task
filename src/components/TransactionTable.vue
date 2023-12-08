<template>
  <table class="w-full caption-bottom text-sm">
    <thead class="[&amp;_tr]:border-b">
      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <th
          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap"
          v-for="header in HEADERS"
          :key="header"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody class="[&amp;_tr:last-child]:border-0">
      <tr
        v-for="transaction in props.transactions"
        :key="transaction.id"
        class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      >
        <td class="p-4 align-middle">
          {{ transaction.name }}
        </td>
        <td class="p-4 align-middle whitespace-nowrap">
          {{ transaction.date }}
        </td>
        <td class="p-4 align-middle">
          {{ transaction.title }}
        </td>
        <td class="p-4 align-middle">
          {{ transaction.field }}
        </td>
        <td class="p-4 align-middle">
          {{ transaction.old_value }}
        </td>
        <td class="p-4 align-middle">
          {{ transaction.new_value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Transaction } from '../types/Transaction'
const HEADERS = ['User', 'Date', 'Ad Title', 'Ad Field', 'Old Value', 'New Value']
type Proptype = {
  transactions: Transaction[]
}
const props = defineProps<Proptype>()
</script>

<style></style>
