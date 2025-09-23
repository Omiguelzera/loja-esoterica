<template>
  <div class="rounded-lg border border-border overflow-hidden bg-card hover:shadow-lg transition shadow-sm flex flex-col h-full">
    <NuxtLink :to="`/produto/${product.id}`" class="group flex-1 flex flex-col">
      <div class="aspect-video relative overflow-hidden bg-muted">
        <img 
          v-if="product.imageUrl" 
          :src="product.imageUrl" 
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          @error="handleImageError"
        />
        <div v-else class="w-full h-full bg-gradient-to-br from-primary/30 to-background flex items-center justify-center text-primary">
          <span class="text-4xl">{{ getEmojiForCategory(product.category) }}</span>
        </div>
      </div>
      <div class="p-4 flex flex-col gap-2 flex-1">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-semibold leading-tight group-hover:text-primary transition-colors">{{ product.name }}</h3>
          <Badge variant="outline" class="shrink-0">{{ product.category }}</Badge>
        </div>
        <p class="text-sm text-muted-foreground line-clamp-2">{{ product.description }}</p>
        <div class="mt-auto flex items-center justify-between pt-2">
          <span class="font-bold">R$ {{ product.price.toFixed(2) }}</span>
          <span class="text-xs text-muted-foreground">{{ dateLabel }}</span>
        </div>
      </div>
    </NuxtLink>
    <div class="p-3 border-t bg-muted/30 flex items-center justify-end">
      <Button size="sm" variant="outline" @click.stop="addToCart" :aria-label="t('add') + ' ' + product.name" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70">{{ t('add') }}</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatMonthDay } from '@/lib/date'
import { useCartStore } from '@/stores/cart'
import { useToasts } from '@/composables/useToasts'
import { useI18n } from '@/composables/useI18n'
import type { Product } from '@/types/product'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const dateLabel = computed(() => formatMonthDay(props.product.createdAt))
const cart = useCartStore()
const { success } = useToasts()
const { t } = useI18n()

const imageError = ref(false)

const addToCart = () => {
  cart.add(props.product, 1)
  success(t('added'), t('inCart', props.product.name))
}

const handleImageError = () => {
  imageError.value = true
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
</script>
