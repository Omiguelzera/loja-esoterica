import { ref, readonly, onMounted, computed } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  permissions: string[]
  avatar?: string
}

export const useAuth = () => {
  const isLoggedIn = ref(false)
  const user = ref<User | null>(null)

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

  // Função de login
  const login = (userData: User, rememberMe = false) => {
    user.value = userData
    isLoggedIn.value = true
    
    // Salvar no storage apropriado
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isLoggedIn', 'true')
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData))
      sessionStorage.setItem('isLoggedIn', 'true')
    }
  }

  // Função de logout
  const logout = () => {
    isLoggedIn.value = false
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('isLoggedIn')
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

  // Verificar autenticação ao inicializar
  onMounted(() => {
    checkAuth()
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
    hasPermission
  }
}