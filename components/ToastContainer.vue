<template>
  <div class="fixed inset-0 pointer-events-none flex flex-col items-end gap-2 p-4 z-50">
    <transition-group name="toast-fade" tag="div" class="w-full flex flex-col items-end gap-2">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto w-full max-w-sm rounded-md border border-border bg-popover shadow-lg overflow-hidden"
        :class="variantClass(t.variant)"
        role="status"
        aria-live="polite"
      >
        <div class="p-4 space-y-2">
          <div class="flex items-start gap-3">
            <!-- Ícone baseado na variante -->
            <div class="flex-shrink-0 mt-0.5">
              <CheckCircle v-if="t.variant === 'success'" class="w-5 h-5 text-emerald-600" />
              <XCircle v-else-if="t.variant === 'error'" class="w-5 h-5 text-red-600" />
              <AlertTriangle v-else-if="t.variant === 'warning'" class="w-5 h-5 text-amber-600" />
              <Loader2 v-else-if="t.variant === 'loading'" class="w-5 h-5 text-blue-600 animate-spin" />
              <Info v-else class="w-5 h-5 text-blue-600" />
            </div>
            
            <!-- Conteúdo -->
            <div class="flex-1 min-w-0">
              <p v-if="t.title" class="text-sm font-medium leading-none text-foreground">{{ t.title }}</p>
              <p v-if="t.description" class="text-xs text-muted-foreground mt-1">{{ t.description }}</p>
              
              <!-- Botão de ação opcional -->
              <button 
                v-if="t.action" 
                type="button" 
                class="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm mt-2"
                @click="t.action.onClick"
              >
                {{ t.action.label }}
              </button>
            </div>
            
            <!-- Botão fechar (apenas se não for loading) -->
            <button 
              v-if="t.variant !== 'loading'" 
              type="button" 
              class="flex-shrink-0 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm p-1"
              @click="remove(t.id)" 
              :aria-label="`Fechar notificação: ${t.title || t.description}`"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, XCircle, AlertTriangle, Loader2, Info, X } from 'lucide-vue-next'
import { useToasts } from '@/composables/useToasts'

const { toasts, remove } = useToasts()

function variantClass(variant: string) {
  switch (variant) {
    case 'success':
      return 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950'
    case 'error':
      return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
    case 'warning':
      return 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950'
    case 'loading':
      return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
    default:
      return 'border-border bg-background'
  }
}
</script>

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active { 
  transition: all 0.3s ease; 
}
.toast-fade-enter-from, .toast-fade-leave-to { 
  opacity: 0; 
  transform: translateX(100%) scale(0.95); 
}
.toast-fade-move {
  transition: transform 0.3s ease;
}
</style>
