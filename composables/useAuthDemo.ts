export type DemoUserType = 'admin' | 'customer'

export interface DemoUser {
  id: string
  name: string
  email: string
  role: DemoUserType
  permissions: string[]
  avatar?: string
}

export const demoUsers: Record<DemoUserType, DemoUser> = {
  admin: {
    id: '1',
    name: 'Admin Master',
    email: 'admin@loja.com',
    role: 'admin',
    permissions: ['dashboard.view', 'users.manage', 'products.manage', 'orders.manage'],
    avatar: '/avatars/admin.svg'
  },
  customer: {
    id: '2',
    name: 'Cliente Teste',
    email: 'cliente@teste.com',
    role: 'customer',
    permissions: ['profile.view', 'orders.view'],
    avatar: '/avatars/customer.svg'
  }
}

export const validateDemoLoginForm = (email: string, password: string) => {
  if (!email) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email'
  if (!password || password.length < 6) return 'Password must be at least 6 characters'
  return ''
}

export const authenticateUser = async (email: string, password: string, userType: DemoUserType) => {
  // small simulated delay
  await new Promise((r) => setTimeout(r, 600))

  if (userType === 'admin' && email === demoUsers.admin.email && password === '123456') return demoUsers.admin
  if (userType === 'customer' && email === demoUsers.customer.email && password === '123456') return demoUsers.customer

  return null
}
