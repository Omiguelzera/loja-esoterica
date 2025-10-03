<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 dark:hover:bg-slate-800 h-9 w-9"
      :aria-label="currentThemeLabel"
    >
      <Sun v-if="effectiveTheme === 'light'" class="h-4 w-4" />
      <Moon v-else-if="effectiveTheme === 'dark'" class="h-4 w-4" />
      <Monitor v-else class="h-4 w-4" />
    </button>
    
    <!-- Dropdown Menu -->
    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md shadow-lg z-50"
      @click.stop
    >
      <div class="py-1">
        <button
          @click="selectTheme('light')"
          class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors"
          :class="{ 'bg-gray-50 dark:bg-slate-700': theme === 'light' }"
        >
          <Sun class="h-4 w-4" />
          <span class="text-gray-900 dark:text-white">Modo Claro</span>
          <svg 
            v-if="theme === 'light'" 
            class="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <button
          @click="selectTheme('dark')"
          class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors"
          :class="{ 'bg-gray-50 dark:bg-slate-700': theme === 'dark' }"
        >
          <Moon class="h-4 w-4" />
          <span class="text-gray-900 dark:text-white">Modo Escuro</span>
          <svg 
            v-if="theme === 'dark'" 
            class="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <button
          @click="selectTheme('system')"
          class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors"
          :class="{ 'bg-gray-50 dark:bg-slate-700': theme === 'system' }"
        >
          <Monitor class="h-4 w-4" />
          <span class="text-gray-900 dark:text-white">Sistema</span>
          <svg 
            v-if="theme === 'system'" 
            class="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { Sun, Moon, Monitor } from 'lucide-vue-next'

const { theme, setTheme, effectiveTheme } = useTheme()
const isOpen = ref(false)

const currentThemeLabel = computed(() => {
  const labels = {
    light: 'Modo Claro',
    dark: 'Modo Escuro',
    system: 'Sistema'
  }
  return `Tema atual: ${labels[theme.value] || 'Sistema'}`
})

function selectTheme(newTheme: 'light' | 'dark' | 'system') {
  setTheme(newTheme)
  isOpen.value = false
}

// Close dropdown when clicking outside
function closeOnClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>