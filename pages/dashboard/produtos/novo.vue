<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="space-y-1">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Novo Produto
            </h1>
            <p class="text-gray-600 dark:text-slate-300 text-sm">
              Preencha as informações abaixo para adicionar um novo produto ao seu catálogo
            </p>
          </div>
          
          <NuxtLink to="/dashboard/produtos">
            <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar aos Produtos
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid gap-8 lg:grid-cols-2">
        <!-- Form Section -->
        <div class="space-y-6">
          <form @submit.prevent="onSubmit" class="space-y-6">
            <!-- Product Information Card -->
            <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/60 rounded-xl shadow-sm p-6">
              <div class="space-y-1 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Informações Básicas</h2>
                <p class="text-sm text-gray-600 dark:text-slate-300">Dados principais do seu produto</p>
              </div>
              
              <div class="space-y-5">
                <!-- Product Name -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-900 dark:text-slate-200" for="name">
                    Nome do Produto *
                  </label>
                  <input 
                    id="name" 
                    v-model="nameField" 
                    type="text" 
                    placeholder="Ex: Cristal Quartzo Rosa Natural" 
                    class="block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400"
                    :class="errors.name ? 'border-red-300 focus:ring-red-500' : ''"
                  />
                  <p v-if="errors.name" class="text-xs text-red-600 flex items-center mt-1">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Price and Category Row -->
                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-900 dark:text-slate-200" for="price">
                      Preço (R$) *
                    </label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-slate-400 text-sm">R$</span>
                      <input 
                        id="price" 
                        v-model="priceField" 
                        type="number" 
                        step="0.01" 
                        placeholder="0,00" 
                        class="block w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400"
                        :class="errors.price ? 'border-red-300 focus:ring-red-500' : ''"
                      />
                    </div>
                    <p v-if="errors.price" class="text-xs text-red-600 flex items-center mt-1">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      {{ errors.price }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-900 dark:text-slate-200" for="category">
                      Categoria *
                    </label>
                    <select 
                      id="category" 
                      v-model="categoryField" 
                      class="block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      :class="errors.category ? 'border-red-300 focus:ring-red-500' : ''"
                    >
                      <option value="">Selecione uma categoria...</option>
                      <option value="cristais">💎 Cristais e Pedras</option>
                      <option value="incensos">🌿 Incensos e Aromáticos</option>
                      <option value="tarot">🔮 Tarot e Oráculos</option>
                      <option value="velas">🕯️ Velas e Rituais</option>
                      <option value="bijuterias">💍 Bijuterias Místicas</option>
                      <option value="livros">📚 Livros Esotéricos</option>
                    </select>
                    <p v-if="errors.category" class="text-xs text-red-600 flex items-center mt-1">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      {{ errors.category }}
                    </p>
                  </div>
                </div>

                <!-- Description -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-900 dark:text-slate-200" for="description">
                    Descrição *
                  </label>
                  <textarea 
                    id="description" 
                    v-model="descriptionField" 
                    rows="4" 
                    placeholder="Descreva os detalhes, benefícios e características do produto..." 
                    class="block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm resize-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400"
                    :class="errors.description ? 'border-red-300 focus:ring-red-500' : ''"
                  />
                  <p v-if="errors.description" class="text-xs text-red-600 flex items-center mt-1">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ errors.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Images Card -->
            <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/60 rounded-xl shadow-sm p-6">
              <div class="space-y-1 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Galeria de Imagens</h2>
                <p class="text-sm text-gray-600 dark:text-slate-300">Adicione imagens para mostrar seu produto. A primeira será a principal.</p>
              </div>
              
              <ProductImageUpload v-model="productImages" />
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                type="submit" 
                :disabled="submitting"
                class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg v-if="submitting" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ submitting ? 'Salvando...' : 'Criar Produto' }}
              </button>
              
              <div v-if="saved" class="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Produto criado com sucesso!
              </div>
            </div>
          </form>
        </div>

        <!-- Preview Section -->
        <div class="space-y-6">
          <!-- Product Preview Card -->
          <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/60 rounded-xl shadow-sm p-6">
            <div class="space-y-1 mb-6">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Preview do Produto</h2>
              <p class="text-sm text-gray-600 dark:text-slate-300">Veja como seu produto aparecerá na loja</p>
            </div>
            
            <!-- Preview Content -->
            <div class="border border-gray-200 dark:border-slate-700 rounded-lg p-4 bg-gray-50/50 dark:bg-slate-900/50">
              <!-- Preview Image -->
              <div class="aspect-square bg-white dark:bg-slate-800 rounded-lg mb-4 overflow-hidden border border-gray-200 dark:border-slate-700">
                <img 
                  v-if="primaryImage"
                  :src="primaryImage.url" 
                  :alt="primaryImage.alt"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center space-y-2">
                    <svg class="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-xs text-gray-400 dark:text-slate-500">Adicione uma imagem</p>
                  </div>
                </div>
              </div>
              
              <!-- Preview Info -->
              <div class="space-y-3">
                <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {{ nameField || 'Nome do produto' }}
                </h3>
                
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ formatPrice(parseFloat(priceField) || 0) }}
                  </span>
                  <span v-if="categoryField" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {{ getCategoryName(categoryField) }}
                  </span>
                </div>
                
                <p class="text-sm text-gray-600 dark:text-slate-300 line-clamp-3">
                  {{ descriptionField || 'Descrição do produto aparecerá aqui...' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Tips Card -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/60 dark:border-blue-800/60 rounded-xl p-6">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="space-y-2">
                <h3 class="text-sm font-semibold text-blue-900 dark:text-blue-200">Dicas para um bom produto</h3>
                <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li class="flex items-start">
                    <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Use nomes descritivos e únicos
                  </li>
                  <li class="flex items-start">
                    <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Adicione múltiplas imagens em boa qualidade
                  </li>
                  <li class="flex items-start">
                    <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Descreva benefícios e características
                  </li>
                  <li class="flex items-start">
                    <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Defina preços competitivos no mercado
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { object, string, number } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { ProductImage } from '@/types/product'

definePageMeta({ layout: 'dashboard' })

// Schema de validação
const schema = toTypedSchema(object({
  name: string().min(3, 'Mínimo 3 caracteres'),
  price: number().min(0, 'Preço inválido'),
  category: string().min(1, 'Selecione uma categoria'),
  description: string().min(10, 'Mínimo 10 caracteres')
}))

interface ProductInput {
  name: string; price: string; category: string; description: string
}

const { handleSubmit, errors, resetForm, isSubmitting, defineField } = useForm<ProductInput>({
  validationSchema: schema,
  initialValues: { name: '', price: '', category: '', description: '' }
})

const [nameField] = defineField('name')
const [priceField] = defineField('price')
const [categoryField] = defineField('category')
const [descriptionField] = defineField('description')

const saved = ref(false)
const submitting = computed(() => isSubmitting.value)
const productImages = ref<ProductImage[]>([])

// Computed properties para preview
const primaryImage = computed(() => {
  return productImages.value.find(img => img.isPrimary) || productImages.value[0]
})

// Utility functions
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const getCategoryName = (category: string) => {
  const categories: Record<string, string> = {
    cristais: 'Cristais e Pedras',
    incensos: 'Incensos e Aromáticos',
    tarot: 'Tarot e Oráculos',
    velas: 'Velas e Rituais',
    bijuterias: 'Bijuterias Místicas',
    livros: 'Livros Esotéricos'
  }
  return categories[category] || category
}

// Mock de persistência local (poderia ser API POST futuramente)
const onSubmit = handleSubmit(async (vals) => {
  saved.value = false
  // Simular criação
  const body = {
    id: Date.now(),
    name: vals.name,
    price: parseFloat(vals.price),
    description: vals.description,
    category: vals.category,
    createdAt: new Date().toISOString(),
    images: [...productImages.value],
    // Compatibilidade com sistema antigo
    imageUrl: productImages.value.find((img: ProductImage) => img.isPrimary)?.url || productImages.value[0]?.url,
    thumbnailUrl: productImages.value.find((img: ProductImage) => img.isPrimary)?.url || productImages.value[0]?.url
  }
  // Atualizar cache local dos produtos se já carregados (useFetch cache key)
  const { data: products } = await useFetch('/api/products')
  if (products.value) {
    products.value.push(body as any)
  }
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
  resetForm()
  productImages.value = []
  
  // Redirecionar para lista após sucesso
  setTimeout(() => {
    if (process.client) {
      window.location.href = '/dashboard/produtos'
    }
  }, 2000)
})

useHead({
  title: 'Novo Produto | Dashboard'
})
</script>