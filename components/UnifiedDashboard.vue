<template>
  <div class="space-y-8">
    <!-- Cabeçalho com informações do usuário -->
    <DashboardHeader
      :title="headerTitle"
      :subtitle="headerSubtitle"
      :avatar="user?.avatar || defaultAvatar"
      :badge="userBadge"
      :meta="headerMeta"
      :variant="isAdmin ? 'admin' : 'customer'"
    />

    <!-- Cards de Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        v-for="stat in stats"
        :key="stat.label"
        :icon="stat.icon"
        :value="stat.value"
        :label="stat.label"
        :sublabel="stat.sublabel"
        :variant="stat.variant"
        :format="stat.format"
      />
    </div>

    <!-- Seções principais -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Ações Rápidas -->
      <SectionCard
        title="Ações Rápidas"
        icon="heroicons:bolt"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickActionCard
            v-for="action in quickActions"
            :key="action.to"
            :to="action.to"
            :icon="action.icon"
            :title="action.title"
            :subtitle="action.subtitle"
            :variant="action.variant"
          />
        </div>
      </SectionCard>

      <!-- Atividades Recentes / Últimos Pedidos -->
      <SectionCard
        :title="activityTitle"
        :icon="activityIcon"
        :view-all-link="activityViewAllLink"
      >
        <div class="space-y-4">
          <div 
            v-for="activity in recentActivities" 
            :key="activity.id" 
            class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div 
              class="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
              :class="activity.iconBg"
            >
              <Icon :name="activity.icon" class="h-4 w-4" :class="activity.iconColor" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ activity.title }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ activity.description }}
              </p>
            </div>
            <span class="text-xs text-gray-400 whitespace-nowrap">
              {{ activity.time }}
            </span>
          </div>
          
          <div v-if="!recentActivities.length" class="text-center py-8 text-gray-500 dark:text-gray-400">
            Nenhuma atividade recente
          </div>
        </div>
      </SectionCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

interface Stat {
  icon: string
  value: number | string
  label: string
  sublabel?: string
  variant: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'yellow'
  format?: 'number' | 'currency'
}

interface QuickAction {
  to: string
  icon: string
  title: string
  subtitle: string
  variant: 'primary' | 'success' | 'warning' | 'purple' | 'gray'
}

interface Activity {
  id: string
  icon: string
  iconBg: string
  iconColor: string
  title: string
  description: string
  time: string
}

const { user } = useAuth()

const isAdmin = computed(() => user.value?.role === 'admin')

// Cabeçalho
const headerTitle = computed(() => 
  isAdmin.value ? `Bem-vindo, ${user.value?.name}` : `Olá, ${user.value?.name}!`
)

const headerSubtitle = computed(() => 
  isAdmin.value 
    ? `Painel Administrativo - ${formatDate(new Date())}` 
    : `Bem-vindo à sua conta - ${formatDate(new Date())}`
)

const defaultAvatar = computed(() => 
  isAdmin.value ? '/avatars/admin.svg' : '/avatars/customer.svg'
)

const userBadge = computed(() => 
  isAdmin.value 
    ? {
        icon: 'heroicons:shield-check',
        text: 'Administrador',
        colorClass: 'text-purple-600',
        bgClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      }
    : {
        icon: 'heroicons:star',
        text: 'Cliente VIP',
        colorClass: 'text-blue-600',
        bgClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      }
)

const headerMeta = computed(() => 
  isAdmin.value 
    ? {
        label: 'Último acesso',
        value: formatDateTime(new Date())
      }
    : {
        label: 'Membro desde',
        value: 'Janeiro 2025'
      }
)

// Estatísticas - Admin
const adminStats: Stat[] = [
  {
    icon: 'heroicons:currency-dollar',
    value: 5247.80,
    label: 'Vendas no Mês',
    sublabel: '+12% vs mês anterior',
    variant: 'success',
    format: 'currency'
  },
  {
    icon: 'heroicons:clock',
    value: 8,
    label: 'Pedidos Pendentes',
    sublabel: 'Requer atenção',
    variant: 'warning'
  },
  {
    icon: 'heroicons:cube',
    value: 156,
    label: 'Produtos Ativos',
    sublabel: '12 com estoque baixo',
    variant: 'primary'
  },
  {
    icon: 'heroicons:users',
    value: 234,
    label: 'Usuários Ativos',
    sublabel: '18 novos este mês',
    variant: 'purple'
  }
]

// Estatísticas - Customer
const customerStats: Stat[] = [
  {
    icon: 'heroicons:shopping-bag',
    value: 12,
    label: 'Pedidos Realizados',
    sublabel: '2 pendentes',
    variant: 'primary'
  },
  {
    icon: 'heroicons:currency-dollar',
    value: 1247.50,
    label: 'Total Gasto',
    sublabel: 'Economizou R$ 185,20',
    variant: 'success',
    format: 'currency'
  },
  {
    icon: 'heroicons:heart',
    value: 8,
    label: 'Produtos Favoritos',
    sublabel: 'Lista de desejos',
    variant: 'purple'
  },
  {
    icon: 'heroicons:gift',
    value: 420,
    label: 'Pontos de Fidelidade',
    sublabel: 'Use nos próximos pedidos',
    variant: 'yellow'
  }
]

const stats = computed(() => isAdmin.value ? adminStats : customerStats)

// Ações Rápidas - Admin
const adminActions: QuickAction[] = [
  {
    to: '/dashboard/produtos/novo',
    icon: 'heroicons:plus',
    title: 'Novo Produto',
    subtitle: 'Adicionar item',
    variant: 'success'
  },
  {
    to: '/dashboard/pedidos',
    icon: 'heroicons:clipboard-document-list',
    title: 'Gerenciar Pedidos',
    subtitle: '8 pendentes',
    variant: 'primary'
  },
  {
    to: '/dashboard/usuarios',
    icon: 'heroicons:user-group',
    title: 'Usuários',
    subtitle: 'Gerenciar contas',
    variant: 'purple'
  },
  {
    to: '/dashboard/configuracoes',
    icon: 'heroicons:cog-6-tooth',
    title: 'Configurações',
    subtitle: 'Sistema',
    variant: 'gray'
  }
]

// Ações Rápidas - Customer
const customerActions: QuickAction[] = [
  {
    to: '/produtos',
    icon: 'heroicons:sparkles',
    title: 'Explorar Produtos',
    subtitle: 'Novidades disponíveis',
    variant: 'primary'
  },
  {
    to: '/pedidos',
    icon: 'heroicons:clipboard-document-list',
    title: 'Meus Pedidos',
    subtitle: '2 pendentes',
    variant: 'success'
  },
  {
    to: '/favoritos',
    icon: 'heroicons:heart',
    title: 'Favoritos',
    subtitle: '8 produtos',
    variant: 'purple'
  },
  {
    to: '/minha-conta/editar',
    icon: 'heroicons:user-circle',
    title: 'Editar Perfil',
    subtitle: 'Atualizar dados',
    variant: 'gray'
  }
]

const quickActions = computed(() => isAdmin.value ? adminActions : customerActions)

// Atividades Recentes
const activityTitle = computed(() => 
  isAdmin.value ? 'Atividades Recentes' : 'Últimos Pedidos'
)

const activityIcon = computed(() => 
  isAdmin.value ? 'heroicons:clock' : 'heroicons:shopping-bag'
)

const activityViewAllLink = computed(() => 
  isAdmin.value ? undefined : '/pedidos'
)

// Atividades - Admin
const adminActivities: Activity[] = [
  {
    id: '1',
    icon: 'heroicons:user-plus',
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600',
    title: 'Novo usuário cadastrado',
    description: 'Maria Silva criou uma conta',
    time: '5 min'
  },
  {
    id: '2',
    icon: 'heroicons:shopping-cart',
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600',
    title: 'Novo pedido recebido',
    description: 'Pedido #1234 - R$ 89,90',
    time: '15 min'
  },
  {
    id: '3',
    icon: 'heroicons:cube',
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600',
    title: 'Produto atualizado',
    description: 'Cristal Ametista - estoque atualizado',
    time: '1 hora'
  }
]

// Atividades - Customer (Pedidos)
const customerActivities: Activity[] = [
  {
    id: '1',
    icon: 'heroicons:truck',
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600',
    title: 'Pedido #1234 - Em trânsito',
    description: 'Previsão de entrega: 2 dias',
    time: '1 dia'
  },
  {
    id: '2',
    icon: 'heroicons:check-circle',
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600',
    title: 'Pedido #1233 - Entregue',
    description: 'R$ 157,60',
    time: '3 dias'
  },
  {
    id: '3',
    icon: 'heroicons:clock',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/20',
    iconColor: 'text-yellow-600',
    title: 'Pedido #1232 - Processando',
    description: 'R$ 89,90',
    time: '5 dias'
  }
]

const recentActivities = computed(() => 
  isAdmin.value ? adminActivities : customerActivities
)

// Funções auxiliares
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>
