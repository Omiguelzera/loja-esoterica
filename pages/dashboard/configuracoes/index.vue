<template>
  <PageContainer>
    <PageHeader 
      title="Configurações" 
      description="Configure sua conta e preferências do sistema"
    >
      <template #actions>
        <NuxtLink to="/dashboard">
          <Button variant="outline" size="sm">
            <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </NuxtLink>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Menu Lateral -->
      <div class="lg:col-span-1">
        <SectionCard title="Navegação" icon="heroicons:squares-2x2">
          <div class="space-y-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full text-left px-4 py-3 rounded-lg transition-all',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'elegant-border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:magic-glow'
              ]"
            >
              <div class="flex items-center">
                <Icon :name="tab.icon" class="w-5 h-5 mr-3" />
                <div>
                  <div class="font-medium">{{ tab.name }}</div>
                  <div class="text-xs opacity-75">{{ tab.description }}</div>
                </div>
              </div>
            </button>
          </div>
        </SectionCard>
      </div>

      <!-- Conteúdo Principal -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Perfil -->
        <div v-if="activeTab === 'profile'" class="elegant-border p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Informações do Perfil
          </h2>
          
          <form @submit.prevent="saveProfile" class="space-y-6">
            <!-- Avatar -->
            <div class="flex items-center space-x-6">
              <div class="relative">
                <img
                  :src="profileForm.avatar || user?.avatar || '/avatars/default.svg'"
                  :alt="profileForm.name"
                  class="w-20 h-20 rounded-full object-cover elegant-border"
                />
                <label class="absolute -bottom-2 -right-2 elegant-border rounded-full p-2 bg-white dark:bg-gray-800 cursor-pointer hover:magic-glow transition-all">
                  <Icon name="heroicons:camera" class="h-4 w-4 text-primary-600" />
                  <input type="file" class="hidden" accept="image/*" @change="handleAvatarChange" />
                </label>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Foto do Perfil</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">JPG, PNG até 2MB</p>
              </div>
            </div>

            <!-- Nome -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome Completo *
              </label>
              <input
                v-model="profileForm.name"
                type="text"
                required
                class="mystic-input w-full"
                placeholder="Seu nome completo"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                v-model="profileForm.email"
                type="email"
                required
                class="mystic-input w-full"
                placeholder="seu@email.com"
              />
            </div>

            <!-- Botões -->
            <div class="flex justify-end space-x-4">
              <Button variant="outline" type="button" @click="resetProfileForm">
                Cancelar
              </Button>
              <Button type="submit">
                <Icon name="heroicons:check" class="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>

        <!-- Segurança -->
        <div v-if="activeTab === 'security'" class="elegant-border p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Segurança
          </h2>
          
          <form @submit.prevent="changePassword" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Senha Atual
              </label>
              <input
                v-model="securityForm.currentPassword"
                type="password"
                class="mystic-input w-full"
                placeholder="Digite sua senha atual"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nova Senha
              </label>
              <input
                v-model="securityForm.newPassword"
                type="password"
                class="mystic-input w-full"
                placeholder="Digite a nova senha"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirmar Nova Senha
              </label>
              <input
                v-model="securityForm.confirmPassword"
                type="password"
                class="mystic-input w-full"
                placeholder="Confirme a nova senha"
              />
            </div>

            <div class="flex justify-end">
              <Button type="submit">
                <Icon name="heroicons:lock-closed" class="w-4 h-4 mr-2" />
                Alterar Senha
              </Button>
            </div>
          </form>
        </div>

        <!-- Notificações -->
        <div v-if="activeTab === 'notifications'" class="elegant-border p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Preferências de Notificação
          </h2>
          
          <div class="space-y-4">
            <label class="flex items-center justify-between p-4 elegant-border rounded-lg hover:magic-glow transition-all">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Notificações por Email</div>
                <div class="text-sm text-gray-500">Receber atualizações importantes por email</div>
              </div>
              <input
                v-model="notificationForm.email"
                type="checkbox"
                class="text-primary-600 focus:ring-primary-500 rounded"
              />
            </label>

            <label class="flex items-center justify-between p-4 elegant-border rounded-lg hover:magic-glow transition-all">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Novos Pedidos</div>
                <div class="text-sm text-gray-500">Ser notificado sobre novos pedidos</div>
              </div>
              <input
                v-model="notificationForm.newOrders"
                type="checkbox"
                class="text-primary-600 focus:ring-primary-500 rounded"
              />
            </label>

            <label class="flex items-center justify-between p-4 elegant-border rounded-lg hover:magic-glow transition-all">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Estoque Baixo</div>
                <div class="text-sm text-gray-500">Alertas quando produtos estiverem com estoque baixo</div>
              </div>
              <input
                v-model="notificationForm.lowStock"
                type="checkbox"
                class="text-primary-600 focus:ring-primary-500 rounded"
              />
            </label>

            <label class="flex items-center justify-between p-4 elegant-border rounded-lg hover:magic-glow transition-all">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Relatórios Semanais</div>
                <div class="text-sm text-gray-500">Receber resumo semanal de atividades</div>
              </div>
              <input
                v-model="notificationForm.weeklyReports"
                type="checkbox"
                class="text-primary-600 focus:ring-primary-500 rounded"
              />
            </label>

            <div class="flex justify-end pt-4">
              <Button @click="saveNotifications">
                <Icon name="heroicons:check" class="w-4 h-4 mr-2" />
                Salvar Preferências
              </Button>
            </div>
          </div>
        </div>

        <!-- Aparência -->
        <div v-if="activeTab === 'appearance'" class="elegant-border p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Aparência
          </h2>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tema
              </label>
              <div class="grid grid-cols-3 gap-4">
                <button
                  v-for="theme in themes"
                  :key="theme.id"
                  @click="appearanceForm.theme = theme.id"
                  :class="[
                    'p-4 elegant-border rounded-lg text-center transition-all',
                    appearanceForm.theme === theme.id
                      ? 'ring-2 ring-blue-600'
                      : 'hover:magic-glow'
                  ]"
                >
                  <Icon :name="theme.icon" class="w-8 h-8 mx-auto mb-2" />
                  <div class="font-medium text-sm">{{ theme.name }}</div>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Idioma
              </label>
              <select v-model="appearanceForm.language" class="mystic-input w-full">
                <option value="pt">Português (Brasil)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <div class="flex justify-end">
              <Button @click="saveAppearance">
                <Icon name="heroicons:check" class="w-4 h-4 mr-2" />
                Salvar Preferências
              </Button>
            </div>
          </div>
        </div>

        <!-- Dados do Sistema (Admin) -->
        <div v-if="activeTab === 'system' && isAdmin" class="elegant-border p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Configurações do Sistema
          </h2>
          
          <div class="space-y-6">
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div class="flex items-start">
                <Icon name="heroicons:information-circle" class="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h3 class="font-medium text-blue-900 dark:text-blue-100">Informações do Sistema</h3>
                  <div class="mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <p>• Versão: 1.0.0</p>
                    <p>• Ambiente: Desenvolvimento</p>
                    <p>• Última atualização: 5 de Janeiro de 2026</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <label class="flex items-center justify-between p-4 elegant-border rounded-lg">
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">Modo de Manutenção</div>
                  <div class="text-sm text-gray-500">Desabilitar acesso temporariamente</div>
                </div>
                <input
                  v-model="systemForm.maintenanceMode"
                  type="checkbox"
                  class="text-primary-600 focus:ring-primary-500 rounded"
                />
              </label>

              <label class="flex items-center justify-between p-4 elegant-border rounded-lg">
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">Logs Detalhados</div>
                  <div class="text-sm text-gray-500">Ativar logging detalhado para debug</div>
                </div>
                <input
                  v-model="systemForm.detailedLogs"
                  type="checkbox"
                  class="text-primary-600 focus:ring-primary-500 rounded"
                />
              </label>
            </div>

            <div class="flex justify-end">
              <Button @click="saveSystem" variant="outline">
                <Icon name="heroicons:cog-6-tooth" class="w-4 h-4 mr-2" />
                Salvar Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToasts } from '@/composables/useToasts'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const { success } = useToasts()

const isAdmin = computed(() => user.value?.role === 'admin')

const activeTab = ref('profile')

const tabs = computed(() => {
  const baseTabs = [
    { id: 'profile', name: 'Perfil', description: 'Informações pessoais', icon: 'heroicons:user' },
    { id: 'security', name: 'Segurança', description: 'Senha e privacidade', icon: 'heroicons:lock-closed' },
    { id: 'notifications', name: 'Notificações', description: 'Preferências de avisos', icon: 'heroicons:bell' },
    { id: 'appearance', name: 'Aparência', description: 'Tema e idioma', icon: 'heroicons:paint-brush' }
  ]
  
  if (isAdmin.value) {
    baseTabs.push({ id: 'system', name: 'Sistema', description: 'Configurações gerais', icon: 'heroicons:cog-6-tooth' })
  }
  
  return baseTabs
})

const profileForm = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  avatar: user.value?.avatar || ''
})

const securityForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const notificationForm = reactive({
  email: true,
  newOrders: true,
  lowStock: true,
  weeklyReports: false
})

const appearanceForm = reactive({
  theme: 'light',
  language: 'pt'
})

const systemForm = reactive({
  maintenanceMode: false,
  detailedLogs: false
})

const themes = [
  { id: 'light', name: 'Claro', icon: 'heroicons:sun' },
  { id: 'dark', name: 'Escuro', icon: 'heroicons:moon' },
  { id: 'auto', name: 'Auto', icon: 'heroicons:computer-desktop' }
]

function handleAvatarChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileForm.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function resetProfileForm() {
  profileForm.name = user.value?.name || ''
  profileForm.email = user.value?.email || ''
  profileForm.avatar = user.value?.avatar || ''
}

function saveProfile() {
  success('Perfil atualizado', 'Suas informações foram salvas com sucesso')
}

function changePassword() {
  if (securityForm.newPassword !== securityForm.confirmPassword) {
    return
  }
  success('Senha alterada', 'Sua senha foi atualizada com sucesso')
  securityForm.currentPassword = ''
  securityForm.newPassword = ''
  securityForm.confirmPassword = ''
}

function saveNotifications() {
  success('Preferências salvas', 'Suas preferências de notificação foram atualizadas')
}

function saveAppearance() {
  success('Aparência atualizada', 'Suas preferências de aparência foram salvas')
}

function saveSystem() {
  success('Sistema atualizado', 'Configurações do sistema foram salvas')
}

useHead({
  title: 'Configurações - Dashboard'
})
</script>
