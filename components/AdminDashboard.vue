<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold tracking-tight">Painel Administrativo</h1>
      <div class="flex items-center gap-2">
        <Badge variant="outline" class="text-green-600 border-green-600">
          <Shield class="w-3 h-3 mr-1" />
          Admin
        </Badge>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Produtos Total</CardTitle>
          <Package class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.total }}</div>
          <p class="text-xs text-muted-foreground">
            +12% desde o mês passado
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Categorias</CardTitle>
          <Folder class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.categories }}</div>
          <p class="text-xs text-muted-foreground">
            4 categorias ativas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Usuários</CardTitle>
          <Users class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ mockUsers.length }}</div>
          <p class="text-xs text-muted-foreground">
            {{ mockUsers.filter(u => u.role === 'admin').length }} admins, 
            {{ mockUsers.filter(u => u.role === 'customer').length }} clientes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Status</CardTitle>
          <Activity class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-green-600">Online</div>
          <p class="text-xs text-muted-foreground">
            Todos os serviços funcionando
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Ações Rápidas Admin -->
    <div class="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-lg sm:text-xl">
            <Settings class="w-5 h-5" />
            Ações Administrativas
          </CardTitle>
          <CardDescription>
            Gerenciar produtos, usuários e configurações do sistema
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-3">
          <NuxtLink to="/dashboard/produtos">
            <Button class="w-full justify-start" variant="outline">
              <Package class="w-4 h-4 mr-2" />
              Gerenciar Produtos
            </Button>
          </NuxtLink>
          <Button class="w-full justify-start" variant="outline" @click="showUserModal = true">
            <Users class="w-4 h-4 mr-2" />
            Visualizar Usuários
          </Button>
          <Button class="w-full justify-start" variant="outline">
            <BarChart3 class="w-4 h-4 mr-2" />
            Relatórios e Analytics
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Clock class="w-5 h-5" />
            Atividade Recente
          </CardTitle>
          <CardDescription>
            Últimas ações no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-3 text-sm">
            <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Login realizado por {{ user?.name }}</span>
              </div>
              <span class="text-xs text-muted-foreground">Agora</span>
            </div>
            <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Sistema iniciado</span>
              </div>
              <span class="text-xs text-muted-foreground">2 min</span>
            </div>
            <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>{{ stats.total }} produtos carregados</span>
              </div>
              <span class="text-xs text-muted-foreground">5 min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Modal de Usuários -->
    <div v-if="showUserModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card class="w-full max-w-2xl mx-4">
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>Usuários do Sistema</CardTitle>
            <Button variant="ghost" size="sm" @click="showUserModal = false">
              <X class="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Lista de todos os usuários cadastrados no sistema (Mock Database)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div 
              v-for="mockUser in mockUsers" 
              :key="mockUser.email"
              class="flex items-center justify-between p-3 rounded-lg border"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User class="w-4 h-4" />
                </div>
                <div>
                  <p class="font-medium">{{ mockUser.name }}</p>
                  <p class="text-sm text-muted-foreground">{{ mockUser.email }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <Badge :variant="mockUser.role === 'admin' ? 'default' : 'secondary'">
                  {{ mockUser.role === 'admin' ? 'Admin' : 'Cliente' }}
                </Badge>
                <div class="text-xs text-muted-foreground">
                  {{ mockUser.permissions.length }} permissões
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { MOCK_USERS } from '@/lib/users'
import { 
  Package, 
  Folder, 
  Users, 
  Activity, 
  Settings, 
  Clock, 
  Shield, 
  BarChart3, 
  User, 
  X 
} from 'lucide-vue-next'

interface Props {
  stats: {
    total: number
    categories: number
  }
}

defineProps<Props>()

const { user } = useAuth()
const showUserModal = ref(false)
const mockUsers = MOCK_USERS
</script>