import { ref } from 'vue'

export interface ToastOptions {
  id?: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'loading'
  duration?: number // ms
  action?: {
    label: string
    onClick: () => void
  }
}

interface Toast extends Required<Omit<ToastOptions, 'id' | 'action'>> { 
  id: string
  action?: ToastOptions['action']
}

const toasts = ref<Toast[]>([])

function add(options: ToastOptions) {
  const id = options.id || Math.random().toString(36).slice(2)
  const toast: Toast = {
    id,
    title: options.title || '',
    description: options.description || '',
    variant: options.variant || 'default',
    duration: options.variant === 'loading' ? 0 : (options.duration ?? 3500),
    action: options.action
  }
  toasts.value.push(toast)
  if (toast.duration > 0) {
    setTimeout(() => remove(id), toast.duration)
  }
  return id
}

function remove(id: string) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

function clear() {
  toasts.value = []
}

// Funções de conveniência
function success(title: string, description?: string, duration?: number) {
  return add({ 
    title, 
    description, 
    variant: 'success', 
    duration 
  })
}

function error(title: string, description?: string, duration?: number) {
  return add({ 
    title, 
    description, 
    variant: 'error', 
    duration: duration ?? 5000 // Erros ficam mais tempo
  })
}

function warning(title: string, description?: string, duration?: number) {
  return add({ 
    title, 
    description, 
    variant: 'warning', 
    duration 
  })
}

function loading(title: string, description?: string) {
  return add({ 
    title, 
    description, 
    variant: 'loading', 
    duration: 0 // Loading não some automaticamente
  })
}

// Atualizar toast de loading para sucesso/erro
function updateToast(id: string, options: Partial<ToastOptions>) {
  const toastIndex = toasts.value.findIndex(t => t.id === id)
  if (toastIndex !== -1) {
    const existingToast = toasts.value[toastIndex]
    toasts.value[toastIndex] = {
      ...existingToast,
      title: options.title ?? existingToast.title,
      description: options.description ?? existingToast.description,
      variant: options.variant ?? existingToast.variant,
      duration: options.duration ?? (options.variant === 'loading' ? 0 : 3500),
      action: options.action ?? existingToast.action
    }
    
    // Se mudou de loading para outro tipo, definir timeout para remoção
    if (existingToast.variant === 'loading' && options.variant !== 'loading') {
      const newDuration = options.duration ?? 3500
      if (newDuration > 0) {
        setTimeout(() => remove(id), newDuration)
      }
    }
  }
}

export function useToasts() {
  return { 
    toasts, 
    add, 
    remove, 
    clear, 
    success, 
    error, 
    warning, 
    loading, 
    updateToast 
  }
}
