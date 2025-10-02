<template>
  <div class="space-y-6 max-w-2xl" v-if="product">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold tracking-tight">Editar Produto</h1>
      <NuxtLink to="/dashboard/produtos" class="text-sm text-primary hover:underline">Voltar</NuxtLink>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div class="grid gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium" for="name">Nome</label>
          <Input id="name" v-model="values.name" type="text" />
          <p v-if="errors.name" class="text-xs text-destructive">{{ errors.name }}</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium" for="price">Preço (R$)</label>
          <Input id="price" v-model="values.price" type="number" step="0.01" />
          <p v-if="errors.price" class="text-xs text-destructive">{{ errors.price }}</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium" for="category">Categoria</label>
          <select id="category" v-model="values.category" class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
            <option value="cristais">Cristais</option>
            <option value="incensos">Incensos</option>
            <option value="tarot">Tarot</option>
          </select>
          <p v-if="errors.category" class="text-xs text-destructive">{{ errors.category }}</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium" for="description">Descrição</label>
          <textarea id="description" v-model="values.description" rows="4" class="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none" />
          <p v-if="errors.description" class="text-xs text-destructive">{{ errors.description }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <Button type="submit" :disabled="submitting">Salvar Alterações</Button>
        <p v-if="saved" class="text-sm text-primary">Atualizado!</p>
      </div>
    </form>
  </div>
  <div v-else class="text-sm text-muted-foreground">Carregando...</div>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useForm } from 'vee-validate'
import { object, string } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { Product } from '@/types/product'

// Layout padrão será usado automaticamente
definePageMeta({
  middleware: 'admin'
})

const route = useRoute()
const id = Number(route.params.id)
const { data: products } = await useFetch<Product[]>('/api/products')
const product = computed(() => products.value?.find((p: Product) => p.id === id))

const schema = toTypedSchema(object({
  name: string().min(3, 'Mínimo 3 caracteres'),
  price: string().refine(v => !isNaN(parseFloat(v)) && parseFloat(v) > 0, 'Preço inválido'),
  category: string().min(1, 'Selecione uma categoria'),
  description: string().min(10, 'Mínimo 10 caracteres')
}))

interface ProductInput { name: string; price: string; category: string; description: string }

const { handleSubmit, errors, values, setValues, isSubmitting } = useForm<ProductInput>({
  validationSchema: schema,
  initialValues: { name: '', price: '', category: '', description: '' }
})

watchEffect(() => {
  if (product.value) {
    setValues({
      name: product.value.name,
      price: product.value.price.toString(),
      category: product.value.category,
      description: product.value.description
    })
  }
})

const saved = ref(false)
const submitting = computed(() => isSubmitting.value)

const onSubmit = handleSubmit(async (vals) => {
  if (product.value) {
    product.value.name = vals.name
    product.value.price = parseFloat(vals.price)
    product.value.category = vals.category
    product.value.description = vals.description
  }
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
})
</script>