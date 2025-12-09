<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Criar nova conta
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ou
          <NuxtLink :to="{ path: '/', query: { openLogin: '1' } }" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">
            fazer login na sua conta
          </NuxtLink>
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
        <div class="space-y-4">
          <!-- Nome -->
          <div>
            <label for="name" class="sr-only">Nome completo</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mystic-input w-full"
              :class="{ 'border-red-500': errors.name }"
              placeholder="Seu nome completo"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mystic-input w-full"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Seu email"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Senha -->
          <div>
            <label for="password" class="sr-only">Senha</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="mystic-input w-full pr-10"
                :class="{ 'border-red-500': errors.password }"
                placeholder="Sua senha"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Confirmar Senha -->
          <div>
            <label for="confirmPassword" class="sr-only">Confirmar senha</label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="mystic-input w-full pr-10"
                :class="{ 'border-red-500': errors.confirmPassword }"
                placeholder="Confirme sua senha"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon :name="showConfirmPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>
        </div>

        <!-- Tipo de conta -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo de conta:
          </p>
          <div class="flex items-center justify-center space-x-6">
            <label class="flex items-center cursor-pointer p-3 rounded-lg border-2 transition-colors" 
                   :class="form.userType === 'customer' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 hover:border-gray-400'">
              <input
                v-model="form.userType"
                type="radio"
                value="customer"
                class="sr-only"
              />
              <div class="text-center">
                <Icon name="heroicons:user" class="h-6 w-6 mx-auto mb-1 text-primary-600" />
                <span class="text-sm font-medium">Cliente</span>
              </div>
            </label>
            <label class="flex items-center cursor-pointer p-3 rounded-lg border-2 transition-colors"
                   :class="form.userType === 'admin' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 hover:border-gray-400'">
              <input
                v-model="form.userType"
                type="radio"
                value="admin"
                class="sr-only"
              />
              <div class="text-center">
                <Icon name="heroicons:shield-check" class="h-6 w-6 mx-auto mb-1 text-primary-600" />
                <span class="text-sm font-medium">Admin</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Código de Admin (apenas se admin selecionado) -->
        <div v-if="form.userType === 'admin'" class="space-y-2">
          <label for="adminCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Código de Administrador
          </label>
          <input
            id="adminCode"
            v-model="form.adminCode"
            type="password"
            required
            class="mystic-input w-full"
            :class="{ 'border-red-500': errors.adminCode }"
            placeholder="Digite o código de administrador"
          />
          <p v-if="errors.adminCode" class="text-sm text-red-600">{{ errors.adminCode }}</p>
          <p class="text-sm text-gray-500">
            * Necessário código especial para criar conta de administrador
          </p>
        </div>

        <!-- Termos e Condições -->
        <div class="flex items-start">
          <input
            id="acceptTerms"
            v-model="form.acceptTerms"
            type="checkbox"
            class="mt-1 mr-3 text-primary-600 focus:ring-primary-500 rounded"
          />
          <label for="acceptTerms" class="text-sm text-gray-700 dark:text-gray-300">
            Aceito os 
            <NuxtLink to="/termos" class="text-primary-600 hover:text-primary-500">
              Termos e Condições
            </NuxtLink>
            e a 
            <NuxtLink to="/privacidade" class="text-primary-600 hover:text-primary-500">
              Política de Privacidade
            </NuxtLink>
          </label>
        </div>
        <p v-if="errors.acceptTerms" class="text-sm text-red-600">{{ errors.acceptTerms }}</p>

        <!-- Botão de submit -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="mystic-button w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
            :class="{
              'opacity-50 cursor-not-allowed': loading,
              'hover:magic-glow': !loading
            }"
          >
            <Icon v-if="loading" name="heroicons:arrow-path" class="animate-spin h-5 w-5 mr-2" />
            {{ loading ? 'Criando conta...' : 'Criar conta' }}
          </button>
        </div>
      </form>

      <!-- Erro geral -->
      <div v-if="generalError" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <Icon name="heroicons:exclamation-triangle" class="h-5 w-5 text-red-400" />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Erro ao criar conta</h3>
            <p class="mt-1 text-sm text-red-700">{{ generalError }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, type User } from '@/composables/useAuth'
import { useToasts } from '@/composables/useToasts'

// Meta da página
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

// Composables
const router = useRouter()
const { login } = useAuth()
const { success: showSuccessToast, error: showErrorToast } = useToasts()

// Estado reativo
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const generalError = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: 'customer' as 'customer' | 'admin',
  adminCode: '',
  acceptTerms: false
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  adminCode: '',
  acceptTerms: ''
})

// Validação de formulário
const validateForm = () => {
  // Limpar erros
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
  generalError.value = ''

  let isValid = true

  // Validar nome
  if (!form.name.trim()) {
    errors.name = 'Nome é obrigatório'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres'
    isValid = false
  }

  // Validar email
  if (!form.email) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }

  // Validar senha
  if (!form.password) {
    errors.password = 'Senha é obrigatória'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  // Validar confirmação de senha
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirmação de senha é obrigatória'
    isValid = false
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Senhas não coincidem'
    isValid = false
  }

  // Validar código de admin (se necessário)
  if (form.userType === 'admin' && !form.adminCode) {
    errors.adminCode = 'Código de administrador é obrigatório'
    isValid = false
  }

  // Validar termos
  if (!form.acceptTerms) {
    errors.acceptTerms = 'Você deve aceitar os termos e condições'
    isValid = false
  }

  return isValid
}

// Simulação de registro (substituir por API real)
const registerUser = async (userData: typeof form): Promise<User | null> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Validar código de admin
  if (userData.userType === 'admin' && userData.adminCode !== 'ADMIN2024') {
    throw new Error('Código de administrador inválido')
  }

  // Verificar se email já existe (simulação)
  const existingEmails = ['admin@loja.com', 'teste@teste.com']
  if (existingEmails.includes(userData.email)) {
    throw new Error('Este email já está em uso')
  }

  // Criar usuário
  const newUser: User = {
    id: Math.random().toString(36).slice(2),
    name: userData.name.trim(),
    email: userData.email,
    role: userData.userType,
    permissions: userData.userType === 'admin' 
      ? ['dashboard.view', 'users.manage', 'products.manage', 'orders.manage']
      : ['profile.view', 'orders.view'],
    avatar: `/avatars/${userData.userType}.svg`
  }

  return newUser
}

// Handler do formulário
const handleRegister = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    const user = await registerUser(form)
    
    if (user) {
      // Fazer login automaticamente
      login(user, false)
      
      showSuccessToast(
        'Conta criada com sucesso!',
        `Bem-vindo${user.role === 'admin' ? ' ao painel administrativo' : ''}, ${user.name}!`
      )

      // Redirecionar baseado no tipo de usuário
      if (user.role === 'admin') {
        await router.push('/dashboard')
      } else {
        await router.push('/')
      }
    }
  } catch (error: any) {
    console.error('Erro no registro:', error)
    generalError.value = error.message || 'Erro interno do servidor. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>