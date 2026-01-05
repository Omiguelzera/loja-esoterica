<template>
  <PageContainer>
    <div class="space-y-8">
      <!-- Header -->
      <PageHeader 
        title="Carrinho de Compras" 
        description="Revise seus itens antes de finalizar a compra"
      >
        <template #actions>
          <Button 
            v-if="detailed.length" 
            variant="outline" 
            size="sm" 
            @click="clear"
          >
            <Icon name="heroicons:trash" class="w-4 h-4 mr-2" />
            Limpar Carrinho
          </Button>
        </template>
      </PageHeader>

      <!-- Carrinho Vazio -->
      <div v-if="!detailed.length" class="elegant-border rounded-lg p-16 text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 mb-6">
          <Icon name="heroicons:shopping-cart" class="w-10 h-10 text-gray-400" />
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Seu carrinho está vazio
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Adicione produtos ao carrinho para continuar comprando
        </p>
        <NuxtLink to="/produtos">
          <Button size="lg">
            <Icon name="heroicons:sparkles" class="w-5 h-5 mr-2" />
            Explorar Produtos
          </Button>
        </NuxtLink>
      </div>

      <!-- Lista de Itens -->
      <div v-else class="grid gap-8 lg:grid-cols-3">
        <!-- Itens do Carrinho -->
        <div class="lg:col-span-2 space-y-4">
          <div 
            v-for="line in detailed" 
            :key="line.productId" 
            class="elegant-border rounded-lg p-6 hover:magic-glow transition-all"
          >
            <div class="flex items-start gap-4">
              <!-- Imagem do Produto -->
              <div class="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-4xl flex-shrink-0">
                🔮
              </div>
              
              <!-- Informações do Produto -->
              <div class="flex-1 min-w-0 space-y-2">
                <NuxtLink 
                  :to="`/produtos/${line.productId}`" 
                  class="font-semibold text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
                >
                  {{ line.product?.name || 'Produto' }}
                </NuxtLink>
                
                <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {{ line.product?.description }}
                </p>
                
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {{ line.product?.category }}
                  </span>
                  <span class="text-sm text-gray-500">
                    R$ {{ line.product?.price.toFixed(2) }}
                  </span>
                </div>

                <!-- Controles de Quantidade -->
                <div class="flex items-center gap-4 pt-2">
                  <div class="flex items-center gap-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Quantidade:
                    </label>
                    <input 
                      type="number" 
                      min="1" 
                      max="99"
                      class="w-20 px-3 py-1.5 elegant-border rounded-lg text-center text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all" 
                      :value="line.qty" 
                      @change="(e: Event) => updateQty(line.productId, (e.target as HTMLInputElement).valueAsNumber)" 
                    />
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    class="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" 
                    @click="remove(line.productId)"
                  >
                    <Icon name="heroicons:trash" class="w-4 h-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </div>

              <!-- Preço Total do Item -->
              <div class="text-right font-semibold text-xl text-gray-900 dark:text-white flex-shrink-0">
                R$ {{ line.lineTotal.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo do Pedido -->
        <div class="lg:col-span-1">
          <div class="elegant-border rounded-lg p-6 sticky top-24 space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Resumo do Pedido
            </h2>
            
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Itens ({{ totalItems }})</span>
                <span class="font-medium text-gray-900 dark:text-white">
                  R$ {{ grandTotal.toFixed(2) }}
                </span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Frete</span>
                <span class="font-medium text-green-600">Grátis</span>
              </div>
              
              <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    R$ {{ grandTotal.toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <Button 
                :disabled="!detailed.length" 
                @click="checkout" 
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                <Icon name="heroicons:shopping-bag" class="w-5 h-5 mr-2" />
                Finalizar Compra
              </Button>
              
              <NuxtLink to="/produtos">
                <Button variant="outline" class="w-full">
                  <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
                  Continuar Comprando
                </Button>
              </NuxtLink>
            </div>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p class="text-xs text-gray-600 dark:text-gray-400">
                <Icon name="heroicons:information-circle" class="w-4 h-4 inline mr-1" />
                Frete grátis para compras acima de R$ 100,00. Esta é uma loja de demonstração.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import { useToasts } from '@/composables/useToasts'

// Carregar produtos
const productsStore = useProductsStore()
if (!productsStore.items.length) {
  productsStore.fetch().catch(err => console.warn('Falha ao carregar produtos para o carrinho', err))
}

const cart = useCartStore()
const { success, warning } = useToasts()

const detailed = computed(() => cart.detailed)
const totalItems = computed(() => cart.totalItems)
const grandTotal = computed(() => cart.grandTotal)

const updateQty = (productId: number, qty: number) => {
  const product = detailed.value.find(item => item.productId === productId)
  cart.setQty(productId, qty)
  
  if (qty === 0) {
    warning('Item removido', `${product?.product?.name || 'Produto'} foi removido do carrinho`)
  } else {
    success('Quantidade atualizada', `${product?.product?.name || 'Produto'}: ${qty} unidade(s)`)
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
    success('Processando...', 'Preparando checkout')
    setTimeout(() => {
      navigateTo('/checkout')
    }, 500)
  }
}

useHead({
  title: 'Carrinho - Loja Esotérica',
  meta: [
    { name: 'description', content: 'Revise seus itens e finalize sua compra' }
  ]
})
</script>
