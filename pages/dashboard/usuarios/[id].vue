<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="p-6 space-y-6">
      <!-- Navegação -->
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <NuxtLink to="/dashboard" class="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          Dashboard
        </NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        <NuxtLink to="/dashboard/usuarios" class="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          Usuários
        </NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        <span class="text-gray-900 dark:text-white">{{ user?.name || userId }}</span>
      </div>

      <!-- Cabeçalho -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Icon name="heroicons:user-circle" class="w-8 h-8 text-purple-600" />
              Detalhes do Usuário
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              Informações completas e histórico do usuário
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
              v-if="user"
              @click="editUser"
              class="mystic-button px-4 py-2 text-sm font-medium"
            >
              <Icon name="heroicons:pencil" class="w-4 h-4 mr-2" />
              Editar Usuário
            </button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-purple-600" />
        <span class="ml-3 text-gray-600 dark:text-gray-400">Carregando usuário...</span>
      </div>

      <div v-else-if="!user" class="text-center py-12">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 mx-auto text-red-500" />
        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Usuário não encontrado</h3>
        <p class="mt-2 text-gray-600 dark:text-gray-400">O usuário solicitado não existe ou foi removido.</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Coluna Principal -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Informações Básicas -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Icon name="heroicons:user" class="w-5 h-5 text-purple-600" />
              Informações Básicas
            </h2>
            
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <img
                  :src="user.avatar || getDefaultAvatar(user.role)"
                  :alt="user.name"
                  class="w-24 h-24 rounded-full object-cover border-4"
                  :class="user.role === 'admin' ? 'border-purple-400' : 'border-green-400'"
                />
              </div>
              
              <div class="flex-1 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</label>
                    <p class="text-lg font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
                  </div>
                  
                  <div>
                    <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                    <p class="text-lg text-gray-900 dark:text-white">{{ user.email }}</p>
                  </div>
                  
                  <div>
                    <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                    <div>
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                            :class="getRoleClass(user.role)">
                        {{ getRoleText(user.role) }}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <div>
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                            :class="getStatusClass(user.status)">
                        {{ getStatusText(user.status) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Histórico de Pedidos (se cliente) -->
          <div v-if="user.role === 'customer'" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg crystal-border overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-purple-600" />
                Histórico de Pedidos ({{ userOrders.length }})
              </h2>
            </div>

            <div v-if="userOrders.length === 0" class="p-6 text-center">
              <Icon name="heroicons:shopping-bag" class="w-12 h-12 mx-auto text-gray-400" />
              <p class="mt-2 text-gray-600 dark:text-gray-400">Nenhum pedido encontrado</p>
            </div>

            <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
              <div v-for="order in userOrders" :key="order.id" class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900 dark:text-white">
                      Pedido #{{ order.id }}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ formatDate(order.createdAt) }}
                    </p>
                  </div>
                  
                  <div class="text-right">
                    <p class="font-medium text-gray-900 dark:text-white">
                      {{ formatCurrency(order.total) }}
                    </p>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          :class="getOrderStatusClass(order.status)">
                      {{ getOrderStatusText(order.status) }}
                    </span>
                  </div>
                </div>
                
                <div class="mt-3">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ order.itemsCount }} {{ order.itemsCount === 1 ? 'item' : 'itens' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Atividade Recente -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Icon name="heroicons:clock" class="w-5 h-5 text-purple-600" />
              Atividade Recente
            </h2>

            <div class="space-y-4">
              <div v-for="(activity, index) in userActivity" :key="index" class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Icon :name="activity.icon" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
                
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ formatDateTime(activity.date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Estatísticas do Usuário -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Estatísticas
            </h2>

            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Criado em:</span>
                <span class="text-gray-900 dark:text-white">{{ formatDate(user.createdAt) }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Última atualização:</span>
                <span class="text-gray-900 dark:text-white">{{ formatDate(user.updatedAt) }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Último login:</span>
                <span class="text-gray-900 dark:text-white">
                  {{ user.lastLogin ? formatDate(user.lastLogin) : 'Nunca' }}
                </span>
              </div>

              <hr class="border-gray-200 dark:border-gray-700">

              <div v-if="user.role === 'customer'" class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Total de pedidos:</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ userOrders.length }}</span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Total gasto:</span>
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ formatCurrency(totalSpent) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Ações -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Ações
            </h2>

            <div class="space-y-3">
              <button
                @click="editUser"
                class="w-full mystic-button py-2 text-sm font-medium"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4 mr-2" />
                Editar Usuário
              </button>

              <button
                @click="toggleStatus"
                :class="user.status === 'active' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'"
                class="w-full px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
              >
                <Icon :name="user.status === 'active' ? 'heroicons:x-circle' : 'heroicons:check-circle'" class="w-4 h-4 mr-2" />
                {{ user.status === 'active' ? 'Desativar' : 'Ativar' }} Usuário
              </button>

              <button
                @click="sendNotification"
                class="w-full px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
              >
                <Icon name="heroicons:bell" class="w-4 h-4 mr-2" />
                Enviar Notificação
              </button>

              <button
                v-if="user.role === 'customer'"
                @click="viewOrders"
                class="w-full px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors"
              >
                <Icon name="heroicons:shopping-bag" class="w-4 h-4 mr-2" />
                Ver Pedidos
              </button>
            </div>
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

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  status: 'active' | 'inactive' | 'suspended'
  avatar?: string
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

interface Order {
  id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  itemsCount: number
  createdAt: Date
}

interface Activity {
  title: string
  description: string
  icon: string
  date: Date
}

// Composables
const route = useRoute()
const router = useRouter()
const { success: showSuccessToast, error: showErrorToast } = useToasts()

// Estado reativo
const loading = ref(false)
const user = ref<User | null>(null)
const userId = computed(() => route.params.id as string)

// Mock data para demonstração
const mockUser: User = {
  id: '2',
  name: 'Ana Silva',
  email: 'ana@email.com',
  role: 'customer',
  status: 'active',
  avatar: '/avatars/customer.svg',
  lastLogin: new Date('2024-10-12T15:20:00'),
  createdAt: new Date('2024-02-15'),
  updatedAt: new Date('2024-10-12')
}

const mockOrders: Order[] = [
  {
    id: '1001',
    status: 'delivered',
    total: 102.00,
    itemsCount: 2,
    createdAt: new Date('2024-10-08')
  },
  {
    id: '1002',
    status: 'shipped',
    total: 89.00,
    itemsCount: 1,
    createdAt: new Date('2024-10-07')
  },
  {
    id: '1003',
    status: 'processing',
    total: 156.50,
    itemsCount: 3,
    createdAt: new Date('2024-10-05')
  }
]

const mockActivity: Activity[] = [
  {
    title: 'Login realizado',
    description: 'Usuário fez login no sistema',
    icon: 'heroicons:arrow-right-on-rectangle',
    date: new Date('2024-10-12T15:20:00')
  },
  {
    title: 'Pedido criado',
    description: 'Criou o pedido #1003',
    icon: 'heroicons:shopping-bag',
    date: new Date('2024-10-05T10:30:00')
  },
  {
    title: 'Perfil atualizado',
    description: 'Atualizou informações do perfil',
    icon: 'heroicons:user',
    date: new Date('2024-09-20T14:15:00')
  },
  {
    title: 'Primeiro login',
    description: 'Primeira vez acessando o sistema',
    icon: 'heroicons:star',
    date: new Date('2024-02-15T09:00:00')
  }
]

// Computadas
const userOrders = computed(() => {
  if (user.value?.role !== 'customer') return []
  return mockOrders
})

const totalSpent = computed(() => {
  return userOrders.value.reduce((sum, order) => sum + order.total, 0)
})

const userActivity = computed(() => {
  return mockActivity
})

// Métodos
const loadUser = async () => {
  loading.value = true
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Em uma aplicação real, você faria uma requisição à API
    if (userId.value === '2') {
      user.value = mockUser
    } else {
      user.value = null
    }
  } catch (error) {
    console.error('Erro ao carregar usuário:', error)
    showErrorToast('Erro', 'Não foi possível carregar o usuário')
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/dashboard/usuarios')
}

const editUser = () => {
  showSuccessToast('Em Desenvolvimento', 'Funcionalidade de edição será implementada em breve')
}

const toggleStatus = async () => {
  if (!user.value) return
  
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newStatus = user.value.status === 'active' ? 'inactive' : 'active'
    user.value.status = newStatus
    user.value.updatedAt = new Date()
    
    const action = newStatus === 'active' ? 'ativado' : 'desativado'
    showSuccessToast('Status Alterado', `Usuário ${action} com sucesso`)
  } catch (error) {
    console.error('Erro ao alterar status:', error)
    showErrorToast('Erro', 'Não foi possível alterar o status')
  }
}

const sendNotification = () => {
  showSuccessToast('Notificação Enviada', 'Usuário foi notificado com sucesso')
}

const viewOrders = () => {
  router.push('/dashboard/pedidos')
}

// Utilitários
const getDefaultAvatar = (role: string) => {
  return role === 'admin' ? '/avatars/admin.svg' : '/avatars/customer.svg'
}

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

const getRoleClass = (role: string) => {
  const classes = {
    admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200',
    customer: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
  }
  return classes[role] || classes.customer
}

const getRoleText = (role: string) => {
  const texts = {
    admin: 'Administrador',
    customer: 'Cliente'
  }
  return texts[role] || 'Cliente'
}

const getStatusClass = (status: string) => {
  const classes = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200',
    suspended: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
  }
  return classes[status] || classes.active
}

const getStatusText = (status: string) => {
  const texts = {
    active: 'Ativo',
    inactive: 'Inativo',
    suspended: 'Suspenso'
  }
  return texts[status] || 'Ativo'
}

const getOrderStatusClass = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    shipped: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
    delivered: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
  }
  return classes[status] || classes.pending
}

const getOrderStatusText = (status: string) => {
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
  loadUser()
})
</script>