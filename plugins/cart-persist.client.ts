import { useCartStore } from '@/stores/cart'
import { watch } from 'vue'
// defineNuxtPlugin is auto-available in Nuxt 3 runtime; suppress type issue if typeCheck disabled
// @ts-ignore

export default defineNuxtPlugin(() => {
  if (process.server) return
  const cart = useCartStore()
  const KEY = 'esoterica_cart_v1'

  // hydrate
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.lines)) {
        cart.$patch({ lines: parsed.lines })
      }
    }
  } catch (e) {
    console.warn('Falha ao restaurar carrinho', e)
  }

  // persist on change (simple watcher)
  watch(() => cart.lines, (lines: any) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ lines }))
    } catch (e) {
      console.warn('Falha ao salvar carrinho', e)
    }
  }, { deep: true })
})
