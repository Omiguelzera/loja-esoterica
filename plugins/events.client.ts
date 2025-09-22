import { useCartStore } from '@/stores/cart'

// Simple event logger plugin observing cart mutations
// @ts-ignore defineNuxtPlugin auto import
export default defineNuxtPlugin(() => {
  const cart = useCartStore()
  if (process.server) return

  let lastSnapshot = JSON.stringify(cart.lines)
  setInterval(() => {
    const current = JSON.stringify(cart.lines)
    if (current !== lastSnapshot) {
      // naive diff (full snapshot comparison)
      console.info('[events] cart_changed', { lines: cart.lines })
      lastSnapshot = current
    }
  }, 1500)

  // Provide simple API
  const track = (event: string, payload?: any) => {
    console.info('[track]', event, payload || {})
  }

  return {
    provide: { track }
  }
})
