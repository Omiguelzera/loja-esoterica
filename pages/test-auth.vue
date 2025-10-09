<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        🧪 Teste de Sincronização de Autenticação
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Status do Estado -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📊 Estado Atual
          </h2>
          
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
              <span class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="isLoggedIn ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'">
                {{ isLoggedIn ? '✅ Logado' : '❌ Não Logado' }}
              </span>
            </div>
            
            <div v-if="user" class="space-y-2">
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Nome:</span>
                <span class="text-sm text-gray-900 dark:text-white">{{ user.name }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Email:</span>
                <span class="text-sm text-gray-900 dark:text-white">{{ user.email }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Role:</span>
                <span class="px-2 py-1 rounded-full text-xs font-medium"
                      :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'">
                  {{ user.role === 'admin' ? '👑 Admin' : '👤 Cliente' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ações de Teste -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🎛️ Ações de Teste
          </h2>
          
          <div class="space-y-4">
            <button v-if="!isLoggedIn" 
                    @click="testLogin('admin')"
                    class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              🔑 Login como Admin
            </button>
            
            <button v-if="!isLoggedIn"
                    @click="testLogin('customer')"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              🔑 Login como Cliente
            </button>
            
            <button v-if="isLoggedIn"
                    @click="testLogout"
                    class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              🚪 Fazer Logout
            </button>
            
            <button @click="forceSync"
                    class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              🔄 Forçar Sincronização
            </button>
          </div>
        </div>
      </div>

      <!-- Log de Eventos -->
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          📋 Log de Eventos
        </h2>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
          <div v-if="eventLog.length === 0" class="text-gray-500 dark:text-gray-400 text-sm">
            Nenhum evento registrado ainda...
          </div>
          <div v-else class="space-y-1">
            <div v-for="(event, index) in eventLog" :key="index"
                 class="text-xs font-mono text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-1">
              <span class="text-gray-500">[{{ event.timestamp }}]</span>
              <span class="ml-2">{{ event.message }}</span>
            </div>
          </div>
        </div>
        
        <button @click="clearLog"
                class="mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          🗑️ Limpar Log
        </button>
      </div>

      <!-- Instruções -->
      <div class="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          📖 Como Testar a Sincronização
        </h3>
        <ol class="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
          <li>Abra esta página em múltiplas abas</li>
          <li>Faça login em uma aba usando os botões acima</li>
          <li>Observe se o status muda automaticamente em todas as abas</li>
          <li>Teste o logout e verifique a sincronização</li>
          <li>Verifique também o Header e Sidebar da página principal</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useAuth, type User } from '@/composables/useAuth'

// Meta da página
definePageMeta({
  layout: 'default'
})

const { isLoggedIn, user, login, logout, forceSync } = useAuth()

// Log de eventos
const eventLog = ref<Array<{ timestamp: string, message: string }>>([])

const addLogEvent = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLog.value.unshift({ timestamp, message })
  
  // Manter apenas os últimos 50 eventos
  if (eventLog.value.length > 50) {
    eventLog.value = eventLog.value.slice(0, 50)
  }
}

const clearLog = () => {
  eventLog.value = []
}

// Função para testar login
const testLogin = async (role: 'admin' | 'customer') => {
  const userData: User = {
    id: `test-${role}-${Date.now()}`,
    name: role === 'admin' ? 'Admin Master' : 'Cliente Teste',
    email: role === 'admin' ? 'admin@loja.com' : 'cliente@teste.com',
    role,
    permissions: role === 'admin' ? ['dashboard.view', 'users.manage'] : ['profile.view'],
    avatar: `/avatars/${role}.svg`
  }
  
  addLogEvent(`🔑 Tentativa de login como ${role}`)
  login(userData, false)
  addLogEvent(`✅ Login realizado: ${userData.name}`)
}

// Função para testar logout
const testLogout = () => {
  addLogEvent('🚪 Tentativa de logout')
  logout()
  addLogEvent('✅ Logout realizado')
}

// Watchers para monitorar mudanças
watch(isLoggedIn, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    addLogEvent(`📊 Estado de login mudou: ${oldValue} → ${newValue}`)
  }
})

watch(user, (newValue, oldValue) => {
  if (newValue?.id !== oldValue?.id) {
    if (newValue) {
      addLogEvent(`👤 Usuário mudou: ${newValue.name} (${newValue.role})`)
    } else {
      addLogEvent('👤 Usuário removido')
    }
  }
}, { deep: true })

// Listener para eventos de storage
onMounted(() => {
  if (process.client) {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isLoggedIn' || event.key === 'user') {
        addLogEvent(`💾 Storage mudou: ${event.key}`)
      }
    }
    
    const handleAuthChange = (event: CustomEvent) => {
      addLogEvent('🔄 Evento auth-changed recebido')
    }
    
    const handleAuthSync = (event: CustomEvent) => {
      addLogEvent('⚡ Evento auth-sync recebido')
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('auth-changed', handleAuthChange as EventListener)
    window.addEventListener('auth-sync', handleAuthSync as EventListener)
    
    addLogEvent('🚀 Página de teste iniciada')
  }
})
</script>