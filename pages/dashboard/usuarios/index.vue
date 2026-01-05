<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="p-6 space-y-6">
      <!-- Cabeçalho -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Icon name="heroicons:users" class="w-8 h-8 text-purple-600" />
              Gerenciar Usuários
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              Visualize e gerencie todos os usuários do sistema
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <button
              @click="refreshUsers"
              :disabled="loading"
              class="mystic-button px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
              <Icon v-else name="heroicons:arrow-path" class="w-4 h-4" />
              <span class="ml-2">Atualizar</span>
            </button>
            
            <button
              @click="openCreateModal"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Icon name="heroicons:user-plus" class="w-4 h-4" />
              Novo Usuário
            </button>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filtrar por Role
            </label>
            <select
              v-model="selectedRole"
              @change="filterUsers"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Todos os Roles</option>
              <option value="admin">Administradores</option>
              <option value="customer">Clientes</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filtrar por Status
            </label>
            <select
              v-model="selectedStatus"
              @change="filterUsers"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="suspended">Suspenso</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar
            </label>
            <div class="relative">
              <input
                v-model="searchTerm"
                @input="filterUsers"
                type="text"
                placeholder="Nome ou email..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      <!-- Estatísticas Rápidas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:users" class="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:shield-check" class="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.admins }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:user-circle" class="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Clientes</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.customers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 crystal-border">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:check-circle" class="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Ativos</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.active }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de Usuários -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg crystal-border overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Lista de Usuários
          </h2>
        </div>

        <div v-if="loading" class="p-8 text-center">
          <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin mx-auto text-purple-600" />
          <p class="mt-2 text-gray-600 dark:text-gray-400">Carregando usuários...</p>
        </div>

        <div v-else-if="filteredUsers.length === 0" class="p-8 text-center">
          <Icon name="heroicons:users" class="w-12 h-12 mx-auto text-gray-400" />
          <p class="mt-2 text-gray-600 dark:text-gray-400">Nenhum usuário encontrado</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usuário
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Último Login
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Criado em
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        :src="user.avatar || getDefaultAvatar(user.role)"
                        :alt="user.name"
                        class="h-10 w-10 rounded-full object-cover border-2"
                        :class="user.role === 'admin' ? 'border-purple-400' : 'border-green-400'"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ user.name }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getRoleClass(user.role)">
                    {{ getRoleText(user.role) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getStatusClass(user.status)">
                    {{ getStatusText(user.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ user.lastLogin ? formatDate(user.lastLogin) : 'Nunca' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <NuxtLink 
                    :to="`/dashboard/usuarios/${user.id}`"
                    class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    Ver Detalhes
                  </NuxtLink>
                  <button
                    @click="editUser(user)"
                    class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    @click="toggleUserStatus(user)"
                    :class="user.status === 'active' 
                      ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300' 
                      : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'"
                    class="transition-colors"
                  >
                    {{ user.status === 'active' ? 'Desativar' : 'Ativar' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginação -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} de {{ filteredUsers.length }} usuários
            </div>
            <div class="flex space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Anterior
              </button>
              <span class="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-lg">
                {{ currentPage }} de {{ totalPages }}
              </span>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Criação/Edição de Usuário -->
    <div v-if="showUserModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ selectedUser ? 'Editar Usuário' : 'Novo Usuário' }}
          </h3>
          <button 
            @click="closeUserModal"
            class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="saveUser" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome
              </label>
              <input
                v-model="userForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                v-model="userForm.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                v-model="userForm.role"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="customer">Cliente</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                v-model="userForm.status"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="suspended">Suspenso</option>
              </select>
            </div>
          </div>

          <div v-if="!selectedUser">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Senha
            </label>
            <input
              v-model="userForm.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div class="flex space-x-3 pt-4">
            <button
              type="button"
              @click="closeUserModal"
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="savingUser"
              class="flex-1 mystic-button py-2 text-sm font-medium disabled:opacity-50"
            >
              {{ savingUser ? 'Salvando...' : (selectedUser ? 'Atualizar' : 'Criar') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useToasts } from '@/composables/useToasts'

// Meta da página
definePageMeta({
  layout: 'dashboard',
  middleware: 'admin'
})

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  status: 'active' | 'inactive' | 'suspended'
  avatar?: string
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

// Composables
const { success: showSuccessToast, error: showErrorToast } = useToasts()

// Estado reativo
const loading = ref(false)
const users = ref<User[]>([])
const selectedRole = ref('')
const selectedStatus = ref('')
const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modal de usuário
const showUserModal = ref(false)
const selectedUser = ref<User | null>(null)
const savingUser = ref(false)

const userForm = reactive({
  name: '',
  email: '',
  role: 'customer' as 'admin' | 'customer',
  status: 'active' as 'active' | 'inactive' | 'suspended',
  password: ''
})

// Dados mockados para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Master',
    email: 'admin@loja.com',
    role: 'admin',
    status: 'active',
    avatar: '/avatars/admin.svg',
    lastLogin: new Date('2024-10-13T09:30:00'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-10-13')
  },
  {
    id: '2',
    name: 'Ana Silva',
    email: 'ana@email.com',
    role: 'customer',
    status: 'active',
    avatar: '/avatars/customer.svg',
    lastLogin: new Date('2024-10-12T15:20:00'),
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-10-12')
  },
  {
    id: '3',
    name: 'Carlos Santos',
    email: 'carlos@email.com',
    role: 'customer',
    status: 'active',
    lastLogin: new Date('2024-10-11T11:45:00'),
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-10-11')
  },
  {
    id: '4',
    name: 'Maria Oliveira',
    email: 'maria@email.com',
    role: 'customer',
    status: 'inactive',
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: '5',
    name: 'João Costa',
    email: 'joao@email.com',
    role: 'customer',
    status: 'suspended',
    lastLogin: new Date('2024-08-15T16:30:00'),
    createdAt: new Date('2024-05-05'),
    updatedAt: new Date('2024-08-20')
  },
  {
    id: '6',
    name: 'Lucia Ferreira',
    email: 'lucia@email.com',
    role: 'customer',
    status: 'active',
    avatar: '/avatars/customer.svg',
    lastLogin: new Date('2024-10-13T08:15:00'),
    createdAt: new Date('2024-06-12'),
    updatedAt: new Date('2024-10-13')
  }
]

// Computadas
const filteredUsers = computed(() => {
  let filtered = users.value

  if (selectedRole.value) {
    filtered = filtered.filter(user => user.role === selectedRole.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(user => user.status === selectedStatus.value)
  }

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.name.toLowerCase().includes(term) || 
      user.email.toLowerCase().includes(term)
    )
  }

  return filtered
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredUsers.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value)
})

const stats = computed(() => {
  const total = users.value.length
  const admins = users.value.filter(u => u.role === 'admin').length
  const customers = users.value.filter(u => u.role === 'customer').length
  const active = users.value.filter(u => u.status === 'active').length

  return { total, admins, customers, active }
})

// Métodos
const loadUsers = async () => {
  loading.value = true
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    users.value = mockUsers
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
    showErrorToast('Erro', 'Não foi possível carregar os usuários')
  } finally {
    loading.value = false
  }
}

const refreshUsers = () => {
  loadUsers()
}

const filterUsers = () => {
  currentPage.value = 1
}

const openCreateModal = () => {
  selectedUser.value = null
  Object.assign(userForm, {
    name: '',
    email: '',
    role: 'customer' as 'customer',
    status: 'active' as 'active',
    password: ''
  })
  showUserModal.value = true
}

const editUser = (user: User) => {
  selectedUser.value = user
  Object.assign(userForm, {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    password: ''
  })
  showUserModal.value = true
}

const closeUserModal = () => {
  showUserModal.value = false
  selectedUser.value = null
}

const saveUser = async () => {
  savingUser.value = true
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (selectedUser.value) {
      // Atualizar usuário existente
      const userIndex = users.value.findIndex(u => u.id === selectedUser.value!.id)
      if (userIndex !== -1) {
        users.value[userIndex] = {
          ...users.value[userIndex],
          name: userForm.name,
          email: userForm.email,
          role: userForm.role,
          status: userForm.status,
          updatedAt: new Date()
        }
      }
      showSuccessToast('Usuário Atualizado', 'Informações do usuário foram atualizadas com sucesso')
    } else {
      // Criar novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        status: userForm.status,
        avatar: userForm.role === 'admin' ? '/avatars/admin.svg' : '/avatars/customer.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      users.value.push(newUser)
      showSuccessToast('Usuário Criado', 'Novo usuário foi criado com sucesso')
    }
    
    closeUserModal()
  } catch (error) {
    console.error('Erro ao salvar usuário:', error)
    showErrorToast('Erro', 'Não foi possível salvar o usuário')
  } finally {
    savingUser.value = false
  }
}

const toggleUserStatus = async (user: User) => {
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const userIndex = users.value.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      users.value[userIndex].status = user.status === 'active' ? 'inactive' : 'active'
      users.value[userIndex].updatedAt = new Date()
    }
    
    const action = user.status === 'active' ? 'desativado' : 'ativado'
    showSuccessToast('Status Atualizado', `Usuário ${action} com sucesso`)
  } catch (error) {
    console.error('Erro ao alterar status:', error)
    showErrorToast('Erro', 'Não foi possível alterar o status do usuário')
  }
}

// Utilitários
const getDefaultAvatar = (role: string) => {
  return role === 'admin' ? '/avatars/admin.svg' : '/avatars/customer.svg'
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

const getRoleClass = (role: string) => {
  const classes = {
    admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200',
    customer: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
  }
  return classes[role] || classes.customer
}

const getRoleText = (role: string) => {
  const texts = {
    admin: 'Administrador',
    customer: 'Cliente'
  }
  return texts[role] || 'Cliente'
}

const getStatusClass = (status: string) => {
  const classes = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200',
    suspended: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
  }
  return classes[status] || classes.active
}

const getStatusText = (status: string) => {
  const texts = {
    active: 'Ativo',
    inactive: 'Inativo',
    suspended: 'Suspenso'
  }
  return texts[status] || 'Ativo'
}

// Lifecycle
onMounted(() => {
  loadUsers()
})
</script>