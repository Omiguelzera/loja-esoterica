<template>
  <aside :class="['bg-card border-r border-border flex flex-col w-60 shrink-0']">
    <div class="p-4 border-b border-border font-semibold text-primary flex items-center gap-2">
      <span>🔮 Painel</span>
    </div>
    
    <nav class="flex-1 overflow-y-auto py-4 text-sm">
      <ul class="space-y-1 px-3">
        <li v-for="item in items" :key="item.to">
          <NuxtLink :to="item.to" class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary/40 transition text-muted-foreground hover:text-foreground" :class="{ 'bg-secondary/50 text-foreground': isActive(item.to) }">
            <component :is="item.icon" class="w-4 h-4 text-primary" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    
    <!-- Seção de Login/Usuário -->
    <div class="p-4 border-t border-border">
      <!-- Estado Deslogado -->
      <div v-if="!isLoggedIn" class="space-y-2">
        <Button @click="showLoginModal = true" class="w-full" size="sm">
          <LogIn class="w-4 h-4 mr-2" />
          Fazer Login
        </Button>
        <p class="text-xs text-muted-foreground text-center">
          Acesse recursos administrativos
        </p>
      </div>
      
      <!-- Estado Logado -->
      <div v-else class="space-y-3">
        <div class="flex items-center gap-2 p-2 bg-secondary/30 rounded-md">
          <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <User class="w-4 h-4 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{{ user?.name }}</p>
            <p class="text-xs text-muted-foreground truncate">{{ user?.email }}</p>
          </div>
        </div>
        <Button @click="handleLogout" variant="outline" class="w-full" size="sm">
          <LogOut class="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
      
      <div class="mt-3 pt-3 border-t border-border text-xs text-muted-foreground text-center">
        Versão 0.1.0
      </div>
    </div>
    
    <!-- Modal de Login -->
    <LoginModal 
      :is-open="showLoginModal"
      @close="showLoginModal = false"
      @login="handleLoginSuccess"
    />
  </aside>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from '#imports'
import { BookOpen, Package, Settings, LogIn, LogOut, User } from 'lucide-vue-next'
import Button from './Button.vue'
import LoginModal from '../LoginModal.vue'
import { useAuth, type User as AuthUser } from '@/composables/useAuth'
import { useToasts } from '@/composables/useToasts'

interface NavItem { 
  to: string
  label: string
  icon: any 
}

const items: NavItem[] = [
  { to: '/dashboard', label: 'Visão Geral', icon: BookOpen },
  { to: '/dashboard/produtos', label: 'Produtos', icon: Package },
  { to: '/dashboard/configuracoes', label: 'Configurações', icon: Settings }
]

// Estado de autenticação usando composable
const { isLoggedIn, user, login, logout } = useAuth()
const showLoginModal = ref(false)

// Sistema de toasts
const { success } = useToasts()

// Rota ativa
const route = useRoute()
const isActive = (path: string) => route.path === path

// Função de login bem-sucedido
const handleLoginSuccess = (loggedUser: AuthUser) => {
  login(loggedUser, true) // true para lembrar do login
  success('Login realizado!', `Bem-vindo ao painel, ${loggedUser.name}`)
}

// Função de logout com toast
const handleLogout = () => {
  const userName = user.value?.name || 'usuário'
  logout()
  success('Logout realizado!', `Até logo, ${userName}`)
  
  // Redirecionar para página inicial
  if (process.client) {
    window.location.href = '/'
  }
}
</script>
