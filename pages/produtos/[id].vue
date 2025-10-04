<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
    <!-- Loading State -->
    <div v-if="pending" class="container-responsive py-10">
      <div class="max-w-6xl mx-auto">
        <div class="animate-pulse">
          <!-- Breadcrumb skeleton -->
          <div class="flex items-center gap-2 mb-8">
            <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12"></div>
            <div class="w-4 h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
            <div class="w-4 h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
          </div>
          
          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Image gallery skeleton -->
            <div class="space-y-4">
              <div class="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
              <div class="flex gap-3">
                <div v-for="n in 4" :key="n" class="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
              </div>
            </div>
            
            <!-- Product info skeleton -->
            <div class="space-y-6">
              <div class="space-y-3">
                <div class="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                <div class="flex gap-2">
                  <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                  <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
                <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48"></div>
              </div>
              
              <div class="space-y-3">
                <div class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
                  <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                </div>
              </div>
              
              <div class="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
              
              <div class="space-y-3">
                <div class="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                <div class="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!product" class="container-responsive py-20">
      <div class="max-w-2xl mx-auto text-center">
        <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-12 shadow-xl border border-white/20">
          <div class="space-y-6">
            <div class="text-8xl mb-4">😔</div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Produto não encontrado
            </h1>
            <p class="text-gray-600 text-lg leading-relaxed">
              O produto que você está procurando não existe ou foi removido do nosso catálogo.
            </p>
            <div class="pt-4">
              <NuxtLink to="/produtos">
                <Button 
                  size="lg" 
                  class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowLeft class="w-5 h-5 mr-2" />
                  Ver Todos os Produtos
                </Button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else class="container-responsive py-10">
      <div class="max-w-6xl mx-auto">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm mb-8">
          <NuxtLink 
            to="/" 
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Início
          </NuxtLink>
          <ChevronRight class="w-4 h-4 text-gray-400" />
          <NuxtLink 
            to="/produtos" 
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Produtos
          </NuxtLink>
          <ChevronRight class="w-4 h-4 text-gray-400" />
          <span class="text-gray-900 font-semibold">{{ product.name }}</span>
        </nav>

        <div class="grid gap-8 lg:gap-12 lg:grid-cols-2">
          <!-- Image Gallery -->
          <div class="space-y-4">
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <ProductImageGallery 
                :images="productImages" 
                :auto-play="false"
                class="rounded-xl overflow-hidden"
              />
            </div>
          </div>

          <!-- Product Information -->
          <div class="space-y-6">
            <!-- Header Section -->
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
              <div class="space-y-4">
                <h1 class="text-3xl lg:text-4xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {{ product.name }}
                </h1>
                <div class="flex items-center flex-wrap gap-3">
                  <Badge class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 text-sm font-medium">
                    {{ getCategoryName(product.category) }}
                  </Badge>
                  <Badge class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-sm font-medium">
                    <span class="w-2 h-2 bg-white rounded-full mr-2"></span>
                    Em estoque
                  </Badge>
                </div>
              </div>
            </div>

            <!-- Price Section -->
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
              <div class="space-y-3">
                <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {{ formatPrice(product.price) }}
                </div>
                <div class="text-gray-600 font-medium">
                  ou 12x de {{ formatPrice(product.price / 12) }} sem juros
                </div>
                <div class="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <CheckCircle class="w-4 h-4" />
                  Melhor preço garantido
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
              <div class="space-y-4">
                <h3 class="text-xl font-bold text-gray-900">Descrição</h3>
                <p class="text-gray-700 leading-relaxed text-lg">
                  {{ product.description }}
                </p>
              </div>
            </div>

            <!-- Product Information -->
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
              <div class="space-y-4">
                <h3 class="text-xl font-bold text-gray-900">Informações do Produto</h3>
                <div class="grid gap-4">
                  <div class="flex justify-between items-center py-3 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Categoria:</span>
                    <span class="font-semibold text-gray-900">{{ getCategoryName(product.category) }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Código:</span>
                    <span class="font-semibold text-gray-900">#{{ product.id.toString().padStart(6, '0') }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-100">
                    <span class="text-gray-600 font-medium">Disponibilidade:</span>
                    <span class="font-semibold text-green-600 flex items-center gap-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                      Em estoque
                    </span>
                  </div>
                  <div class="flex justify-between items-center py-3">
                    <span class="text-gray-600 font-medium">Entrega:</span>
                    <span class="font-semibold text-gray-900">Correios ou retirada</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Purchase Actions -->
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
              <div class="space-y-4">
                <Button 
                  size="lg" 
                  class="w-full text-lg h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  @click="handleBuyNow"
                >
                  <ShoppingCart class="w-5 h-5 mr-3" />
                  Comprar Agora
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  class="w-full text-lg h-12 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold rounded-xl transition-all duration-300"
                  @click="handleAddToCart"
                >
                  <Plus class="w-5 h-5 mr-3" />
                  Adicionar ao Carrinho
                </Button>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <Button 
                    variant="ghost" 
                    class="flex-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                  >
                    <Heart class="w-4 h-4 mr-2" />
                    Favoritar
                  </Button>
                  <Button 
                    variant="ghost" 
                    class="flex-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    <Share2 class="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>

            <!-- Guarantees and Policies -->
            <div class="bg-gradient-to-r from-green-50 to-blue-50 backdrop-blur-xl rounded-2xl p-6 border border-green-200/50">
              <div class="space-y-4">
                <div class="flex items-center gap-3 text-green-700">
                  <div class="p-2 bg-green-100 rounded-lg">
                    <Shield class="w-5 h-5" />
                  </div>
                  <span class="font-semibold">Compra 100% protegida</span>
                </div>
                <div class="flex items-center gap-3 text-blue-700">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <Truck class="w-5 h-5" />
                  </div>
                  <span class="font-semibold">Frete grátis acima de R$ 100</span>
                </div>
                <div class="flex items-center gap-3 text-orange-700">
                  <div class="p-2 bg-orange-100 rounded-lg">
                    <RotateCcw class="w-5 h-5" />
                  </div>
                  <span class="font-semibold">7 dias para devolução</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div class="mt-20">
          <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
            <div class="mb-8">
              <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Produtos Relacionados
              </h2>
              <p class="text-gray-600 mt-2">Outros produtos que podem interessar</p>
            </div>
            
            <div v-if="relatedProducts.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <ProductCard 
                v-for="relatedProduct in relatedProducts" 
                :key="relatedProduct.id" 
                :product="relatedProduct"
                class="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div v-else class="text-center py-12">
              <div class="text-gray-400 text-lg">
                Nenhum produto relacionado encontrado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  ChevronRight, 
  ShoppingCart, 
  Plus, 
  Heart, 
  Share2, 
  Shield, 
  Truck, 
  RotateCcw,
  ArrowLeft,
  CheckCircle
} from 'lucide-vue-next'
import type { Product, ProductImage } from '@/types/product'

const route = useRoute()

const id = Number(route.params.id)
const { data: products, pending } = await useFetch<Product[]>('/api/products')

const product = computed(() => 
  products.value?.find((p: Product) => p.id === id)
)

const productImages = computed((): ProductImage[] => {
  if (!product.value) return []
  
  // Se tem imagens no novo formato, usar elas
  if (product.value.images && product.value.images.length > 0) {
    return product.value.images
  }
  
  // Fallback para sistema antigo
  if (product.value.imageUrl) {
    return [{
      id: 'legacy',
      url: product.value.imageUrl,
      alt: product.value.name,
      isPrimary: true,
      order: 0
    }]
  }
  
  // Imagem placeholder se não há nenhuma
  return [{
    id: 'placeholder',
    url: '/api/placeholder/400/400',
    alt: product.value?.name || 'Produto',
    isPrimary: true,
    order: 0
  }]
})

const relatedProducts = computed(() => {
  if (!product.value || !products.value) return []
  
  return products.value
    .filter((p: Product) => 
      p.id !== product.value!.id && 
      p.category === product.value!.category
    )
    .slice(0, 4)
})

const getCategoryName = (category: string) => {
  const categories: Record<string, string> = {
    cristais: 'Cristais',
    incensos: 'Incensos',
    tarot: 'Tarô e Oráculos',
    velas: 'Velas Esotéricas',
    amuletos: 'Amuletos'
  }
  return categories[category] || category
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const handleBuyNow = () => {
  if (!product.value) return
  
  // TODO: Implementar integração com carrinho
  console.log('Comprando produto:', product.value.name)
  alert(`Produto ${product.value.name} adicionado ao carrinho!`)
}

const handleAddToCart = () => {
  if (!product.value) return
  
  // TODO: Implementar integração com carrinho
  console.log('Adicionando ao carrinho:', product.value.name)
  alert(`${product.value.name} foi adicionado ao carrinho!`)
}

// SEO
useHead({
  title: () => product.value ? `${product.value.name} - Loja Esotérica` : 'Produto - Loja Esotérica',
  meta: [
    {
      name: 'description',
      content: () => product.value?.description || 'Produto da Loja Esotérica'
    },
    {
      property: 'og:title',
      content: () => product.value ? `${product.value.name} - Loja Esotérica` : 'Produto - Loja Esotérica'
    },
    {
      property: 'og:description',
      content: () => product.value?.description || 'Produto da Loja Esotérica'
    },
    {
      property: 'og:image',
      content: () => productImages.value[0]?.url || '/api/placeholder/400/400'
    }
  ]
})
</script>