<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="p-6 space-y-6">
      <!-- Cabeçalho -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Icon name="heroicons:shopping-bag" class="w-8 h-8 text-purple-600" />
              Gerenciar Pedidos
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              Visualize e gerencie todos os pedidos da loja
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <button
              @click="refreshOrders"
              :disabled="loading"
              class="mystic-button px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
              <Icon v-else name="heroicons:arrow-path" class="w-4 h-4" />
              <span class="ml-2">Atualizar</span>
            </button>
            
            <select
              v-model="selectedStatus"
              @change="filterOrders"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Todos os Status</option>
              <option value="pending">Pendente</option>
              <option value="processing">Processando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Estatísticas Rápidas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:clock" class="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pendentes</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:cog-6-tooth" class="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Processando</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.processing }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:truck" class="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Enviados</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.shipped }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:currency-dollar" class="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total (Mês)</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(stats.monthlyTotal) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de Pedidos -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg crystal-border overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Lista de Pedidos
          </h2>
        </div>

        <div v-if="loading" class="p-8 text-center">
          <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin mx-auto text-purple-600" />
          <p class="mt-2 text-gray-600 dark:text-gray-400">Carregando pedidos...</p>
        </div>

        <div v-else-if="filteredOrders.length === 0" class="p-8 text-center">
          <Icon name="heroicons:shopping-bag" class="w-12 h-12 mx-auto text-gray-400" />
          <p class="mt-2 text-gray-600 dark:text-gray-400">Nenhum pedido encontrado</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pedido
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      #{{ order.id }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-8 w-8">
                      <div class="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                        <span class="text-white text-xs font-medium">{{ order.customer.name.charAt(0) }}</span>
                      </div>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ order.customer.name }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ order.customer.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getStatusClass(order.status)">
                    {{ getStatusText(order.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ formatCurrency(order.total) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(order.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <NuxtLink 
                    :to="`/dashboard/pedidos/${order.id}`"
                    class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    Ver Detalhes
                  </NuxtLink>
                  <button
                    @click="updateOrderStatus(order)"
                    class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    Atualizar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginação -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredOrders.length) }} de {{ filteredOrders.length }} pedidos
            </div>
            <div class="flex space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Anterior
              </button>
              <span class="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-lg">
                {{ currentPage }} de {{ totalPages }}
              </span>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Atualização de Status -->
    <div v-if="showStatusModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            Atualizar Status do Pedido
          </h3>
          <button 
            @click="closeStatusModal"
            class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <div v-if="selectedOrder" class="space-y-4">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Pedido #{{ selectedOrder.id }}</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ selectedOrder.customer.name }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Novo Status
            </label>
            <select
              v-model="newStatus"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="pending">Pendente</option>
              <option value="processing">Processando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          <div class="flex space-x-3 pt-4">
            <button
              @click="closeStatusModal"
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="confirmStatusUpdate"
              :disabled="updatingStatus"
              class="flex-1 mystic-button py-2 text-sm font-medium disabled:opacity-50"
            >
              {{ updatingStatus ? 'Atualizando...' : 'Atualizar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToasts } from '@/composables/useToasts'

// Meta da página
definePageMeta({
  layout: 'dashboard',
  middleware: 'admin'
})

interface Customer {
  id: string
  name: string
  email: string
}

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image?: string
}

interface Order {
  id: string
  customer: Customer
  items: OrderItem[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  createdAt: Date
  updatedAt: Date
}

// Composables
const { success: showSuccessToast, error: showErrorToast } = useToasts()

// Estado reativo
const loading = ref(false)
const orders = ref<Order[]>([])
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modal de status
const showStatusModal = ref(false)
const selectedOrder = ref<Order | null>(null)
const newStatus = ref('')
const updatingStatus = ref(false)

// Dados mockados para demonstração
const mockOrders: Order[] = [
  {
    id: '1001',
    customer: { id: '1', name: 'Ana Silva', email: 'ana@email.com' },
    items: [
      { id: '1', name: 'Cristal de Quartzo Rosa', quantity: 2, price: 45.00 },
      { id: '2', name: 'Incenso de Lavanda', quantity: 1, price: 12.00 }
    ],
    status: 'pending',
    total: 102.00,
    createdAt: new Date('2024-10-08'),
    updatedAt: new Date('2024-10-08')
  },
  {
    id: '1002',
    customer: { id: '2', name: 'Carlos Santos', email: 'carlos@email.com' },
    items: [
      { id: '3', name: 'Baralho de Tarot Rider-Waite', quantity: 1, price: 89.00 }
    ],
    status: 'processing',
    total: 89.00,
    createdAt: new Date('2024-10-07'),
    updatedAt: new Date('2024-10-08')
  },
  {
    id: '1003',
    customer: { id: '3', name: 'Maria Oliveira', email: 'maria@email.com' },
    items: [
      { id: '4', name: 'Ametista Bruta', quantity: 1, price: 67.00 },
      { id: '5', name: 'Vela Aromática de Sândalo', quantity: 3, price: 18.00 }
    ],
    status: 'shipped',
    total: 121.00,
    createdAt: new Date('2024-10-06'),
    updatedAt: new Date('2024-10-07')
  },
  {
    id: '1004',
    customer: { id: '4', name: 'João Costa', email: 'joao@email.com' },
    items: [
      { id: '6', name: 'Pêndulo de Cristal', quantity: 1, price: 34.00 }
    ],
    status: 'delivered',
    total: 34.00,
    createdAt: new Date('2024-10-05'),
    updatedAt: new Date('2024-10-06')
  },
  {
    id: '1005',
    customer: { id: '5', name: 'Lucia Ferreira', email: 'lucia@email.com' },
    items: [
      { id: '7', name: 'Kit de Pedras dos Chakras', quantity: 1, price: 125.00 }
    ],
    status: 'cancelled',
    total: 125.00,
    createdAt: new Date('2024-10-04'),
    updatedAt: new Date('2024-10-05')
  }
]

// Computadas
const filteredOrders = computed(() => {
  if (!selectedStatus.value) return orders.value
  return orders.value.filter(order => order.status === selectedStatus.value)
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage.value)
})

const stats = computed(() => {
  const pending = orders.value.filter(o => o.status === 'pending').length
  const processing = orders.value.filter(o => o.status === 'processing').length
  const shipped = orders.value.filter(o => o.status === 'shipped').length
  
  // Total do mês atual
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const monthlyTotal = orders.value
    .filter(o => {
      const orderDate = new Date(o.createdAt)
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear
    })
    .reduce((sum, order) => sum + order.total, 0)

  return { pending, processing, shipped, monthlyTotal }
})

// Métodos
const loadOrders = async () => {
  loading.value = true
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    orders.value = mockOrders
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error)
    showErrorToast('Erro', 'Não foi possível carregar os pedidos')
  } finally {
    loading.value = false
  }
}

const refreshOrders = () => {
  loadOrders()
}

const filterOrders = () => {
  currentPage.value = 1
}

const updateOrderStatus = (order: Order) => {
  selectedOrder.value = order
  newStatus.value = order.status
  showStatusModal.value = true
}

const closeStatusModal = () => {
  showStatusModal.value = false
  selectedOrder.value = null
  newStatus.value = ''
}

const confirmStatusUpdate = async () => {
  if (!selectedOrder.value) return
  
  updatingStatus.value = true
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Atualizar o pedido
    const orderIndex = orders.value.findIndex(o => o.id === selectedOrder.value!.id)
    if (orderIndex !== -1) {
      orders.value[orderIndex].status = newStatus.value as any
      orders.value[orderIndex].updatedAt = new Date()
    }
    
    showSuccessToast('Status Atualizado', `Pedido #${selectedOrder.value.id} atualizado para ${getStatusText(newStatus.value)}`)
    closeStatusModal()
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
    showErrorToast('Erro', 'Não foi possível atualizar o status do pedido')
  } finally {
    updatingStatus.value = false
  }
}

// Utilitários
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
}

const getStatusClass = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    shipped: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
    delivered: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
  }
  return classes[status] || classes.pending
}

const getStatusText = (status: string) => {
  const texts = {
    pending: 'Pendente',
    processing: 'Processando',
    shipped: 'Enviado',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  }
  return texts[status] || 'Pendente'
}

// Lifecycle
onMounted(() => {
  loadOrders()
})
</script>