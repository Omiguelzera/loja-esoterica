<template>
  <div class="min-h-screen magic-gradient relative overflow-hidden">
    <!-- Fundo Místico mais sutil para auth -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-cyan-900/20"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.08),transparent_50%)]"></div>
      <div class="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_25%,rgba(139,92,246,0.08),transparent_50%)]"></div>
      <div class="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_75%,rgba(6,182,212,0.08),transparent_50%)]"></div>
      <div class="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.08),transparent_50%)]"></div>
    </div>

    <!-- Header simplificado -->
    <header class="relative z-20 bg-transparent">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="elegant-border p-2 rounded-lg">
              <Icon name="heroicons:sparkles" class="h-8 w-8 text-primary-600" />
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">
              Loja Esotérica
            </span>
          </NuxtLink>
          
          <!-- Botão de tema -->
          <ClientOnly>
            <button
              @click="toggleTheme"
              class="elegant-border p-2 rounded-lg hover:magic-glow transition-all"
            >
              <Icon 
                :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" 
                class="h-5 w-5 text-gray-700 dark:text-gray-300" 
              />
            </button>
          </ClientOnly>
        </div>
      </div>
    </header>

    <!-- Conteúdo principal -->
    <main class="relative z-10">
      <slot />
    </main>

    <!-- Footer simplificado -->
    <footer class="relative z-20 mt-auto">
      <div class="container mx-auto px-4 py-6">
        <div class="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Loja Esotérica. Todos os direitos reservados.</p>
          <div class="flex justify-center space-x-4 mt-2">
            <NuxtLink to="/termos" class="hover:text-primary-600 transition-colors">
              Termos de Uso
            </NuxtLink>
            <NuxtLink to="/privacidade" class="hover:text-primary-600 transition-colors">
              Privacidade
            </NuxtLink>
            <NuxtLink to="/contato" class="hover:text-primary-600 transition-colors">
              Contato
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

// Usar o sistema de tema
const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
/* Garantir que o layout ocupe toda a altura */
.min-h-screen {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>