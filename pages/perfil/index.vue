<template>
  <div class="space-y-8">
    <!-- Cabeçalho do perfil -->
    <div class="elegant-border p-6 rounded-lg">
      <div class="flex items-center space-x-6">
        <div class="relative">
          <img
            :src="user?.avatar || '/avatars/default.jpg'"
            :alt="user?.name"
            class="w-20 h-20 rounded-full object-cover elegant-border"
          />
          <div class="absolute -bottom-2 -right-2 elegant-border rounded-full p-2 bg-white dark:bg-gray-800">
            <Icon :name="user?.role === 'admin' ? 'heroicons:shield-check' : 'heroicons:user'" 
                  class="h-4 w-4 text-primary-600" />
          </div>
        </div>
        
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ user?.name }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400">{{ user?.email }}</p>
          <div class="flex items-center mt-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="user?.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'">
              <Icon :name="user?.role === 'admin' ? 'heroicons:shield-check' : 'heroicons:user'" 
                    class="h-3 w-3 mr-1" />
              {{ user?.role === 'admin' ? 'Administrador' : 'Cliente' }}
            </span>
          </div>
        </div>
        
        <div class="text-right">
          <NuxtLink to="/perfil/editar" 
                    class="mystic-button inline-flex items-center px-4 py-2 text-sm">
            <Icon name="heroicons:pencil" class="h-4 w-4 mr-2" />
            Editar Perfil
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Cards de informações -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Informações pessoais -->
      <div class="elegant-border p-6 rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Informações Pessoais
          </h2>
          <Icon name="heroicons:identification" class="h-5 w-5 text-primary-600" />
        </div>
        <div class="space-y-3">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Nome Completo</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ user?.name }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ user?.email }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Membro desde</p>
            <p class="font-medium text-gray-900 dark:text-white">Janeiro 2025</p>
          </div>
        </div>
      </div>

      <!-- Permissões -->
      <div class="elegant-border p-6 rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Permissões
          </h2>
          <Icon name="heroicons:key" class="h-5 w-5 text-primary-600" />
        </div>
        <div class="space-y-2">
          <div v-for="permission in user?.permissions" :key="permission" 
               class="flex items-center text-sm">
            <Icon name="heroicons:check-circle" class="h-4 w-4 text-green-500 mr-2" />
            <span class="text-gray-700 dark:text-gray-300">
              {{ getPermissionLabel(permission) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Estatísticas (apenas para clientes) -->
      <div v-if="user?.role === 'customer'" class="elegant-border p-6 rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Estatísticas
          </h2>
          <Icon name="heroicons:chart-bar" class="h-5 w-5 text-primary-600" />
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Pedidos Realizados</span>
            <span class="font-semibold text-primary-600">12</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Total Gasto</span>
            <span class="font-semibold text-primary-600">R$ 2.340,00</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Último Pedido</span>
            <span class="font-semibold text-gray-900 dark:text-white">15/12/2024</span>
          </div>
        </div>
      </div>

      <!-- Resumo Admin (apenas para admins) -->
      <div v-if="user?.role === 'admin'" class="elegant-border p-6 rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Resumo Admin
          </h2>
          <Icon name="heroicons:cog-6-tooth" class="h-5 w-5 text-primary-600" />
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Produtos Cadastrados</span>
            <span class="font-semibold text-primary-600">156</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Pedidos Pendentes</span>
            <span class="font-semibold text-yellow-600">8</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Usuários Ativos</span>
            <span class="font-semibold text-green-600">234</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Ações rápidas -->
    <div class="elegant-border p-6 rounded-lg">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Ações Rápidas
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Para clientes -->
        <template v-if="user?.role === 'customer'">
          <NuxtLink to="/pedidos" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all">
            <Icon name="heroicons:shopping-bag" class="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Meus Pedidos</p>
              <p class="text-sm text-gray-500">Ver histórico</p>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/produtos" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all">
            <Icon name="heroicons:sparkles" class="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Produtos</p>
              <p class="text-sm text-gray-500">Explorar loja</p>
            </div>
          </NuxtLink>
        </template>

        <!-- Para admins -->
        <template v-if="user?.role === 'admin'">
          <NuxtLink to="/dashboard" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all">
            <Icon name="heroicons:squares-2x2" class="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Dashboard</p>
              <p class="text-sm text-gray-500">Painel admin</p>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/dashboard/produtos" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all">
            <Icon name="heroicons:cube" class="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Produtos</p>
              <p class="text-sm text-gray-500">Gerenciar</p>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/dashboard/pedidos" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all">
            <Icon name="heroicons:clipboard-document-list" class="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Pedidos</p>
              <p class="text-sm text-gray-500">Gerenciar</p>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/dashboard/usuarios" 
                    class="flex items-center p-4 elegant-border rounded-lg hover:magic-glow transition-all">
            <Icon name="heroicons:users" class="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Usuários</p>
              <p class="text-sm text-gray-500">Gerenciar</p>
            </div>
          </NuxtLink>
        </template>

        <!-- Ação comum - Logout -->
        <button @click="handleLogout"
                class="flex items-center p-4 elegant-border rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
          <Icon name="heroicons:arrow-right-on-rectangle" class="h-8 w-8 text-red-600 mr-3" />
          <div>
            <p class="font-medium text-red-700 dark:text-red-400">Sair</p>
            <p class="text-sm text-red-500">Fazer logout</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useToasts } from '@/composables/useToasts'

// Meta da página
definePageMeta({
  middleware: 'auth'
})

// Composables
const router = useRouter()
const { user, logout } = useAuth()
const { success: showSuccessToast } = useToasts()

// Função para traduzir permissões
const getPermissionLabel = (permission: string): string => {
  const labels: Record<string, string> = {
    'dashboard.view': 'Visualizar Dashboard',
    'users.manage': 'Gerenciar Usuários',
    'products.manage': 'Gerenciar Produtos',
    'orders.manage': 'Gerenciar Pedidos',
    'profile.view': 'Visualizar Perfil',
    'orders.view': 'Visualizar Pedidos'
  }
  return labels[permission] || permission
}

// Handler para logout
const handleLogout = async () => {
  logout()
  
  showSuccessToast(
    'Logout realizado',
    'Você foi desconectado com sucesso'
  )
  
  await router.push('/auth/login')
}

// Atualizar título da página
useHead({
  title: 'Meu Perfil - Loja Esotérica'
})
</script>