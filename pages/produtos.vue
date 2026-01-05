<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
    <div class="container mx-auto px-4 py-8 space-y-8">
      <!-- Header da página -->
      <PageHeader 
        title="Catálogo de Produtos" 
        description="Descubra nossa coleção completa de produtos esotéricos e místicos"
      />

      <!-- Filtros -->
      <div class="elegant-border p-6 rounded-lg">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Filtrar por categoria:</h3>
        <div class="flex flex-wrap gap-3">
          <button 
            @click="selectedCategory = null"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              selectedCategory === null 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'elegant-border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:magic-glow'
            ]"
          >
            <Icon name="heroicons:squares-2x2" class="w-4 h-4 inline mr-2" />
            Todos
          </button>
          <button 
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize',
              selectedCategory === category 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'elegant-border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:magic-glow'
            ]"
          >
            {{ getCategoryIcon(category) }} {{ category }}
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="n in 8" :key="n" class="elegant-border rounded-lg overflow-hidden">
          <Skeleton class="aspect-video w-full rounded-none" />
          <div class="p-4 space-y-3">
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-3 w-full" />
            <div class="flex items-center justify-between pt-2">
              <Skeleton class="h-4 w-16" />
              <Skeleton class="h-3 w-12" />
            </div>
          </div>
        </div>
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="text-center py-16 elegant-border rounded-lg">
        <Icon name="heroicons:exclamation-circle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Erro ao carregar produtos</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Não foi possível carregar os produtos. Tente novamente.</p>
        <Button @click="refresh()" variant="outline">
          <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
          Tentar Novamente
        </Button>
      </div>

      <!-- Grid de produtos -->
      <div v-else-if="filteredProducts?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>

      <!-- Estado vazio -->
      <div v-else class="text-center py-16 elegant-border rounded-lg">
        <div class="text-6xl mb-6">🔮</div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Nenhum produto encontrado
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Não encontramos produtos nesta categoria. Tente explorar outras opções.
        </p>
        <Button @click="selectedCategory = null" variant="outline">
          <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
          Ver Todos os Produtos
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Product } from '@/types/product'

// Meta da página
definePageMeta({
  title: 'Produtos',
  description: 'Descubra nossa coleção de produtos esotéricos'
})

// Estado dos filtros
const selectedCategory = ref<string | null>(null)

// Buscar produtos da API
const { data: products, pending, error, refresh } = await useFetch<Product[]>('/api/products')

// Categorias únicas
const categories = computed(() => {
  if (!products.value) return []
  return [...new Set(products.value.map((p: Product) => p.category))].sort()
})

// Produtos filtrados
// Produtos filtrados
const filteredProducts = computed(() => {
  if (!products.value) return []
  if (!selectedCategory.value) return products.value
  return products.value.filter((p: Product) => p.category === selectedCategory.value)
})

// Ícones por categoria
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'cristais': '💎',
    'incensos': '🕯️',
    'tarot': '🃏',
    'acessorios': '✨',
    'livros': '📚',
    'velas': '🕯️'
  }
  return icons[category.toLowerCase()] || '🔮'
}

useHead({
  title: 'Produtos - Loja Esotérica',
  meta: [
    { name: 'description', content: 'Explore nosso catálogo completo de produtos esotéricos, cristais, incensos e muito mais' }
  ]
})
</script>