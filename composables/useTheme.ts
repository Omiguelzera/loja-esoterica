import { ref, onMounted, onUnmounted, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

const isDark = ref(false)
const theme = ref<Theme>('system')

export function useTheme() {
  function updateTheme() {
    if (process.client) {
      const html = document.documentElement
      
      if (theme.value === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
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
    setTheme(isDark.value ? 'light' : 'dark')
  }

  onMounted(() => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme') as Theme
      theme.value = savedTheme || 'system'
      updateTheme()

      // Listen to system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
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
    isDark,
    theme,
    setTheme,
    toggleTheme
  }
}