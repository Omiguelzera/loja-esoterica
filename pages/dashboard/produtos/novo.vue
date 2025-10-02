<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold tracking-tight">Novo Produto</h1>
      <NuxtLink to="/dashboard/produtos" class="text-sm text-primary hover:underline">Voltar</NuxtLink>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div class="grid gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium" for="name">Nome</label>
          <Input id="name" v-model="values.name" type="text" placeholder="Ex: Cristal Quartzo" />
          <p v-if="errors.name" class="text-xs text-destructive">{{ errors.name }}</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium" for="price">Preço (R$)</label>
          <Input id="price" v-model="values.price" type="number" step="0.01" placeholder="0.00" />
          <p v-if="errors.price" class="text-xs text-destructive">{{ errors.price }}</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium" for="category">Categoria</label>
          <select id="category" v-model="values.category" class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
            <option value="">Selecione...</option>
            <option value="cristais">Cristais</option>
            <option value="incensos">Incensos</option>
            <option value="tarot">Tarot</option>
          </select>
          <p v-if="errors.category" class="text-xs text-destructive">{{ errors.category }}</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium" for="description">Descrição</label>
          <textarea id="description" v-model="values.description" rows="4" class="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none" placeholder="Detalhes do produto..." />
          <p v-if="errors.description" class="text-xs text-destructive">{{ errors.description }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <Button type="submit" :disabled="submitting">Salvar</Button>
        <p v-if="saved" class="text-sm text-primary">Salvo!</p>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { object, string, number } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

// Layout padrão será usado automaticamente
definePageMeta({
  middleware: 'admin'
})

// Schema de validação
const schema = toTypedSchema(object({
  name: string().min(3, 'Mínimo 3 caracteres'),
  price: string().refine(v => !isNaN(parseFloat(v)) && parseFloat(v) > 0, 'Preço inválido'),
  category: string().min(1, 'Selecione uma categoria'),
  description: string().min(10, 'Mínimo 10 caracteres')
}))

interface ProductInput {
  name: string; price: string; category: string; description: string
}

const { handleSubmit, errors, values, resetForm, isSubmitting } = useForm<ProductInput>({
  validationSchema: schema,
  initialValues: { name: '', price: '', category: '', description: '' }
})

const saved = ref(false)
const submitting = computed(() => isSubmitting.value)

// Mock de persistência local (poderia ser API POST futuramente)
const onSubmit = handleSubmit(async (vals) => {
  saved.value = false
  // Simular criação
  const body = {
    id: Date.now(),
    name: vals.name,
    price: parseFloat(vals.price),
    description: vals.description,
    category: vals.category,
    createdAt: new Date().toISOString()
  }
  // Atualizar cache local dos produtos se já carregados (useFetch cache key)
  const { data: products } = await useFetch('/api/products')
  if (products.value) {
    products.value.push(body as any)
  }
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
  resetForm()
})
</script>