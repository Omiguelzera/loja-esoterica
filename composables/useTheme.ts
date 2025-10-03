import { ref, onMounted, onUnmounted, watch, computed, readonly } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

const isDark = ref(false)
const theme = ref<Theme>('system')
const systemPrefersDark = ref(false)

export function useTheme() {
  // Tema efetivo (considerando system preference)
  const effectiveTheme = computed(() => {
    if (theme.value === 'system') {
      return systemPrefersDark.value ? 'dark' : 'light'
    }
    return theme.value
  })
  
  // Classe para aplicar no HTML
  const themeClass = computed(() => {
    return effectiveTheme.value === 'dark' ? 'dark' : ''
  })

  function updateTheme() {
    if (process.client) {
      const html = document.documentElement
      
      if (theme.value === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        systemPrefersDark.value = prefersDark
        isDark.value = prefersDark
      } else {
        isDark.value = theme.value === 'dark'
      }
      
      if (isDark.value) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    if (process.client) {
      localStorage.setItem('theme', newTheme)
      updateTheme()
    }
  }

  function toggleTheme() {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  onMounted(() => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        theme.value = savedTheme
      }
      updateTheme()

      // Listen to system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        systemPrefersDark.value = e.matches
        if (theme.value === 'system') {
          updateTheme()
        }
      }
      
      mediaQuery.addEventListener('change', handleChange)
      
      // Cleanup
      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handleChange)
      })
    }
  })

  watch(theme, updateTheme)

  return {
    // Estado
    isDark: readonly(isDark),
    theme: readonly(theme),
    effectiveTheme: readonly(effectiveTheme),
    systemPrefersDark: readonly(systemPrefersDark),
    themeClass: readonly(themeClass),
    
    // Ações
    setTheme,
    toggleTheme
  }
}