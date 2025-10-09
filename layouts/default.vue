<template>
  <div class="min-h-screen magic-gradient relative overflow-x-hidden">
    <!-- Fundo Místico -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-cyan-900/20"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      <div class="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_25%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div class="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_75%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      <div class="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.1),transparent_50%)]"></div>
    </div>
    
    <SiteHeader />
    
    <PersistentSidebar />
    
    <!-- Conteúdo Principal -->
    <main 
      class="transition-all duration-300 ease-in-out relative z-10"
      :style="{ marginLeft: contentMarginLeft }"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mystic-card magic-glow min-h-[calc(100vh-8rem)] p-4 sm:p-6 lg:p-8">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar';

const { contentMarginLeft } = useSidebar()
</script>