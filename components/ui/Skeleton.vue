<template>
  <div :class="['animate-pulse rounded-md bg-muted/40', variantClass, customClass]" />
</template>
<script setup lang="ts">
interface Props {
  variant?: 'default' | 'circle' | 'title' | 'card'
  class?: string
}
import { computed } from 'vue'
const props = defineProps<Props>()
const variantClass = computed(() => {
  switch (props.variant) {
    case 'circle': return 'aspect-square w-12'
    case 'title': return 'h-6 w-48'
    case 'card': return 'h-64 w-full'
    default: return 'h-4 w-full'
  }
})
const customClass = props.class
</script>
