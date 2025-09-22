# 🔮 Loja Esotérica - Deploy Guide

Uma loja online moderna de produtos esotéricos construída com **Nuxt 3**, **TypeScript**, **Tailwind CSS** e **Pinia**.

## ✨ Funcionalidades

- 🛍️ **Catálogo de produtos** com imagens específicas por produto
- 🛒 **Carrinho de compras** funcional
- 🌙 **Tema claro/escuro** com detecção automática
- 🌐 **Multilíngue** (Português/Inglês)
- 📱 **Design responsivo** e moderno
- 🎨 **Imagens temáticas** específicas para cada categoria
- ⚡ **Performance otimizada** com Nuxt 3

## 🚀 Deploy Gratuito no Vercel

### Pré-requisitos
1. Conta gratuita no [GitHub](https://github.com)
2. Conta gratuita no [Vercel](https://vercel.com)

### Passo a Passo

#### 1️⃣ **Preparar o Repositório**
```bash
# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "🚀 Deploy inicial da Loja Esotérica"

# Conectar com repositório GitHub (substitua pelo seu)
git remote add origin https://github.com/SEU_USUARIO/loja-esoterica.git

# Enviar para GitHub
git push -u origin main
```

#### 2️⃣ **Deploy no Vercel**

**Opção A: Via Site (Mais Fácil)**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Import Project"**
3. Conecte com GitHub
4. Selecione seu repositório `loja-esoterica`
5. Clique em **"Deploy"**
6. Aguarde 2-3 minutos
7. ✅ **Pronto!** Sua loja estará online

**Opção B: Via CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Seguir as instruções no terminal
```

#### 3️⃣ **Configuração Automática**
O Vercel detectará automaticamente:
- ✅ Framework: **Nuxt.js**
- ✅ Build Command: **`npm run build`**
- ✅ Output Directory: **`.vercel/output`**
- ✅ Install Command: **`npm install`**

### 🌍 **URLs de Exemplo**
Após o deploy, você terá:
- **Produção**: `https://loja-esoterica.vercel.app`
- **Preview**: URLs automáticas para cada commit

## 🎯 **Outras Opções Gratuitas**

### 1. **Netlify** (Alternativa ao Vercel)
```bash
# Build estático
npm run generate

# Fazer upload da pasta .output/public
```

### 2. **GitHub Pages** (Apenas sites estáticos)
```bash
# Configurar no nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'github-pages'
  }
})

# Build
npm run generate
```

### 3. **Cloudflare Pages**
1. Conectar repositório GitHub
2. Build command: `npm run build`
3. Output directory: `.output/public`

## 🛠️ **Comandos de Desenvolvimento**

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Testes
npm run test

# Lint
npm run lint
```

## 📁 **Estrutura do Projeto**

```
🔮 loja-esoterica/
├── 📁 components/          # Componentes Vue reutilizáveis
│   ├── ui/                 # Componentes base
│   ├── ProductCard.vue     # Card de produto
│   ├── SiteHeader.vue      # Cabeçalho
│   └── ThemeToggle.vue     # Alternador de tema
├── 📁 pages/               # Páginas da aplicação
│   ├── index.vue           # Página inicial
│   ├── produtos.vue        # Lista de produtos
│   ├── carrinho.vue        # Carrinho de compras
│   └── produto/[id].vue    # Detalhes do produto
├── 📁 stores/              # Gerenciamento de estado (Pinia)
│   ├── cart.ts            # Estado do carrinho
│   └── products.ts        # Estado dos produtos
├── 📁 composables/         # Composables Vue
│   ├── useI18n.ts         # Internacionalização
│   └── useTheme.ts        # Gerenciamento de tema
├── 📁 lib/                 # Utilitários
│   ├── product-images.ts  # Geração de imagens
│   └── date.ts           # Utilitários de data
├── 📁 server/api/         # API endpoints
│   └── products.get.ts    # API de produtos
└── 📁 assets/css/         # Estilos globais
    └── tailwind.css       # Configuração Tailwind
```

## 🎨 **Personalização**

### Cores do Tema
Edite `assets/css/tailwind.css` para personalizar:
```css
:root {
  --primary: 271 91% 65%;     /* Cor principal */
  --background: 0 0% 100%;    /* Fundo claro */
  --foreground: 240 10% 3.9%; /* Texto claro */
}

.dark {
  --background: 240 10% 3.9%; /* Fundo escuro */
  --foreground: 0 0% 98%;     /* Texto escuro */
}
```

### Produtos
Edite `server/api/products.get.ts` para adicionar/modificar produtos.

### Imagens
Edite `lib/product-images.ts` para personalizar imagens dos produtos.

## 🚀 **Deploy Automático**

Após conectar com Vercel, cada push para `main` fará deploy automático:

```bash
git add .
git commit -m "✨ Nova feature"
git push
```

**🎉 Deploy automático em 2-3 minutos!**

---

## 📞 **Suporte**

Desenvolvido com ❤️ usando:
- [Nuxt 3](https://nuxt.com)
- [Vue 3](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://typescriptlang.org)
- [Pinia](https://pinia.vuejs.org)

**Dúvidas?** Consulte a [documentação do Vercel](https://vercel.com/docs)
