<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Entrar na sua conta
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ou
          <NuxtLink to="/auth/cadastro" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">
            criar uma nova conta
          </NuxtLink>
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
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
        </div>

        <!-- Tipo de usuário -->
        <div class="flex items-center justify-center space-x-4">
          <label class="flex items-center">
            <input
              v-model="form.userType"
              type="radio"
              value="customer"
              class="mr-2 text-primary-600 focus:ring-primary-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">Cliente</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="form.userType"
              type="radio"
              value="admin"
              class="mr-2 text-primary-600 focus:ring-primary-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">Administrador</span>
          </label>
        </div>

        <!-- Lembrar de mim -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              v-model="form.rememberMe"
              type="checkbox"
              class="mr-2 text-primary-600 focus:ring-primary-500 rounded"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">Lembrar de mim</span>
          </label>
          <NuxtLink to="/auth/recuperar-senha" class="text-sm text-primary-600 hover:text-primary-500">
            Esqueceu a senha?
          </NuxtLink>
        </div>

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
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </div>
      </form>

      <!-- Erro geral -->
      <div v-if="generalError" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <Icon name="heroicons:exclamation-triangle" class="h-5 w-5 text-red-400" />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Erro ao fazer login</h3>
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
const generalError = ref('')

const form = reactive({
  email: '',
  password: '',
  userType: 'customer' as 'customer' | 'admin',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

// Validação de formulário
const validateForm = () => {
  errors.email = ''
  errors.password = ''
  generalError.value = ''

  if (!form.email) {
    errors.email = 'Email é obrigatório'
    return false
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email inválido'
    return false
  }

  if (!form.password) {
    errors.password = 'Senha é obrigatória'
    return false
  }

  if (form.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres'
    return false
  }

  return true
}

// Simulação de autenticação (substituir por API real)
const authenticateUser = async (email: string, password: string, userType: 'customer' | 'admin'): Promise<User | null> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Usuários de exemplo
  const users = {
    admin: {
      id: '1',
      name: 'Admin Master',
      email: 'admin@loja.com',
      role: 'admin' as const,
      permissions: ['dashboard.view', 'users.manage', 'products.manage', 'orders.manage'],
      avatar: '/avatars/admin.svg'
    },
    customer: {
      id: '2',
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      role: 'customer' as const,
      permissions: ['profile.view', 'orders.view'],
      <template>
        <div />
      </template>

      <script setup lang="ts">
      import { onMounted } from 'vue'
      import { useRouter } from 'vue-router'

      // This page now acts as a compatibility route for deep-links to /auth/login.
      // It will open the header modal (via `open-login-modal` event) and redirect to `/`.
      const router = useRouter()

      onMounted(() => {
        if (process.client) {
          window.dispatchEvent(new Event('open-login-modal'))
        }
        // Replace history to root so that URL doesn't remain on /auth/login
        router.replace({ path: '/', query: { openLogin: '1' } })
      })
      </script>