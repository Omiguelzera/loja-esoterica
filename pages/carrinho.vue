<template>
  <div class="container-responsive py-10 space-y-8">
  <h1 class="text-3xl font-bold tracking-tight">{{ t('cart') }}</h1>
  <div v-if="!detailed.length" class="text-muted-foreground">{{ t('emptyCart') }}</div>
    <div v-else class="grid gap-8 md:grid-cols-3">
      <div class="md:col-span-2 space-y-4">
        <div v-for="line in detailed" :key="line.productId" class="flex items-start gap-4 rounded-lg border border-border p-4 bg-card">
          <div class="w-20 h-20 rounded bg-gradient-to-br from-primary/30 to-background flex items-center justify-center text-primary text-2xl">🔮</div>
          <div class="flex-1 space-y-1">
            <NuxtLink :to="`/produto/${line.productId}`" class="font-medium hover:text-primary transition-colors">{{ line.product?.name || 'Produto' }}</NuxtLink>
            <div class="text-sm text-muted-foreground line-clamp-2">{{ line.product?.description }}</div>
            <div class="text-xs text-muted-foreground">Categoria: {{ line.product?.category }}</div>
            <div class="flex items-center gap-3 pt-2">
              <label class="text-xs uppercase tracking-wide text-muted-foreground">Qtd</label>
              <input type="number" min="1" class="w-20 h-8 rounded-md border border-input bg-background px-2 text-sm" :value="line.qty" @change="(e: Event) => updateQty(line.productId, (e.target as HTMLInputElement).valueAsNumber)" />
              <Button size="sm" variant="ghost" class="text-destructive hover:text-destructive" @click="remove(line.productId)">Remover</Button>
            </div>
          </div>
          <div class="text-right font-medium w-24">R$ {{ line.lineTotal.toFixed(2) }}</div>
        </div>
      </div>
      <div class="space-y-4 self-start">
        <div class="rounded-lg border border-border p-4 bg-card space-y-2">
          <h2 class="font-semibold">Resumo</h2>
          <div class="flex justify-between text-sm"><span>{{ t('items') }}</span><span>{{ totalItems }}</span></div>
          <div class="flex justify-between text-sm"><span>{{ t('total') }}</span><span class="font-semibold">R$ {{ grandTotal.toFixed(2) }}</span></div>
          <div class="pt-2 flex flex-col gap-2">
            <Button :disabled="!detailed.length" @click="checkout" variant="primary">{{ t('finalize') }}</Button>
            <Button :disabled="!detailed.length" @click="clear" variant="outline">Limpar</Button>
          </div>
        </div>
        <p class="text-xs text-muted-foreground">Frete e impostos calculados no checkout. Esta é uma simulação local.</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import { useI18n } from '@/composables/useI18n'
import { useToasts } from '@/composables/useToasts'

// ensure products loaded so detailed can resolve product refs
const productsStore = useProductsStore()
if (!productsStore.items.length) {
  // best-effort hydration of products from API through products store
  // silent await; ignoring error for mock API
  // eslint-disable-next-line no-console
  productsStore.fetch().catch(err => console.warn('Falha ao carregar produtos para o carrinho', err))
}

const cart = useCartStore()
const { success, warning } = useToasts()
const { t } = useI18n()

const detailed = computed(() => cart.detailed)
const totalItems = computed(() => cart.totalItems)
const grandTotal = computed(() => cart.grandTotal)

const updateQty = (productId: number, qty: number) => {
  const product = detailed.value.find(item => item.productId === productId)
  cart.setQty(productId, qty)
  
  if (qty === 0) {
    warning('Item removido', `${product?.product?.name || 'Produto'} foi removido do carrinho`)
  }
}

const remove = (productId: number) => {
  const product = detailed.value.find(item => item.productId === productId)
  cart.remove(productId)
  warning('Item removido', `${product?.product?.name || 'Produto'} foi removido do carrinho`)
}

const clear = () => {
  if (cart.totalItems > 0) {
    cart.clear()
    success('Carrinho limpo', 'Todos os itens foram removidos do carrinho')
  }
}

const checkout = () => {
  if (cart.totalItems === 0) {
    warning('Carrinho vazio', 'Adicione produtos ao carrinho antes de finalizar')
  } else {
    success('Redirecionando...', 'Indo para a finalização da compra')
    setTimeout(() => {
      alert('Fluxo de checkout não implementado.')
    }, 1000)
  }
}
</script>
