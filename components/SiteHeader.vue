<template>
  <header 
    class="header-mystic sticky top-0 z-[60] transition-all duration-500 ease-in-out magic-glow"
    :style="{ marginLeft: sidebarWidth }"
  >
    <div class="container mx-auto flex items-center h-14 sm:h-16 lg:h-18 gap-2 sm:gap-4 px-3 sm:px-6">
      <NuxtLink to="/" class="mystic-link font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl px-2 py-1 crystal-border magic-glow-hover">
        <span class="text-base sm:text-lg lg:text-xl text-white text-glow-purple">
          🔮 {{ t('storeName') }}
        </span>
      </NuxtLink>
      <nav class="hidden md:flex items-center gap-2 lg:gap-4 text-sm lg:text-base">
        <NuxtLink to="/produtos" class="mystic-link text-slate-200 font-medium px-3 py-1 rounded-lg crystal-border magic-glow-hover transition-all duration-300">
          ✨ Produtos
        </NuxtLink>
        <NuxtLink to="/categorias/incensos" class="mystic-link text-slate-200 px-3 py-1 rounded-lg crystal-border magic-glow-hover transition-all duration-300">
          🕯️ Incensos
        </NuxtLink>
        <NuxtLink to="/categorias/cristais" class="mystic-link text-slate-200 px-3 py-1 rounded-lg crystal-border magic-glow-hover transition-all duration-300">
          💎 Cristais
        </NuxtLink>
        <NuxtLink to="/categorias/tarot" class="mystic-link text-slate-200 px-3 py-1 rounded-lg crystal-border magic-glow-hover transition-all duration-300">
          🃏 Tarot
        </NuxtLink>
      </nav>
      <div class="ml-auto flex items-center gap-2 sm:gap-3">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="crystal-border magic-glow-hover inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 h-8 w-8 sm:h-9 sm:w-9 text-slate-200 hover:text-white group"
          :aria-label="themeLabel"
        >
          <svg v-if="isDark" class="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="h-3 w-3 sm:h-4 sm:w-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        <button 
          @click="toggleLocale" 
          class="crystal-border magic-glow-hover px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-slate-200 hover:text-white rounded-lg transition-all duration-300 hidden sm:inline-flex"
          aria-label="Mudar idioma"
        >
          🌍 {{ locale === 'pt' ? 'EN' : 'PT' }}
        </button>
        <NuxtLink 
          to="/carrinho" 
          class="crystal-border magic-glow-hover relative inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-300 group" 
          aria-label="Ir para carrinho de compras"
        >
          <div class="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white">
            <svg class="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18M7 18v-2m10 2v-2" />
            </svg>
            <span class="hidden sm:inline">{{ t('cart') }}</span>
            <span v-if="totalItems > 0" class="mystic-pulse ml-1 inline-flex items-center justify-center text-[10px] sm:text-xs font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white w-4 h-4 sm:w-5 sm:h-5 shadow-lg">
              {{ totalItems }}
            </span>
          </div>
        </NuxtLink>

        <!-- Menu do usuário -->
        <div class="relative" v-if="isLoggedIn">
          <button
            @click="showUserMenu = !showUserMenu"
            class="crystal-border magic-glow-hover flex items-center space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-300 group"
            :class="{ 'magic-glow': showUserMenu }"
          >
            <img
              :src="user?.avatar || '/avatars/default.svg'"
              :alt="user?.name"
              class="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-purple-400"
            />
            <span class="hidden md:inline text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white">
              {{ user?.name?.split(' ')[0] }}
            </span>
            <Icon name="heroicons:chevron-down" 
                  class="h-3 w-3 text-slate-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showUserMenu }" />
          </button>

          <!-- Dropdown menu -->
          <div v-if="showUserMenu" 
               class="absolute right-0 mt-2 w-48 crystal-border rounded-lg shadow-lg py-2 z-50 dropdown-mystic">
            <NuxtLink to="/minha-conta" 
                      @click="showUserMenu = false"
                      class="flex items-center px-4 py-2 text-sm text-slate-200 hover:text-white hover:magic-glow transition-all">
              <Icon name="heroicons:user-circle" class="h-4 w-4 mr-3 text-purple-400" />
              Minha Conta
            </NuxtLink>
            
            <NuxtLink v-if="user?.role === 'customer'" 
                      to="/pedidos" 
                      @click="showUserMenu = false"
                      class="flex items-center px-4 py-2 text-sm text-slate-200 hover:text-white hover:magic-glow transition-all">
              <Icon name="heroicons:shopping-bag" class="h-4 w-4 mr-3 text-blue-400" />
              Meus Pedidos
            </NuxtLink>
            
            <NuxtLink v-if="user?.role === 'admin'" 
                      to="/dashboard" 
                      @click="showUserMenu = false"
                      class="flex items-center px-4 py-2 text-sm text-slate-200 hover:text-white hover:magic-glow transition-all">
              <Icon name="heroicons:squares-2x2" class="h-4 w-4 mr-3 text-purple-400" />
              Dashboard Admin
            </NuxtLink>
            
            <NuxtLink to="/perfil/editar" 
                      @click="showUserMenu = false"
                      class="flex items-center px-4 py-2 text-sm text-slate-200 hover:text-white hover:magic-glow transition-all">
              <Icon name="heroicons:cog-6-tooth" class="h-4 w-4 mr-3 text-gray-400" />
              Configurações
            </NuxtLink>
            
            <hr class="my-2 border-slate-600" />
            
            <button @click="handleLogout" 
                    class="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:magic-glow transition-all">
              <Icon name="heroicons:arrow-right-on-rectangle" class="h-4 w-4 mr-3" />
              Sair
            </button>
          </div>
        </div>

        <!-- Botão de login (se não estiver logado) -->
        <button v-else
                @click="showLoginModal = true"
                class="crystal-border magic-glow-hover flex items-center space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-300 group">
          <Icon name="heroicons:user-circle" class="h-4 w-4 text-purple-400 group-hover:text-purple-300" />
          <span class="hidden sm:inline text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white">
            Entrar
          </span>
        </button>
      </div>
    </div>
  </header>

  <!-- Login Modal -->
  <div v-if="showLoginModal" class="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span class="text-indigo-500">⟡</span>
          Portal de Entrada
        </h3>
        <button @click="closeLoginModal" class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="header-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input id="header-email" v-model="form.email" type="email" required class="w-full mystic-input" placeholder="seu@email.com" />
        </div>

        <div>
          <label for="header-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Senha</label>
          <div class="relative">
            <input id="header-password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required class="w-full mystic-input pr-10" placeholder="••••••••" />
            <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div class="flex items-center justify-center space-x-4">
          <label class="flex items-center">
            <input v-model="form.userType" type="radio" value="customer" class="mr-2" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Cliente</span>
          </label>
          <label class="flex items-center">
            <input v-model="form.userType" type="radio" value="admin" class="mr-2" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Administrador</span>
          </label>
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input v-model="form.rememberMe" type="checkbox" class="mr-2" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Lembrar de mim</span>
          </label>
        </div>

        <div>
          <button type="submit" :disabled="loading" class="mystic-button w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white" :class="{'opacity-50 cursor-not-allowed': loading}">
            <Icon v-if="loading" name="heroicons:arrow-path" class="animate-spin h-5 w-5 mr-2" />
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </div>
      </form>

      <div v-if="generalError" class="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{{ generalError }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
<script setup lang="ts">
import { computed, ref, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { validateDemoLoginForm, authenticateUser } from '@/composables/useAuthDemo'

const router = useRouter()
const cart = useCartStore()
const totalItems = computed(() => cart.totalItems)
const { t, locale, setLocale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const { sidebarWidth } = useSidebar()
const { isLoggedIn, user, login, logout } = useAuth()
const { success: showSuccessToast, error: showErrorToast } = useToasts()

// Login modal state
const showLoginModal = ref(false)
const form = reactive({
  email: '',
  password: '',
  userType: 'customer' as 'customer' | 'admin',
  rememberMe: false
})
const loading = ref(false)
const showPassword = ref(false)
const generalError = ref('')

const closeLoginModal = () => {
  showLoginModal.value = false
  form.email = ''
  form.password = ''
  form.rememberMe = false
  generalError.value = ''
  loading.value = false
  showPassword.value = false
}

const validateForm = () => {
  const err = validateDemoLoginForm(form.email, form.password)
  generalError.value = err
  return err === ''
}

const handleLogin = async () => {
  if (!validateForm()) return
  loading.value = true

  try {
    const authenticated = await authenticateUser(form.email, form.password, form.userType as 'customer' | 'admin')
    if (authenticated) {
      login(authenticated, form.rememberMe)
      showSuccessToast('Login realizado', `Bem-vindo, ${authenticated.name}`)
      closeLoginModal()
      // Redirect based on role
      if (authenticated.role === 'admin') await router.push('/dashboard')
      else await router.push('/')
    } else {
      generalError.value = 'Email, senha ou tipo de usuário incorretos'
    }
  } catch (err) {
    console.error('Header login error', err)
    showErrorToast('Erro', 'Erro ao efetuar login')
    generalError.value = 'Internal error'
  } finally {
    loading.value = false
  }
}

// Estado local
const showUserMenu = ref(false)

const themeLabel = computed(() => isDark.value ? 'Mudar para modo claro' : 'Mudar para modo escuro')
const toggleLocale = () => setLocale(locale.value === 'pt' ? 'en' : 'pt')

// Handler para logout
const handleLogout = async () => {
  logout()
  showUserMenu.value = false
  
  // Forçar sincronização
  await nextTick()
  if (process.client) {
    window.dispatchEvent(new CustomEvent('auth-sync', { 
      detail: { isLoggedIn: false, user: null } 
    }))
  }
  
  showSuccessToast(
    'Logout realizado',
    'Você foi desconectado com sucesso'
  )
  
  await router.push('/')
}

// Fechar menu ao clicar fora
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// Listen for external requests to open the login modal (route query or custom event)
const route = useRoute()
const openLoginFromQuery = () => {
  if (process.client && route.query?.openLogin) {
    showLoginModal.value = true
    // remove query param without reloading
    const { openLogin, ...rest } = route.query as Record<string, any>
    router.replace({ path: route.path, query: rest })
  }
}

const handleOpenLoginEvent = () => {
  showLoginModal.value = true
}

onMounted(() => {
  openLoginFromQuery()
  if (process.client) window.addEventListener('open-login-modal', handleOpenLoginEvent)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Forçar re-renderização quando o estado de autenticação mudar
watch(isLoggedIn, async (newValue) => {
  await nextTick()
  // Fechar menu do usuário se fez logout
  if (!newValue) {
    showUserMenu.value = false
  }
}, { immediate: true })

watch(user, async (newValue) => {
  await nextTick()
  // Forçar atualização da UI se necessário
}, { immediate: true, deep: true })
</script>
