<template>
  <div class="rounded-lg bg-card text-card-foreground px-4 py-6">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">Transaction History</h3>
    </div>
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex">
          <search-input
            class="mr-6"
            placeholder="Search by name"
            :value="paramKey(FiltersEnum.Name)"
            @enter="handleRoute(FiltersEnum.Name, $event)"
          ></search-input>
          <search-input
            class="mr-6"
            placeholder="Search by title"
            :value="paramKey(FiltersEnum.Title)"
            @enter="handleRoute(FiltersEnum.Title, $event)"
          ></search-input>
          <sort-button
            :sort-state="paramKey(FiltersEnum.Sort) as SortFilterEnum"
            @handleSort="handleSort"
          ></sort-button>
        </div>
        <div class="flex justify-end items-center w-full">
          <span class="font-medium text-muted-foreground mr-2">From:</span>
          <date-input
            class="mr-6"
            :value="paramKey(FiltersEnum.StartDate)"
            @change="handleRoute(FiltersEnum.StartDate, $event)"
          ></date-input>
          <span class="font-medium text-muted-foreground mr-2">To:</span>
          <date-input
            :value="paramKey(FiltersEnum.EndDate)"
            @change="handleRoute(FiltersEnum.EndDate, $event)"
          ></date-input>
        </div>
      </div>
      <svg-loader v-if="isFetching"></svg-loader>
      <div v-else class="relative w-full overflow-auto">
        <transaction-table :transactions="data.data"></transaction-table>
      </div>
      <div class="flex justify-between items-center mt-6">
        <pagination-button
          @click="handleRoute(FiltersEnum.Page, data.page - 1)"
          :disabled="data.page === 1"
        >
          Previous
        </pagination-button>
        <pagination-button
          @click="handleRoute(FiltersEnum.Page, data.page + 1)"
          :disabled="data.page === data.totalPages"
        >
          Next
        </pagination-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { BASE_URL } from './constants'
import { useUrlSearchParams } from '@vueuse/core'
import TransactionTable from './components/TransactionTable.vue'
import SortButton from './components/SortButton.vue'
import SearchInput from './components/SearchInput.vue'
import DateInput from './components/DateInput.vue'
import PaginationButton from './components/PaginationButton.vue'
import SvgLoader from './components/SvgLoader.vue'
import { FiltersEnum, SortFilterEnum } from './enums/FiltersEnum'
import { UrlSearchModeEnum } from './enums/SearchModeEnum'
import type { Filter } from './types/Filter'

const params = useUrlSearchParams(UrlSearchModeEnum.History)
const query = computed(() => new URLSearchParams(params).toString())
const url = computed(() => BASE_URL + '?' + query.value)

const { isFetching, data } = useFetch(url, {
  refetch: true
}).json()

const paramKey = <K extends keyof Filter>(key: K): string => params[key] as string
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

const handleRoute = <K extends keyof Filter>(field: K, value: Filter[K]) => {
  if (value === undefined) {
    delete params[field] // Remove the parameter if value is undefined
  } else {
    params[field] = typeof value === 'number' ? value.toString() : value
  }
}
</script>
