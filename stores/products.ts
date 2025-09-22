import { defineStore } from 'pinia'
import { $fetch } from 'ofetch'


export interface Product {
  id: number
  name: string
  description: string
  price: number
  createdAt: string
  category: string
}

interface State {
  items: Product[]
  loaded: boolean
  loading: boolean
}

export const useProductsStore = defineStore('products', {
  state: (): State => ({ items: [], loaded: false, loading: false }),
  getters: {
  categories: (s): string[] => Array.from(new Set(s.items.map(i => i.category)))
  },
  actions: {
    async fetch(force = false): Promise<void> {
      if (this.loaded && !force) return
      if (this.loading) return
      this.loading = true
      try {
        const data = await $fetch<Product[]>('/api/products')
        if (data) {
          this.items = data
          this.loaded = true
        }
      } finally {
        this.loading = false
      }
    },
    addLocal(p: Product): void { this.items.push(p) },
    updateLocal(id: number, patch: Partial<Product>): void {
      const idx = this.items.findIndex(p => p.id === id)
      if (idx !== -1) this.items[idx] = { ...this.items[idx], ...patch }
    }
  }
})