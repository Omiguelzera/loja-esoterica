import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../stores/cart.js'
import { useProductsStore } from '../stores/products.js'

// Minimal product seed
const seedProducts = [
  { id: 1, name: 'Incenso', description: 'Incenso natural', price: 10, category: 'aromas', createdAt: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'Cristal', description: 'Quartzo', price: 25, category: 'cristais', createdAt: '2024-01-02T00:00:00Z' }
]

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // prime products store
    const products = useProductsStore()
    // @ts-ignore internal direct assignment for test
    products.items = seedProducts as any
  })

  it('adds a new product line', () => {
    const cart = useCartStore()
    const products = useProductsStore()
    cart.add(products.items[0] as any)
    expect(cart.totalItems).toBe(1)
    expect(cart.detailed[0].lineTotal).toBe(10)
  })

  it('increments qty when adding same product', () => {
    const cart = useCartStore()
    const products = useProductsStore()
    cart.add(products.items[0] as any)
    cart.add(products.items[0] as any, 2)
    expect(cart.totalItems).toBe(3)
    expect(cart.detailed[0].lineTotal).toBe(30)
  })

  it('updates quantity via setQty and recalculates totals', () => {
    const cart = useCartStore()
    const products = useProductsStore()
    cart.add(products.items[1] as any)
    cart.setQty(products.items[1].id, 5)
    expect(cart.totalItems).toBe(5)
    expect(cart.grandTotal).toBe(25 * 5)
  })

  it('removes line when qty set to 0', () => {
    const cart = useCartStore()
    const products = useProductsStore()
    cart.add(products.items[0] as any)
    cart.setQty(products.items[0].id, 0)
    expect(cart.totalItems).toBe(0)
    expect(cart.lines.length).toBe(0)
  })
})
