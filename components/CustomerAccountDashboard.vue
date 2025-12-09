<template>
  <div class="space-y-8">
    <!-- Cabeçalho de boas-vindas -->
    <div class="elegant-border p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <img
              :src="user?.avatar || '/avatars/customer.svg'"
              :alt="user?.name"
              class="w-16 h-16 rounded-full object-cover elegant-border"
            />
            <div class="absolute -bottom-1 -right-1 elegant-border rounded-full p-1 bg-white dark:bg-gray-800">
              <Icon name="heroicons:user" class="h-4 w-4 text-blue-600" />
            </div>
          </div>
          
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Olá, {{ user?.name }}!
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Bem-vindo à sua conta - {{ formatDate(new Date()) }}
            </p>
            <div class="flex items-center mt-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Icon name="heroicons:star" class="h-3 w-3 mr-1" />
                Cliente VIP
              </span>
            </div>
          </div>
        </div>
        
        <div class="text-right">
          <div class="text-sm text-gray-500 dark:text-gray-400">Membro desde</div>
          <div class="font-medium text-gray-900 dark:text-white">Janeiro 2025</div>
        </div>
      </div>
    </div>

    <!-- Cards de estatísticas do cliente -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Pedidos Realizados -->
      <div class="elegant-border p-6 rounded-lg text-center hover:magic-glow transition-all">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/20">
          <Icon name="heroicons:shopping-bag" class="h-6 w-6 text-blue-600" />
        </div>
        <div class="text-2xl font-bold text-blue-600 mb-1">{{ customerStats.totalOrders }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Pedidos Realizados</div>
        <div class="text-xs text-blue-600 mt-1">{{ customerStats.pendingOrders }} pendentes</div>
      </div>

      <!-- Total Gasto -->
      <div class="elegant-border p-6 rounded-lg text-center hover:magic-glow transition-all">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20">
          <Icon name="heroicons:currency-dollar" class="h-6 w-6 text-green-600" />
        </div>
        <div class="text-2xl font-bold text-green-600 mb-1">{{ formatCurrency(customerStats.totalSpent) }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Total Gasto</div>
        <div class="text-xs text-green-600 mt-1">Economizou {{ formatCurrency(customerStats.totalSaved) }}</div>
      </div>

      <!-- Produtos Favoritos -->
      <div class="elegant-border p-6 rounded-lg text-center hover:magic-glow transition-all">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/20">
          <Icon name="heroicons:heart" class="h-6 w-6 text-purple-600" />
        </div>
        <div class="text-2xl font-bold text-purple-600 mb-1">{{ customerStats.favoriteProducts }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Produtos Favoritos</div>
        <div class="text-xs text-purple-600 mt-1">Lista de desejos</div>
      </div>

      <!-- Pontos de Fidelidade -->
      <div class="elegant-border p-6 rounded-lg text-center hover:magic-glow transition-all">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
          <Icon name="heroicons:gift" class="h-6 w-6 text-yellow-600" />
        </div>
        <div class="text-2xl font-bold text-yellow-600 mb-1">{{ customerStats.loyaltyPoints }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Pontos de Fidelidade</div>
        <div class="text-xs text-yellow-600 mt-1">Use nos próximos pedidos</div>
      </div>
    </div>

    <!-- Seções principais -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Ações rápidas -->
      <div class="elegant-border p-6 rounded-lg">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Icon name="heroicons:lightning-bolt" class="h-5 w-5 mr-2 text-primary-600" />
          Ações Rápidas
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NuxtLink to="/produtos" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all group">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors mr-3">
              <Icon name="heroicons:sparkles" class="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Explorar Produtos</p>
              <p class="text-sm text-gray-500">Novidades disponíveis</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/pedidos" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all group">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors mr-3">
              <Icon name="heroicons:clipboard-document-list" class="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Meus Pedidos</p>
              <p class="text-sm text-gray-500">{{ customerStats.pendingOrders }} pendentes</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/favoritos" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all group">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors mr-3">
              <Icon name="heroicons:heart" class="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Favoritos</p>
              <p class="text-sm text-gray-500">{{ customerStats.favoriteProducts }} produtos</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/perfil/editar" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all group">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors mr-3">
              <Icon name="heroicons:user-circle" class="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Editar Perfil</p>
              <p class="text-sm text-gray-500">Atualizar dados</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Últimos pedidos -->
      <div class="elegant-border p-6 rounded-lg">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
          <span class="flex items-center">
            <Icon name="heroicons:shopping-bag" class="h-5 w-5 mr-2 text-primary-600" />
            Últimos Pedidos
          </span>
          <NuxtLink to="/pedidos" class="text-sm text-primary-600 hover:text-primary-700">
            Ver todos
          </NuxtLink>
        </h2>
        
        <div class="space-y-4">
          <div v-for="order in recentOrders" :key="order.id" 
               class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-8 h-8 rounded-full"
                   :class="getOrderStatusClass(order.status)">
                <Icon :name="getOrderStatusIcon(order.status)" class="h-4 w-4" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  Pedido #{{ order.id }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(order.date) }} • {{ order.items }} {{ order.items === 1 ? 'item' : 'itens' }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ formatCurrency(order.total) }}
              </p>
              <p class="text-xs" :class="getOrderStatusTextClass(order.status)">
                {{ getOrderStatusLabel(order.status) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recomendações e ofertas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Produtos recomendados -->
      <div class="elegant-border p-6 rounded-lg">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Icon name="heroicons:star" class="h-5 w-5 mr-2 text-primary-600" />
          Recomendados para Você
        </h2>
        
        <div class="space-y-4">
          <div v-for="product in recommendedProducts" :key="product.id" 
               class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <img :src="product.image" :alt="product.name" 
                 class="w-12 h-12 rounded-lg object-cover" />
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ product.name }}
              </h3>
              <p class="text-xs text-gray-500">{{ product.category }}</p>
              <div class="flex items-center mt-1">
                <div class="flex items-center">
                  <Icon v-for="star in 5" :key="star" 
                        :name="star <= product.rating ? 'heroicons:star' : 'heroicons:star'"
                        :class="star <= product.rating ? 'text-yellow-400' : 'text-gray-300'"
                        class="h-3 w-3" />
                </div>
                <span class="text-xs text-gray-500 ml-1">({{ product.reviews }})</span>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-primary-600">
                {{ formatCurrency(product.price) }}
              </p>
              <NuxtLink :to="`/produto/${product.id}`" 
                        class="text-xs text-primary-600 hover:text-primary-700">
                Ver produto
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Ofertas especiais -->
      <div class="elegant-border p-6 rounded-lg">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Icon name="heroicons:gift" class="h-5 w-5 mr-2 text-primary-600" />
          Ofertas Especiais
        </h2>
        
        <div class="space-y-4">
          <!-- Cupom de desconto -->
          <div class="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                Desconto de 15% em Cristais
              </h3>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                15% OFF
              </span>
            </div>
            <p class="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
              Válido até 31/12/2024 • Código: CRISTAL15
            </p>
            <button class="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md transition-colors">
              Usar Cupom
            </button>
          </div>

          <!-- Frete grátis -->
          <div class="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-semibold text-green-800 dark:text-green-200">
                Frete Grátis
              </h3>
              <Icon name="heroicons:truck" class="h-5 w-5 text-green-600" />
            </div>
            <p class="text-xs text-green-700 dark:text-green-300 mb-3">
              Em compras acima de R$ 150,00
            </p>
            <div class="text-xs text-green-600">
              Faltam {{ formatCurrency(150 - customerStats.cartTotal) }} para frete grátis
            </div>
          </div>

          <!-- Programa de fidelidade -->
          <div class="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-semibold text-purple-800 dark:text-purple-200">
                Programa de Fidelidade
              </h3>
              <Icon name="heroicons:star" class="h-5 w-5 text-purple-600" />
            </div>
            <p class="text-xs text-purple-700 dark:text-purple-300 mb-3">
              {{ customerStats.loyaltyPoints }} pontos disponíveis
            </p>
            <button class="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md transition-colors">
              Resgatar Pontos
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

// Composables
const { user } = useAuth()

// Estado reativo
const customerStats = ref({
  totalOrders: 12,
  pendingOrders: 2,
  totalSpent: 2340.50,
  totalSaved: 425.30,
  favoriteProducts: 8,
  loyaltyPoints: 1250,
  cartTotal: 89.90
})

const recentOrders = ref([
  {
    id: 'ORD-2024-154',
    date: '2024-12-20',
    items: 2,
    total: 149.90,
    status: 'processing'
  },
  {
    id: 'ORD-2024-142',
    date: '2024-12-15',
    items: 1,
    total: 89.90,
    status: 'delivered'
  },
  {
    id: 'ORD-2024-138',
    date: '2024-12-10',
    items: 3,
    total: 179.70,
    status: 'delivered'
  }
])

const recommendedProducts = ref([
  {
    id: 'prod-1',
    name: 'Cristal de Ametista',
    category: 'Cristais',
    image: '/produtos/ametista.jpg',
    price: 120.00,
    rating: 5,
    reviews: 24
  },
  {
    id: 'prod-2',
    name: 'Vela Aromática Sândalo',
    category: 'Velas',
    image: '/produtos/vela-sandalo.jpg',
    price: 35.90,
    rating: 4,
    reviews: 18
  },
  {
    id: 'prod-3',
    name: 'Incenso Natural Mirra',
    category: 'Incensos',
    image: '/produtos/incenso-mirra.jpg',
    price: 28.50,
    rating: 5,
    reviews: 31
  }
])

// Métodos de formatação
const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const getOrderStatusClass = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20',
    processing: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20',
    shipped: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20',
    delivered: 'bg-green-100 text-green-600 dark:bg-green-900/20',
    cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/20'
  }
  return classes[status as keyof typeof classes] || classes.pending
}

const getOrderStatusTextClass = (status: string) => {
  const classes = {
    pending: 'text-yellow-600',
    processing: 'text-blue-600',
    shipped: 'text-purple-600',
    delivered: 'text-green-600',
    cancelled: 'text-red-600'
  }
  return classes[status as keyof typeof classes] || classes.pending
}

const getOrderStatusIcon = (status: string) => {
  const icons = {
    pending: 'heroicons:clock',
    processing: 'heroicons:cog-6-tooth',
    shipped: 'heroicons:truck',
    delivered: 'heroicons:check-circle',
    cancelled: 'heroicons:x-circle'
  }
  return icons[status as keyof typeof icons] || icons.pending
}

const getOrderStatusLabel = (status: string) => {
  const labels = {
    pending: 'Pendente',
    processing: 'Processando',
    shipped: 'Enviado',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  }
  return labels[status as keyof typeof labels] || status
}

// Lifecycle
onMounted(() => {
  // Carregar dados do cliente (substituir por API real)
  console.log('Customer dashboard carregado')
})
</script>