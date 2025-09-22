import { useToasts } from '@/composables/useToasts'

// @ts-ignore defineNuxtPlugin auto import
export default defineNuxtPlugin(() => {
  const { add, remove, clear } = useToasts()
  return {
    provide: {
      toast: add,
      toasts: { add, remove, clear }
    }
  }
})

// Usage examples:
// const { $toast } = useNuxtApp();
// $toast({ title: 'Hello', description: 'World' })
