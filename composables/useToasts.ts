import { ref } from 'vue'

export interface ToastOptions {
  id?: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error'
  duration?: number // ms
}

interface Toast extends Required<Omit<ToastOptions, 'id'>> { id: string }

const toasts = ref<Toast[]>([])

function add(options: ToastOptions) {
  const id = options.id || Math.random().toString(36).slice(2)
  const toast: Toast = {
    id,
    title: options.title || '',
    description: options.description || '',
    variant: options.variant || 'default',
    duration: options.duration ?? 3500
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

export function useToasts() {
  return { toasts, add, remove, clear }
}
