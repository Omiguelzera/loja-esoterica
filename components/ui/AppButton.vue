<template>
  <button
    :class="buttonClass"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <div v-if="loading" class="flex items-center gap-2">
      <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      <span v-if="loadingText">{{ loadingText }}</span>
      <span v-else><slot /></span>
    </div>
    <div v-else class="flex items-center gap-2">
      <Component v-if="icon" :is="icon" :class="iconClass" />
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useDesignSystem } from '@/composables/useDesignSystem'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: Component
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  rounded?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  iconPosition: 'left',
  fullWidth: false,
  rounded: false
})

const emit = defineEmits<Emits>()
const { buttonClasses, transitions } = useDesignSystem()

const buttonClass = computed(() => {
  const base = buttonClasses(props.variant, props.size)
  const width = props.fullWidth ? 'w-full' : ''
  const shape = props.rounded ? 'rounded-full' : ''
  const disabled = (props.disabled || props.loading) ? 'opacity-50 cursor-not-allowed' : ''
  
  let variantClass = ''
  if (props.variant === 'destructive') {
    variantClass = 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
  }
  
  return `${base} ${variantClass} ${width} ${shape} ${disabled} ${transitions.normal}`
})

const iconClass = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  return sizes[props.size]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>