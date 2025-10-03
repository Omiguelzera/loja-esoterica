<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold tracking-tight">Minha Conta</h1>
      <div class="flex items-center gap-2">
        <span class="text-lg">{{ user?.avatar || '👤' }}</span>
        <span class="text-sm text-muted-foreground">{{ user?.name }}</span>
      </div>
    </div>
    
    <!-- Cards de estatísticas do cliente -->
    <div class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
      <Card>
        <div class="p-4 sm:p-6 space-y-1">
          <p class="text-sm text-muted-foreground">Pedidos Realizados</p>
          <p class="text-2xl font-semibold">{{ stats.orders }}</p>
        </div>
      </Card>
      <Card>
        <div class="p-4 sm:p-6 space-y-1">
          <p class="text-sm text-muted-foreground">Produtos Favoritos</p>
          <p class="text-2xl font-semibold">{{ stats.favorites }}</p>
        </div>
      </Card>
      <Card>
        <div class="p-4 sm:p-6 space-y-1">
          <p class="text-sm text-muted-foreground">Total Gasto</p>
          <p class="text-2xl font-semibold">R$ {{ stats.totalSpent.toFixed(2) }}</p>
        </div>
      </Card>
    </div>

    <!-- Seções do cliente -->
    <div class="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
      <!-- Pedidos Recentes -->
      <Card>
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package class="w-5 h-5" />
            Pedidos Recentes
          </h3>
          <div class="space-y-3">
            <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div>
                <p class="font-medium">Pedido #{{ order.id }}</p>
                <p class="text-sm text-muted-foreground">{{ formatDate(order.date) }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold">R$ {{ order.total.toFixed(2) }}</p>
                <span class="text-xs px-2 py-1 rounded-full" :class="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
              </div>
            </div>
            <div v-if="recentOrders.length === 0" class="text-center text-muted-foreground py-6">
              Nenhum pedido encontrado
            </div>
          </div>
        </div>
      </Card>

      <!-- Produtos Favoritos -->
      <Card>
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <Heart class="w-5 h-5" />
            Favoritos
          </h3>
          <div class="space-y-3">
            <div v-for="product in favoriteProducts" :key="product.id" class="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
              <div class="w-12 h-12 rounded bg-gradient-to-br from-primary/30 to-background flex items-center justify-center text-primary">
                🔮
              </div>
              <div class="flex-1">
                <p class="font-medium">{{ product.name }}</p>
                <p class="text-sm text-muted-foreground">R$ {{ product.price.toFixed(2) }}</p>
              </div>
              <NuxtLink :to="`/produto/${product.id}`">
                <Button size="sm" variant="outline">Ver</Button>
              </NuxtLink>
            </div>
            <div v-if="favoriteProducts.length === 0" class="text-center text-muted-foreground py-6">
              Nenhum favorito ainda
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Ações rápidas -->
    <Card>
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Ações Rápidas</h3>
        <div class="flex gap-4 flex-wrap">
          <NuxtLink to="/produtos">
            <Button class="flex items-center gap-2">
              <ShoppingBag class="w-4 h-4" />
              Continuar Comprando
            </Button>
          </NuxtLink>
          <NuxtLink to="/carrinho">
            <Button variant="outline" class="flex items-center gap-2">
              <ShoppingCart class="w-4 h-4" />
              Ver Carrinho
            </Button>
          </NuxtLink>
          <Button variant="outline" class="flex items-center gap-2" @click="showProfile = true">
            <User class="w-4 h-4" />
            Editar Perfil
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Package, Heart, ShoppingBag, ShoppingCart, User } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const { user } = useAuth()
const showProfile = ref(false)

// Stats mockados para o cliente
const stats = ref({
  orders: 3,
  favorites: 5,
  totalSpent: 247.50
})

// Pedidos recentes mockados
const recentOrders = ref([
  {
    id: '001',
    date: new Date('2024-09-20'),
    total: 89.90,
    status: 'Entregue'
  },
  {
    id: '002',
    date: new Date('2024-09-15'),
    total: 157.60,
    status: 'Em trânsito'
  }
])

// Produtos favoritos mockados
const favoriteProducts = ref([
  {
    id: 1,
    name: 'Cristal Quartzo Rosa',
    price: 25.90
  },
  {
    id: 2,
    name: 'Incenso Sândalo',
    price: 12.50
  }
])

const formatDate = (date: Date) => {
  return date.toLocaleDateString('pt-BR')
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Entregue':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'Em trânsito':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'Processando':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}
</script>