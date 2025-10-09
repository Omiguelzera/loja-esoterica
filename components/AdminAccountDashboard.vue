<template>
  <div class="space-y-8">
    <!-- Cabeçalho de boas-vindas -->
    <div class="elegant-border p-6 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <img
              :src="user?.avatar || '/avatars/admin.jpg'"
              :alt="user?.name"
              class="w-16 h-16 rounded-full object-cover elegant-border"
            />
            <div class="absolute -bottom-1 -right-1 elegant-border rounded-full p-1 bg-white dark:bg-gray-800">
              <Icon name="heroicons:shield-check" class="h-4 w-4 text-purple-600" />
            </div>
          </div>
          
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Bem-vindo, {{ user?.name }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Painel Administrativo - {{ formatDate(new Date()) }}
            </p>
            <div class="flex items-center mt-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <Icon name="heroicons:shield-check" class="h-3 w-3 mr-1" />
                Administrador
              </span>
            </div>
          </div>
        </div>
        
        <div class="text-right">
          <div class="text-sm text-gray-500 dark:text-gray-400">Último acesso</div>
          <div class="font-medium text-gray-900 dark:text-white">{{ formatDateTime(lastLogin) }}</div>
        </div>
      </div>
    </div>

    <!-- Cards de estatísticas principais -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total de Vendas -->
      <div class="elegant-border p-6 rounded-lg text-center hover:magic-glow transition-all">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20">
          <Icon name="heroicons:currency-dollar" class="h-6 w-6 text-green-600" />
        </div>
        <div class="text-2xl font-bold text-green-600 mb-1">{{ formatCurrency(stats.totalSales) }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Vendas no Mês</div>
        <div class="text-xs text-green-600 mt-1">+12% vs mês anterior</div>
      </div>

      <!-- Pedidos Pendentes -->
      <div class="elegant-border p-6 rounded-lg text-center hover:magic-glow transition-all">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
          <Icon name="heroicons:clock" class="h-6 w-6 text-yellow-600" />
        </div>
        <div class="text-2xl font-bold text-yellow-600 mb-1">{{ stats.pendingOrders }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Pedidos Pendentes</div>
        <div class="text-xs text-yellow-600 mt-1">Requer atenção</div>
      </div>

      <!-- Total de Produtos -->
      <div class="elegant-border p-6 rounded-lg text-center hover:magic-glow transition-all">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/20">
          <Icon name="heroicons:cube" class="h-6 w-6 text-blue-600" />
        </div>
        <div class="text-2xl font-bold text-blue-600 mb-1">{{ stats.totalProducts }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Produtos Ativos</div>
        <div class="text-xs text-blue-600 mt-1">{{ stats.lowStockProducts }} com estoque baixo</div>
      </div>

      <!-- Usuários Ativos -->
      <div class="elegant-border p-6 rounded-lg text-center hover:magic-glow transition-all">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/20">
          <Icon name="heroicons:users" class="h-6 w-6 text-purple-600" />
        </div>
        <div class="text-2xl font-bold text-purple-600 mb-1">{{ stats.activeUsers }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Usuários Ativos</div>
        <div class="text-xs text-purple-600 mt-1">{{ stats.newUsersThisMonth }} novos este mês</div>
      </div>
    </div>

    <!-- Ações rápidas e navegação -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Ações rápidas -->
      <div class="elegant-border p-6 rounded-lg">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Icon name="heroicons:bolt" class="h-5 w-5 mr-2 text-primary-600" />
          Ações Rápidas
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NuxtLink to="/dashboard/produtos/novo" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all group">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors mr-3">
              <Icon name="heroicons:plus" class="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Novo Produto</p>
              <p class="text-sm text-gray-500">Adicionar item</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/dashboard/pedidos" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all group">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors mr-3">
              <Icon name="heroicons:clipboard-document-list" class="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Gerenciar Pedidos</p>
              <p class="text-sm text-gray-500">{{ stats.pendingOrders }} pendentes</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/dashboard/usuarios" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all group">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors mr-3">
              <Icon name="heroicons:user-group" class="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Usuários</p>
              <p class="text-sm text-gray-500">Gerenciar contas</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/dashboard/configuracoes" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all group">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors mr-3">
              <Icon name="heroicons:cog-6-tooth" class="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Configurações</p>
              <p class="text-sm text-gray-500">Sistema</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Atividades recentes -->
      <div class="elegant-border p-6 rounded-lg">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Icon name="heroicons:clock" class="h-5 w-5 mr-2 text-primary-600" />
          Atividades Recentes
        </h2>
        
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" 
               class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div class="flex items-center justify-center w-8 h-8 rounded-full"
                 :class="getActivityIconClass(activity.type)">
              <Icon :name="getActivityIcon(activity.type)" class="h-4 w-4" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ activity.description }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatTimeAgo(activity.timestamp) }}
              </p>
            </div>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <NuxtLink to="/dashboard/atividades" 
                    class="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Ver todas as atividades →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Gráficos e relatórios -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Vendas por categoria -->
      <div class="elegant-border p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Vendas por Categoria
        </h3>
        <div class="space-y-3">
          <div v-for="category in salesByCategory" :key="category.name" 
               class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: category.color }"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ category.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ formatCurrency(category.value) }}
              </div>
              <div class="text-xs text-gray-500">{{ category.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Produtos mais vendidos -->
      <div class="elegant-border p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Produtos Mais Vendidos
        </h3>
        <div class="space-y-3">
          <div v-for="product in topProducts" :key="product.id" 
               class="flex items-center space-x-3">
            <img :src="product.image" :alt="product.name" 
                 class="w-10 h-10 rounded-lg object-cover" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ product.name }}
              </p>
              <p class="text-xs text-gray-500">{{ product.sales }} vendas</p>
            </div>
            <div class="text-sm font-medium text-primary-600">
              {{ formatCurrency(product.revenue) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Status do sistema -->
      <div class="elegant-border p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Status do Sistema
        </h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700 dark:text-gray-300">Status do Servidor</span>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <div class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
              Online
            </span>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700 dark:text-gray-300">Backup</span>
            <span class="text-xs text-gray-500">Última: {{ formatDate(lastBackup) }}</span>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700 dark:text-gray-300">Atualizações</span>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Atualizado
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

// Composables
const { user } = useAuth()

// Estado reativo
const stats = ref({
  totalSales: 15430.50,
  pendingOrders: 8,
  totalProducts: 156,
  lowStockProducts: 12,
  activeUsers: 234,
  newUsersThisMonth: 28
})

const lastLogin = ref(new Date().toISOString())
const lastBackup = ref(new Date().toISOString())

const recentActivities = ref([
  {
    id: 1,
    type: 'order',
    description: 'Novo pedido #ORD-2024-154 recebido',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: 2,
    type: 'product',
    description: 'Produto "Cristal de Ametista" foi atualizado',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: 3,
    type: 'user',
    description: 'Novo usuário se cadastrou: maria@exemplo.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: 4,
    type: 'system',
    description: 'Backup automático realizado com sucesso',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
  }
])

const salesByCategory = ref([
  { name: 'Cristais', value: 4250.00, percentage: 35, color: '#8B5CF6' },
  { name: 'Velas', value: 3180.00, percentage: 26, color: '#06B6D4' },
  { name: 'Incensos', value: 2440.00, percentage: 20, color: '#10B981' },
  { name: 'Tarot', value: 1560.00, percentage: 13, color: '#F59E0B' },
  { name: 'Outros', value: 750.00, percentage: 6, color: '#6B7280' }
])

const topProducts = ref([
  {
    id: 1,
    name: 'Cristal de Quartzo Rosa',
    image: '/produtos/quartzo-rosa.jpg',
    sales: 45,
    revenue: 4050.00
  },
  {
    id: 2,
    name: 'Vela Aromática Lavanda',
    image: '/produtos/vela-lavanda.jpg',
    sales: 38,
    revenue: 1140.00
  },
  {
    id: 3,
    name: 'Tarot dos Anjos',
    image: '/produtos/tarot-anjos.jpg',
    sales: 22,
    revenue: 1980.00
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

const formatDateTime = (date: Date | string) => {
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

const formatTimeAgo = (timestamp: string) => {
  const now = new Date()
  const past = new Date(timestamp)
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Agora mesmo'
  if (diffInMinutes < 60) return `${diffInMinutes}m atrás`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h atrás`
  
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d atrás`
}

const getActivityIcon = (type: string) => {
  const icons = {
    order: 'heroicons:shopping-bag',
    product: 'heroicons:cube',
    user: 'heroicons:user-plus',
    system: 'heroicons:cog-6-tooth'
  }
  return icons[type as keyof typeof icons] || 'heroicons:information-circle'
}

const getActivityIconClass = (type: string) => {
  const classes = {
    order: 'bg-green-100 text-green-600 dark:bg-green-900/20',
    product: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20',
    user: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20',
    system: 'bg-gray-100 text-gray-600 dark:bg-gray-700'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-600'
}

// Lifecycle
onMounted(() => {
  // Carregar dados em tempo real (substituir por API real)
  console.log('Admin dashboard carregado')
})
</script>