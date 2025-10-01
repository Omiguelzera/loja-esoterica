<template>
  <span :class="badgeClass">
    <Component v-if="icon" :is="icon" :class="iconClass" />
    <slot />
    <button v-if="closable" @click="handleClose" class="ml-1 hover:bg-black/10 rounded-full p-0.5">
      <X class="w-3 h-3" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { X } from 'lucide-vue-next'
import { useDesignSystem } from '@/composables/useDesignSystem'

interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  icon?: Component
  closable?: boolean
  outline?: boolean
  rounded?: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  closable: false,
  outline: false,
  rounded: false
})

const emit = defineEmits<Emits>()
const { badgeClasses } = useDesignSystem()

const badgeClass = computed(() => {
  let base = ''
  
  // Usar as classes base do design system quando possível
  if (['primary', 'success', 'warning', 'error'].includes(props.variant)) {
    base = badgeClasses(props.variant as 'primary' | 'success' | 'warning' | 'error')
  } else {
    // Classe para neutral
    base = 'bg-gray-100 text-gray-800 px-3 py-1 text-sm font-medium rounded-md'
  }
  
  const sizeClass = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }[props.size]
  
  const shape = props.rounded ? 'rounded-full' : 'rounded-md'
  const display = 'inline-flex items-center gap-1'
  
  let outline = ''
  if (props.outline) {
    const outlineMap = {
      primary: 'border border-blue-500 bg-transparent text-blue-500',
      success: 'border border-green-500 bg-transparent text-green-500',
      warning: 'border border-yellow-500 bg-transparent text-yellow-500',
      error: 'border border-red-500 bg-transparent text-red-500',
      neutral: 'border border-gray-300 bg-transparent text-gray-600'
    }
    outline = outlineMap[props.variant]
  }
  
  return `${outline || base} ${sizeClass} ${shape} ${display} font-medium transition-all duration-200`
})

const iconClass = computed(() => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }
  return sizes[props.size]
})

const handleClose = () => {
  emit('close')
}
</script>