<template>
  <div>
    <!-- Dashboard Admin -->
    <AdminDashboard v-if="isAdmin" :stats="stats" />

    <!-- Dashboard Cliente -->
    <CustomerDashboard v-else-if="isCustomer" />

    <!-- Acesso Negado -->
    <div v-else class="text-center py-12">
      <div class="space-y-4">
        <div class="text-6xl">🚫</div>
        <h1 class="text-2xl font-bold">Acesso Restrito</h1>
        <p class="text-muted-foreground">Você não tem permissão para acessar esta área.</p>
        <NuxtLink to="/">
          <Button>Voltar ao Início</Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import { useFetch } from '#imports'
import type { Product } from '@/types/product'
import { useAuth } from '@/composables/useAuth'

const { isAdmin, isCustomer, isLoggedIn, checkAuth } = useAuth()

// Layout padrão será usado automaticamente
definePageMeta({
  middleware: 'admin'
})

// Verificar autenticação e permissão de admin
onMounted(() => {
  if (process.client) {
    // Primeiro carrega os dados de autenticação
    checkAuth()
    
    // Depois verifica se tem permissão para acessar dashboard
    nextTick(() => {
      if (!isLoggedIn.value || !isAdmin.value) {
        window.location.href = '/'
      }
    })
  }
})
const { data: products } = await useFetch<Product[]>('/api/products')
const stats = computed(() => ({
  total: products.value?.length || 0,
  categories: new Set(products.value?.map((p: Product) => p.category)).size || 0
}))
</script>
