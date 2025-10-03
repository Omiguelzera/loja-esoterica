<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/50 theme-transition">
    <!-- Sidebar Persistente -->
    <PersistentSidebar />
    
    <!-- Layout Principal -->
    <div 
      class="fixed top-0 flex flex-col min-h-screen"
      :style="{
        left: isMobile ? '0' : (isOpen ? '320px' : '64px'),
        right: '0',
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 10
      }"
    >
      <SiteHeader />
      <main 
        class="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden"
        :style="{
          transition: 'all 0.3s ease-in-out',
          width: '100%'
        }"
      >
        <div 
          class="w-full"
          :style="{
            transition: 'all 0.3s ease-in-out'
          }"
        >
          <slot />
        </div>
      </main>
      <SiteFooter />
    </div>
    
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar'

const { isOpen, isMobile } = useSidebar()
</script>
