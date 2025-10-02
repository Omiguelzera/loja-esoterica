<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold tracking-tight">Produtos</h1>
      <NuxtLink to="/dashboard/produtos/novo"><Button>Adicionar</Button></NuxtLink>
    </div>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="p in products" :key="p.id">
        <div class="flex flex-col gap-2">
          <h3 class="font-semibold">{{ p.name }}</h3>
          <p class="text-sm text-muted-foreground line-clamp-2">{{ p.description }}</p>
          <div class="flex items-center justify-between text-sm">
            <span>R$ {{ p.price.toFixed(2) }}</span>
            <NuxtLink :to="`/dashboard/produtos/${p.id}`" class="text-primary hover:underline">Editar</NuxtLink>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '@/types/product'

// Layout padrão será usado automaticamente
definePageMeta({
  middleware: 'admin'
})
const { data: products } = await useFetch<Product[]>('/api/products')
</script>
