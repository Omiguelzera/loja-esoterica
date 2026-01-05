<template>
  <div class="space-y-8">
    <!-- Cabeçalho -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Meus Pedidos
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Acompanhe o status dos seus pedidos
        </p>
      </div>
      
      <!-- Filtros -->
      <div class="flex items-center space-x-4">
        <select v-model="statusFilter" 
                class="mystic-input text-sm">
          <option value="">Todos os status</option>
          <option value="pending">Pendente</option>
          <option value="processing">Processando</option>
          <option value="shipped">Enviado</option>
          <option value="delivered">Entregue</option>
          <option value="cancelled">Cancelado</option>
        </select>
        
        <select v-model="periodFilter" 
                class="mystic-input text-sm">
          <option value="">Todo período</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 3 meses</option>
          <option value="365">Último ano</option>
        </select>
      </div>
    </div>

    <!-- Estatísticas rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="elegant-border p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-primary-600">{{ stats.total }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Total de Pedidos</div>
      </div>
      <div class="elegant-border p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Pendentes</div>
      </div>
      <div class="elegant-border p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ stats.processing }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Processando</div>
      </div>
      <div class="elegant-border p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ stats.delivered }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Entregues</div>
      </div>
    </div>

    <!-- Lista de pedidos -->
    <div class="space-y-4">
      <div v-if="loading" class="text-center py-8">
        <Icon name="heroicons:arrow-path" class="animate-spin h-8 w-8 text-primary-600 mx-auto mb-4" />
        <p class="text-gray-500">Carregando pedidos...</p>
      </div>

      <div v-else-if="filteredOrders.length === 0" class="text-center py-12">
        <Icon name="heroicons:shopping-bag" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-500 mb-2">Nenhum pedido encontrado</h3>
        <p class="text-gray-400 mb-6">
          {{ statusFilter || periodFilter ? 'Tente ajustar os filtros' : 'Você ainda não fez nenhum pedido' }}
        </p>
        <NuxtLink to="/produtos" class="mystic-button inline-flex items-center">
          <Icon name="heroicons:sparkles" class="h-4 w-4 mr-2" />
          Explorar Produtos
        </NuxtLink>
      </div>

      <div v-else class="space-y-4">
        <div v-for="order in filteredOrders" :key="order.id" 
             class="elegant-border p-6 rounded-lg hover:magic-glow transition-all">
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="flex items-center space-x-4 mb-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Pedido #{{ order.id }}
                </h3>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(order.status)">
                  <Icon :name="getStatusIcon(order.status)" class="h-3 w-3 mr-1" />
                  {{ getStatusLabel(order.status) }}
                </span>
              </div>
              <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{{ formatDate(order.createdAt) }}</span>
                <span>•</span>
                <span>{{ order.items.length }} {{ order.items.length === 1 ? 'item' : 'itens' }}</span>
                <span>•</span>
                <span class="font-semibold text-primary-600">{{ formatCurrency(order.total) }}</span>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <NuxtLink :to="`/pedidos/${order.id}`"
                        class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Ver Detalhes
              </NuxtLink>
              <button v-if="order.status === 'delivered'" 
                      @click="() => openReviewModal(order)"
                      class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Avaliar
              </button>
            </div>
          </div>

          <!-- Items do pedido (resumo) -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="item in order.items.slice(0, 3)" :key="item.id" 
                 class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <img :src="item.image" :alt="item.name" 
                   class="w-12 h-12 object-cover rounded-lg" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ item.name }}
                </p>
                <p class="text-sm text-gray-500">
                  Qtd: {{ item.quantity }} • {{ formatCurrency(item.price) }}
                </p>
              </div>
            </div>
            
            <div v-if="order.items.length > 3" 
                 class="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span class="text-sm text-gray-500">
                +{{ order.items.length - 3 }} {{ order.items.length - 3 === 1 ? 'item' : 'itens' }}
              </span>
            </div>
          </div>

          <!-- Tracking info (se disponível) -->
          <div v-if="order.tracking" class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <Icon name="heroicons:truck" class="h-4 w-4 text-blue-600 mr-2" />
                <span class="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Código de Rastreamento: {{ order.tracking.code }}
                </span>
              </div>
              <a :href="order.tracking.url" target="_blank" 
                 class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Rastrear
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <div v-if="totalPages > 1" class="flex items-center justify-center space-x-2">
      <button @click="currentPage--" 
              :disabled="currentPage <= 1"
              class="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
        Anterior
      </button>
      
      <div class="flex space-x-1">
        <button v-for="page in visiblePages" :key="page"
                @click="currentPage = page"
                :class="page === currentPage 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'"
                class="px-3 py-2 text-sm rounded-md">
          {{ page }}
        </button>
      </div>
      
      <button @click="currentPage++" 
              :disabled="currentPage >= totalPages"
              class="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
        Próxima
      </button>
    </div>
  </div>

  <!-- Modal de avaliação -->
  <div v-if="reviewModal.show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Avaliar Pedido #{{ reviewModal.order?.id }}
      </h3>
      <form @submit.prevent="submitReview" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nota (1-5 estrelas)
          </label>
          <div class="flex space-x-1">
            <button v-for="star in 5" :key="star" type="button"
                    @click="reviewForm.rating = star"
                    :class="star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'"
                    class="text-2xl hover:text-yellow-400 transition-colors">
              ★
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Comentário (opcional)
          </label>
          <textarea v-model="reviewForm.comment" 
                    rows="3" 
                    class="mystic-input w-full resize-none"
                    placeholder="Conte como foi sua experiência..."></textarea>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="reviewModal.show = false"
                  class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
            Cancelar
          </button>
          <button type="submit" class="mystic-button px-4 py-2 text-sm">
            Enviar Avaliação
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToasts } from '@/composables/useToasts'

// Meta da página
definePageMeta({
  middleware: 'auth'
})

// Tipos
interface OrderItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

interface Order {
  id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  total: number
  items: OrderItem[]
  tracking?: {
    code: string
    url: string
  }
}

// Composables
const { user } = useAuth()
const { success: showSuccessToast } = useToasts()

// Estado reativo
const loading = ref(true)
const statusFilter = ref('')
const periodFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

const reviewModal = reactive({
  show: false,
  order: null as Order | null
})

const reviewForm = reactive({
  rating: 5,
  comment: ''
})

// Dados simulados (substituir por API real)
const orders = ref<Order[]>([])

// Computed
const filteredOrders = computed(() => {
  let filtered = orders.value

  if (statusFilter.value) {
    filtered = filtered.filter(order => order.status === statusFilter.value)
  }

  if (periodFilter.value) {
    const days = parseInt(periodFilter.value)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    filtered = filtered.filter(order => new Date(order.createdAt) >= cutoffDate)
  }

  return filtered
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredOrders.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredOrders.value.length / itemsPerPage)
)

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const stats = computed(() => ({
  total: orders.value.length,
  pending: orders.value.filter(o => o.status === 'pending').length,
  processing: orders.value.filter(o => o.status === 'processing').length,
  delivered: orders.value.filter(o => o.status === 'delivered').length
}))

// Métodos de formatação
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const getStatusClass = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status as keyof typeof classes] || classes.pending
}

const getStatusIcon = (status: string) => {
  const icons = {
    pending: 'heroicons:clock',
    processing: 'heroicons:cog-6-tooth',
    shipped: 'heroicons:truck',
    delivered: 'heroicons:check-circle',
    cancelled: 'heroicons:x-circle'
  }
  return icons[status as keyof typeof icons] || icons.pending
}

const getStatusLabel = (status: string) => {
  const labels = {
    pending: 'Pendente',
    processing: 'Processando',
    shipped: 'Enviado',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  }
  return labels[status as keyof typeof labels] || status
}

// Métodos de ação
const openReviewModal = (order: Order) => {
  reviewModal.order = order
  reviewModal.show = true
  reviewForm.rating = 5
  reviewForm.comment = ''
}

const submitReview = async () => {
  try {
    // Simular envio de avaliação (substituir por API real)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showSuccessToast(
      'Avaliação enviada!',
      'Obrigado pelo seu feedback'
    )
    
    reviewModal.show = false
  } catch (error) {
    console.error('Erro ao enviar avaliação:', error)
  }
}

// Carregar dados simulados
const loadOrders = async () => {
  loading.value = true
  
  try {
    // Simular API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Dados simulados
    orders.value = [
      {
        id: 'ORD-2024-001',
        status: 'delivered',
        createdAt: '2024-12-15',
        total: 149.90,
        items: [
          {
            id: '1',
            name: 'Cristal de Quartzo Rosa',
            image: '/produtos/quartzo-rosa.jpg',
            price: 89.90,
            quantity: 1
          },
          {
            id: '2',
            name: 'Vela Aromática Lavanda',
            image: '/produtos/vela-lavanda.jpg',
            price: 29.90,
            quantity: 2
          }
        ],
        tracking: {
          code: 'BR123456789',
          url: 'https://rastreamento.correios.com.br/app/index.php'
        }
      },
      {
        id: 'ORD-2024-002',
        status: 'processing',
        createdAt: '2024-12-20',
        total: 89.90,
        items: [
          {
            id: '3',
            name: 'Tarot dos Anjos',
            image: '/produtos/tarot-anjos.jpg',
            price: 89.90,
            quantity: 1
          }
        ]
      }
      // Adicionar mais pedidos conforme necessário
    ]
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadOrders()
})

// Meta
useHead({
  title: 'Meus Pedidos - Loja Esotérica'
})
</script>