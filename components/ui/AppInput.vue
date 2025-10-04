<template>
  <div class="space-y-2">
    <label 
      v-if="label" 
      :for="inputId"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <div v-if="$slots.prepend || icon" :class="prependClass">
        <Component v-if="icon" :is="icon" class="w-5 h-5 text-gray-400" />
        <slot name="prepend" />
      </div>
      
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClass"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <div v-if="$slots.append" :class="appendClass">
        <slot name="append" />
      </div>
      
      <div v-if="loading" class="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
    
    <div v-if="error || hint" class="text-sm">
      <p v-if="error" class="text-red-600 flex items-center gap-1">
        <AlertCircle class="w-4 h-4" />
        {{ error }}
      </p>
      <p v-else-if="hint" class="text-gray-500">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { AlertCircle } from 'lucide-vue-next'
import { useDesignSystem } from '@/composables/useDesignSystem'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  loading?: boolean
  icon?: Component
  size?: 'sm' | 'md' | 'lg'
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  loading: false,
  size: 'md'
})

const emit = defineEmits<Emits>()
const { inputClasses } = useDesignSystem()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const inputClass = computed(() => {
  const base = inputClasses(!!props.error)
  const sizeClass = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  }[props.size]
  
  const paddingLeft = (props.icon || $slots.prepend) ? 'pl-10' : ''
  const paddingRight = ($slots.append || props.loading) ? 'pr-10' : ''
  const disabled = props.disabled ? 'bg-gray-50 cursor-not-allowed' : ''
  const readonly = props.readonly ? 'bg-gray-50' : ''
  
  return `${base} ${sizeClass} ${paddingLeft} ${paddingRight} ${disabled} ${readonly} w-full`
})

const prependClass = computed(() => {
  return 'absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none'
})

const appendClass = computed(() => {
  return 'absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center'
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// Expose template ref if needed
const $slots = defineSlots()
</script>