<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
    <SiteHeader />
    
    <!-- Sidebar -->
    <PersistentSidebar />
    
    <!-- Main Content -->
    <main 
      class="transition-all duration-300 ease-in-out"
      :style="{
        marginLeft: isMobile ? '0' : (isOpen ? '20rem' : '4rem'),
        minHeight: 'calc(100vh - 4rem)', // Altura mínima considerando o header
        paddingTop: '1rem',
        paddingBottom: '1rem',
        overflow: 'auto' // Garantir que pode fazer scroll
      }"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar';

const { isOpen, isMobile } = useSidebar()
</script>