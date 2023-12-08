<template>
  <button
    class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-max px-4 py-2"
    @click="emit('handleSort')"
    :class="{
      'bg-green-500 text-white': isEnabled(SortFilterEnum.ASC),
      'bg-yellow-300': isEnabled(SortFilterEnum.DESC)
    }"
  >
    {{ buttonText }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { SortFilterEnum } from '../enums/FiltersEnum'
const props = defineProps<{ sortState: SortFilterEnum }>()
const emit = defineEmits<{
  handleSort: [void]
}>()

const text = {
  [SortFilterEnum.ASC]: 'Ascending',
  [SortFilterEnum.DESC]: 'Descending'
}

const isEnabled = (state: SortFilterEnum) => props.sortState === state
const buttonText = computed(() => text[props.sortState] || 'Sort by Date')
</script>
