<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
    <div class="container mx-auto px-4 py-10 space-y-12">
      <!-- Hero Section -->
      <section class="text-center space-y-6">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          <span class="text-4xl">🔮</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Bem-vindo à Loja Esotérica
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Descubra uma seleção mística de produtos: cristais, incensos, baralhos de tarot e muito mais para elevar sua energia.
        </p>
        <div class="flex gap-4 justify-center mt-8 flex-wrap">
          <NuxtLink to="/produtos">
            <Button size="lg" class="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Icon name="heroicons:sparkles" class="w-5 h-5 mr-2" />
              Ver Todos os Produtos
            </Button>
          </NuxtLink>
          <NuxtLink to="/carrinho">
            <Button variant="outline" size="lg" class="font-semibold">
              <Icon name="heroicons:shopping-cart" class="w-5 h-5 mr-2" />
              Ir ao Carrinho
            </Button>
          </NuxtLink>
        </div>
      </section>

      <!-- Novidades -->
      <section>
        <PageHeader 
          title="Novidades" 
          description="Confira os produtos mais recentes da nossa coleção"
        >
          <template #actions>
            <NuxtLink to="/produtos">
              <Button variant="outline" size="sm">
                Ver todos
                <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2" />
              </Button>
            </NuxtLink>
          </template>
        </PageHeader>

        <!-- Loading State -->
        <div v-if="pending" class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div v-for="n in 8" :key="n" class="elegant-border rounded-lg overflow-hidden">
            <Skeleton class="aspect-video w-full rounded-none" />
            <div class="p-4 space-y-3">
              <Skeleton class="h-4 w-3/4" />
              <Skeleton class="h-3 w-full" />
              <Skeleton class="h-3 w-5/6" />
              <div class="flex items-center justify-between pt-2">
                <Skeleton class="h-4 w-16" />
                <Skeleton class="h-3 w-12" />
              </div>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard v-for="p in products" :key="p.id" :product="p" />
        </div>
      </section>

      <!-- Categorias em Destaque -->
      <section>
        <PageHeader 
          title="Categorias" 
          description="Explore nossas principais categorias de produtos esotéricos"
        />
        
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink 
            to="/categorias/cristais"
            class="elegant-border p-8 rounded-lg text-center hover:magic-glow transition-all group"
          >
            <div class="text-5xl mb-4">💎</div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cristais</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Energias naturais</p>
          </NuxtLink>
          
          <NuxtLink 
            to="/categorias/incensos"
            class="elegant-border p-8 rounded-lg text-center hover:magic-glow transition-all group"
          >
            <div class="text-5xl mb-4">🕯️</div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Incensos</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Aromas místicos</p>
          </NuxtLink>
          
          <NuxtLink 
            to="/categorias/tarot"
            class="elegant-border p-8 rounded-lg text-center hover:magic-glow transition-all group"
          >
            <div class="text-5xl mb-4">🃏</div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tarot</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Cartas de sabedoria</p>
          </NuxtLink>
          
          <NuxtLink 
            to="/categorias/acessorios"
            class="elegant-border p-8 rounded-lg text-center hover:magic-glow transition-all group"
          >
            <div class="text-5xl mb-4">✨</div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Acessórios</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Itens especiais</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/product'

const { data: products, pending } = useFetch<Product[]>('/api/products?limit=8')

useHead({
  title: 'Loja Esotérica - Produtos Místicos e Espirituais',
  meta: [
    { name: 'description', content: 'Descubra cristais, incensos, tarot e produtos esotéricos para elevar sua energia espiritual' }
  ]
})
</script>
