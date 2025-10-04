// Nuxt 3 configuration for Esoteric Products Store

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-10-04',
  devtools: { enabled: true },
  typescript: { strict: true, typeCheck: false },
  css: ['@/assets/css/tailwind.css', '@/assets/css/mystic.css'],
  ssr: true, // Importante para Vercel
  nitro: {
    preset: 'vercel-edge', // Configuração específica para Vercel
    compatibilityDate: '2025-09-22'
  },
  app: {
    head: {
      title: 'Loja Esotérica',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Produtos esotéricos, místicos e espirituais.' },
        { name: 'theme-color', content: '#0a0a0a' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  modules: [
    '@nuxtjs/color-mode',
    '@pinia/nuxt'
  ],
  components: [
    { path: '~/components/ui', prefix: '' },
    { path: '~/components', prefix: '' }
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    // private
    apiSecret: process.env.API_SECRET,
    public: {
      appName: 'Loja Esotérica'
    }
  }
})
