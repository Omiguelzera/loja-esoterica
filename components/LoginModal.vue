<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    @click.self="$emit('close')"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    
    <!-- Modal Content -->
    <Card class="relative w-full max-w-md">
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="flex items-center gap-2">
            <LogIn class="w-5 h-5 text-primary" />
            Fazer Login
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            @click="$emit('close')"
            class="h-8 w-8"
          >
            <X class="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          Entre com suas credenciais para acessar o painel administrativo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Campo Email -->
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="admin@loja.com"
              required
              :disabled="isLoading"
              class="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <!-- Campo Senha -->
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Senha
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                :disabled="isLoading"
                class="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                @click="showPassword = !showPassword"
                :disabled="isLoading"
              >
                <Eye v-if="showPassword" class="w-4 h-4 text-muted-foreground" />
                <EyeOff v-else class="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <!-- Lembrar de mim -->
          <div class="flex items-center space-x-2">
            <input
              id="remember"
              v-model="form.rememberMe"
              type="checkbox"
              class="h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="isLoading"
            />
            <label
              for="remember"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Lembrar de mim
            </label>
          </div>

          <!-- Botões -->
          <div class="space-y-3 pt-2">
            <div class="flex gap-3">
              <Button 
                type="submit" 
                class="flex-1"
                :disabled="isLoading || !isFormValid"
                :class="{ 'opacity-50': !isFormValid && !isLoading }"
              >
                <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
                <LogIn v-else class="w-4 h-4 mr-2" />
                {{ isLoading ? 'Entrando...' : 'Entrar' }}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                @click="$emit('close')"
                :disabled="isLoading"
              >
                Cancelar
              </Button>
            </div>
            <p v-if="!isFormValid && !isLoading" class="text-xs text-muted-foreground text-center">
              Preencha email e senha para continuar
            </p>
          </div>
        </form>
      </CardContent>

      <CardFooter class="pt-0">
        <div class="w-full text-center space-y-2">
          <p class="text-xs text-muted-foreground">
            Não tem uma conta? 
            <button 
              type="button" 
              class="text-primary hover:underline font-medium"
              @click="showRegisterMode = true"
              :disabled="isLoading"
            >
              Criar conta
            </button>
          </p>
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <div class="h-px bg-border flex-1"></div>
            <span>Demo</span>
            <div class="h-px bg-border flex-1"></div>
          </div>
          <p class="text-xs text-muted-foreground">
            Use: <strong>admin@loja.com</strong> / <strong>admin123</strong>
          </p>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'login', user: User): void
}

// Imports
import { ref, computed, watch } from 'vue'

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
import { LogIn, X, Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import Card from './ui/Card.vue'
import CardHeader from './ui/CardHeader.vue'
import CardTitle from './ui/CardTitle.vue'
import CardDescription from './ui/CardDescription.vue'
import CardContent from './ui/CardContent.vue'
import CardFooter from './ui/CardFooter.vue'
import Input from './ui/Input.vue'
import Button from './ui/Button.vue'
import { useToasts } from '@/composables/useToasts'

// Estado do formulário
const form = ref<LoginForm>({
  email: '',
  password: '',
  rememberMe: false
})

// Estado do componente
const isLoading = ref(false)
const showPassword = ref(false)
const showRegisterMode = ref(false)

// Sistema de toasts
const { loading, success, error, updateToast } = useToasts()

// Computed
const isFormValid = computed(() => {
  const hasEmail = form.value.email && form.value.email.length > 0
  const hasPassword = form.value.password && form.value.password.length > 0
  return hasEmail && hasPassword
})

// Credenciais de demo
const demoCredentials = {
  email: 'admin@loja.com',
  password: 'admin123'
}

// Função de login
const handleLogin = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  
  // Mostrar toast de loading
  const toastId = loading('Fazendo login...', 'Verificando suas credenciais')
  
  try {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Verificar credenciais (em produção, seria uma chamada API)
    if (
      form.value.email === demoCredentials.email && 
      form.value.password === demoCredentials.password
    ) {
      // Login bem-sucedido
      const user: User = {
        id: '1',
        name: 'Administrador',
        email: form.value.email,
        role: 'admin'
      }
      
      // Salvar no localStorage se "lembrar de mim" estiver marcado
      if (form.value.rememberMe) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('isLoggedIn', 'true')
      } else {
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('isLoggedIn', 'true')
      }
      
      // Atualizar toast para sucesso
      updateToast(toastId, {
        title: 'Login realizado!',
        description: `Bem-vindo, ${user.name}`,
        variant: 'success',
        duration: 2000
      })
      
      // Emitir evento de login bem-sucedido
      emit('login', user)
      emit('close')
      
      // Resetar formulário
      resetForm()
      
    } else {
      // Credenciais inválidas
      updateToast(toastId, {
        title: 'Erro no login',
        description: 'Email ou senha incorretos. Tente: admin@loja.com / admin123',
        variant: 'error',
        duration: 5000
      })
    }
    
  } catch (error) {
    updateToast(toastId, {
      title: 'Erro no login',
      description: 'Erro ao fazer login. Tente novamente.',
      variant: 'error',
      duration: 5000
    })
    console.error('Erro no login:', error)
  } finally {
    isLoading.value = false
  }
}

// Resetar formulário
const resetForm = () => {
  form.value = {
    email: '',
    password: '',
    rememberMe: false
  }
  showPassword.value = false
}

// Resetar quando modal fechar
watch(() => props.isOpen, (newValue: boolean) => {
  if (!newValue) {
    resetForm()
  }
})
</script>