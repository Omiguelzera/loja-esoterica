<template>
  <header 
    class="crystal-border-dark magic-gradient-dark sticky top-0 z-[60] transition-all duration-500 ease-in-out magic-glow"
    :style="{ 
      marginLeft: sidebarWidth,
      background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
      backdropFilter: 'blur(25px)',
      borderImage: 'linear-gradient(90deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3)) 1'
    }"
  >
    <div class="container mx-auto flex items-center h-14 sm:h-16 lg:h-18 gap-2 sm:gap-4 px-3 sm:px-6">
      <NuxtLink to="/" class="mystic-link font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl px-2 py-1 crystal-border magic-glow-hover">
        <span class="text-base sm:text-lg lg:text-xl text-white" style="text-shadow: 0 0 15px rgba(139, 92, 246, 0.8);">
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
               class="absolute right-0 mt-2 w-48 crystal-border rounded-lg shadow-lg py-2 z-50"
               style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%); backdrop-filter: blur(15px);">
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
        <NuxtLink v-else 
                  to="/auth/login"
                  class="crystal-border magic-glow-hover flex items-center space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-300 group">
          <Icon name="heroicons:user-circle" class="h-4 w-4 text-purple-400 group-hover:text-purple-300" />
          <span class="hidden sm:inline text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white">
            Entrar
          </span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useI18n } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'
import { useSidebar } from '@/composables/useSidebar'
import { useAuth } from '@/composables/useAuth'
import { useToasts } from '@/composables/useToasts'

const router = useRouter()
const cart = useCartStore()
const totalItems = computed(() => cart.totalItems)
const { t, locale, setLocale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const { sidebarWidth } = useSidebar()
const { isLoggedIn, user, logout } = useAuth()
const { success: showSuccessToast } = useToasts()

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
