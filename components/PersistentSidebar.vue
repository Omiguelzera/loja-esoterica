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
              to="/dashboard" 
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

    
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useSidebar } from '@/composables/useSidebar'

const { sidebarWidth } = useSidebar()
const { user, isLoggedIn, logout: authLogout, isAdmin } = useAuth()

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
}, { immediate: true })

watch(user, async (newValue) => {
  await nextTick()
}, { immediate: true, deep: true })
</script>
