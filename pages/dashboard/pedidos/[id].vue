<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="p-6 space-y-6">
      <!-- Navegação -->
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <NuxtLink to="/dashboard" class="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          Dashboard
        </NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        <NuxtLink to="/dashboard/pedidos" class="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          Pedidos
        </NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        <span class="text-gray-900 dark:text-white">Pedido #{{ orderId }}</span>
      </div>

      <!-- Cabeçalho -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Icon name="heroicons:document-text" class="w-8 h-8 text-purple-600" />
              Pedido #{{ orderId }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              Detalhes completos do pedido
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <button
              @click="goBack"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
              Voltar
            </button>
            
            <button
              v-if="order"
              @click="updateStatus"
              class="mystic-button px-4 py-2 text-sm font-medium"
            >
              <Icon name="heroicons:pencil" class="w-4 h-4 mr-2" />
              Atualizar Status
            </button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-purple-600" />
        <span class="ml-3 text-gray-600 dark:text-gray-400">Carregando pedido...</span>
      </div>

      <div v-else-if="!order" class="text-center py-12">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 mx-auto text-red-500" />
        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Pedido não encontrado</h3>
        <p class="mt-2 text-gray-600 dark:text-gray-400">O pedido solicitado não existe ou foi removido.</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Coluna Principal -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Informações do Cliente -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Icon name="heroicons:user" class="w-5 h-5 text-purple-600" />
              Informações do Cliente
            </h2>
            
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-medium text-lg">{{ order.customer.name.charAt(0) }}</span>
                </div>
              </div>
              
              <div class="flex-1">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ order.customer.name }}</h3>
                <p class="text-gray-600 dark:text-gray-400">{{ order.customer.email }}</p>
                <p v-if="order.customer.phone" class="text-gray-600 dark:text-gray-400">{{ order.customer.phone }}</p>
              </div>
            </div>

            <div v-if="order.shippingAddress" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 class="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Icon name="heroicons:map-pin" class="w-4 h-4 text-purple-600" />
                Endereço de Entrega
              </h4>
              <div class="text-gray-600 dark:text-gray-400 space-y-1">
                <p>{{ order.shippingAddress.street }}, {{ order.shippingAddress.number }}</p>
                <p v-if="order.shippingAddress.complement">{{ order.shippingAddress.complement }}</p>
                <p>{{ order.shippingAddress.neighborhood }}</p>
                <p>{{ order.shippingAddress.city }} - {{ order.shippingAddress.state }}</p>
                <p>CEP: {{ order.shippingAddress.zipCode }}</p>
              </div>
            </div>
          </div>

          <!-- Itens do Pedido -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg crystal-border overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-purple-600" />
                Itens do Pedido ({{ order.items.length }})
              </h2>
            </div>

            <div class="divide-y divide-gray-200 dark:divide-gray-700">
              <div v-for="item in order.items" :key="item.id" class="p-6 flex items-center gap-4">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg flex items-center justify-center">
                    <Icon name="heroicons:gift" class="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 dark:text-white">{{ item.name }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ item.description || 'Produto esotérico de alta qualidade' }}</p>
                  <div class="flex items-center gap-4 mt-2">
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Quantidade: {{ item.quantity }}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Preço unitário: {{ formatCurrency(item.price) }}
                    </span>
                  </div>
                </div>
                
                <div class="text-right">
                  <div class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ formatCurrency(item.price * item.quantity) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline do Pedido -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Icon name="heroicons:clock" class="w-5 h-5 text-purple-600" />
              Timeline do Pedido
            </h2>

            <div class="space-y-4">
              <div v-for="(event, index) in orderTimeline" :key="index" class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center"
                       :class="event.completed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-700'">
                    <Icon :name="event.icon" 
                          :class="event.completed ? 'text-green-600' : 'text-gray-400'"
                          class="w-4 h-4" />
                  </div>
                </div>
                
                <div class="flex-1">
                  <p class="font-medium text-gray-900 dark:text-white">{{ event.title }}</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ event.description }}</p>
                  <p v-if="event.date" class="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    {{ formatDateTime(event.date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Status e Resumo -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Resumo do Pedido
            </h2>

            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Status:</span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(order.status)">
                  {{ getStatusText(order.status) }}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Data do Pedido:</span>
                <span class="text-gray-900 dark:text-white">{{ formatDate(order.createdAt) }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Última Atualização:</span>
                <span class="text-gray-900 dark:text-white">{{ formatDate(order.updatedAt) }}</span>
              </div>

              <hr class="border-gray-200 dark:border-gray-700">

              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span class="text-gray-900 dark:text-white">{{ formatCurrency(order.subtotal) }}</span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Frete:</span>
                  <span class="text-gray-900 dark:text-white">{{ formatCurrency(order.shipping) }}</span>
                </div>

                <div v-if="order.discount > 0" class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Desconto:</span>
                  <span class="text-green-600">-{{ formatCurrency(order.discount) }}</span>
                </div>

                <hr class="border-gray-200 dark:border-gray-700">

                <div class="flex justify-between text-lg font-semibold">
                  <span class="text-gray-900 dark:text-white">Total:</span>
                  <span class="text-gray-900 dark:text-white">{{ formatCurrency(order.total) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Ações Rápidas -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Ações Rápidas
            </h2>

            <div class="space-y-3">
              <button
                @click="updateStatus"
                class="w-full mystic-button py-2 text-sm font-medium"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4 mr-2" />
                Atualizar Status
              </button>

              <button
                @click="sendNotification"
                class="w-full px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
              >
                <Icon name="heroicons:bell" class="w-4 h-4 mr-2" />
                Notificar Cliente
              </button>

              <button
                @click="printOrder"
                class="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Icon name="heroicons:printer" class="w-4 h-4 mr-2" />
                Imprimir Pedido
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
            Atualizar Status
          </h3>
          <button 
            @click="closeStatusModal"
            class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <div class="space-y-4">
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
import { useRoute, useRouter } from 'vue-router'
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
  phone?: string
}

interface ShippingAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

interface OrderItem {
  id: string
  name: string
  description?: string
  quantity: number
  price: number
  image?: string
}

interface Order {
  id: string
  customer: Customer
  items: OrderItem[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  subtotal: number
  shipping: number
  discount: number
  total: number
  shippingAddress?: ShippingAddress
  createdAt: Date
  updatedAt: Date
}

interface TimelineEvent {
  title: string
  description: string
  icon: string
  completed: boolean
  date?: Date
}

// Composables
const route = useRoute()
const router = useRouter()
const { success: showSuccessToast, error: showErrorToast } = useToasts()

// Estado reativo
const loading = ref(false)
const order = ref<Order | null>(null)
const orderId = computed(() => route.params.id as string)

// Modal de status
const showStatusModal = ref(false)
const newStatus = ref('')
const updatingStatus = ref(false)

// Mock data para demonstração
const mockOrder: Order = {
  id: '1001',
  customer: {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@email.com',
    phone: '(11) 99999-9999'
  },
  items: [
    {
      id: '1',
      name: 'Cristal de Quartzo Rosa',
      description: 'Cristal natural para amor e autoestima',
      quantity: 2,
      price: 45.00
    },
    {
      id: '2',
      name: 'Incenso de Lavanda',
      description: 'Incenso natural para relaxamento e purificação',
      quantity: 1,
      price: 12.00
    }
  ],
  status: 'processing',
  subtotal: 102.00,
  shipping: 15.00,
  discount: 5.00,
  total: 112.00,
  shippingAddress: {
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  },
  createdAt: new Date('2024-10-08T10:30:00'),
  updatedAt: new Date('2024-10-08T14:15:00')
}

// Computadas
const orderTimeline = computed((): TimelineEvent[] => {
  if (!order.value) return []

  const events: TimelineEvent[] = [
    {
      title: 'Pedido Criado',
      description: 'Pedido foi criado e está aguardando processamento',
      icon: 'heroicons:shopping-cart',
      completed: true,
      date: order.value.createdAt
    },
    {
      title: 'Pagamento Confirmado',
      description: 'Pagamento foi processado com sucesso',
      icon: 'heroicons:credit-card',
      completed: ['processing', 'shipped', 'delivered'].includes(order.value.status),
      date: order.value.status !== 'pending' ? order.value.updatedAt : undefined
    },
    {
      title: 'Em Preparação',
      description: 'Pedido está sendo preparado para envio',
      icon: 'heroicons:cog-6-tooth',
      completed: ['shipped', 'delivered'].includes(order.value.status)
    },
    {
      title: 'Enviado',
      description: 'Pedido foi enviado e está a caminho',
      icon: 'heroicons:truck',
      completed: ['delivered'].includes(order.value.status)
    },
    {
      title: 'Entregue',
      description: 'Pedido foi entregue com sucesso',
      icon: 'heroicons:check-circle',
      completed: order.value.status === 'delivered'
    }
  ]

  if (order.value.status === 'cancelled') {
    events.push({
      title: 'Cancelado',
      description: 'Pedido foi cancelado',
      icon: 'heroicons:x-circle',
      completed: true,
      date: order.value.updatedAt
    })
  }

  return events
})

// Métodos
const loadOrder = async () => {
  loading.value = true
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Em uma aplicação real, você faria uma requisição à API
    if (orderId.value === '1001') {
      order.value = mockOrder
    } else {
      order.value = null
    }
  } catch (error) {
    console.error('Erro ao carregar pedido:', error)
    showErrorToast('Erro', 'Não foi possível carregar o pedido')
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/dashboard/pedidos')
}

const updateStatus = () => {
  if (!order.value) return
  newStatus.value = order.value.status
  showStatusModal.value = true
}

const closeStatusModal = () => {
  showStatusModal.value = false
  newStatus.value = ''
}

const confirmStatusUpdate = async () => {
  if (!order.value) return
  
  updatingStatus.value = true
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    order.value.status = newStatus.value as any
    order.value.updatedAt = new Date()
    
    showSuccessToast('Status Atualizado', `Pedido atualizado para ${getStatusText(newStatus.value)}`)
    closeStatusModal()
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
    showErrorToast('Erro', 'Não foi possível atualizar o status')
  } finally {
    updatingStatus.value = false
  }
}

const sendNotification = () => {
  showSuccessToast('Notificação Enviada', 'Cliente foi notificado sobre o status do pedido')
}

const printOrder = () => {
  window.print()
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

const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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
  loadOrder()
})
</script>