<template>
  <header class="border-b border-gray-200 dark:border-slate-700 backdrop-blur bg-white/70 dark:bg-slate-900/70 sticky top-0 z-40">
    <div class="container mx-auto flex items-center h-14 gap-4">
      <!-- Botão Menu Mobile -->
      <button 
        @click="toggleSidebar"
        class="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        aria-label="Abrir menu"
      >
        <svg class="w-5 h-5 text-gray-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <NuxtLink to="/" class="font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded px-1 -ml-1">
        <span class="text-lg">🔮 {{ t('storeName') }}</span>
      </NuxtLink>
      <nav class="flex items-center gap-4 text-sm">
        <NuxtLink to="/produtos" class="hover:text-primary transition-colors font-medium">Produtos</NuxtLink>
        <NuxtLink to="/categorias/incensos" class="hover:text-primary transition-colors">Incensos</NuxtLink>
        <NuxtLink to="/categorias/cristais" class="hover:text-primary transition-colors">Cristais</NuxtLink>
        <NuxtLink to="/categorias/tarot" class="hover:text-primary transition-colors">Tarot</NuxtLink>
      </nav>
      <div class="ml-auto flex items-center gap-3">
        <ThemeToggle />
        <Button size="sm" variant="outline" @click="toggleLocale" class="text-xs w-10" aria-label="Mudar idioma">{{ locale === 'pt' ? 'EN' : 'PT' }}</Button>
        <NuxtLink to="/carrinho" class="relative inline-flex items-center" aria-label="Ir para carrinho de compras">
          <div class="flex items-center gap-1 text-sm font-medium">
            <span class="mr-1">{{ t('cart') }}</span>
            <span v-if="totalItems > 0" class="ml-auto inline-flex items-center justify-center text-[10px] font-medium rounded-full bg-primary text-primary-foreground w-5 h-5">
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

const { toggle: toggleSidebar } = useSidebar()
import { useCartStore } from '@/stores/cart'
import { useI18n } from '@/composables/useI18n'
import { useSidebar } from '@/composables/useSidebar'
const cart = useCartStore()
const totalItems = computed(() => cart.totalItems)
const { t, locale, setLocale } = useI18n()
const toggleLocale = () => setLocale(locale.value === 'pt' ? 'en' : 'pt')
</script>
