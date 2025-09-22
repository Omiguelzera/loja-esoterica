<template>
  <div class="container-responsive py-10" v-if="product">
    <div class="grid gap-10 md:grid-cols-2">
      <div class="space-y-4">
        <div class="aspect-square rounded-lg overflow-hidden bg-muted">
          <img 
            v-if="product.images?.detail" 
            :src="product.images.detail" 
            :alt="product.name"
            class="w-full h-full object-cover"
            loading="lazy"
            @error="handleImageError"
          />
          <div v-else class="w-full h-full bg-gradient-to-br from-primary/30 to-background flex items-center justify-center text-primary text-6xl">
            {{ getEmojiForCategory(product.category) }}
          </div>
        </div>
        <!-- Miniaturas das outras imagens -->
        <div class="grid grid-cols-4 gap-2" v-if="product.images">
          <div 
            v-for="(imageUrl, type) in product.images" 
            :key="type"
            class="aspect-square rounded border border-border overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition"
            @click="setMainImage(imageUrl)"
          >
            <img :src="imageUrl" :alt="`${product.name} - ${type}`" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
      <div class="space-y-6">
        <div class="space-y-3">
          <div class="flex items-start gap-3 flex-wrap">
            <h1 class="text-3xl font-bold tracking-tight">{{ product.name }}</h1>
            <Badge variant="outline">{{ product.category }}</Badge>
          </div>
          <p class="text-muted-foreground">{{ product.description }}</p>
        </div>
        <div class="flex items-center gap-4 text-lg">
          <span class="font-semibold text-primary">R$ {{ product.price.toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground">Criado: {{ createdAtLabel }}</span>
        </div>
  <Button variant="primary" size="lg" @click="addToCart" :disabled="!product">{{ t('addToCart') }}</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useToasts } from '@/composables/useToasts'
import type { Product } from '@/types/product'
import { formatShort } from '@/lib/date'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const id = Number(route.params.id)
const { data: products } = await useFetch<Product[]>('/api/products')
const product = computed(() => products.value?.find((p: Product) => p.id === id))

const createdAtLabel = computed(() => product.value ? formatShort(product.value.createdAt) : '')
const cart = useCartStore()
const { add: addToast } = useToasts()
const { t } = useI18n()

const mainImage = ref('')
const imageError = ref(false)

const addToCart = () => { 
  if (product.value) { 
    cart.add(product.value, 1)
    addToast({ variant: 'success', title: t('added'), description: t('inCart', product.value.name) })
  }
}

const handleImageError = () => {
  imageError.value = true
}

const setMainImage = (imageUrl: string) => {
  mainImage.value = imageUrl
}

const getEmojiForCategory = (category: string): string => {
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

// Dynamic SEO meta when product available
watchEffect(() => {
  if (!product.value) return
  const title = product.value.name + ' | ' + t('storeName')
  const description = (product.value.description || '').slice(0, 155)
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'product' },
      { property: 'product:price:amount', content: product.value.price.toFixed(2) },
      { property: 'product:price:currency', content: 'BRL' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description }
    ]
  })
})
</script>