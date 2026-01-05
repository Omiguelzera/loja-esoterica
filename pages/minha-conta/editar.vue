<template>
  <div class="max-w-2xl mx-auto space-y-8">
    <!-- Cabeçalho -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Editar Perfil
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Atualize suas informações pessoais
        </p>
      </div>
      <NuxtLink to="/dashboard" 
                class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
        <Icon name="heroicons:x-mark" class="h-6 w-6" />
      </NuxtLink>
    </div>

    <!-- Formulário de edição -->
    <div class="elegant-border p-6 rounded-lg">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Avatar -->
        <div class="flex items-center space-x-6">
          <div class="relative">
            <img
              :src="form.avatar || user?.avatar || '/avatars/default.svg'"
              :alt="form.name"
              class="w-20 h-20 rounded-full object-cover elegant-border"
            />
            <label for="avatar-upload" 
                   class="absolute -bottom-2 -right-2 elegant-border rounded-full p-2 bg-white dark:bg-gray-800 cursor-pointer hover:magic-glow transition-all">
              <Icon name="heroicons:camera" class="h-4 w-4 text-primary-600" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleAvatarChange"
            />
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              Foto do Perfil
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Clique no ícone da câmera para alterar
            </p>
            <p class="text-xs text-gray-400">
              JPG, PNG até 2MB
            </p>
          </div>
        </div>

        <!-- Nome -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nome Completo *
          </label>
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
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="mystic-input w-full"
            :class="{ 'border-red-500': errors.email }"
            placeholder="seu@email.com"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <!-- Telefone -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Telefone
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="mystic-input w-full"
            placeholder="(11) 99999-9999"
          />
        </div>

        <!-- Data de Nascimento -->
        <div>
          <label for="birthDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Data de Nascimento
          </label>
          <input
            id="birthDate"
            v-model="form.birthDate"
            type="date"
            class="mystic-input w-full"
          />
        </div>

        <!-- Endereço -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="cep" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CEP
            </label>
            <input
              id="cep"
              v-model="form.address.cep"
              type="text"
              class="mystic-input w-full"
              placeholder="00000-000"
              @blur="handleCepLookup"
            />
          </div>
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cidade
            </label>
            <input
              id="city"
              v-model="form.address.city"
              type="text"
              class="mystic-input w-full"
              placeholder="Sua cidade"
            />
          </div>
        </div>

        <div>
          <label for="street" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Endereço
          </label>
          <input
            id="street"
            v-model="form.address.street"
            type="text"
            class="mystic-input w-full"
            placeholder="Rua, Avenida, etc."
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="number" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Número
            </label>
            <input
              id="number"
              v-model="form.address.number"
              type="text"
              class="mystic-input w-full"
              placeholder="123"
            />
          </div>
          <div>
            <label for="complement" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Complemento
            </label>
            <input
              id="complement"
              v-model="form.address.complement"
              type="text"
              class="mystic-input w-full"
              placeholder="Apto, Casa, etc."
            />
          </div>
        </div>

        <!-- Preferências -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Preferências
          </h3>
          
          <div class="space-y-3">
            <label class="flex items-center">
              <input
                v-model="form.preferences.emailNotifications"
                type="checkbox"
                class="mr-3 text-primary-600 focus:ring-primary-500 rounded"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                Receber notificações por email
              </span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.preferences.promotions"
                type="checkbox"
                class="mr-3 text-primary-600 focus:ring-primary-500 rounded"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                Receber ofertas e promoções
              </span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.preferences.newsletter"
                type="checkbox"
                class="mr-3 text-primary-600 focus:ring-primary-500 rounded"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                Receber newsletter
              </span>
            </label>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <NuxtLink to="/dashboard" 
                    class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors">
            Cancelar
          </NuxtLink>
          <button
            type="submit"
            :disabled="loading"
            class="mystic-button px-6 py-2 text-sm font-medium"
            :class="{
              'opacity-50 cursor-not-allowed': loading
            }"
          >
            <Icon v-if="loading" name="heroicons:arrow-path" class="animate-spin h-4 w-4 mr-2" />
            {{ loading ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Seção de segurança -->
    <div class="elegant-border p-6 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Segurança
      </h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Alterar Senha</p>
            <p class="text-sm text-gray-500">Última alteração: 15 dias atrás</p>
          </div>
          <button @click="showPasswordModal = true"
                  class="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
            Alterar
          </button>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Autenticação em Duas Etapas</p>
            <p class="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
          </div>
          <button class="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
            Configurar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de alteração de senha -->
  <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Alterar Senha
      </h3>
      <form @submit.prevent="handlePasswordChange" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Senha Atual
          </label>
          <input
            v-model="passwordForm.current"
            type="password"
            required
            class="mystic-input w-full"
            placeholder="Sua senha atual"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nova Senha
          </label>
          <input
            v-model="passwordForm.new"
            type="password"
            required
            class="mystic-input w-full"
            placeholder="Nova senha"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirmar Nova Senha
          </label>
          <input
            v-model="passwordForm.confirm"
            type="password"
            required
            class="mystic-input w-full"
            placeholder="Confirme a nova senha"
          />
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="showPasswordModal = false"
                  class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
            Cancelar
          </button>
          <button type="submit" class="mystic-button px-4 py-2 text-sm">
            Alterar Senha
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useToasts } from '@/composables/useToasts'

// Meta da página
definePageMeta({
  middleware: 'auth'
})

// Composables
const router = useRouter()
const { user } = useAuth()
const { success: showSuccessToast, error: showErrorToast } = useToasts()

// Estado reativo
const loading = ref(false)
const showPasswordModal = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  avatar: '',
  address: {
    cep: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: ''
  },
  preferences: {
    emailNotifications: true,
    promotions: false,
    newsletter: true
  }
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

const errors = reactive({
  name: '',
  email: ''
})

// Carregar dados do usuário no formulário
onMounted(() => {
  if (user.value) {
    form.name = user.value.name
    form.email = user.value.email
    form.avatar = user.value.avatar || ''
  }
})

// Validação do formulário
const validateForm = () => {
  errors.name = ''
  errors.email = ''

  if (!form.name.trim()) {
    errors.name = 'Nome é obrigatório'
    return false
  }

  if (!form.email) {
    errors.email = 'Email é obrigatório'
    return false
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email inválido'
    return false
  }

  return true
}

// Handler do upload de avatar
const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    // Validar tamanho (2MB)
    if (file.size > 2 * 1024 * 1024) {
      showErrorToast('Erro', 'Imagem deve ter no máximo 2MB')
      return
    }
    
    // Validar tipo
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      showErrorToast('Erro', 'Apenas arquivos JPG e PNG são aceitos')
      return
    }
    
    // Criar preview
    const reader = new FileReader()
    reader.onload = (e) => {
      form.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Busca CEP
const handleCepLookup = async () => {
  const cep = form.address.cep.replace(/\D/g, '')
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      
      if (!data.erro) {
        form.address.street = data.logradouro
        form.address.city = data.localidade
        form.address.state = data.uf
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
    }
  }
}

// Handler de submit do formulário principal
const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    // Simular salvamento (substituir por API real)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showSuccessToast(
      'Perfil atualizado!',
      'Suas informações foram salvas com sucesso'
    )
    
    await router.push('/perfil')
  } catch (error) {
    showErrorToast('Erro', 'Não foi possível salvar as alterações')
  } finally {
    loading.value = false
  }
}

// Handler de alteração de senha
const handlePasswordChange = async () => {
  if (passwordForm.new !== passwordForm.confirm) {
    showErrorToast('Erro', 'As senhas não coincidem')
    return
  }

  if (passwordForm.new.length < 6) {
    showErrorToast('Erro', 'A nova senha deve ter pelo menos 6 caracteres')
    return
  }

  try {
    // Simular alteração de senha (substituir por API real)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showSuccessToast('Senha alterada!', 'Sua senha foi atualizada com sucesso')
    showPasswordModal.value = false
    
    // Limpar formulário
    passwordForm.current = ''
    passwordForm.new = ''
    passwordForm.confirm = ''
  } catch (error) {
    showErrorToast('Erro', 'Não foi possível alterar a senha')
  }
}

// Atualizar título da página
useHead({
  title: 'Editar Perfil - Loja Esotérica'
})
</script>