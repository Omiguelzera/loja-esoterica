import { defineStore } from 'pinia'
import type { Product } from './products.js'
import { useProductsStore } from './products.js'

export interface CartLine {
  productId: number
  qty: number
}

interface State {
  lines: CartLine[]
}

export interface DetailedLine extends CartLine {
  product?: Product
  lineTotal: number
}

export const useCartStore = defineStore('cart', {
  state: (): State => ({ lines: [] }),
  getters: {
    totalItems: (s) => s.lines.reduce((acc, l) => acc + l.qty, 0),
    hasItems(): boolean { return this.lines.length > 0 },
    // requires products store
    detailed: (s): DetailedLine[] => {
      const productsStore = useProductsStore()
      const products = productsStore.items
      return s.lines.map(l => {
	const p = products.find((prod: Product) => prod.id === l.productId)
        return { ...l, product: p, lineTotal: p ? p.price * l.qty : 0 } as DetailedLine
      })
    },
    grandTotal(): number { return this.detailed.reduce((acc: number, l: DetailedLine) => acc + l.lineTotal, 0) }
  },
  actions: {
    add(product: Product, qty = 1) {
      const line = this.lines.find(l => l.productId === product.id)
      if (line) line.qty += qty
      else this.lines.push({ productId: product.id, qty })
    },
    remove(productId: number) {
      this.lines = this.lines.filter(l => l.productId !== productId)
    },
    setQty(productId: number, qty: number) {
      const line = this.lines.find(l => l.productId === productId)
      if (!line) return
      if (qty <= 0) this.remove(productId)
      else line.qty = qty
    },
    clear() { this.lines = [] }
  }
})