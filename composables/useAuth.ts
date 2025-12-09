import { ref, readonly, onMounted, onUnmounted, computed } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  permissions: string[]
  avatar?: string
}

// Estado global compartilhado entre todas as instâncias
const globalIsLoggedIn = ref(false)
const globalUser = ref<User | null>(null)

export const useAuth = () => {
  // Usar referências globais em vez de locais
  const isLoggedIn = globalIsLoggedIn
  const user = globalUser

  // Verificar se usuário está logado
  const checkAuth = () => {
    if (process.server) return false

    // Verificar localStorage primeiro (lembrar de mim)
    let savedUser = localStorage.getItem('user')
    let savedLoginState = localStorage.getItem('isLoggedIn')
    
    // Se não encontrou no localStorage, verificar sessionStorage
    if (!savedUser || savedLoginState !== 'true') {
      savedUser = sessionStorage.getItem('user')
      savedLoginState = sessionStorage.getItem('isLoggedIn')
    }
    
    if (savedUser && savedLoginState === 'true') {
      try {
        user.value = JSON.parse(savedUser)
        isLoggedIn.value = true
        return true
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error)
        logout()
        return false
      }
    }
    
    return false
  }

  // Função de login melhorada com notificação global
  const login = (userData: User, rememberMe = false) => {
    user.value = userData
    isLoggedIn.value = true
    
    const storage = rememberMe ? localStorage : sessionStorage
    const otherStorage = rememberMe ? sessionStorage : localStorage
    
    // Salvar no storage apropriado
    storage.setItem('user', JSON.stringify(userData))
    storage.setItem('isLoggedIn', 'true')
    storage.setItem('loginTimestamp', Date.now().toString())
    storage.setItem('rememberMe', rememberMe.toString())
    
    // Limpar dados do outro storage para evitar conflitos
    otherStorage.removeItem('user')
    otherStorage.removeItem('isLoggedIn')
    otherStorage.removeItem('loginTimestamp')
    otherStorage.removeItem('rememberMe')
    
    // Disparar evento customizado para sincronização
    if (process.client) {
      window.dispatchEvent(new CustomEvent('auth-changed', { 
        detail: { isLoggedIn: true, user: userData } 
      }))
    }
  }

  // Função de logout melhorada com notificação global
  const logout = () => {
    isLoggedIn.value = false
    user.value = null
    
    // Limpar todos os dados de autenticação de ambos os storages
    const storageKeys = ['user', 'isLoggedIn', 'loginTimestamp', 'rememberMe']
    storageKeys.forEach(key => {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    })
    
    // Disparar evento customizado para sincronização
    if (process.client) {
      window.dispatchEvent(new CustomEvent('auth-changed', { 
        detail: { isLoggedIn: false, user: null } 
      }))
    }
  }

  // Verificar se usuário é admin
  const isAdmin = computed(() => {
    return user.value?.role === 'admin'
  })

  // Verificar se usuário é customer
  const isCustomer = computed(() => {
    return user.value?.role === 'customer'
  })

  // Verificar se usuário tem permissão específica
  const hasPermission = (permission: string) => {
    return user.value?.permissions?.includes(permission) || false
  }

  // Verificar se pode acessar dashboard
  const canAccessDashboard = computed(() => {
    return isAdmin.value && hasPermission('dashboard.view')
  })

  // Forçar sincronização imediata
  const forceSync = () => {
    checkAuth()
    if (process.client) {
      window.dispatchEvent(new CustomEvent('auth-sync', { 
        detail: { isLoggedIn: isLoggedIn.value, user: user.value } 
      }))
    }
  }

  // Listener para sincronização entre abas/janelas e componentes
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'isLoggedIn' || event.key === 'user') {
      // Recarregar estado de autenticação quando houver mudanças
      checkAuth()
    }
  }

  // Listener para eventos customizados de autenticação
  const handleAuthChange = (event: CustomEvent) => {
    const { isLoggedIn: newIsLoggedIn, user: newUser } = event.detail
    isLoggedIn.value = newIsLoggedIn
    user.value = newUser
  }

  // Listener para sync forçado
  const handleAuthSync = (event: CustomEvent) => {
    const { isLoggedIn: newIsLoggedIn, user: newUser } = event.detail
    isLoggedIn.value = newIsLoggedIn
    user.value = newUser
  }

  // Verificar autenticação ao inicializar
  onMounted(() => {
    checkAuth()
    
    // Adicionar listeners para sincronização
    if (process.client) {
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('auth-changed', handleAuthChange as EventListener)
      window.addEventListener('auth-sync', handleAuthSync as EventListener)
    }
  })

  // Limpar listeners ao desmontar
  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-changed', handleAuthChange as EventListener)
      window.removeEventListener('auth-sync', handleAuthSync as EventListener)
    }
  })

  return {
    isLoggedIn: readonly(isLoggedIn),
    user: readonly(user),
    isAdmin: readonly(isAdmin),
    isCustomer: readonly(isCustomer),
    canAccessDashboard: readonly(canAccessDashboard),
    login,
    logout,
    checkAuth,
    hasPermission,
    forceSync
  }
}