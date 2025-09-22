<template>
  <div class="min-h-screen flex bg-background theme-transition">
    <Sidebar class="hidden md:flex" />
    <div class="flex flex-col flex-1 min-w-0">
      <SiteHeader />
      <main class="flex-1 p-6 space-y-6">
        <slot />
      </main>
      <ToastContainer />
    </div>
  </div>
</template>
<script setup lang="ts">
</script>