<template>
  <div class="container-responsive py-10 grid gap-10 lg:grid-cols-3">
    <div class="lg:col-span-2 space-y-8">
      <div class="flex items-center justify-between">
  <h1 class="text-3xl font-bold tracking-tight">{{ t('checkout') }}</h1>
  <NuxtLink to="/carrinho" class="text-sm text-primary hover:underline">{{ t('backToCart') }}</NuxtLink>
      </div>
  <div v-if="!hasItems" class="text-muted-foreground">{{ t('emptyCart') }} <NuxtLink to="/" class="text-primary hover:underline">{{ t('viewProducts') }}</NuxtLink></div>
      <form v-else @submit.prevent="onSubmit" class="space-y-8 max-w-xl">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium" for="nome">Nome Completo</label>
            <Input id="nome" v-model="values.nome" type="text" placeholder="Seu nome" />
            <p v-if="errors.nome" class="text-xs text-destructive">{{ errors.nome }}</p>
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium" for="email">Email</label>
            <Input id="email" v-model="values.email" type="email" placeholder="voce@exemplo.com" />
            <p v-if="errors.email" class="text-xs text-destructive">{{ errors.email }}</p>
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium" for="endereco">Endereço</label>
            <Input id="endereco" v-model="values.endereco" type="text" placeholder="Rua, número" />
            <p v-if="errors.endereco" class="text-xs text-destructive">{{ errors.endereco }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="cidade">Cidade</label>
            <Input id="cidade" v-model="values.cidade" type="text" />
            <p v-if="errors.cidade" class="text-xs text-destructive">{{ errors.cidade }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="uf">UF</label>
            <Input id="uf" v-model="values.uf" type="text" maxlength="2" class="uppercase" />
            <p v-if="errors.uf" class="text-xs text-destructive">{{ errors.uf }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="cep">CEP</label>
            <Input id="cep" v-model="values.cep" type="text" placeholder="00000-000" />
            <p v-if="errors.cep" class="text-xs text-destructive">{{ errors.cep }}</p>
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium" for="observacoes">Observações</label>
            <textarea id="observacoes" v-model="values.observacoes" rows="3" class="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none" placeholder="Instruções adicionais (opcional)" />
            <p v-if="errors.observacoes" class="text-xs text-destructive">{{ errors.observacoes }}</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <Button type="submit" :disabled="submitting">Finalizar Pedido</Button>
          <p v-if="success" class="text-sm text-primary">Pedido enviado!</p>
        </div>
      </form>
    </div>
    <aside class="space-y-6 self-start">
      <div class="rounded-lg border border-border bg-card p-5 space-y-4">
        <h2 class="text-lg font-semibold">Resumo</h2>
        <div v-if="!hasItems" class="text-sm text-muted-foreground">Nenhum item.</div>
        <div v-else class="space-y-3">
          <div v-for="l in detailed" :key="l.productId" class="flex justify-between text-sm">
            <span class="text-muted-foreground">{{ l.qty }}x {{ l.product?.name }}</span>
            <span>R$ {{ l.lineTotal.toFixed(2) }}</span>
          </div>
          <div class="border-t border-border pt-3 flex justify-between font-medium">
            <span>{{ t('total') }}</span>
            <span>R$ {{ grandTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      <p class="text-xs text-muted-foreground">* Este checkout é demonstrativo e não processa pagamentos reais.</p>
    </aside>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useToasts } from '@/composables/useToasts'
import { useI18n } from '@/composables/useI18n'
import { useForm } from 'vee-validate'
import { object, string } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const router = useRouter()
const cart = useCartStore()
const { add: addToast } = useToasts()
const { t } = useI18n()

const hasItems = computed(() => cart.totalItems > 0)
const detailed = computed(() => cart.detailed)
const grandTotal = computed(() => cart.grandTotal)

if (!hasItems.value) {
  // redirect if empty
  router.replace('/carrinho')
}

const schema = toTypedSchema(object({
  nome: string().min(3, 'Mínimo 3 caracteres'),
  email: string().email('Email inválido'),
  endereco: string().min(5, 'Informe o endereço'),
  cidade: string().min(2, 'Cidade inválida'),
  uf: string().length(2, 'UF'),
  cep: string().regex(/^[0-9]{5}-?[0-9]{3}$/,'CEP inválido'),
  observacoes: string().max(500, 'Máx 500').optional().or(string().length(0))
}))

interface CheckoutForm {
  nome: string
  email: string
  endereco: string
  cidade: string
  uf: string
  cep: string
  observacoes?: string
}

const { handleSubmit, errors, values, isSubmitting } = useForm<CheckoutForm>({
  validationSchema: schema,
  initialValues: { nome: '', email: '', endereco: '', cidade: '', uf: '', cep: '', observacoes: '' }
})

const success = ref(false)
const submitting = computed(() => isSubmitting.value)

const onSubmit = handleSubmit(async (vals) => {
  success.value = false
  // Simular processamento
  await new Promise(r => setTimeout(r, 800))
  // limpar carrinho
  cart.clear()
  success.value = true
  addToast({ variant: 'success', title: 'Pedido enviado', description: 'Verifique seu email.' })
  setTimeout(() => {
    router.push('/')
  }, 1500)
})
</script>
