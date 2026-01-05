<template>
  <div 
    class="elegant-border p-6 rounded-lg transition-all duration-300"
    :class="gradientClass"
  >
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <img
            :src="avatar"
            :alt="title"
            class="w-16 h-16 rounded-full object-cover elegant-border"
          />
          <div 
            v-if="badge"
            class="absolute -bottom-1 -right-1 elegant-border rounded-full p-1 bg-white dark:bg-gray-800"
          >
            <Icon :name="badge.icon" class="h-4 w-4" :class="badge.colorClass" />
          </div>
        </div>
        
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ title }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            {{ subtitle }}
          </p>
          <div v-if="badge" class="flex items-center mt-2">
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="badge.bgClass"
            >
              <Icon :name="badge.icon" class="h-3 w-3 mr-1" />
              {{ badge.text }}
            </span>
          </div>
        </div>
      </div>
      
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
      
      <div v-else-if="meta" class="text-right">
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ meta.label }}</div>
        <div class="font-medium text-gray-900 dark:text-white">{{ meta.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Badge {
  icon: string
  text: string
  colorClass: string
  bgClass: string
}

interface Meta {
  label: string
  value: string
}

interface Props {
  title: string
  subtitle: string
  avatar?: string
  badge?: Badge
  meta?: Meta
  variant?: 'admin' | 'customer' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  avatar: '/avatars/default.svg',
  variant: 'default'
})

const gradientClass = computed(() => {
  const gradients = {
    admin: 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
    customer: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    default: 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20'
  }
  return gradients[props.variant]
})
</script>
