<template>
  <div v-if="loading" class="text-center py-12">
    <Icon name="heroicons:arrow-path" class="animate-spin h-8 w-8 text-primary-600 mx-auto mb-4" />
    <p class="text-gray-500">Carregando...</p>
  </div>

  <div v-else>
    <!-- Dashboard Admin -->
    <AdminAccountDashboard v-if="user?.role === 'admin'" />

    <!-- Dashboard Cliente -->
    <CustomerAccountDashboard v-else-if="user?.role === 'customer'" />

    <!-- Usuário não autenticado -->
    <div v-else class="text-center py-12">
      <Icon name="heroicons:user-circle" class="h-16 w-16 text-gray-400 mx-auto mb-6" />
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Acesso Restrito
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Você precisa fazer login para acessar sua conta
      </p>
      <div class="space-x-4">
        <NuxtLink :to="{ path: '/', query: { openLogin: '1' } }" class="mystic-button">
          Fazer Login
        </NuxtLink>
        <NuxtLink to="/auth/cadastro" class="mystic-button-outline">
          Criar Conta
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

// Meta da página
definePageMeta({
  middleware: 'auth'
})

// Composables
const { user, checkAuth } = useAuth()

// Estado
const loading = ref(true)

// Lifecycle
onMounted(async () => {
  // Verificar autenticação
  await checkAuth()
  loading.value = false
})

// Meta
useHead({
  title: 'Minha Conta - Loja Esotérica'
})
</script>