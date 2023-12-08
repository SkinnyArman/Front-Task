<template>
  <div class="rounded-lg bg-card text-card-foreground px-4 py-6">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">Transaction History</h3>
    </div>
    <div class="p-6" v-if="!isFetching">
      <div class="flex justify-between items-center mb-4">
        <input
          class="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-lg w-1/4"
          placeholder="Date From"
          type="date"
          :value="paramKey(FiltersEnum.StartDate)"
          @change="handleRoute(FiltersEnum.StartDate, $event.target?.value)"
        />

        <!-- Date To Input -->
        <input
          class="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-lg w-1/4"
          placeholder="Date To"
          type="date"
          :value="paramKey(FiltersEnum.EndDate)"
          @change="handleRoute(FiltersEnum.EndDate, $event.target?.value)"
        />
        <input
          class="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-lg"
          placeholder="Filter by name"
          type="search"
          :value="paramKey(FiltersEnum.Name)"
          @keydown.enter="handleRoute(FiltersEnum.Name, $event.target?.value)"
        />
        <input
          class="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-lg"
          placeholder="Filter by title"
          type="search"
          :value="paramKey(FiltersEnum.Title)"
          @keydown.enter="handleRoute(FiltersEnum.Title, $event.target?.value)"
        />
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-4"
          @click="handleSort"
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
              v-for="transaction in data.data"
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
          @click="handleRoute(FiltersEnum.Page, data.page - 1)"
          :disabled="data.page === 1"
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
          @click="handleRoute(FiltersEnum.Page, data.page + 1)"
          :disabled="data.page === data.totalPages"
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { BASE_URL } from './constants'
import { useUrlSearchParams } from '@vueuse/core'

enum UrlSearchModeEnum {
  Hash = 'hash',
  History = 'history'
}

const params = useUrlSearchParams(UrlSearchModeEnum.History)
const query = computed(() => new URLSearchParams(params).toString())
const url = computed(() => BASE_URL + '?' + query.value)

enum FiltersEnum {
  Sort = 'sortBy',
  Name = 'name',
  Title = 'title',
  StartDate = 'startDate',
  EndDate = 'endDate',
  Page = 'page'
}
enum SortFilterEnum {
  ASC = 'asc',
  DESC = 'desc'
}
type FiltersType = {
  [FiltersEnum.Sort]?: SortFilterEnum
  [FiltersEnum.Name]?: string
  [FiltersEnum.Title]?: string
  [FiltersEnum.StartDate]?: string
  [FiltersEnum.EndDate]?: string
  [FiltersEnum.Page]?: number
}

const paramKey = (key: FiltersEnum) => params[key]
const handleSort = () => {
  const currentSort = paramKey(FiltersEnum.Sort)
  const nextSort =
    currentSort === SortFilterEnum.ASC
      ? SortFilterEnum.DESC
      : currentSort === SortFilterEnum.DESC
        ? undefined
        : SortFilterEnum.ASC

  handleRoute(FiltersEnum.Sort, nextSort)
}

const { isFetching, error, data } = useFetch(url, {
  refetch: true
}).json()

const handleRoute = <K extends keyof FiltersType>(field: K, value: FiltersType[K]) => {
  if (value === undefined) {
    delete params[field] // Remove the parameter if value is undefined
  } else {
    params[field] = typeof value === 'number' ? value.toString() : value
  }
}
</script>
