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
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useI18n } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'
import { useSidebar } from '@/composables/useSidebar'

const cart = useCartStore()
const totalItems = computed(() => cart.totalItems)
const { t, locale, setLocale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const { sidebarWidth } = useSidebar()

const themeLabel = computed(() => isDark.value ? 'Mudar para modo claro' : 'Mudar para modo escuro')
const toggleLocale = () => setLocale(locale.value === 'pt' ? 'en' : 'pt')
</script>
