// Utilidades para gerar imagens fictícias para produtos
const PLACEHOLDER_SERVICES = {
  picsum: (width: number, height: number, seed?: string) => 
    `https://picsum.photos/seed/${seed || 'default'}/${width}/${height}`,
  unsplash: (width: number, height: number, category?: string, seed?: string) =>
    `https://source.unsplash.com/${width}x${height}/?${category}${seed ? `&sig=${seed}` : ''}`,
  placeholder: (width: number, height: number, text?: string) =>
    `https://via.placeholder.com/${width}x${height}/6366f1/ffffff?text=${encodeURIComponent(text || 'Produto')}`
}

// Mapeamento específico por produto (baseado nos produtos reais da loja)
const PRODUCT_SPECIFIC_IMAGES = {
  // Incenso Sândalo (ID: 2)
  2: {
    name: 'Incenso Sândalo',
    images: [
      'https://images.unsplash.com/photo-1544913675-6d1f1aa96c4d?w=400&h=300&fit=crop', // sandalwood incense
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', // aromatherapy
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', // zen meditation
    ]
  },
  // Cristal Quartzo (ID: 1)
  1: {
    name: 'Cristal Quartzo',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', // clear quartz
      'https://images.unsplash.com/photo-1616340924537-9c53d3bf1b44?w=400&h=300&fit=crop', // quartz crystal
      'https://images.unsplash.com/photo-1602190138720-b4e7dea3b9ab?w=400&h=300&fit=crop', // healing crystals
    ]
  },
  // Baralho Tarot Rider (ID: 3)
  3: {
    name: 'Baralho Tarot Rider',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0d6224d2983?w=400&h=300&fit=crop', // tarot cards
      'https://images.unsplash.com/photo-1578068959713-e53a984ed25d?w=400&h=300&fit=crop', // mystical cards
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop', // fortune telling
    ]
  },
  // Pingente Ametista (ID: 4)
  4: {
    name: 'Pingente Ametista',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop', // amethyst jewelry
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=300&fit=crop', // crystal pendant
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop', // spiritual jewelry
    ]
  },
  // Incenso Lavanda (ID: 5)
  5: {
    name: 'Incenso Lavanda',
    images: [
      'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=400&h=300&fit=crop', // lavender incense
      'https://images.unsplash.com/photo-1574263867128-a3d5c1b1decc?w=400&h=300&fit=crop', // lavender aromatherapy
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', // relaxing scents
    ]
  },
  // Tarot dos Anjos (ID: 6)
  6: {
    name: 'Tarot dos Anjos',
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=400&h=300&fit=crop', // angel cards
      'https://images.unsplash.com/photo-1594736797933-d0d6224d2983?w=400&h=300&fit=crop', // spiritual cards
      'https://images.unsplash.com/photo-1578068959713-e53a984ed25d?w=400&h=300&fit=crop', // divine guidance
    ]
  },
  // Vela Proteção (ID: 7)
  7: {
    name: 'Vela Proteção',
    images: [
      'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=300&fit=crop', // protection candle
      'https://images.unsplash.com/photo-1551041403-e4eeffc9b4b8?w=400&h=300&fit=crop', // ritual candle
      'https://images.unsplash.com/photo-1606315149858-0e5a4b5e0c60?w=400&h=300&fit=crop', // spiritual candle
    ]
  },
  // Pedra da Lua (ID: 8)
  8: {
    name: 'Pedra da Lua',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', // moonstone
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop', // lunar crystal
      'https://images.unsplash.com/photo-1602190138720-b4e7dea3b9ab?w=400&h=300&fit=crop', // feminine crystal
    ]
  }
}

// Mapeamento de categorias para imagens temáticas (fallback para produtos sem mapeamento específico)
const CATEGORY_IMAGES = {
  incensos: [
    'https://images.unsplash.com/photo-1544913675-6d1f1aa96c4d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1574263867128-a3d5c1b1decc?w=400&h=300&fit=crop'
  ],
  cristais: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1616340924537-9c53d3bf1b44?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1602190138720-b4e7dea3b9ab?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  ],
  tarot: [
    'https://images.unsplash.com/photo-1594736797933-d0d6224d2983?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578068959713-e53a984ed25d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=400&h=300&fit=crop'
  ],
  velas: [
    'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1543877087-ebf71fde2be1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1551041403-e4eeffc9b4b8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1606315149858-0e5a4b5e0c60?w=400&h=300&fit=crop'
  ],
  livros: [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop'
  ],
  joias: [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1544113992-1ba83d8c1045?w=400&h=300&fit=crop'
  ]
}


export interface ProductImageOptions {
  width?: number
  height?: number
  category?: string
  productId?: number
  fallbackText?: string
  useGradient?: boolean
}

export function getProductImage(options: ProductImageOptions = {}): string {
  const {
    width = 400,
    height = 300,
    category = 'default',
    productId = 1,
    fallbackText,
    useGradient = false
  } = options

  // Se usar gradiente, usar serviço de placeholder simples
  if (useGradient) {
    return PLACEHOLDER_SERVICES.placeholder(width, height, getCategoryText(category))
  }

  // Primeiro, tentar usar imagem específica do produto
  const specificProduct = PRODUCT_SPECIFIC_IMAGES[productId as keyof typeof PRODUCT_SPECIFIC_IMAGES]
  if (specificProduct) {
    const imageIndex = 0 // Usar sempre a primeira imagem como principal
    return specificProduct.images[imageIndex]
  }

  // Fallback: usar imagens por categoria
  try {
    const categoryImages = CATEGORY_IMAGES[category as keyof typeof CATEGORY_IMAGES] || CATEGORY_IMAGES.cristais
    const imageIndex = (productId - 1) % categoryImages.length
    return categoryImages[imageIndex]
  } catch {
    // Fallback para placeholder simples
    return PLACEHOLDER_SERVICES.placeholder(width, height, getCategoryText(category))
  }
}

function getCategoryText(category: string): string {
  const textMap: Record<string, string> = {
    incensos: 'INCENSO',
    cristais: 'CRISTAL',
    tarot: 'TAROT',
    velas: 'VELA',
    livros: 'LIVRO',
    joias: 'JOIA',
    default: 'PRODUTO'
  }
  return textMap[category] || textMap.default
}



// Função para obter múltiplas variações de imagem para um produto
export function getProductImageVariations(productId: number, category: string, productName: string) {
  // Primeiro, verificar se existe mapeamento específico para o produto
  const specificProduct = PRODUCT_SPECIFIC_IMAGES[productId as keyof typeof PRODUCT_SPECIFIC_IMAGES]
  
  if (specificProduct) {
    // Usar as imagens específicas do produto
    return {
      thumbnail: specificProduct.images[0] || specificProduct.images[0],
      card: specificProduct.images[0] || specificProduct.images[1] || specificProduct.images[0],
      detail: specificProduct.images[1] || specificProduct.images[0],
      hero: specificProduct.images[2] || specificProduct.images[1] || specificProduct.images[0],
      gradient: PLACEHOLDER_SERVICES.placeholder(300, 200, getCategoryText(category))
    }
  }

  // Fallback: usar imagens por categoria
  const categoryImages = CATEGORY_IMAGES[category as keyof typeof CATEGORY_IMAGES] || CATEGORY_IMAGES.cristais
  
  // Usar diferentes imagens da mesma categoria para variações
  const getImageForVariation = (offset: number) => {
    const imageIndex = ((productId - 1) + offset) % categoryImages.length
    return categoryImages[imageIndex]
  }
  
  return {
    thumbnail: getImageForVariation(0),
    card: getImageForVariation(1),
    detail: getImageForVariation(2),
    hero: getImageForVariation(3),
    gradient: PLACEHOLDER_SERVICES.placeholder(300, 200, getCategoryText(category))
  }
}

export function getEmojiForCategory(category: string): string {
  const emojiMap: Record<string, string> = {
    incensos: '🕯️',
    cristais: '💎',
    tarot: '🔮',
    velas: '🕯️',
    livros: '📚',
    joias: '💍',
    default: '🔮'
  }
  return emojiMap[category] || emojiMap.default
}