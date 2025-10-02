import { ref, readonly, onMounted, onUnmounted } from 'vue'

export const useSidebar = () => {
  const isOpen = ref(false)
  const isMobile = ref(false)
  
  // Carregar estado persistido do sidebar
  const loadSidebarState = () => {
    if (process.client) {
      const saved = localStorage.getItem('sidebar-open')
      if (saved !== null) {
        isOpen.value = JSON.parse(saved)
      } else {
        // Estado padrão: aberto no desktop, fechado no mobile
        isOpen.value = window.innerWidth >= 768
      }
    }
  }

  // Salvar estado do sidebar
  const saveSidebarState = () => {
    if (process.client) {
      localStorage.setItem('sidebar-open', JSON.stringify(isOpen.value))
    }
  }
  
  // Detectar se é mobile
  const checkMobile = () => {
    if (process.client) {
      const wasMobile = isMobile.value
      isMobile.value = window.innerWidth < 768
      
      // Se mudou de mobile para desktop ou vice-versa, ajustar estado
      if (wasMobile !== isMobile.value) {
        loadSidebarState()
      }
    }
  }
  
  // Toggle sidebar
  const toggle = () => {
    isOpen.value = !isOpen.value
    saveSidebarState()
  }
  
  // Abrir sidebar
  const open = () => {
    isOpen.value = true
    saveSidebarState()
  }
  
  // Fechar sidebar
  const close = () => {
    isOpen.value = false
    saveSidebarState()
  }
  
  // Fechar sidebar quando clicar fora (mobile)
  const handleOutsideClick = (event: MouseEvent) => {
    if (isMobile.value && isOpen.value) {
      const sidebar = document.getElementById('persistent-sidebar')
      if (sidebar && !sidebar.contains(event.target as Node)) {
        close()
      }
    }
  }
  
  // Fechar sidebar com ESC
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen.value) {
      close()
    }
  }
  
  onMounted(() => {
    checkMobile()
    loadSidebarState()
    
    // Listener para resize
    window.addEventListener('resize', checkMobile)
    
    // Listeners para fechar sidebar
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleKeydown)
    }
  })
  
  return {
    isOpen: readonly(isOpen),
    isMobile: readonly(isMobile),
    toggle,
    open,
    close
  }
}