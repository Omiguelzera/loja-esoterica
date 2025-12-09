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

# 🔮 Esoteric Store - Mystical E-commerce Platform

A comprehensive mystical and esoteric products e-commerce platform built with modern web technologies, featuring role-based authentication, admin dashboard, and an enchanting user experience.

## 📖 Project Overview

**Esoteric Store** is a full-stack e-commerce application designed specifically for mystical, esoteric, and spiritual products. The platform combines modern web development practices with a mystical theme to create an immersive shopping experience for customers seeking spiritual items like crystals, incense, tarot cards, and other esoteric products.

## ✨ Key Features

### 🛒 **E-commerce Core**
- **Product Catalog**: Comprehensive product management with categories
- **Shopping Cart**: Persistent cart with Pinia state management
- **Order Processing**: Complete order workflow from cart to delivery
- **Payment Integration**: Ready for payment gateway integration
- **Inventory Management**: Stock tracking and availability status

### 🔐 **Authentication & Authorization**
- **Role-Based Access**: Admin and Customer user roles
- **Secure Login/Registration**: Email/password authentication with validation
- **Admin Code System**: Special codes for admin registration
- **Session Management**: Persistent login with remember me functionality
- **Route Protection**: Middleware-based route guards

### 👑 **Admin Dashboard**
- **Order Management**: Complete order lifecycle management
- **User Administration**: CRUD operations for user accounts
- **Analytics Dashboard**: Sales metrics and user statistics
- **Role Management**: Admin and customer role assignment
- **Activity Monitoring**: User activity tracking and reporting

### 👤 **User Experience**
- **Customer Profiles**: Complete profile management system
- **Order History**: Detailed order tracking and history
- **Wishlist**: Save favorite products for later
- **Account Dashboard**: Personalized user dashboard
- **Responsive Design**: Mobile-first responsive layout

### 🎨 **Design & UI/UX**
- **Mystical Theme**: Dark magical aesthetic with crystal borders
- **Dark/Light Mode**: Complete theme switching capability
- **Responsive Layout**: Optimized for all device sizes
- **Accessibility**: WCAG compliant design principles
- **Animations**: Smooth transitions and mystical effects

## 🛠 Technical Stack

### **Frontend Framework**
- **Nuxt 3**: Vue.js-based full-stack framework
- **TypeScript**: Type-safe development
- **Vue 3**: Composition API with reactive components
- **Tailwind CSS**: Utility-first CSS framework

### **State Management**
- **Pinia**: Modern state management for Vue
- **Composables**: Reusable logic composition
- **Reactive State**: Global state synchronization

### **Styling & Design**
- **Tailwind CSS**: Responsive utility classes
- **Custom CSS**: Mystical effects and animations
- **Lucide Icons**: Modern icon system
- **SVG Assets**: Custom avatar and decoration graphics

### **Development Tools**
- **Vite**: Fast development server
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Git**: Version control system

## 📁 Project Structure

```
├── components/                 # Vue components
│   ├── ui/                    # Reusable UI components
│   ├── AdminAccountDashboard.vue
│   ├── CustomerAccountDashboard.vue
│   ├── Icon.vue              # Custom icon system
│   ├── PersistentSidebar.vue # Navigation sidebar
│   └── SiteHeader.vue        # Main header component
├── composables/               # Vue composables
│   ├── useAuth.ts            # Authentication logic
│   ├── useI18n.ts           # Internationalization
│   ├── useSidebar.ts        # Sidebar state management
│   ├── useTheme.ts          # Theme switching
│   └── useToasts.ts         # Notification system
├── layouts/                   # Nuxt layouts
│   ├── auth.vue             # Authentication layout
│   ├── dashboard.vue        # Admin dashboard layout
│   └── default.vue          # Main site layout
├── middleware/                # Route middleware
│   ├── admin.ts             # Admin route protection
│   ├── auth.ts              # Authentication check
│   └── guest.ts             # Guest-only routes
├── pages/                     # Application pages
│   ├── auth/                # Authentication pages
│   │   ├── cadastro.vue     # Registration
│   │   └── login.vue        # Login
│   ├── dashboard/           # Admin dashboard
│   │   ├── pedidos/         # Order management
│   │   └── usuarios/        # User management
│   ├── perfil/              # User profiles
│   │   ├── editar.vue       # Edit profile
│   │   └── index.vue        # View profile
│   └── pedidos/             # Customer orders
│       ├── [id].vue         # Order details
│       └── index.vue        # Order history
├── public/                    # Static assets
│   └── avatars/             # User avatar SVGs
├── stores/                    # Pinia stores
│   └── cart.ts              # Shopping cart store
└── assets/                    # Application assets
    └── css/                 # Stylesheets
        ├── mystic.css       # Custom mystical styles
        └── tailwind.css     # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Omiguelzera/loja-esoterica.git
   cd loja-esoterica
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open browser to `http://localhost:3000`
   - Admin login: `admin@loja.com` / `123456`
   - Customer login: `cliente@teste.com` / `123456`

### Build for Production
```bash
npm run build
npm run preview
```

## 🔑 User Roles & Permissions

### 👑 **Administrator**
- **Dashboard Access**: Complete admin panel
- **Order Management**: View, edit, and manage all orders
- **User Management**: CRUD operations on user accounts
- **Product Management**: Add, edit, delete products
- **System Analytics**: Access to sales and user metrics
- **Role Assignment**: Manage user roles and permissions

### 👤 **Customer**
- **Shopping**: Browse and purchase products
- **Account Management**: Edit personal information
- **Order Tracking**: View order history and status
- **Profile Dashboard**: Personalized account overview
- **Wishlist**: Save favorite items

## 🎯 Key Pages & Features

### **Authentication System**
- **Login Page** (`/auth/login`): Secure user authentication
- **Registration** (`/auth/cadastro`): New user signup with role selection
- **Password Recovery**: Forgot password functionality

### **Customer Experience**
- **Home Page** (`/`): Product showcase and navigation
- **Product Categories**: Organized product browsing
- **Shopping Cart** (`/carrinho`): Cart management and checkout
- **User Profile** (`/perfil`): Account information management
- **Order History** (`/pedidos`): Complete order tracking

### **Admin Dashboard**
- **Dashboard Overview** (`/dashboard`): Analytics and metrics
- **Order Management** (`/dashboard/pedidos`): Order processing system
- **User Management** (`/dashboard/usuarios`): User administration
- **Product Management**: Inventory and catalog control

## 🎨 Design Philosophy

### **Mystical Aesthetic**
- **Dark Theme**: Primary dark magical theme
- **Crystal Borders**: Mystical border effects
- **Gradient Effects**: Enchanting color transitions
- **Icon System**: Esoteric and mystical iconography

### **User Experience**
- **Intuitive Navigation**: Clear and logical page flow
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Inclusive design for all users
- **Performance**: Optimized loading and interactions

## 🔒 Security Features

### **Authentication Security**
- **Password Hashing**: Secure password storage (ready for implementation)
- **Session Management**: Secure session handling
- **Route Protection**: Middleware-based access control
- **Role Validation**: Server-side permission checking

### **Data Protection**
- **Input Validation**: Client and server-side validation
- **CSRF Protection**: Cross-site request forgery prevention
- **XSS Prevention**: Cross-site scripting protection
- **Sanitization**: Input data sanitization

## 📊 Performance & Optimization

### **Frontend Optimization**
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Dead code elimination
- **Image Optimization**: Responsive image loading
- **Lazy Loading**: Component lazy loading

### **SEO & Accessibility**
- **Meta Tags**: Dynamic SEO meta information
- **Semantic HTML**: Proper HTML structure
- **Alt Text**: Image accessibility
- **Keyboard Navigation**: Full keyboard support

## 🌐 Internationalization

- **Multi-language Support**: English and Portuguese
- **Currency Formatting**: Localized currency display
- **Date Formatting**: Regional date formats
- **RTL Support**: Right-to-left language support (ready)

## 🔮 Future Enhancements

### **Planned Features**
- **Payment Integration**: Stripe, PayPal, and local payment methods
- **Email Notifications**: Order confirmations and updates
- **Product Reviews**: Customer review and rating system
- **Advanced Search**: Elasticsearch integration
- **Mobile App**: React Native companion app
- **AI Recommendations**: Machine learning product suggestions

### **Technical Improvements**
- **Database Integration**: PostgreSQL or MongoDB
- **API Development**: RESTful API with authentication
- **Testing Suite**: Unit and integration tests
- **CI/CD Pipeline**: Automated deployment pipeline
- **Monitoring**: Application performance monitoring
- **Caching**: Redis caching implementation

## 🤝 Contributing

We welcome contributions to improve the Esoteric Store platform:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain mystical theme consistency
- Write comprehensive tests
- Update documentation
- Ensure responsive design

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Miguel** - [@Omiguelzera](https://github.com/Omiguelzera)

## 🙏 Acknowledgments

- **Nuxt.js Team** - Amazing full-stack framework
- **Vue.js Community** - Reactive JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful icon library
- **Mystical Design Inspiration** - Various esoteric and spiritual sources

---

*"Building digital magic through code - where technology meets mysticism"* ✨🔮✨
