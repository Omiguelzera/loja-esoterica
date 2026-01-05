<template>
  <div v-if="loading" class="text-center py-12">
    <Icon name="heroicons:arrow-path" class="animate-spin h-8 w-8 text-primary-600 mx-auto mb-4" />
    <p class="text-gray-500 dark:text-gray-400">Carregando...</p>
  </div>

  <div v-else>
    <!-- Dashboard Unificado -->
    <UnifiedDashboard v-if="isLoggedIn" />

    <!-- Acesso Negado -->
    <div v-else class="text-center py-12">
      <div class="space-y-6 elegant-border p-12 rounded-lg max-w-md mx-auto">
        <Icon name="heroicons:shield-exclamation" class="w-16 h-16 text-gray-400 mx-auto" />
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Acesso Restrito</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Você precisa fazer login para acessar sua conta
        </p>
        <div class="flex gap-4 justify-center">
          <NuxtLink :to="{ path: '/', query: { openLogin: '1' } }">
            <Button size="lg">
              <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5 mr-2" />
              Fazer Login
            </Button>
          </NuxtLink>
          <NuxtLink to="/auth/cadastro">
            <Button variant="outline" size="lg">
              <Icon name="heroicons:user-plus" class="w-5 h-5 mr-2" />
              Criar Conta
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn, checkAuth } = useAuth()
const loading = ref(true)

definePageMeta({
  middleware: 'auth'
})

onMounted(async () => {
  await checkAuth()
  loading.value = false
})

useHead({
  title: 'Dashboard - Loja Esotérica'
})
</script>
