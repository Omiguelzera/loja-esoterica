<template>
  <div>
    <!-- Backdrop para mobile -->
    <div 
      v-if="isMobile && isOpen" 
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="close"
    ></div>
    
    <!-- Sidebar -->
    <aside 
      id="persistent-sidebar"
      class="fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 transition-all duration-300 ease-in-out z-50 shadow-lg dark:shadow-slate-900/20"
      :style="{
        width: isMobile 
          ? (isOpen ? '20rem' : '20rem')
          : (isOpen ? '20rem' : '4rem'),
        transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
        boxShadow: isOpen ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }"
    >
      <!-- Header da Sidebar -->
      <div class="p-4 border-b border-gray-200 dark:border-slate-700">
        <div class="flex items-center justify-between">
          <div v-if="isOpen || !isMobile" class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">LE</span>
            </div>
            <div v-show="isOpen">
              <h2 class="font-bold text-gray-900 dark:text-white">Loja Esotérica</h2>
              <p class="text-xs text-gray-500 dark:text-slate-400">Dashboard</p>
            </div>
          </div>
          
          <!-- Botão toggle apenas no desktop -->
          <button 
            v-if="!isMobile"
            @click="toggle"
            class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            :title="isOpen ? 'Recolher sidebar' : 'Expandir sidebar'"
          >
            <svg class="w-4 h-4 text-gray-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isOpen ? 'M11 19l-7-7 7-7M21 12H3' : 'M13 5l7 7-7 7M5 12h14'" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Conteúdo da Sidebar -->
      <div class="flex-1 overflow-y-auto p-4">
        <!-- Seção para usuário não logado -->
        <div v-if="!user" class="space-y-6">
          <!-- Botão de Login -->
          <div class="space-y-3">
            <button 
              @click="showLoginModal = true"
              class="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span v-show="isOpen || isMobile">Fazer Login</span>
            </button>
          </div>
          
          <!-- Links públicos -->
          <nav class="space-y-2">
            <h3 v-show="isOpen || isMobile" class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Navegação
            </h3>
            
            <NuxtLink 
              to="/produtos" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span v-show="isOpen || isMobile">Produtos</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/carrinho" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4.01" />
              </svg>
              <span v-show="isOpen || isMobile">Carrinho</span>
            </NuxtLink>
          </nav>
          
          <!-- Seção de ajuda -->
          <div class="space-y-2">
            <h3 v-show="isOpen || isMobile" class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Ajuda
            </h3>
            
            <button 
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span v-show="isOpen || isMobile">Suporte</span>
            </button>
          </div>
        </div>
        
        <!-- Seção para usuário cliente OU admin vendo como cliente -->
        <div v-else-if="user && (effectiveRole === 'customer')" class="space-y-6">
          <!-- Perfil do usuário -->
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
              <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white font-semibold text-sm">
                  {{ user.name.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div v-show="isOpen || isMobile">
                <p class="font-semibold text-gray-900 dark:text-white">{{ user.name }}</p>
                <p class="text-xs text-gray-500 dark:text-slate-400">Cliente</p>
              </div>
            </div>
          </div>
          
          <!-- Menu do cliente -->
          <nav class="space-y-2">
            <h3 v-show="isOpen || isMobile" class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Minha Conta
            </h3>
            
            <NuxtLink 
              to="/meus-pedidos" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span v-show="isOpen || isMobile">Meus Pedidos</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/favoritos" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-show="isOpen || isMobile">Favoritos</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/perfil" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span v-show="isOpen || isMobile">Meu Perfil</span>
            </NuxtLink>
          </nav>
          
          <!-- Logout -->
          <div class="pt-4 border-t border-gray-200 dark:border-slate-700">
            <button 
              @click="logout"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span v-show="isOpen || isMobile">Sair</span>
            </button>
          </div>
        </div>
        
        <!-- Seção para administrador -->
        <div v-else-if="user && effectiveRole === 'admin'" class="space-y-6">
          <!-- Perfil do admin -->
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div v-show="isOpen || isMobile">
                <p class="font-semibold text-gray-900 dark:text-white">{{ user.name }}</p>
                <p class="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  {{ viewAsCustomer ? 'Visualizando como Cliente' : 'Administrador' }}
                </p>
              </div>
            </div>
            
            <!-- Toggle Admin/Cliente -->
            <button 
              @click="toggleCustomerView"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors text-sm"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span v-show="isOpen || isMobile">
                {{ viewAsCustomer ? 'Voltar para Admin' : 'Ver como Cliente' }}
              </span>
            </button>
          </div>
          
          <!-- Menu administrativo -->
          <nav class="space-y-2">
            <h3 v-show="isOpen || isMobile" class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Painel Admin
            </h3>
            
            <NuxtLink 
              to="/dashboard" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span v-show="isOpen || isMobile">Dashboard</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/dashboard/produtos" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span v-show="isOpen || isMobile">Produtos</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/dashboard/categorias" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span v-show="isOpen || isMobile">Categorias</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/dashboard/pedidos" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span v-show="isOpen || isMobile">Pedidos</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/dashboard/usuarios" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span v-show="isOpen || isMobile">Usuários</span>
            </NuxtLink>
          </nav>
          
          <!-- Relatórios -->
          <div class="space-y-2">
            <h3 v-show="isOpen || isMobile" class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Relatórios
            </h3>
            
            <NuxtLink 
              to="/dashboard/relatorios" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span v-show="isOpen || isMobile">Estatísticas</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/dashboard/configuracoes" 
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span v-show="isOpen || isMobile">Configurações</span>
            </NuxtLink>
          </div>
          
          <!-- Logout -->
          <div class="pt-4 border-t border-gray-200 dark:border-slate-700">
            <button 
              @click="logout"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
              :class="{ 'justify-center': !isOpen && !isMobile }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span v-show="isOpen || isMobile">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
    
    <!-- Modal de Login -->
    <div 
      v-if="showLoginModal" 
      class="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
      @click.self="showLoginModal = false"
    >
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6">
        <!-- Header do Modal -->
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
          <button 
            @click="showLoginModal = false"
            class="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Formulário de Login -->
        <form @submit.prevent="handleFormLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="loginForm.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Senha
            </label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            :disabled="loginLoading"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loginLoading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
        
        <!-- Credenciais de Demo -->
        <div class="border-t border-gray-200 dark:border-slate-600 pt-4">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">Credenciais para teste:</p>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p class="font-semibold text-blue-800 dark:text-blue-300">Cliente</p>
              <p class="text-blue-600 dark:text-blue-400">cliente@loja.com</p>
              <p class="text-blue-600 dark:text-blue-400">123456</p>
            </div>
            <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <p class="font-semibold text-purple-800 dark:text-purple-300">Admin</p>
              <p class="text-purple-600 dark:text-purple-400">admin@loja.com</p>
              <p class="text-purple-600 dark:text-purple-400">admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth, type User } from '@/composables/useAuth'
import { useSidebar } from '@/composables/useSidebar'

const { isOpen, isMobile, toggle, close } = useSidebar()
const { user, isLoggedIn, login, logout: authLogout, isAdmin, isCustomer } = useAuth()

// Estado para toggle entre visão admin e cliente (apenas para admins)
const viewAsCustomer = ref(false)

// Estado do modal de login
const showLoginModal = ref(false)

// Computed para mostrar o menu correto baseado no role e toggle
const effectiveRole = computed(() => {
  if (!user.value) return null
  if (user.value.role === 'admin' && viewAsCustomer.value) return 'customer'
  return user.value.role
})

const loginAsDemo = (role: 'admin' | 'customer') => {
  const demoUser: User = {
    id: role === 'admin' ? 'admin-1' : 'customer-1',
    name: role === 'admin' ? 'Miguel Admin' : 'João Cliente',
    email: role === 'admin' ? 'admin@loja.com' : 'cliente@loja.com',
    role,
    permissions: role === 'admin' 
      ? ['dashboard.view', 'products.manage', 'users.manage', 'orders.manage']
      : ['products.view', 'orders.create']
  }
  
  login(demoUser, true) // true = lembrar login
  viewAsCustomer.value = false // Reset toggle when logging in
  
  // Fechar sidebar no mobile após login
  if (isMobile.value) {
    close()
  }
}

const logout = () => {
  authLogout()
  viewAsCustomer.value = false
  // Redirecionar para home
  if (process.client) {
    window.location.href = '/'
  }
}

// Toggle para admin ver como cliente
const toggleCustomerView = () => {
  if (isAdmin.value) {
    viewAsCustomer.value = !viewAsCustomer.value
  }
}

// Estados para modal de login
const loginForm = ref({
  email: '',
  password: ''
})

const loginLoading = ref(false)

// Função para lidar com o login via formulário
const handleFormLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    return
  }
  
  loginLoading.value = true
  
  try {
    // Simula verificação de credenciais
    let role: 'admin' | 'customer' = 'customer'
    let name = 'Usuário'
    
    // Determina o role baseado no email e senha
    if (loginForm.value.email === 'admin@loja.com' && loginForm.value.password === 'admin123') {
      role = 'admin'
      name = 'Administrador'
    } else if (loginForm.value.email === 'cliente@loja.com' && loginForm.value.password === '123456') {
      role = 'customer'
      name = 'Cliente'
    } else {
      // Para outros emails, verifica se contém "admin" ou usa customer como padrão
      role = loginForm.value.email.toLowerCase().includes('admin') ? 'admin' : 'customer'
      name = role === 'admin' ? 'Administrador' : 'Cliente'
    }
    
    // Cria o objeto User
    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email: loginForm.value.email,
      role,
      permissions: role === 'admin' 
        ? ['manage-users', 'manage-products', 'view-analytics', 'manage-orders']
        : ['view-products', 'manage-orders']
    }
    
    // Faz login com o objeto User
    login(userData, false)
    
    // Fecha o modal e limpa o formulário
    showLoginModal.value = false
    loginForm.value = { email: '', password: '' }
    
  } catch (error) {
    console.error('Erro no login:', error)
  } finally {
    loginLoading.value = false
  }
}
</script>