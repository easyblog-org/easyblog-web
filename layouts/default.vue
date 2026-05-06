<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
    <TheHeader />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
import TheHeader from '~/components/layout/TheHeader.vue'
</script>
