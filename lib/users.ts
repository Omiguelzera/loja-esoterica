export interface UserData {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'customer'
  permissions: string[]
  avatar?: string
  createdAt: Date
}

// Base de usuários mockada
export const MOCK_USERS: UserData[] = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@loja.com',
    password: 'admin123',
    role: 'admin',
    permissions: [
      'dashboard.view',
      'products.create',
      'products.edit',
      'products.delete',
      'users.view',
      'orders.view',
      'settings.edit'
    ],
    avatar: '👨‍💼',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Miguel Santos',
    email: 'miguel@email.com',
    password: '123456',
    role: 'customer',
    permissions: [
      'products.view',
      'cart.manage',
      'orders.create',
      'profile.edit'
    ],
    avatar: '👤',
    createdAt: new Date('2024-02-15')
  },
  {
    id: '3',
    name: 'Ana Silva',
    email: 'ana@email.com',
    password: '123456',
    role: 'customer',
    permissions: [
      'products.view',
      'cart.manage',
      'orders.create',
      'profile.edit'
    ],
    avatar: '👩',
    createdAt: new Date('2024-03-10')
  },
  {
    id: '4',
    name: 'João Manager',
    email: 'joao@loja.com',
    password: 'manager123',
    role: 'admin',
    permissions: [
      'dashboard.view',
      'products.create',
      'products.edit',
      'orders.view'
    ],
    avatar: '👨‍💻',
    createdAt: new Date('2024-01-15')
  }
]

// Função para encontrar usuário por email
export const findUserByEmail = (email: string): UserData | undefined => {
  return MOCK_USERS.find(user => user.email.toLowerCase() === email.toLowerCase())
}

// Função para validar credenciais
export const validateCredentials = (email: string, password: string): UserData | null => {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    return user
  }
  return null
}

// Função para verificar permissões
export const hasPermission = (user: UserData | null, permission: string): boolean => {
  if (!user) return false
  return user.permissions.includes(permission)
}

// Função para verificar se é admin
export const isAdmin = (user: UserData | null): boolean => {
  return user?.role === 'admin'
}

// Função para verificar se é customer
export const isCustomer = (user: UserData | null): boolean => {
  return user?.role === 'customer'
}