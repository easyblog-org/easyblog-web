<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f5f5]">
    <div v-if="error.statusCode === 404" class="text-center">
      <img src="@/assets/img/404_images/404_bg.png" alt="404" class="w-96 mx-auto" />
      <h1 class="text-2xl font-bold text-gray-800 mt-6">页面不存在！</h1>
      <p class="text-gray-500 mt-2">{{ error.message || '请检查URL地址是否正确' }}</p>
      <NuxtLink
        to="/"
        class="inline-block mt-6 bg-[#1e80ff] text-white px-6 py-2 rounded hover:bg-[#1171ee] transition-colors no-underline"
      >
        回到首页
      </NuxtLink>
    </div>
    <div v-else class="text-center">
      <h1 class="text-2xl font-bold text-gray-800">An error occurred</h1>
      <NuxtLink
        to="/"
        class="inline-block mt-6 bg-[#1e80ff] text-white px-6 py-2 rounded hover:bg-[#1171ee] transition-colors no-underline"
      >
        回到首页
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: this.error.statusCode === 404 ? '404 Not Found' : 'An error occurred',
    }
  },
}
</script>
