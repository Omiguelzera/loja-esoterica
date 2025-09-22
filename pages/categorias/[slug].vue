<template>
  <div class="container-responsive py-10 space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight capitalize">{{ slug }}</h1>
      <p class="text-muted-foreground">Produtos da categoria {{ slug }}.</p>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useFetch } from '#imports'
import type { Product } from '@/types/product'
const route = useRoute()
const slug = route.params.slug as string
const { data: products } = await useFetch<Product[]>(`/api/products?category=${slug}`)
const filtered = computed(() => products.value || [])
</script>
