/// <reference types="nuxt" />
/// <reference types="@pinia/nuxt" />
/// <reference types="@vueuse/core" />

import { Ref } from 'vue'

// Minimal declaration for useColorMode (auto-imported by @nuxtjs/color-mode)
declare global {
  function useColorMode(): { value: string; preference: string }
  
  // Nuxt auto-imports - global declarations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function definePageMeta(meta: any): void
  
  // useFetch return type
  interface UseFetchReturn<T> {
    data: Ref<T | null>
    pending: Ref<boolean>
    error: Ref<Error | null>
    refresh: () => Promise<void>
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function useFetch<T = any>(url: string): UseFetchReturn<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function useRoute(): any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function useHead(meta: any): void
}

// More specific path mapping declarations for TypeScript
declare module '@/stores/cart' {
  export function useCartStore(): any
}

declare module '@/stores/products' {
  export function useProductsStore(): any
}

declare module '@/composables/useToasts' {
  export function useToasts(): any
}

declare module '@/composables/useI18n' {
  export function useI18n(): any
}

export {}