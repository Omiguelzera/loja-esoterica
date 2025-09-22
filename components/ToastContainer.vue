<template>
  <div class="fixed inset-0 pointer-events-none flex flex-col items-end gap-2 p-4 z-50">
    <transition-group name="toast-fade" tag="div" class="w-full flex flex-col items-end gap-2">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto w-full max-w-xs rounded-md border border-border bg-popover shadow-lg overflow-hidden"
        :class="variantClass(t.variant)"
        role="status"
        aria-live="polite"
      >
        <div class="p-3 space-y-1">
          <p v-if="t.title" class="text-sm font-medium leading-none">{{ t.title }}</p>
          <p v-if="t.description" class="text-xs text-muted-foreground">{{ t.description }}</p>
          <div class="flex justify-end pt-1">
            <button type="button" class="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm" @click="remove(t.id)" :aria-label="`Fechar notificação: ${t.title || t.description}`">Fechar</button>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import { useToasts } from '@/composables/useToasts'
const { toasts, remove } = useToasts()

function variantClass(variant: string) {
  switch (variant) {
    case 'success':
      return 'border-emerald-500/40 bg-emerald-500/10'
    case 'error':
      return 'border-destructive/40 bg-destructive/10'
    default:
      return ''
  }
}
</script>
<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active { transition: all .25s ease; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateY(6px); }
</style>
