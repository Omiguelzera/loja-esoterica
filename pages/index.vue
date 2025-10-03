<template>
  <div class="container-responsive py-10 space-y-10">
    <section class="text-center space-y-4">
      <h1 class="text-4xl font-bold tracking-tight">Bem-vindo à Loja Esotérica</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">Descubra uma seleção mística de produtos: cristais, incensos, baralhos de tarot e muito mais para elevar sua energia.</p>
      <div class="flex gap-4 justify-center mt-6">
        <NuxtLink to="/produtos">
          <Button size="lg" class="font-semibold">
            🔮 Ver Todos os Produtos
          </Button>
        </NuxtLink>
        <NuxtLink to="/carrinho">
          <Button variant="outline" size="lg" class="font-semibold">
            🛒 Ir ao Carrinho
          </Button>
        </NuxtLink>
      </div>
      

    </section>

    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-semibold">Novidades</h2>
        <NuxtLink to="/produtos">
          <Button variant="outline" size="sm">
            Ver todos →
          </Button>
        </NuxtLink>
      </div>
      <div v-if="pending" class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="n in 8" :key="n" class="rounded-lg border border-border bg-card p-0 overflow-hidden flex flex-col">
          <div class="aspect-video bg-muted/30 animate-pulse" />
          <div class="p-4 space-y-3">
            <div class="h-4 w-3/4 bg-muted/40 rounded animate-pulse" />
            <div class="h-3 w-full bg-muted/30 rounded animate-pulse" />
            <div class="h-3 w-5/6 bg-muted/20 rounded animate-pulse" />
            <div class="flex items-center justify-between pt-2">
              <div class="h-4 w-16 bg-muted/30 rounded animate-pulse" />
              <div class="h-3 w-12 bg-muted/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '@/types/product'

const { data: products, pending } = useFetch<Product[]>('/api/products?limit=8')
</script>
