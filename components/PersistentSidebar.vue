<template>
  <div>
    <aside 
      id="persistent-sidebar"
      class="fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 subtle-glow overflow-y-auto transition-all duration-500 ease-in-out"
      :style="{ width: sidebarWidth }"
    >
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 crystal-border flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
            <span class="text-white font-bold text-lg">⟡</span>
          </div>
          <div class="hidden sm:block">
            <h2 class="font-bold text-gray-900 dark:text-white text-lg">Loja Esotérica</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Portal Místico</p>
          </div>
        </div>
      </div>
      
      <div class="flex-1 p-4">
        <div v-if="!isLoggedIn" class="mb-6">
          <button 
            @click="showLoginModal = true"
            class="w-full mystic-button flex items-center justify-center gap-3 group"
          >
            <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="hidden sm:inline">Entrar</span>
          </button>
        </div>

        <div class="mb-6">
          <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 opacity-80 hidden sm:block">
            Loja
          </h3>
          <nav class="space-y-2">
            <NuxtLink 
              to="/produtos" 
              class="elegant-border flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <svg class="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span class="hidden sm:inline">Produtos</span>
              <span class="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 opacity-60">⟡</span>
            </NuxtLink>
            <NuxtLink 
              to="/carrinho" 
              class="elegant-border flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <svg class="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18M7 18v-2m10 2v-2" />
              </svg>
              <span class="hidden sm:inline">Carrinho</span>
              <span class="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 opacity-60">◊</span>
            </NuxtLink>
          </nav>
        </div>

        <div v-if="isLoggedIn">
          <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 opacity-80 hidden sm:block">
            Minha Conta
          </h3>
          <nav class="space-y-2 mb-6">
            <NuxtLink 
              to="/minha-conta" 
              class="elegant-border flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <svg class="w-5 h-5 text-emerald-500 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="hidden sm:inline">Minha Conta</span>
              <span class="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 opacity-60">☾</span>
            </NuxtLink>
            <NuxtLink 
              to="/pedidos" 
              class="elegant-border flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <svg class="w-5 h-5 text-amber-500 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span class="hidden sm:inline">Pedidos</span>
              <span class="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 opacity-60">◈</span>
            </NuxtLink>
          </nav>

          <div v-if="isAdmin">
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 opacity-80 hidden sm:block">
              Administração
            </h3>
            <nav class="space-y-2 mb-6">
              <NuxtLink 
                to="/dashboard" 
                class="elegant-border flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <svg class="w-5 h-5 text-violet-500 group-hover:text-violet-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="hidden sm:inline">Dashboard</span>
                <span class="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 opacity-60">⬟</span>
              </NuxtLink>
            </nav>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
            <button 
              @click="logout"
              class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-3 group hover:shadow-lg"
            >
              <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <div 
      v-if="showLoginModal" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
      @click.self="closeLoginModal"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="text-indigo-500">⟡</span>
            Portal de Entrada
          </h3>
          <button 
            @click="closeLoginModal"
            class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
          
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              id="email"
              v-model="loginForm.email"
              type="email"
              required
              class="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Senha</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              required
              class="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
          
          <div v-if="loginError" class="text-red-600 dark:text-red-400 text-sm p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            ⚠️ {{ loginError }}
          </div>
          
          <button 
            type="submit"
            :disabled="isLoggingIn"
            class="w-full mystic-button text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoggingIn ? 'Conectando...' : 'Entrar no Portal' }}
          </button>
        </form>
        
        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">Credenciais de Demonstração</p>
          <div class="text-xs text-gray-600 dark:text-gray-300 space-y-2">
            <div class="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <strong class="text-indigo-600 dark:text-indigo-400">⟡ Admin:</strong> admin@loja.com / 123456
            </div>
            <div class="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <strong class="text-purple-600 dark:text-purple-400">◊ Cliente:</strong> cliente@teste.com / 123456
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import { useAuth, type User } from '@/composables/useAuth'
import { useSidebar } from '@/composables/useSidebar'

const { sidebarWidth } = useSidebar()
const { user, isLoggedIn, login, logout: authLogout, isAdmin } = useAuth()

const showLoginModal = ref(false)
const isLoggingIn = ref(false)
const loginError = ref('')

const loginForm = reactive({
  email: '',
  password: ''
})

// Usar as mesmas credenciais do sistema principal
const validCredentials = {
  'admin@loja.com': { password: '123456', role: 'admin' as const, name: 'Admin Master' },
  'cliente@teste.com': { password: '123456', role: 'customer' as const, name: 'Cliente Teste' }
}

const closeLoginModal = () => {
  showLoginModal.value = false
  loginForm.email = ''
  loginForm.password = ''
  loginError.value = ''
}

// Usar a mesma lógica de autenticação do sistema principal
const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Usuários de exemplo (mesmos da página de login)
  const users = {
    admin: {
      id: '1',
      name: 'Admin Master',
      email: 'admin@loja.com',
      role: 'admin' as const,
      permissions: ['dashboard.view', 'users.manage', 'products.manage', 'orders.manage'],
      avatar: '/avatars/admin.svg'
    },
    customer: {
      id: '2',
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      role: 'customer' as const,
      permissions: ['profile.view', 'orders.view'],
      avatar: '/avatars/customer.svg'
    }
  }

  // Verificação simples para demo (mesma lógica do login principal)
  if (email === 'admin@loja.com' && password === '123456') {
    return users.admin
  }
  
  if (email === 'cliente@teste.com' && password === '123456') {
    return users.customer
  }

  return null
}

const handleLogin = async () => {
  isLoggingIn.value = true
  loginError.value = ''
  
  try {
    const authenticatedUser = await authenticateUser(loginForm.email, loginForm.password)
    
    if (authenticatedUser) {
      login(authenticatedUser, false) // Usar o composable useAuth
      closeLoginModal()
      
      // Forçar sincronização
      await nextTick()
      if (process.client) {
        window.dispatchEvent(new CustomEvent('auth-sync', { 
          detail: { isLoggedIn: true, user: authenticatedUser } 
        }))
      }
    } else {
      loginError.value = 'Email ou senha incorretos'
    }
  } catch (error) {
    console.error('Erro no login:', error)
    loginError.value = 'Erro interno do servidor. Tente novamente.'
  } finally {
    isLoggingIn.value = false
  }
}

const logout = () => {
  authLogout()
  
  // Forçar sincronização
  nextTick().then(() => {
    if (process.client) {
      window.dispatchEvent(new CustomEvent('auth-sync', { 
        detail: { isLoggedIn: false, user: null } 
      }))
    }
  })
}

// Forçar re-renderização quando o estado de autenticação mudar
watch(isLoggedIn, async (newValue) => {
  await nextTick()
  // Forçar atualização da UI se necessário
}, { immediate: true })

watch(user, async (newValue) => {
  await nextTick()
  // Forçar atualização da UI se necessário
}, { immediate: true, deep: true })
</script>
