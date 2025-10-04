import { defineStore } from 'pinia'


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
        // Tentar buscar da API, se falhar usar dados mock
        let data: Product[]
        try {
          // Usar fetch nativo do navegador com URL absoluta em desenvolvimento
          const response = await fetch('/api/products')
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          data = await response.json()
        } catch (error) {
          console.warn('Falha ao carregar da API, usando dados mock:', error)
          // Dados mock para fallback
          data = [
            { id: 1, name: 'Cristal Quartzo', description: 'Pedra de cura e amplificação energética.', price: 49.9, createdAt: new Date().toISOString(), category: 'cristais' },
            { id: 2, name: 'Incenso Sândalo', description: 'Aroma suave para limpeza energética.', price: 19.9, createdAt: new Date().toISOString(), category: 'incensos' },
            { id: 3, name: 'Baralho Tarot Rider', description: 'Clássico baralho de Tarot para leituras.', price: 89.0, createdAt: new Date().toISOString(), category: 'tarot' },
            { id: 4, name: 'Pingente Ametista', description: 'Ametista para proteção e espiritualidade.', price: 59.0, createdAt: new Date().toISOString(), category: 'cristais' },
            { id: 5, name: 'Incenso Lavanda', description: 'Calmante e relaxante para o ambiente.', price: 17.5, createdAt: new Date().toISOString(), category: 'incensos' }
          ]
        }
        
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