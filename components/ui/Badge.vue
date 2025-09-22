<template>
  <span :class="classes"><slot /></span>
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface Props { variant?: 'default' | 'outline' }
const props = defineProps<Props>()
const base = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors'
const classes = computed(() => {
  if (props.variant === 'outline') return base + ' border-border text-foreground'
  return base + ' bg-primary text-primary-foreground border-transparent'
})
</script>
<style scoped>
</style>