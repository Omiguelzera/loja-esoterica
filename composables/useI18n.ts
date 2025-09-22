import { ref, computed } from 'vue'

// Simple lightweight i18n stub (no lazy loading) just to demonstrate translations
// Usage: const { t, locale, setLocale } = useI18n()
// t('key') will fallback to same key if missing.

const dictionaries = {
  pt: {
    storeName: 'Loja Esotérica',
    welcome: 'Bem-vindo à Loja Esotérica',
    cart: 'Carrinho',
    add: 'Adicionar',
    addToCart: 'Adicionar ao Carrinho',
    added: 'Adicionado',
    inCart: (name: string) => `${name} no carrinho.`,
    checkout: 'Checkout',
    backToCart: 'Voltar ao Carrinho',
    emptyCart: 'Seu carrinho está vazio.',
    items: 'Itens',
    total: 'Total',
    finalize: 'Finalizar Compra',
    footerRights: 'Todos os direitos reservados.',
    viewProducts: 'Ver produtos',
    products: 'Produtos',
    discoverProducts: 'Descubra nossa coleção de produtos esotéricos',
    all: 'Todos',
    errorLoading: 'Erro ao carregar produtos',
    tryAgain: 'Tentar novamente',
    noProducts: 'Nenhum produto encontrado',
    noProductsDescription: 'Não há produtos disponíveis no momento'
  },
  en: {
    storeName: 'Esoteric Store',
    welcome: 'Welcome to the Esoteric Store',
    cart: 'Cart',
    add: 'Add',
    addToCart: 'Add to Cart',
    added: 'Added',
    inCart: (name: string) => `${name} in cart.`,
    checkout: 'Checkout',
    backToCart: 'Back to Cart',
    emptyCart: 'Your cart is empty.',
    items: 'Items',
    total: 'Total',
    finalize: 'Checkout',
    footerRights: 'All rights reserved.',
    viewProducts: 'View products',
    products: 'Products',
    discoverProducts: 'Discover our collection of esoteric products',
    all: 'All',
    errorLoading: 'Error loading products',
    tryAgain: 'Try again',
    noProducts: 'No products found',
    noProductsDescription: 'No products available at the moment'
  }
}

type Locale = keyof typeof dictionaries

let current = ref<Locale>('pt')

export function useI18n() {
  const locale = computed(() => current.value)
  const dict = computed(() => dictionaries[locale.value])

  function t(key: keyof typeof dictionaries['pt'], ...args: any[]): string {
    const value: any = dict.value[key] ?? key
    if (typeof value === 'function') return value(...args)
    return value as string
  }

  function setLocale(l: Locale) { if (dictionaries[l]) current.value = l }

  return { t, locale, setLocale, available: Object.keys(dictionaries) }
}
