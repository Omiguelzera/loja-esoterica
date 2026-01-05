<script setup lang="ts">
// Redirecionar para o dashboard unificado
definePageMeta({
  middleware: async () => {
    return navigateTo('/dashboard', { redirectCode: 301 })
  }
})
</script>

<template>
  <div class="text-center py-12">
    <Icon name="heroicons:arrow-path" class="animate-spin h-8 w-8 text-primary-600 mx-auto mb-4" />
    <p class="text-gray-500 dark:text-gray-400">Redirecionando...</p>
  </div>
</template>