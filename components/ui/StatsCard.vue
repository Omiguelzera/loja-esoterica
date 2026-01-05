<template>
  <div class="elegant-border p-6 rounded-lg text-center hover:magic-glow transition-all duration-300">
    <div 
      class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full transition-colors"
      :class="iconBgClass"
    >
      <Icon :name="icon" class="h-6 w-6" :class="iconClass" />
    </div>
    <div class="text-2xl font-bold mb-1" :class="valueClass">
      {{ formattedValue }}
    </div>
    <div class="text-sm text-gray-600 dark:text-gray-400">
      {{ label }}
    </div>
    <div v-if="sublabel" class="text-xs mt-1" :class="sublabelClass">
      {{ sublabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  icon: string
  value: number | string
  label: string
  sublabel?: string
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'yellow'
  format?: 'number' | 'currency'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  format: 'number'
})

const formattedValue = computed(() => {
  if (typeof props.value === 'string') return props.value
  
  if (props.format === 'currency') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(props.value)
  }
  
  return props.value.toString()
})

const variantClasses = {
  primary: {
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    icon: 'text-blue-600',
    value: 'text-blue-600',
    sublabel: 'text-blue-600'
  },
  success: {
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    icon: 'text-green-600',
    value: 'text-green-600',
    sublabel: 'text-green-600'
  },
  warning: {
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/20',
    icon: 'text-yellow-600',
    value: 'text-yellow-600',
    sublabel: 'text-yellow-600'
  },
  danger: {
    iconBg: 'bg-red-100 dark:bg-red-900/20',
    icon: 'text-red-600',
    value: 'text-red-600',
    sublabel: 'text-red-600'
  },
  info: {
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/20',
    icon: 'text-cyan-600',
    value: 'text-cyan-600',
    sublabel: 'text-cyan-600'
  },
  purple: {
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    icon: 'text-purple-600',
    value: 'text-purple-600',
    sublabel: 'text-purple-600'
  },
  yellow: {
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/20',
    icon: 'text-yellow-600',
    value: 'text-yellow-600',
    sublabel: 'text-yellow-600'
  }
}

const iconBgClass = computed(() => variantClasses[props.variant].iconBg)
const iconClass = computed(() => variantClasses[props.variant].icon)
const valueClass = computed(() => variantClasses[props.variant].value)
const sublabelClass = computed(() => variantClasses[props.variant].sublabel)
</script>
