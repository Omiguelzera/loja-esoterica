<template>
  <div v-if="loading" class="text-center py-12">
    <Icon name="heroicons:arrow-path" class="animate-spin h-8 w-8 text-primary-600 mx-auto mb-4" />
    <p class="text-gray-500">Carregando pedido...</p>
  </div>

  <div v-else-if="!order" class="text-center py-12">
    <Icon name="heroicons:exclamation-triangle" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 class="text-lg font-medium text-gray-500 mb-2">Pedido não encontrado</h3>
    <p class="text-gray-400 mb-6">O pedido solicitado não existe ou você não tem permissão para visualizá-lo</p>
    <NuxtLink to="/pedidos" class="mystic-button">
      Voltar para Pedidos
    </NuxtLink>
  </div>

  <div v-else class="space-y-8">
    <!-- Cabeçalho do pedido -->
    <div class="flex items-start justify-between">
      <div>
        <div class="flex items-center space-x-4 mb-2">
          <NuxtLink to="/pedidos" 
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <Icon name="heroicons:arrow-left" class="h-5 w-5" />
          </NuxtLink>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Pedido #{{ order.id }}
          </h1>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="getStatusClass(order.status)">
            <Icon :name="getStatusIcon(order.status)" class="h-4 w-4 mr-1" />
            {{ getStatusLabel(order.status) }}
          </span>
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          Realizado em {{ formatDate(order.createdAt) }}
        </p>
      </div>
      
      <div class="text-right">
        <div class="text-2xl font-bold text-primary-600">
          {{ formatCurrency(order.total) }}
        </div>
        <p class="text-sm text-gray-500">Total do pedido</p>
      </div>
    </div>

    <!-- Timeline de status -->
    <div class="elegant-border p-6 rounded-lg">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Acompanhamento do Pedido
      </h2>
      
      <div class="relative">
        <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        <div v-for="(step, index) in orderTimeline" :key="index" 
             class="relative flex items-start space-x-4 pb-8 last:pb-0">
          <div class="relative z-10">
            <div class="flex items-center justify-center w-8 h-8 rounded-full"
                 :class="step.completed 
                   ? 'bg-primary-600 text-white' 
                   : step.current 
                     ? 'bg-yellow-500 text-white animate-pulse' 
                     : 'bg-gray-200 dark:bg-gray-700 text-gray-400'">
              <Icon :name="step.icon" class="h-4 w-4" />
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium"
                  :class="step.completed || step.current 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500'">
                {{ step.title }}
              </h3>
              <span v-if="step.date" class="text-sm text-gray-500">
                {{ formatDateTime(step.date) }}
              </span>
            </div>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Items do pedido -->
    <div class="elegant-border p-6 rounded-lg">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Itens do Pedido ({{ order.items.length }})
      </h2>
      
      <div class="space-y-4">
        <div v-for="item in order.items" :key="item.id" 
             class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <img :src="item.image" :alt="item.name" 
               class="w-16 h-16 object-cover rounded-lg" />
          
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ item.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ item.description }}
            </p>
            <div class="flex items-center mt-2 space-x-4">
              <span class="text-sm text-gray-500">
                Quantidade: {{ item.quantity }}
              </span>
              <span class="text-sm font-medium text-primary-600">
                {{ formatCurrency(item.price) }} cada
              </span>
            </div>
          </div>
          
          <div class="text-right">
            <div class="text-sm font-medium text-gray-900 dark:text-white">
              {{ formatCurrency(item.price * item.quantity) }}
            </div>
            <NuxtLink :to="`/produto/${item.productId}`" 
                      class="text-sm text-primary-600 hover:text-primary-700">
              Ver produto
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Resumo de valores -->
      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span class="text-gray-900 dark:text-white">{{ formatCurrency(order.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Frete</span>
            <span class="text-gray-900 dark:text-white">{{ formatCurrency(order.shipping) }}</span>
          </div>
          <div v-if="order.discount > 0" class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Desconto</span>
            <span class="text-green-600">-{{ formatCurrency(order.discount) }}</span>
          </div>
          <div class="flex justify-between text-base font-medium pt-2 border-t border-gray-200 dark:border-gray-700">
            <span class="text-gray-900 dark:text-white">Total</span>
            <span class="text-primary-600">{{ formatCurrency(order.total) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Informações de entrega -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Endereço de entrega -->
      <div class="elegant-border p-6 rounded-lg">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Endereço de Entrega
        </h2>
        <div class="space-y-2 text-sm">
          <p class="font-medium text-gray-900 dark:text-white">{{ order.delivery.name }}</p>
          <p class="text-gray-600 dark:text-gray-400">{{ order.delivery.address }}</p>
          <p class="text-gray-600 dark:text-gray-400">
            {{ order.delivery.city }}, {{ order.delivery.state }} - {{ order.delivery.cep }}
          </p>
          <p class="text-gray-600 dark:text-gray-400">{{ order.delivery.phone }}</p>
        </div>
      </div>

      <!-- Informações de pagamento -->
      <div class="elegant-border p-6 rounded-lg">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Informações de Pagamento
        </h2>
        <div class="space-y-2 text-sm">
          <div class="flex items-center space-x-2">
            <Icon :name="getPaymentIcon(order.payment.method)" class="h-4 w-4 text-gray-400" />
            <span class="text-gray-900 dark:text-white">{{ order.payment.methodLabel }}</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            Status: 
            <span :class="order.payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'">
              {{ order.payment.status === 'paid' ? 'Pago' : 'Pendente' }}
            </span>
          </p>
          <p v-if="order.payment.transactionId" class="text-gray-600 dark:text-gray-400">
            ID: {{ order.payment.transactionId }}
          </p>
        </div>
      </div>
    </div>

    <!-- Rastreamento (se disponível) -->
    <div v-if="order.tracking" class="elegant-border p-6 rounded-lg">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Rastreamento
      </h2>
      <div class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div class="flex items-center space-x-3">
          <Icon name="heroicons:truck" class="h-6 w-6 text-blue-600" />
          <div>
            <p class="font-medium text-blue-800 dark:text-blue-200">
              Código: {{ order.tracking.code }}
            </p>
            <p class="text-sm text-blue-600 dark:text-blue-300">
              {{ order.tracking.carrier }}
            </p>
          </div>
        </div>
        <a :href="order.tracking.url" target="_blank" 
           class="mystic-button inline-flex items-center text-sm">
          <Icon name="heroicons:arrow-top-right-on-square" class="h-4 w-4 mr-2" />
          Rastrear Encomenda
        </a>
      </div>
    </div>

    <!-- Ações do pedido -->
    <div class="flex justify-end space-x-4">
      <button v-if="order.status === 'pending'" 
              @click="cancelOrder"
              class="px-6 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 rounded-md transition-colors">
        Cancelar Pedido
      </button>
      
      <button v-if="order.status === 'delivered'" 
              @click="openReviewModal"
              class="px-6 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 border border-primary-300 hover:border-primary-400 rounded-md transition-colors">
        Avaliar Pedido
      </button>
      
      <button @click="downloadInvoice"
              class="mystic-button px-6 py-2 text-sm font-medium">
        <Icon name="heroicons:document-arrow-down" class="h-4 w-4 mr-2" />
        Baixar Nota Fiscal
      </button>
    </div>
  </div>

  <!-- Modal de avaliação -->
  <div v-if="showReviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Avaliar Pedido #{{ order?.id }}
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
            Comentário
          </label>
          <textarea v-model="reviewForm.comment" 
                    rows="3" 
                    class="mystic-input w-full resize-none"
                    placeholder="Conte como foi sua experiência..."></textarea>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="showReviewModal = false"
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
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useToasts } from '@/composables/useToasts'

// Meta da página
definePageMeta({
  middleware: 'auth'
})

// Tipos
interface OrderItem {
  id: string
  productId: string
  name: string
  description: string
  image: string
  price: number
  quantity: number
}

interface Order {
  id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  subtotal: number
  shipping: number
  discount: number
  total: number
  items: OrderItem[]
  delivery: {
    name: string
    address: string
    city: string
    state: string
    cep: string
    phone: string
  }
  payment: {
    method: string
    methodLabel: string
    status: 'pending' | 'paid' | 'failed'
    transactionId?: string
  }
  tracking?: {
    code: string
    carrier: string
    url: string
  }
  timeline: Array<{
    status: string
    date: string
    description: string
  }>
}

// Composables
const route = useRoute()
const { user } = useAuth()
const { success: showSuccessToast, error: showErrorToast } = useToasts()

// Estado reativo
const loading = ref(true)
const order = ref<Order | null>(null)
const showReviewModal = ref(false)

const reviewForm = reactive({
  rating: 5,
  comment: ''
})

// Computed
const orderTimeline = computed(() => {
  if (!order.value) return []
  
  const steps = [
    {
      status: 'pending',
      title: 'Pedido Realizado',
      description: 'Seu pedido foi recebido e está sendo processado',
      icon: 'heroicons:shopping-cart',
      completed: true,
      current: false,
      date: order.value.createdAt
    },
    {
      status: 'processing',
      title: 'Preparando Pedido',
      description: 'Estamos separando e embalando seus produtos',
      icon: 'heroicons:cog-6-tooth',
      completed: ['processing', 'shipped', 'delivered'].includes(order.value.status),
      current: order.value.status === 'processing',
      date: order.value.timeline.find(t => t.status === 'processing')?.date
    },
    {
      status: 'shipped',
      title: 'Pedido Enviado',
      description: 'Seu pedido foi despachado e está a caminho',
      icon: 'heroicons:truck',
      completed: ['shipped', 'delivered'].includes(order.value.status),
      current: order.value.status === 'shipped',
      date: order.value.timeline.find(t => t.status === 'shipped')?.date
    },
    {
      status: 'delivered',
      title: 'Entregue',
      description: 'Seu pedido foi entregue com sucesso',
      icon: 'heroicons:check-circle',
      completed: order.value.status === 'delivered',
      current: false,
      date: order.value.timeline.find(t => t.status === 'delivered')?.date
    }
  ]
  
  if (order.value.status === 'cancelled') {
    return [
      steps[0],
      {
        status: 'cancelled',
        title: 'Pedido Cancelado',
        description: 'Este pedido foi cancelado',
        icon: 'heroicons:x-circle',
        completed: true,
        current: false,
        date: order.value.timeline.find(t => t.status === 'cancelled')?.date
      }
    ]
  }
  
  return steps
})

// Métodos de formatação
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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

const getPaymentIcon = (method: string) => {
  const icons = {
    credit_card: 'heroicons:credit-card',
    pix: 'heroicons:qr-code',
    boleto: 'heroicons:document-text'
  }
  return icons[method as keyof typeof icons] || icons.credit_card
}

// Métodos de ação
const openReviewModal = () => {
  showReviewModal.value = true
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
    
    showReviewModal.value = false
  } catch (error) {
    showErrorToast('Erro', 'Não foi possível enviar a avaliação')
  }
}

const cancelOrder = async () => {
  if (!confirm('Tem certeza que deseja cancelar este pedido?')) return
  
  try {
    // Simular cancelamento (substituir por API real)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (order.value) {
      order.value.status = 'cancelled'
    }
    
    showSuccessToast('Pedido cancelado', 'Seu pedido foi cancelado com sucesso')
  } catch (error) {
    showErrorToast('Erro', 'Não foi possível cancelar o pedido')
  }
}

const downloadInvoice = () => {
  // Simular download de nota fiscal
  showSuccessToast('Download iniciado', 'A nota fiscal será baixada em breve')
}

// Carregar dados do pedido
const loadOrder = async () => {
  loading.value = true
  const orderId = route.params.id as string
  
  try {
    // Simular API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Dados simulados (substituir por API real)
    order.value = {
      id: orderId,
      status: 'delivered',
      createdAt: '2024-12-15',
      subtotal: 119.80,
      shipping: 15.00,
      discount: 0,
      total: 134.80,
      items: [
        {
          id: '1',
          productId: 'prod-1',
          name: 'Cristal de Quartzo Rosa',
          description: 'Cristal natural para amor próprio e harmonia',
          image: '/produtos/quartzo-rosa.jpg',
          price: 89.90,
          quantity: 1
        },
        {
          id: '2',
          productId: 'prod-2',
          name: 'Vela Aromática Lavanda',
          description: 'Vela natural com essência de lavanda',
          image: '/produtos/vela-lavanda.jpg',
          price: 29.90,
          quantity: 1
        }
      ],
      delivery: {
        name: 'João Silva',
        address: 'Rua das Flores, 123, Apt 45',
        city: 'São Paulo',
        state: 'SP',
        cep: '01234-567',
        phone: '(11) 99999-9999'
      },
      payment: {
        method: 'credit_card',
        methodLabel: 'Cartão de Crédito (**** 1234)',
        status: 'paid',
        transactionId: 'TXN123456789'
      },
      tracking: {
        code: 'BR123456789',
        carrier: 'Correios',
        url: 'https://rastreamento.correios.com.br/app/index.php'
      },
      timeline: [
        { status: 'pending', date: '2024-12-15T10:00:00Z', description: 'Pedido recebido' },
        { status: 'processing', date: '2024-12-15T14:00:00Z', description: 'Pagamento confirmado' },
        { status: 'shipped', date: '2024-12-16T08:00:00Z', description: 'Pedido despachado' },
        { status: 'delivered', date: '2024-12-18T16:30:00Z', description: 'Entregue ao destinatário' }
      ]
    }
  } catch (error) {
    console.error('Erro ao carregar pedido:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadOrder()
})

// Meta
useHead({
  title: `Pedido #${route.params.id} - Loja Esotérica`
})
</script>