// Lightweight exports for '#imports' module
// Nuxt will generate full types in .nuxt but we excluded that folder.

import { Ref } from 'vue'

// Nuxt page meta
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function definePageMeta(meta: any): void

// Nuxt composables
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetch<T = any>(url: string): { data: Ref<T | null> }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRoute(): any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useHead(meta: any): void