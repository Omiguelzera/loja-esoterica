<template>
  <nav class="flex items-center gap-1">
    <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition" :class="{ 'bg-secondary/60 text-foreground': isActive(item.to) }">
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>
<script setup lang="ts">
import { useRoute } from '#imports'

interface Item { to: string; label: string }

const props = defineProps<{ items: Item[] }>()
const route = useRoute()
const isActive = (path: string) => route.path === path
</script>
