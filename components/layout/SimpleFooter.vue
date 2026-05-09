<template>
  <div class="text-center my-6 lg:my-0 lg:mt-auto lg:py-5">
    <div class="mb-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
      <NuxtLink to="/disclaimer" class="text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors no-underline">免责声明</NuxtLink>
      <span class="text-gray-300 dark:text-gray-600">|</span>
      <NuxtLink to="/privacy" class="text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors no-underline">隐私协议</NuxtLink>
      <span class="text-gray-300 dark:text-gray-600">|</span>
      <NuxtLink to="/service-protocol" class="text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors no-underline">用户协议</NuxtLink>
      <span class="text-gray-300 dark:text-gray-600">|</span>
      <NuxtLink to="/sitemap" class="text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors no-underline">网站地图</NuxtLink>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-500">
      &copy;{{ currentYear }} EasyBlog 版权所有. Powered by Nuxt.
    </p>
  </div>
</template>

<script>
export default {
  name: 'SimpleFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>
