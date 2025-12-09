<template>
  <div />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Removed full login UI; trigger header modal if someone navigates to /auth/login
const router = useRouter()
onMounted(() => {
  if (process.client) window.dispatchEvent(new Event('open-login-modal'))
  router.replace({ path: '/' })
})
</script>