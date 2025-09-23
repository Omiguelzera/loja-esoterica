<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold tracking-tight">Visão Geral</h1>
    <div class="grid gap-6 md:grid-cols-3">
      <Card>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Produtos</p>
          <p class="text-2xl font-semibold">{{ stats.total }}</p>
        </div>
      </Card>
      <Card>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Categorias</p>
          <p class="text-2xl font-semibold">{{ stats.categories }}</p>
        </div>
      </Card>
      <Card>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Atualizado</p>
          <p class="text-2xl font-semibold">Agora</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { definePageMeta, useFetch } from '#imports'
import type { Product } from '@/types/product'

definePageMeta({ 
  layout: 'dashboard'
})

// Verificar autenticação no cliente
onMounted(() => {
  if (process.client) {
    const isLoggedIn = 
      localStorage.getItem('isLoggedIn') === 'true' || 
      sessionStorage.getItem('isLoggedIn') === 'true'
    
    if (!isLoggedIn) {
      window.location.href = '/'
    }
  }
})
const { data: products } = await useFetch<Product[]>('/api/products')
const stats = computed(() => ({
  total: products.value?.length || 0,
  categories: new Set(products.value?.map((p: Product) => p.category)).size || 0
}))
</script>
