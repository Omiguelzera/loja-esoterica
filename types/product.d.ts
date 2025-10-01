export interface Product {
  id: number
  name: string
  description: string
  price: number
  createdAt: string
  category: string
  // Sistema de imagens múltiplas
  images: ProductImage[]
  // Compatibilidade com sistema antigo
  imageUrl?: string
  thumbnailUrl?: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}