<template>
  <NuxtLink 
    :to="to" 
    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all group cursor-pointer"
  >
    <div 
      class="flex items-center justify-center w-10 h-10 rounded-lg transition-colors mr-3"
      :class="[iconBgClass, iconHoverClass]"
    >
      <Icon :name="icon" class="h-5 w-5" :class="iconColorClass" />
    </div>
    <div class="flex-1">
      <p class="font-medium text-gray-900 dark:text-white">{{ title }}</p>
      <p class="text-sm text-gray-500">{{ subtitle }}</p>
    </div>
    <Icon 
      v-if="showArrow"
      name="heroicons:chevron-right" 
      class="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100" 
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  to: string
  icon: string
  title: string
  subtitle: string
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'gray'
  showArrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  showArrow: true
})

const variantClasses = {
  primary: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    hover: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40',
    icon: 'text-blue-600'
  },
  success: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    hover: 'group-hover:bg-green-200 dark:group-hover:bg-green-900/40',
    icon: 'text-green-600'
  },
  warning: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    hover: 'group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/40',
    icon: 'text-yellow-600'
  },
  danger: {
    bg: 'bg-red-100 dark:bg-red-900/20',
    hover: 'group-hover:bg-red-200 dark:group-hover:bg-red-900/40',
    icon: 'text-red-600'
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    hover: 'group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40',
    icon: 'text-purple-600'
  },
  gray: {
    bg: 'bg-gray-100 dark:bg-gray-700',
    hover: 'group-hover:bg-gray-200 dark:group-hover:bg-gray-600',
    icon: 'text-gray-600 dark:text-gray-300'
  }
}

const iconBgClass = computed(() => variantClasses[props.variant].bg)
const iconHoverClass = computed(() => variantClasses[props.variant].hover)
const iconColorClass = computed(() => variantClasses[props.variant].icon)
</script>
