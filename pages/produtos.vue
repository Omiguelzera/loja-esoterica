<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <!-- Header da página -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">{{ t('products') }}</h1>
        <p class="text-muted-foreground">{{ t('discoverProducts') }}</p>
      </div>

      <!-- Filtros -->
      <div class="mb-6 flex flex-wrap gap-2">
        <button 
          @click="selectedCategory = null"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            selectedCategory === null 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          ]"
        >
          {{ t('all') }}
        </button>
        <button 
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize',
            selectedCategory === category 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-destructive">{{ t('errorLoading') }}</p>
        <button @click="refresh()" class="mt-2 text-primary hover:underline">
          {{ t('tryAgain') }}
        </button>
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
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🔮</div>
        <h2 class="text-xl font-semibold mb-2">{{ t('noProducts') }}</h2>
        <p class="text-muted-foreground">{{ t('noProductsDescription') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '@/composables/useI18n'
import type { Product } from '@/types/product'

// Meta da página
definePageMeta({
  title: 'Produtos',
  description: 'Descubra nossa coleção de produtos esotéricos'
})

const { t } = useI18n()

// Estado dos filtros
const selectedCategory = ref<string | null>(null)

// Buscar produtos da API
const { data: products, pending, error, refresh } = await useFetch<Product[]>('/api/products')

// Categorias únicas
const categories = computed(() => {
  if (!products.value) return []
  const uniqueCategories = [...new Set(products.value.map(p => p.category))]
  return uniqueCategories.sort()
})

// Produtos filtrados
const filteredProducts = computed(() => {
  if (!products.value) return []
  if (!selectedCategory.value) return products.value
  return products.value.filter(p => p.category === selectedCategory.value)
})
</script>