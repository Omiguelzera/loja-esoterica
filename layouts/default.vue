<template>
  <div class="min-h-screen flex flex-col bg-background theme-transition">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <ToastContainer />
  </div>
</template>
<script setup lang="ts">
</script>
