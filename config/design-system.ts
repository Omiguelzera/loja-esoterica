/**
 * Design System Configuration
 * Centraliza todas as constantes de design para garantir consistência
 */

// Paleta de Cores
export const colors = {
  // Cores primárias
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Cores secundárias (purple)
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
  },
  
  // Cores de estado
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Tons de cinza
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
}

// Gradientes Padrão
export const gradients = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
  primaryHover: 'hover:from-blue-700 hover:to-purple-700',
  secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
  secondaryHover: 'hover:from-purple-700 hover:to-pink-700',
  success: 'bg-gradient-to-r from-green-500 to-emerald-500',
  warning: 'bg-gradient-to-r from-yellow-400 to-orange-500',
  error: 'bg-gradient-to-r from-red-500 to-red-600',
  background: 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30',
  card: 'bg-white/80 backdrop-blur-xl',
  overlay: 'bg-black/60 backdrop-blur-sm'
}

// Sombras Padronizadas
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  card: 'shadow-lg hover:shadow-xl',
  button: 'shadow-lg hover:shadow-xl',
  modal: 'shadow-2xl'
}

// Espaçamentos Consistentes
export const spacing = {
  section: 'py-10 lg:py-16',
  container: 'container-responsive',
  cardPadding: 'p-6 lg:p-8',
  buttonPadding: 'px-6 py-3',
  gap: {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8'
  }
}

// Bordas e Raios
export const borders = {
  radius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full'
  },
  width: {
    thin: 'border',
    medium: 'border-2',
    thick: 'border-3'
  }
}

// Tipografia
export const typography = {
  heading: {
    h1: 'text-3xl lg:text-4xl font-bold',
    h2: 'text-2xl lg:text-3xl font-bold',
    h3: 'text-xl lg:text-2xl font-bold',
    h4: 'text-lg lg:text-xl font-semibold'
  },
  body: {
    large: 'text-lg',
    base: 'text-base',
    small: 'text-sm'
  },
  weight: {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }
}

// Transições Padrão
export const transitions = {
  fast: 'transition-all duration-200',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
  hover: 'hover:scale-105 transition-transform duration-300',
  fadeIn: 'animate-in fade-in duration-300',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-300'
}

// Estados Interativos
export const interactive = {
  button: {
    primary: `${gradients.primary} ${gradients.primaryHover} text-white ${borders.radius.md} ${shadows.button} ${transitions.normal}`,
    secondary: `border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 ${borders.radius.md} ${transitions.normal}`,
    ghost: `text-gray-600 hover:bg-gray-100 ${borders.radius.md} ${transitions.normal}`
  },
  card: {
    base: `${gradients.card} ${borders.radius.lg} ${shadows.card} border border-white/20 ${transitions.normal}`,
    hover: `${gradients.card} ${borders.radius.lg} ${shadows.card} border border-white/20 ${transitions.normal} hover:scale-105`
  },
  input: {
    base: `border border-gray-300 ${borders.radius.md} px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${transitions.fast}`,
    error: `border-red-500 focus:border-red-500 focus:ring-red-500/20`
  }
}

// Layout Responsivo
export const layout = {
  grid: {
    products: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    form: 'grid gap-6 lg:grid-cols-2',
    stats: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'
  },
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start'
  },
  container: {
    sm: 'max-w-2xl mx-auto',
    md: 'max-w-4xl mx-auto',
    lg: 'max-w-6xl mx-auto',
    xl: 'max-w-7xl mx-auto'
  }
}

// Estados de Loading e Feedback
export const feedback = {
  loading: {
    spinner: 'w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin',
    skeleton: 'animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded',
    overlay: 'absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center'
  },
  empty: {
    container: `${gradients.card} ${borders.radius.lg} p-12 text-center`,
    icon: 'w-16 h-16 text-gray-400 mx-auto mb-4',
    title: 'text-xl font-semibold text-gray-900 mb-2',
    description: 'text-gray-600'
  },
  badge: {
    primary: `${gradients.primary} text-white px-3 py-1 text-sm font-medium ${borders.radius.md}`,
    success: `${gradients.success} text-white px-3 py-1 text-sm font-medium ${borders.radius.md}`,
    warning: `${gradients.warning} text-white px-3 py-1 text-sm font-medium ${borders.radius.md}`,
    error: `${gradients.error} text-white px-3 py-1 text-sm font-medium ${borders.radius.md}`
  }
}

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}