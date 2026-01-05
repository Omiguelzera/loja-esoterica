<template>
  <div class="elegant-border p-6 rounded-lg">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
      <span class="flex items-center">
        <Icon :name="icon" class="h-5 w-5 mr-2 text-primary-600" />
        {{ title }}
      </span>
      <NuxtLink 
        v-if="viewAllLink" 
        :to="viewAllLink" 
        class="text-sm text-primary-600 hover:text-primary-700 dark:hover:text-primary-500 transition-colors"
      >
        {{ viewAllText }}
      </NuxtLink>
    </h2>
    
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon: string
  viewAllLink?: string
  viewAllText?: string
}

withDefaults(defineProps<Props>(), {
  viewAllText: 'Ver todos'
})
</script>
