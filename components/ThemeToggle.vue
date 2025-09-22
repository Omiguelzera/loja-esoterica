<template>
  <button
    @click="toggleTheme"
    class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
    :aria-label="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
  >
    <span v-if="isDark" class="text-lg">☀️</span>
    <span v-else class="text-lg">🌙</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  updateTheme()
}

function updateTheme() {
  if (typeof window !== 'undefined') {
    const html = document.documentElement
    
    if (isDark.value) {
      html.classList.add('dark')
      localStorage.setItem('nuxt-theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('nuxt-theme', 'light')
    }
  }
}

onMounted(() => {
  // Verificar preferência salva ou preferência do sistema
  const savedTheme = localStorage.getItem('nuxt-theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  updateTheme()
  
  // Escutar mudanças no sistema
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem('nuxt-theme')) {
      isDark.value = e.matches
      updateTheme()
    }
  }
  
  mediaQuery.addEventListener('change', handleChange)
})
</script>