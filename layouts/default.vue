<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
    <TheHeader />
    <main class="flex-1">
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '~/components/layout/TheHeader.vue'
import TheFooter from '~/components/layout/TheFooter.vue'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>
