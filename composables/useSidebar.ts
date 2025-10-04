import { ref, readonly, onMounted, onUnmounted } from 'vue'

export const useSidebar = () => {
  // Largura do sidebar baseada no tamanho da tela
  const sidebarWidth = ref('16rem') // 256px - largura padrão
  
  // Detectar tamanho da tela e ajustar largura do sidebar
  const updateSidebarWidth = () => {
    if (process.client) {
      const width = window.innerWidth
      
      if (width < 480) {
        // Mobile muito pequeno
        sidebarWidth.value = '12rem' // 192px
      } else if (width < 640) {
        // Mobile pequeno
        sidebarWidth.value = '13rem' // 208px
      } else if (width < 768) {
        // Mobile médio
        sidebarWidth.value = '14rem' // 224px
      } else if (width < 1024) {
        // Tablet
        sidebarWidth.value = '16rem' // 256px
      } else if (width < 1280) {
        // Desktop pequeno
        sidebarWidth.value = '18rem' // 288px
      } else if (width < 1536) {
        // Desktop médio
        sidebarWidth.value = '20rem' // 320px
      } else {
        // Desktop grande
        sidebarWidth.value = '22rem' // 352px
      }
    }
  }
  
  onMounted(() => {
    updateSidebarWidth()
    window.addEventListener('resize', updateSidebarWidth)
  })
  
  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', updateSidebarWidth)
    }
  })
  
  return {
    sidebarWidth: readonly(sidebarWidth)
  }
}