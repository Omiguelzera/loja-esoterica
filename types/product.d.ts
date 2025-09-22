export interface Product {
  id: number
  name: string
  description: string
  price: number
  createdAt: string
  category: string
  // Campos de imagem
  imageUrl?: string
  thumbnailUrl?: string
  images?: {
    thumbnail: string
    card: string
    detail: string
    hero: string
  }
}