<template>
  <component :is="iconComponent" :class="className" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: 'w-4 h-4'
})

// Mapeamento de ícones heroicons para lucide
const iconMap: Record<string, string> = {
  // Ícones comuns
  'heroicons:arrow-path': 'RotateCw',
  'heroicons:arrow-left': 'ArrowLeft',
  'heroicons:arrow-right': 'ArrowRight',
  'heroicons:chevron-down': 'ChevronDown',
  'heroicons:chevron-right': 'ChevronRight',
  'heroicons:chevron-left': 'ChevronLeft',
  'heroicons:chevron-up': 'ChevronUp',
  'heroicons:x-mark': 'X',
  'heroicons:plus': 'Plus',
  'heroicons:minus': 'Minus',
  
  // Ícones de usuário
  'heroicons:user': 'User',
  'heroicons:user-circle': 'UserCircle',
  'heroicons:users': 'Users',
  'heroicons:user-plus': 'UserPlus',
  
  // Ícones de navegação
  'heroicons:home': 'Home',
  'heroicons:cog-6-tooth': 'Settings',
  'heroicons:bars-3': 'Menu',
  'heroicons:magnifying-glass': 'Search',
  
  // Ícones de e-commerce
  'heroicons:shopping-cart': 'ShoppingCart',
  'heroicons:shopping-bag': 'ShoppingBag',
  'heroicons:credit-card': 'CreditCard',
  'heroicons:currency-dollar': 'DollarSign',
  
  // Ícones de status
  'heroicons:check': 'Check',
  'heroicons:check-circle': 'CheckCircle',
  'heroicons:x-circle': 'XCircle',
  'heroicons:exclamation-triangle': 'AlertTriangle',
  'heroicons:information-circle': 'Info',
  
  // Ícones de ação
  'heroicons:pencil': 'Edit',
  'heroicons:trash': 'Trash2',
  'heroicons:eye': 'Eye',
  'heroicons:eye-slash': 'EyeOff',
  'heroicons:heart': 'Heart',
  'heroicons:star': 'Star',
  
  // Ícones de comunicação
  'heroicons:envelope': 'Mail',
  'heroicons:phone': 'Phone',
  'heroicons:bell': 'Bell',
  'heroicons:chat-bubble-left': 'MessageCircle',
  
  // Ícones de documento
  'heroicons:document': 'File',
  'heroicons:document-text': 'FileText',
  'heroicons:folder': 'Folder',
  'heroicons:printer': 'Printer',
  
  // Ícones de tempo
  'heroicons:clock': 'Clock',
  'heroicons:calendar': 'Calendar',
  
  // Ícones de localização
  'heroicons:map-pin': 'MapPin',
  'heroicons:globe-alt': 'Globe',
  
  // Ícones de mídia
  'heroicons:photo': 'Image',
  'heroicons:play': 'Play',
  'heroicons:pause': 'Pause',
  
  // Ícones de sistema
  'heroicons:wifi': 'Wifi',
  'heroicons:signal': 'Signal',
  'heroicons:battery-100': 'Battery',
  
  // Ícones específicos
  'heroicons:truck': 'Truck',
  'heroicons:gift': 'Gift',
  'heroicons:key': 'Key',
  'heroicons:shield-check': 'ShieldCheck',
  'heroicons:lock-closed': 'Lock',
  'heroicons:lock-open': 'Unlock',
  
  // Ícones de dashboard
  'heroicons:squares-2x2': 'LayoutGrid',
  'heroicons:chart-bar': 'BarChart3',
  'heroicons:presentation-chart-line': 'TrendingUp',
  
  // Ícones de logout
  'heroicons:arrow-right-on-rectangle': 'LogOut'
}

const iconComponent = computed(() => {
  const mappedName = iconMap[props.name] || props.name
  
  try {
    // Importar dinamicamente do lucide-vue-next
    return defineAsyncComponent(async () => {
      const module = await import('lucide-vue-next')
      return module[mappedName] || module.HelpCircle // Fallback icon
    })
  } catch (error) {
    console.warn(`Icon "${props.name}" not found, using fallback`)
    return defineAsyncComponent(async () => {
      const module = await import('lucide-vue-next')
      return module.HelpCircle
    })
  }
})

const className = computed(() => props.class)
</script>