<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
        <NuxtLink to="/about" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline border-r border-gray-300 dark:border-gray-700 pr-4 last:border-r-0 last:pr-0">关于网站</NuxtLink>
        <NuxtLink to="/disclaimer" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline border-r border-gray-300 dark:border-gray-700 pr-4 last:border-r-0 last:pr-0">免责声明</NuxtLink>
        <NuxtLink to="/privacy" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline border-r border-gray-300 dark:border-gray-700 pr-4 last:border-r-0 last:pr-0">隐私协议</NuxtLink>
        <NuxtLink to="/service-protocol" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline border-r border-gray-300 dark:border-gray-700 pr-4 last:border-r-0 last:pr-0">用户协议</NuxtLink>
        <NuxtLink to="/sitemap" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline">网站地图</NuxtLink>
      </div>

      <div class="flex justify-center gap-8 mb-6">
        <div class="text-center">
          <img src="@/assets/img/QR-wechat.jpg" alt="微信" class="w-24 h-24 rounded" />
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">联系开发者</p>
        </div>
        <div class="text-center">
          <img src="@/assets/img/QR-public-account.jpg" alt="公众号" class="w-24 h-24 rounded" />
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">关注公众号</p>
        </div>
      </div>

      <div class="text-center text-xs text-gray-400 dark:text-gray-600 space-y-1">
        <div class="flex flex-wrap justify-center gap-x-3">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="hover:text-primary transition-colors no-underline text-gray-400 dark:text-gray-600">ICP备案号</a>
          <NuxtLink to="/disclaimer" class="hover:text-primary transition-colors no-underline text-gray-400 dark:text-gray-600">免责声明</NuxtLink>
        </div>
        <p>&copy;2019-{{ currentYear }} EasyBlog 版权所有</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>
