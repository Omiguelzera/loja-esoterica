<template>
  <div :class="cardClass">
    <div v-if="$slots.header" :class="headerClass">
      <slot name="header" />
    </div>
    
    <div :class="contentClass">
      <slot />
    </div>
    
    <div v-if="$slots.footer" :class="footerClass">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDesignSystem } from '@/composables/useDesignSystem'

interface Props {
  variant?: 'base' | 'hover'
  padding?: 'sm' | 'md' | 'lg'
  shadow?: boolean
  border?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'base',
  padding: 'md',
  shadow: true,
  border: true,
  hover: false
})

const { cardClasses, spacing, borders } = useDesignSystem()

const cardClass = computed(() => {
  const base = cardClasses(props.hover ? 'hover' : props.variant)
  const paddingClass = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }[props.padding]
  
  return `${base} ${paddingClass}`
})

const headerClass = computed(() => {
  const paddingClass = {
    sm: 'pb-3 mb-3',
    md: 'pb-4 mb-4', 
    lg: 'pb-6 mb-6'
  }[props.padding]
  
  return `${paddingClass} border-b border-gray-200/50`
})

const contentClass = computed(() => {
  return 'flex-1'
})

const footerClass = computed(() => {
  const paddingClass = {
    sm: 'pt-3 mt-3',
    md: 'pt-4 mt-4',
    lg: 'pt-6 mt-6'
  }[props.padding]
  
  return `${paddingClass} border-t border-gray-200/50`
})
</script>