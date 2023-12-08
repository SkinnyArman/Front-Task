<template>
  <input
    class="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg shadow-lg w-1/4"
    type="date"
    :value="props.value"
    @change="handleEnter($event)"
  />
</template>

<script setup lang="ts">
type Proptype = {
  value?: string
}
const props = defineProps<Proptype>()
const emit = defineEmits<{
  change: [string]
}>()

const handleEnter = (event: Event) => {
  const { target } = event
  emit('change', (target as HTMLButtonElement).value)
}
</script>

<style></style>
