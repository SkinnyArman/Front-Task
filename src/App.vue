<template>
  <div class="rounded-lg bg-card text-card-foreground px-4 py-6">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">Transaction History</h3>
    </div>
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <input
          v-model="filterName"
          class="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-lg w-1/2"
          placeholder="Filter by name, date, or ad title"
          type="search"
        />
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-4"
          @click="sortBy('date')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <line x1="10" x2="21" y1="6" y2="6"></line>
            <line x1="10" x2="21" y1="12" y2="12"></line>
            <line x1="10" x2="21" y1="18" y2="18"></line>
            <path d="M4 6h1v4"></path>
            <path d="M4 10h2"></path>
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
          </svg>
          Sort by Date
        </button>
      </div>
      <div class="relative w-full overflow-auto">
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
              v-for="transaction in sortedTransactions"
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
      </div>
      <div class="flex justify-between items-center mt-6">
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mr-2"
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          Previous
        </button>
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import data from './data/records.json'

const transactions = ref(data)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const filterName = ref('')
const filterDate = ref('')
const filterTitle = ref('')
const sortByField = ref('')
const sortDirection = ref('asc')

const sortedTransactions = computed(() => {
  const filteredTransactions = transactions.value.filter((transaction) => {
    return (
      transaction.name.includes(filterName.value) &&
      transaction.date.includes(filterDate.value) &&
      transaction.title.includes(filterTitle.value)
    )
  })

  if (sortByField.value) {
    return filteredTransactions.sort((a, b) => {
      const modifier = sortDirection.value === 'asc' ? 1 : -1
      return modifier * (a[sortByField.value] > b[sortByField.value] ? 1 : -1)
    })
  }

  return filteredTransactions
})

const totalPages = computed(() => {
  return Math.ceil(sortedTransactions.value.length / itemsPerPage.value)
})

const sortBy = (field) => {
  if (field === sortByField.value) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortByField.value = field
    sortDirection.value = 'asc'
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>
