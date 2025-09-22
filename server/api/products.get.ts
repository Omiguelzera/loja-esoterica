import { defineEventHandler, getQuery } from 'h3'
import { getProductImageVariations } from '../../lib/product-images.js'

interface Product {
  id: number
  name: string
  description: string
  price: number
  createdAt: string
  category: string
  imageUrl?: string
  thumbnailUrl?: string
  images?: {
    thumbnail: string
    card: string
    detail: string
    hero: string
  }
}

const baseProducts = [
  { id: 1, name: 'Cristal Quartzo', description: 'Pedra de cura e amplificação energética.', price: 49.9, createdAt: new Date().toISOString(), category: 'cristais' },
  { id: 2, name: 'Incenso Sândalo', description: 'Aroma suave para limpeza energética.', price: 19.9, createdAt: new Date().toISOString(), category: 'incensos' },
  { id: 3, name: 'Baralho Tarot Rider', description: 'Clássico baralho de Tarot para leituras.', price: 89.0, createdAt: new Date().toISOString(), category: 'tarot' },
  { id: 4, name: 'Pingente Ametista', description: 'Ametista para proteção e espiritualidade.', price: 59.0, createdAt: new Date().toISOString(), category: 'cristais' },
  { id: 5, name: 'Incenso Lavanda', description: 'Calmante e relaxante para o ambiente.', price: 17.5, createdAt: new Date().toISOString(), category: 'incensos' },
  { id: 6, name: 'Tarot dos Anjos', description: 'Baralho angelical para mensagens divinas.', price: 99.9, createdAt: new Date().toISOString(), category: 'tarot' },
  { id: 7, name: 'Vela Proteção', description: 'Vela artesanal para rituais de proteção.', price: 25.0, createdAt: new Date().toISOString(), category: 'velas' },
  { id: 8, name: 'Pedra da Lua', description: 'Cristal para intuição e feminino sagrado.', price: 45.0, createdAt: new Date().toISOString(), category: 'cristais' },
  { id: 9, name: 'Incenso Mirra', description: 'Incenso tradicional para purificação.', price: 22.0, createdAt: new Date().toISOString(), category: 'incensos' },
  { id: 10, name: 'Livro Runas', description: 'Guia completo sobre simbolos rúnicos.', price: 65.0, createdAt: new Date().toISOString(), category: 'livros' }
]

// Adicionar imagens aos produtos
const products: Product[] = baseProducts.map(product => {
  const images = getProductImageVariations(product.id, product.category, product.name)
  return {
    ...product,
    imageUrl: images.card,
    thumbnailUrl: images.thumbnail,
    images
  }
})

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const limit = query.limit ? parseInt(query.limit as string, 10) : undefined
  if (limit) return products.slice(0, limit)
  const category = query.category as string | undefined
  if (category) return products.filter(p => p.category === category)
  return products
})
