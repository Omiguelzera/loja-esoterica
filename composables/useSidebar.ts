import { ref, readonly, onMounted, onUnmounted, computed } from 'vue'

// Definição de breakpoints para consistência
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const useSidebar = () => {
  // --- ESTADO REATIVO ---
  const isCollapsed = ref(false)
  const isMobile = ref(false)
  const screenWidth = ref(process.client ? window.innerWidth : 0)

  // --- LÓGICA DE ATUALIZAÇÃO ---
  const updateState = () => {
    if (process.client) {
      screenWidth.value = window.innerWidth
      isMobile.value = screenWidth.value < breakpoints.lg // Considera 'mobile' abaixo de 1024px
      
      // Recolhe a sidebar automaticamente em telas móveis
      if (isMobile.value) {
        isCollapsed.value = true
      }
    }
  }

  // --- FUNÇÕES DE CONTROLE ---
  const toggle = () => {
    isCollapsed.value = !isCollapsed.value
  }

  // --- PROPRIEDADES COMPUTADAS ---
  const sidebarWidth = computed(() => {
    if (isCollapsed.value && isMobile.value) {
      return '0px' // Totalmente recolhido em mobile
    }
    if (isMobile.value) {
      return '16rem' // Largura fixa quando aberto em mobile
    }
    // Lógica responsiva para desktop
    if (screenWidth.value < breakpoints.xl) {
      return '16rem' // 256px
    } else if (screenWidth.value < breakpoints['2xl']) {
      return '18rem' // 288px
    } else {
      return '20rem' // 320px
    }
  })

  const contentMarginLeft = computed(() => {
    if (isMobile.value) {
      return '0px' // Conteúdo ocupa a tela toda em mobile
    }
    return isCollapsed.value ? '0px' : sidebarWidth.value
  })

  // --- CICLO DE VIDA ---
  onMounted(() => {
    if (process.client) {
      updateState()
      window.addEventListener('resize', updateState)
    }
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', updateState)
    }
  })

  // --- EXPORTAÇÕES ---
  return {
    isCollapsed: readonly(isCollapsed),
    isMobile: readonly(isMobile),
    sidebarWidth,
    contentMarginLeft,
    toggle,
  }
}