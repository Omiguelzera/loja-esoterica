<template>
  <aside :class="['bg-card border-r border-border flex flex-col w-60 shrink-0']">
    <div class="p-4 border-b border-border font-semibold text-primary flex items-center gap-2">
      <span>🔮 Painel</span>
    </div>
    <nav class="flex-1 overflow-y-auto py-4 text-sm">
      <ul class="space-y-1 px-3">
        <li v-for="item in items" :key="item.to">
          <NuxtLink :to="item.to" class="group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary/40 transition text-muted-foreground hover:text-foreground" :class="{ 'bg-secondary/50 text-foreground': isActive(item.to) }">
            <component :is="item.icon" class="w-4 h-4 text-primary" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="p-4 border-t border-border text-xs text-muted-foreground">Versão 0.1.0</div>
  </aside>
</template>
<script setup lang="ts">
import { useRoute } from '#imports'
import { BookOpen, Package, Settings } from 'lucide-vue-next'

interface NavItem { to: string; label: string; icon: any }

const items: NavItem[] = [
  { to: '/dashboard', label: 'Visão Geral', icon: BookOpen },
  { to: '/dashboard/produtos', label: 'Produtos', icon: Package },
  { to: '/dashboard/configuracoes', label: 'Configurações', icon: Settings }
]

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>
