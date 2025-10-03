<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="space-y-1">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Gerenciar Produtos
            </h1>
            <p class="text-gray-600 dark:text-slate-300 text-sm flex items-center gap-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ products?.length || 0 }}
              </span>
              produto{{ (products?.length || 0) !== 1 ? 's' : '' }} no catálogo
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              @click="refreshProducts"
              class="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Atualizar
            </button>
            
            <NuxtLink to="/dashboard/produtos/novo">
              <button class="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Novo Produto
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Search and Filters Section -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/60 rounded-xl shadow-sm p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar produtos por nome ou descrição..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400"
            />
          </div>
          
          <!-- Category Filter -->
          <div class="lg:w-64">
            <select
              v-model="selectedCategory"
              class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            >
              <option value="">🏷️ Todas as categorias</option>
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.label }}
              </option>
            </select>
          </div>
        </div>
        
        <!-- Active Filters Display -->
        <div v-if="searchQuery || selectedCategory" class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm text-gray-600">Filtros ativos:</span>
            <span v-if="searchQuery" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              "{{ searchQuery }}"
              <button @click="searchQuery = ''" class="ml-2 hover:text-blue-600">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </span>
            <span v-if="selectedCategory" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ getCategoryName(selectedCategory) }}
              <button @click="selectedCategory = ''" class="ml-2 hover:text-green-600">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="n in 8" :key="n" class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/60 rounded-xl animate-pulse overflow-hidden">
          <div class="aspect-square bg-gradient-to-br from-gray-200 to-gray-300"></div>
          <div class="p-5 space-y-3">
            <div class="h-5 bg-gray-200 rounded-lg w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            <div class="flex gap-2 pt-2">
              <div class="flex-1 h-9 bg-gray-200 rounded-lg"></div>
              <div class="flex-1 h-9 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else-if="filteredProducts.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/60 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 hover:border-blue-300/40 dark:hover:border-blue-600/40 transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Product Image -->
          <div class="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
            <img
              v-if="getPrimaryImage(product)"
              :src="getPrimaryImage(product)?.url"
              :alt="getPrimaryImage(product)?.alt"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <div class="text-center space-y-2">
                <svg class="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-xs text-gray-400">Sem imagem</p>
              </div>
            </div>
            
            <!-- Status Badge -->
            <div class="absolute top-3 right-3">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ativo
              </span>
            </div>
          </div>
          
          <!-- Product Content -->
          <div class="p-5 space-y-4">
            <!-- Product Info -->
            <div class="space-y-2">
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ product.name }}
                </h3>
              </div>
              
              <p class="text-sm text-gray-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {{ product.description }}
              </p>
            </div>
            
            <!-- Price and Category -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ formatPrice(product.price) }}
                </span>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {{ getCategoryName(product.category) }}
                </span>
              </div>

              <!-- Metadata -->
              <div class="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2">
                <span class="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                  #{{ product.id.toString().padStart(6, '0') }}
                </span>
                <span>•</span>
                <span>{{ formatDate(product.createdAt) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-2">
              <NuxtLink :to="`/produtos/${product.id}`" target="_blank" class="flex-1">
                <button class="w-full inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-300 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ver
                </button>
              </NuxtLink>
              
              <NuxtLink :to="`/dashboard/produtos/${product.id}`" class="flex-1">
                <button class="w-full inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto space-y-6">
          <!-- Icon -->
          <div class="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="searchQuery || selectedCategory" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m16 0l-2-2m-2 2h4m-4 0l-2-2m2 2v4" />
            </svg>
          </div>
          
          <!-- Content -->
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ searchQuery || selectedCategory ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado' }}
            </h2>
            <p class="text-gray-600 leading-relaxed">
              {{ searchQuery || selectedCategory 
                ? 'Tente ajustar os filtros de busca ou limpar os filtros para encontrar produtos.' 
                : 'Comece adicionando seu primeiro produto para gerenciar seu catálogo e começar a vender.' 
              }}
            </p>
          </div>
          
          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              v-if="searchQuery || selectedCategory" 
              @click="clearFilters"
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpar Filtros
            </button>
            
            <NuxtLink to="/dashboard/produtos/novo">
              <button class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {{ searchQuery || selectedCategory ? 'Adicionar Novo Produto' : 'Adicionar Primeiro Produto' }}
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Footer Stats -->
      <div v-if="filteredProducts.length > 0" class="mt-12 text-center">
        <div class="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-full text-sm text-gray-600">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Mostrando {{ filteredProducts.length }} de {{ products?.length || 0 }} produtos
          {{ searchQuery || selectedCategory ? ' (filtrados)' : '' }}
        </div>
      </div>
    </div>
    
    <!-- Background decoration -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-32 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product, ProductImage } from '@/types/product'
import { ref, computed } from 'vue'

// Buscar produtos
const { data: products, pending, refresh } = await useFetch<Product[]>('/api/products')

// Estados reativos para filtros
const searchQuery = ref('')
const selectedCategory = ref('')

// Categorias disponíveis
const categories = [
  { value: 'electronics', label: 'Eletrônicos' },
  { value: 'clothing', label: 'Roupas' },
  { value: 'books', label: 'Livros' },
  { value: 'home', label: 'Casa e Jardim' },
  { value: 'sports', label: 'Esportes' },
  { value: 'beauty', label: 'Beleza' },
  { value: 'toys', label: 'Brinquedos' }
]

// Produtos filtrados
const filteredProducts = computed(() => {
  if (!products.value) return []
  
  let filtered = products.value

  // Filtrar por busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((product: Product) => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  // Filtrar por categoria
  if (selectedCategory.value) {
    filtered = filtered.filter((product: Product) => product.category === selectedCategory.value)
  }

  return filtered
})

// Funções auxiliares
const getPrimaryImage = (product: Product): ProductImage | undefined => {
  if (!product.images || product.images.length === 0) return undefined
  return product.images.find((img: ProductImage) => img.isPrimary) || product.images[0]
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const getCategoryName = (category: string): string => {
  const cat = categories.find(c => c.value === category)
  return cat?.label || category
}

const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Ações
const refreshProducts = async () => {
  await refresh()
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}

// Meta da página - usando layout padrão com middleware admin
definePageMeta({
  middleware: 'admin'
})

useHead({
  title: 'Gerenciar Produtos | Dashboard'
})
</script>
