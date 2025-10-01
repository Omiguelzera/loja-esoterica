<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="pending" class="space-y-8">
        <div class="animate-pulse">
          <div class="h-10 bg-gray-200 dark:bg-slate-700 rounded-lg w-80 mb-2"></div>
          <div class="h-5 bg-gray-200 dark:bg-slate-700 rounded w-64 mb-8"></div>
          
          <div class="grid gap-8 lg:grid-cols-2">
            <div class="space-y-6">
              <div class="bg-white/60 dark:bg-slate-800/60 rounded-xl p-6 space-y-4">
                <div class="h-6 bg-gray-200 dark:bg-slate-700 rounded w-48"></div>
                <div class="space-y-3">
                  <div class="h-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
                  <div class="h-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
                  <div class="h-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="bg-white/60 dark:bg-slate-800/60 rounded-xl p-6">
                <div class="aspect-square bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Not Found -->
      <div v-else-if="!product" class="min-h-[50vh] flex items-center justify-center">
        <div class="text-center max-w-md mx-auto space-y-6">
          <div class="w-24 h-24 mx-auto bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div class="space-y-3">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Produto não encontrado</h1>
            <p class="text-gray-600 dark:text-slate-300 leading-relaxed">
              O produto que você está tentando editar não existe ou foi removido do catálogo.
            </p>
          </div>
          
          <NuxtLink to="/dashboard/produtos">
            <button class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar aos Produtos
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- Edit Form -->
      <div v-else class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="space-y-1">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Editar Produto
            </h1>
            <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-300">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200">
                ID: #{{ product.id.toString().padStart(6, '0') }}
              </span>
              <span>•</span>
              <span>Criado em {{ formatDate(product.createdAt) }}</span>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <NuxtLink :to="`/produtos/${product.id}`" target="_blank">
              <button class="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver na Loja
              </button>
            </NuxtLink>
            
            <NuxtLink to="/dashboard/produtos">
              <button class="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
              </button>
            </NuxtLink>
          </div>
        </div>
        <!-- Main Content Grid -->
        <div class="grid gap-8 lg:grid-cols-2">
          <!-- Form Section -->
          <div class="space-y-6">
            <!-- Product Information Card -->
            <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/50 rounded-xl shadow-sm p-6">
              <div class="space-y-1 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Informações Básicas</h2>
                <p class="text-sm text-gray-600 dark:text-slate-300">Atualize os dados principais do produto</p>
              </div>
              
              <form @submit.prevent="onSubmit" class="space-y-5">
                <!-- Product Name -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-900 dark:text-slate-300" for="name">
                    Nome do Produto *
                  </label>
                  <input 
                    id="name" 
                    v-model="nameField" 
                    type="text" 
                    class="block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 dark:text-white transition-all duration-200 text-sm"
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
                    <label class="block text-sm font-medium text-gray-900 dark:text-slate-300" for="price">
                      Preço (R$) *
                    </label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-slate-400 text-sm">R$</span>
                      <input 
                        id="price" 
                        v-model="priceField" 
                        type="number" 
                        step="0.01" 
                        class="block w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 dark:text-white transition-all duration-200 text-sm"
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
                    <label class="block text-sm font-medium text-gray-900 dark:text-slate-300" for="category">
                      Categoria *
                    </label>
                    <select 
                      id="category" 
                      v-model="categoryField" 
                      class="block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white dark:bg-slate-700 dark:text-white"
                      :class="errors.category ? 'border-red-300 focus:ring-red-500' : ''"
                    >
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
                  <label class="block text-sm font-medium text-gray-900 dark:text-slate-300" for="description">
                    Descrição *
                  </label>
                  <textarea 
                    id="description" 
                    v-model="descriptionField" 
                    rows="4" 
                    class="block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 dark:text-white transition-all duration-200 text-sm resize-none"
                    :class="errors.description ? 'border-red-300 focus:ring-red-500' : ''"
                  />
                  <p v-if="errors.description" class="text-xs text-red-600 flex items-center mt-1">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ errors.description }}
                  </p>
                </div>
              </form>
            </div>

            <!-- Actions Card -->
            <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/50 rounded-xl shadow-sm p-6">
              <div class="space-y-1 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Ações do Produto</h2>
                <p class="text-sm text-gray-600 dark:text-slate-300">Gerencie as configurações e operações do produto</p>
              </div>
              
              <div class="space-y-4">
                <!-- Save Button -->
                <button 
                  @click="onSubmit" 
                  :disabled="submitting"
                  class="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg v-if="submitting" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ submitting ? 'Salvando Alterações...' : 'Salvar Alterações' }}
                </button>
                
                <!-- Delete Button -->
                <button 
                  @click="showDeleteModal = true" 
                  type="button"
                  class="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Excluir Produto
                </button>
                
                <!-- Success Message -->
                <div v-if="saved" class="inline-flex items-center w-full px-4 py-3 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-lg text-sm font-medium">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Produto atualizado com sucesso!
                </div>
              </div>
            </div>
      </div>

      <!-- Preview e Imagens -->
      <div class="space-y-6">
        <!-- Preview do Produto -->
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/50 rounded-xl shadow-sm p-6">
          <div class="space-y-1 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Preview do Produto</h2>
            <p class="text-sm text-gray-600 dark:text-slate-300">
              Como o produto aparecerá na loja.
            </p>
          </div>
          <div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4 bg-gray-50/50 dark:bg-slate-700/50">
            <div class="aspect-square bg-gray-100 dark:bg-slate-600 rounded-lg mb-4 overflow-hidden">
              <img 
                v-if="primaryImage"
                :src="primaryImage.url" 
                :alt="primaryImage.alt"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 class="font-semibold truncate text-gray-900 dark:text-white">{{ nameField || 'Nome do produto' }}</h3>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {{ formatPrice(parseFloat(priceField) || 0) }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300 mt-2 line-clamp-2">
              {{ descriptionField || 'Descrição do produto' }}
            </p>
          </div>
        </div>

        <!-- Upload de Imagens -->
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/50 rounded-xl shadow-sm p-6">
          <div class="space-y-1 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Galeria de Imagens</h2>
            <p class="text-sm text-gray-600 dark:text-slate-300">
              Gerencie as imagens do produto. A primeira imagem será a principal.
            </p>
          </div>
          <ProductImageUpload v-model="productImages" />
        </div>
      </div>
    </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 dark:bg-black/60 flex items-center justify-center z-50">
      <div class="w-full max-w-md mx-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-red-600 dark:text-red-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Confirmar Exclusão
          </h3>
          <p class="text-sm text-gray-600 dark:text-slate-300 mt-2">
            Esta ação não pode ser desfeita. O produto será removido permanentemente.
          </p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="p-3 bg-gray-100 dark:bg-slate-700 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">{{ product?.name }}</p>
              <p class="text-sm text-gray-600 dark:text-slate-300">ID: #{{ product?.id }}</p>
            </div>
            <div class="flex gap-3">
              <button 
                @click="deleteProduct" 
                :disabled="deleting"
                class="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
              >
                {{ deleting ? 'Excluindo...' : 'Sim, Excluir' }}
              </button>
              <button 
                @click="showDeleteModal = false" 
                :disabled="deleting"
                class="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  

    <!-- Decorative elements -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-400/10 dark:to-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-500/20 to-blue-500/20 dark:from-green-400/10 dark:to-blue-400/10 rounded-full blur-3xl"></div>
    </div>
  </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useForm } from 'vee-validate'
import { object, string } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { 
  ExternalLink, 
  Save, 
  Trash2, 
  CheckCircle, 
  ImageIcon, 
  AlertTriangle 
} from 'lucide-vue-next'
import type { Product, ProductImage } from '@/types/product'

definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const id = Number(route.params.id)
const { data: products, pending } = await useFetch<Product[]>('/api/products')
const product = computed(() => products.value?.find((p: Product) => p.id === id))

const schema = toTypedSchema(object({
  name: string().min(3, 'Mínimo 3 caracteres'),
  price: string().refine(v => !isNaN(parseFloat(v)) && parseFloat(v) > 0, 'Preço inválido'),
  category: string().min(1, 'Selecione uma categoria'),
  description: string().min(10, 'Mínimo 10 caracteres')
}))

interface ProductInput { name: string; price: string; category: string; description: string }

const { handleSubmit, errors, setValues, isSubmitting, defineField } = useForm<ProductInput>({
  validationSchema: schema,
  initialValues: { name: '', price: '', category: '', description: '' }
})

const [nameField] = defineField('name')
const [priceField] = defineField('price')
const [categoryField] = defineField('category')
const [descriptionField] = defineField('description')

// Reactive variables
const saved = ref(false)
const submitting = computed(() => isSubmitting.value)
const productImages = ref<ProductImage[]>([])
const showDeleteModal = ref(false)
const deleting = ref(false)

watchEffect(() => {
  if (product.value) {
    setValues({
      name: product.value.name,
      price: product.value.price.toString(),
      category: product.value.category,
      description: product.value.description
    })
    // Carregar imagens existentes
    productImages.value = product.value.images || []
  }
})

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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const onSubmit = handleSubmit(async (vals) => {
  if (product.value) {
    product.value.name = vals.name
    product.value.price = parseFloat(vals.price)
    product.value.category = vals.category
    product.value.description = vals.description
    product.value.images = [...productImages.value]
    // Atualizar compatibilidade com sistema antigo
    product.value.imageUrl = productImages.value.find(img => img.isPrimary)?.url || productImages.value[0]?.url
    product.value.thumbnailUrl = productImages.value.find(img => img.isPrimary)?.url || productImages.value[0]?.url
  }
  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
})

const deleteProduct = async () => {
  if (!product.value) return
  
  deleting.value = true
  
  try {
    // Simular exclusão - remover do array local
    if (products.value) {
      const index = products.value.findIndex(p => p.id === product.value!.id)
      if (index > -1) {
        products.value.splice(index, 1)
      }
    }
    
    // Limpar URLs de blob se existirem
    productImages.value.forEach(img => {
      if (img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url)
      }
    })
    
    // Redirecionar para lista de produtos
    if (process.client) {
      window.location.href = '/dashboard/produtos'
    }
    
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
  } finally {
    deleting.value = false
    showDeleteModal.value = false
  }
}
</script>