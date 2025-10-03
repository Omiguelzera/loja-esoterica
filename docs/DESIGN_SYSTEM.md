# Sistema de Design - Loja Esotérica

Este sistema de design fornece uma base consistente para toda a aplicação, garantindo uma experiência visual uniforme e moderna.

## 🎨 Paleta de Cores

### Cores Primárias
- **Primary**: Azul (#3b82f6) - Usado para ações principais e elementos de destaque
- **Secondary**: Roxo (#a855f7) - Usado para elementos secundários e gradientes

### Cores de Estado
- **Success**: Verde (#22c55e) - Confirmações e status positivos
- **Warning**: Amarelo (#f59e0b) - Avisos e atenções
- **Error**: Vermelho (#ef4444) - Erros e ações destrutivas

### Gradientes
```css
/* Gradiente principal */
bg-gradient-to-r from-blue-600 to-purple-600

/* Gradiente de fundo */
bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30

/* Cards com backdrop */
bg-white/80 backdrop-blur-xl
```

## 🏗️ Componentes Base

### AppButton
Botão reutilizável com múltiplas variantes e tamanhos.

```vue
<AppButton variant="primary" size="md" @click="handleClick">
  Botão Principal
</AppButton>

<AppButton variant="secondary" size="lg" :loading="isLoading">
  Carregando...
</AppButton>

<AppButton variant="destructive" icon="Trash2">
  Excluir
</AppButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'destructive'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `icon`: Component
- `fullWidth`: boolean

### AppCard
Container com estilo consistente e slots flexíveis.

```vue
<AppCard variant="hover" padding="lg">
  <template #header>
    <h3>Título do Card</h3>
  </template>
  
  Conteúdo principal do card
  
  <template #footer>
    <AppButton>Ação</AppButton>
  </template>
</AppCard>
```

**Props:**
- `variant`: 'base' | 'hover'
- `padding`: 'sm' | 'md' | 'lg'
- `shadow`: boolean
- `border`: boolean

### AppInput
Campo de entrada com suporte a ícones, validação e estados.

```vue
<AppInput
  v-model="email"
  type="email"
  label="E-mail"
  placeholder="seu@email.com"
  :error="emailError"
  icon="Mail"
  required
/>
```

**Props:**
- `type`: 'text' | 'email' | 'password' | 'number' | etc.
- `label`: string
- `placeholder`: string
- `error`: string
- `hint`: string
- `icon`: Component
- `size`: 'sm' | 'md' | 'lg'
- `required`: boolean
- `disabled`: boolean
- `loading`: boolean

### AppBadge
Etiquetas e indicadores visuais.

```vue
<AppBadge variant="success" icon="Check">
  Ativo
</AppBadge>

<AppBadge variant="warning" closable @close="removeBadge">
  Pendente
</AppBadge>
```

**Props:**
- `variant`: 'primary' | 'success' | 'warning' | 'error' | 'neutral'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: Component
- `closable`: boolean
- `outline`: boolean
- `rounded`: boolean

## 🛠️ Composable useDesignSystem

### Uso Básico
```typescript
import { useDesignSystem } from '@/composables/useDesignSystem'

export default {
  setup() {
    const { 
      buttonClasses, 
      cardClasses, 
      textGradient,
      gridClasses 
    } = useDesignSystem()
    
    return {
      buttonClasses,
      cardClasses,
      textGradient,
      gridClasses
    }
  }
}
```

### Funções Utilitárias

#### buttonClasses(variant, size)
```typescript
const primaryButton = buttonClasses('primary', 'lg')
// Retorna: classes Tailwind para botão primário grande
```

#### cardClasses(variant)
```typescript
const hoverCard = cardClasses('hover')
// Retorna: classes Tailwind para card com hover
```

#### textGradient(variant)
```typescript
const gradientText = textGradient('primary')
// Retorna: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
```

#### gridClasses(type)
```typescript
const productGrid = gridClasses('products')
// Retorna: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
```

## 📐 Layout e Espaçamento

### Containers
```css
/* Pequeno */
max-w-2xl mx-auto

/* Médio */
max-w-4xl mx-auto

/* Grande */
max-w-6xl mx-auto

/* Extra grande */
max-w-7xl mx-auto
```

### Grids Responsivos
```css
/* Grid de produtos */
grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

/* Grid de formulário */
grid gap-6 lg:grid-cols-2

/* Grid de estatísticas */
grid gap-4 sm:grid-cols-2 lg:grid-cols-4
```

### Espaçamentos
```css
/* Seção */
py-10 lg:py-16

/* Container responsivo */
container-responsive

/* Padding de card */
p-6 lg:p-8

/* Gaps */
gap-3  /* pequeno */
gap-6  /* médio */
gap-8  /* grande */
```

## 🎯 Estados e Feedback

### Loading States
```vue
<!-- Spinner -->
<div class="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

<!-- Skeleton -->
<div class="animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded h-4 w-full"></div>
```

### Empty States
```vue
<div class="bg-white/80 backdrop-blur-xl rounded-2xl p-12 text-center">
  <div class="w-16 h-16 text-gray-400 mx-auto mb-4">
    <!-- Ícone -->
  </div>
  <h3 class="text-xl font-semibold text-gray-900 mb-2">Título</h3>
  <p class="text-gray-600">Descrição do estado vazio</p>
</div>
```

## 🌈 Transições

### Classes de Transição
```css
/* Rápida */
transition-all duration-200

/* Normal */
transition-all duration-300

/* Lenta */
transition-all duration-500

/* Hover com escala */
hover:scale-105 transition-transform duration-300
```

## 📱 Responsividade

### Breakpoints
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Uso
```css
/* Mobile first */
text-base lg:text-lg

/* Grid responsivo */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

/* Padding responsivo */
p-4 lg:p-8
```

## 🎨 Decorações

### Elementos Decorativos
```vue
<!-- Gradientes de fundo -->
<div class="fixed inset-0 pointer-events-none">
  <div class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
  <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
</div>
```

## 📋 Guia de Uso

### 1. Sempre usar o composable
```typescript
const { buttonClasses, cardClasses } = useDesignSystem()
```

### 2. Preferir componentes base
```vue
<!-- ✅ Bom -->
<AppButton variant="primary">Clique aqui</AppButton>

<!-- ❌ Evitar -->
<button class="bg-blue-500 text-white px-4 py-2">Clique aqui</button>
```

### 3. Manter consistência
- Use sempre as mesmas cores para os mesmos tipos de ação
- Use espaçamentos consistentes (gap-3, gap-6, gap-8)
- Mantenha o mesmo padrão de bordas arredondadas

### 4. Estados interativos
- Sempre inclua estados de hover
- Use transições suaves
- Mantenha feedback visual claro

## 🔧 Customização

Para adicionar novas variantes ou modificar o sistema:

1. **Edite** `config/design-system.ts`
2. **Atualize** `composables/useDesignSystem.ts`
3. **Teste** em todos os componentes afetados
4. **Documente** as mudanças neste README