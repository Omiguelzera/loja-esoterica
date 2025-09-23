<template>
  <div :class="['rounded-lg border border-border bg-card text-card-foreground shadow', $attrs.class]">
    <slot />
  </div>
</template>
<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
</script>
