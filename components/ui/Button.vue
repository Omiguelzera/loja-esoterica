<template>
  <button
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
      variantClasses,
      sizeClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default'
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    case 'outline':
      return 'border border-border bg-transparent hover:bg-secondary/30'
    case 'ghost':
      return 'hover:bg-secondary/30'
    case 'destructive':
      return 'bg-destructive text-destructive-foreground hover:bg-destructive/80'
    default:
      return 'bg-primary text-primary-foreground hover:bg-primary/80'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 px-3'
    case 'lg':
      return 'h-11 px-8'
    case 'icon':
      return 'h-9 w-9'
    default:
      return 'h-9 px-4 py-2'
  }
})
</script>
